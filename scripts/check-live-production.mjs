#!/usr/bin/env node
/**
 * EInvoiceAtlas — Production Live Gate
 * =====================================
 * Fetches live production URLs and validates the deployed output.
 * Requires network access. Fails hard on any violation.
 *
 * Usage: node scripts/check-live-production.mjs
 * Or:    npm run verify:live
 */

const BASE_URL = 'https://einvoiceatlas.com';
const BUST = Math.floor(Date.now() / 1000);

// ── Color codes ────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

// ── State ──────────────────────────────────────────────────────
let fails = 0;
let skipped = 0;

// ── HTTP helper ────────────────────────────────────────────────
async function fetchUrl(url, { redirect = 'follow' } = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'EInvoiceAtlas-ReleaseGate/1.0' },
      redirect,
      signal: AbortSignal.timeout(15000),
    });
    const text = redirect === 'manual' ? '' : await res.text();
    return {
      status: res.status,
      contentType: res.headers.get('content-type') ?? '',
      text,
      ok: res.ok,
      location: res.headers.get('location'),
      finalUrl: res.url,
    };
  } catch (err) {
    return { status: 0, contentType: '', text: '', ok: false, error: err.message };
  }
}

// ── Check helpers ──────────────────────────────────────────────
function fail(msg, detail = '') {
  fails++;
  console.log(`  ${C.red}[FAIL]${C.reset} ${msg}`);
  if (detail) console.log(`         ${C.dim}${detail}${C.reset}`);
}

function pass(msg) {
  console.log(`  ${C.green}[PASS]${C.reset} ${msg}`);
}

function info(msg) {
  console.log(`  ${C.yellow}[INFO]${C.reset} ${msg}`);
}

function section(name) {
  console.log(`\n${C.bold}━━━ ${name} ━━━${C.reset}`);
}

function check(label, condition, okMsg, failMsg) {
  if (condition) {
    pass(okMsg);
  } else {
    fail(failMsg);
  }
}

// ── Checks ─────────────────────────────────────────────────────

async function checkRobots() {
  section('robots.txt (production live)');

  const url = `${BASE_URL}/robots.txt?v=${BUST}`;
  const { status, contentType, text, ok, error } = await fetchUrl(url);

  check(label('HTTP 200', url), status === 200, `HTTP 200 (status ${status})`, `Expected HTTP 200, got ${status}`);
  if (status !== 200) return;

  check(label('Content-Type text/plain', url), contentType.includes('text/plain'), `Content-Type: text/plain`, `Content-Type: ${contentType}`);

  check(label('Contains "User-agent"', url), /User-agent: \*/i.test(text), 'Contains "User-agent: *"');
  check(label('Contains "Allow: /"', url), /Allow: \//i.test(text), 'Contains "Allow: /"');
  check(label('Contains sitemap URL', url), /Sitemap: https:\/\/einvoiceatlas\.com\/sitemap\.xml/i.test(text), 'Contains correct Sitemap URL');
  check(label('No HTML in body', url), !/<html|<!doctype/i.test(text), 'No HTML found in robots.txt body');
}

async function checkSitemap() {
  section('sitemap.xml (production live)');

  const url = `${BASE_URL}/sitemap.xml?v=${BUST}`;
  const { status, ok } = await fetchUrl(url);

  check(label('HTTP 200', url), status === 200, `HTTP 200 (status ${status})`, `Expected HTTP 200, got ${status}`);
}

async function checkLlms() {
  section('llms.txt (production live)');

  const url = `${BASE_URL}/llms.txt?v=${BUST}`;
  const { status, text, ok } = await fetchUrl(url);

  check(label('HTTP 200', url), status === 200, `HTTP 200 (status ${status})`, `Expected HTTP 200, got ${status}`);
  if (status !== 200) return;

  const forbidden = [
    { pattern: /Invalid Date/,    msg: 'No "Invalid Date"' },
    { pattern: /\bTBD\b/,        msg: 'No word-boundary "TBD"' },
    { pattern: /\bTODO\b/,       msg: 'No word-boundary "TODO"' },
    // Note: HTML placeholder="" attributes and ::placeholder CSS are legitimate in built pages.
    { pattern: /undefined/,       msg: 'No "undefined"' },
    { pattern: /\bnull\b/,       msg: 'No word-boundary "null"' },
    { pattern: /\bNaN\b/,         msg: 'No word-boundary "NaN"' },
  ];

  for (const { pattern, msg } of forbidden) {
    const found = pattern.test(text);
    check(label(msg, url), !found, msg, `${msg} — found in llms.txt`);
  }
}

function sameUrl(a, b) {
  return a.origin === b.origin && a.pathname === b.pathname && a.search === b.search;
}

function expectedApexLocation(requestUrl) {
  const next = new URL(requestUrl);
  next.hostname = 'einvoiceatlas.com';
  next.protocol = 'https:';
  return next;
}

async function checkWwwRedirect(url) {
  const requestUrl = new URL(url);
  const { status, location, error } = await fetchUrl(url, { redirect: 'manual' });

  check(label(`www redirect ${requestUrl.pathname || '/'}`, url), [301, 308].includes(status), `HTTP ${status} redirect`, `Expected 301/308 redirect, got ${status}${error ? ` (${error})` : ''}`);
  if (![301, 308].includes(status) || !location) return;

  let locationUrl;
  try {
    locationUrl = new URL(location, url);
  } catch {
    fail(`Invalid Location header for ${url}`, location);
    return;
  }

  const apex = expectedApexLocation(url);
  check(label('Redirect host is apex', url), locationUrl.hostname === apex.hostname, `Location host is ${locationUrl.hostname}`, `Expected Location host ${apex.hostname}, got ${locationUrl.hostname}`);
  check(label('Redirect path preserved', url), locationUrl.pathname === requestUrl.pathname, `Path preserved: ${locationUrl.pathname}`, `Expected path ${requestUrl.pathname}, got ${locationUrl.pathname}`);
  check(label('Redirect query preserved', url), locationUrl.search === requestUrl.search, `Query preserved: ${locationUrl.search || '(empty)'}`, `Expected query ${requestUrl.search || '(empty)'}, got ${locationUrl.search || '(empty)'}`);
}

async function checkApexNoLoop(url) {
  const requestUrl = new URL(url);
  const { status, location, error } = await fetchUrl(url, { redirect: 'manual' });

  if (status === 0) {
    fail(`Apex check failed for ${url}`, error ?? 'request error');
    return;
  }

  if ([301, 308].includes(status) && location) {
    let locationUrl;
    try {
      locationUrl = new URL(location, url);
    } catch {
      fail(`Invalid apex redirect Location for ${url}`, location);
      return;
    }

    const sameDestination = sameUrl(requestUrl, locationUrl);
    const loopsToWww = locationUrl.hostname === 'www.einvoiceatlas.com';
    check(label(`Apex no-loop ${requestUrl.pathname || '/'}`, url), !sameDestination && !loopsToWww, `Redirects to ${locationUrl.href}`, `Apex redirect loop or www bounce detected: ${locationUrl.href}`);
  } else {
    pass(`Apex URL does not loop: ${url} (HTTP ${status})`);
  }
}

function extractHtmlTags(text) {
  const title = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
  const description = text.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)?.[1]?.trim() ?? '';
  const canonical = text.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["'][^>]*>/i)?.[1]?.trim() ?? '';
  const h1 = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '';
  return { title, description, canonical, h1 };
}

async function checkPageSeo(url, expected) {
  const { status, text, error } = await fetchUrl(url);
  const name = new URL(url).pathname || '/';

  check(label(`Page HTTP 200 ${name}`, url), status === 200, `HTTP ${status}`, `Expected HTTP 200, got ${status}${error ? ` (${error})` : ''}`);
  if (status !== 200) return null;

  const actual = extractHtmlTags(text);
  check(label(`Title ${name}`, url), actual.title === expected.title, actual.title || '(empty)', `Expected title "${expected.title}", got "${actual.title}"`);
  check(label(`Description ${name}`, url), actual.description === expected.description, actual.description || '(empty)', `Expected description "${expected.description}", got "${actual.description}"`);
  check(label(`H1 ${name}`, url), actual.h1 === expected.h1, actual.h1 || '(empty)', `Expected H1 "${expected.h1}", got "${actual.h1}"`);
  check(label(`Canonical ${name}`, url), actual.canonical === expected.canonical, actual.canonical || '(empty)', `Expected canonical "${expected.canonical}", got "${actual.canonical}"`);
  return actual;
}

async function checkHomepage() {
  section('Homepage (production live)');

  const url = `${BASE_URL}/?v=${BUST}`;
  const { status, text, ok } = await fetchUrl(url);

  check(label('HTTP 200', url), status === 200, `HTTP 200 (status ${status})`, `Expected HTTP 200, got ${status}`);
  if (status !== 200) return;

  // ── Forbidden ──
  const forbidden = [
    { pattern: /Invalid Date/,      msg: 'No "Invalid Date"' },
    { pattern: /\bTBD\b/,          msg: 'No word-boundary "TBD"' },
    { pattern: /\bTODO\b/,         msg: 'No word-boundary "TODO"' },
    // Note: HTML placeholder="" attributes and ::placeholder CSS are legitimate in built pages.
    { pattern: /undefined/,         msg: 'No "undefined"' },
    { pattern: /\bnull\b/,         msg: 'No word-boundary "null"' },
    { pattern: /\bNaN\b/,           msg: 'No word-boundary "NaN"' },
    { pattern: /banner-date-tbd/,   msg: 'No "banner-date-tbd" (stale class)' },
  ];

  for (const { pattern, msg } of forbidden) {
    const found = pattern.test(text);
    check(label(msg, url), !found, msg, `${msg} — found in homepage HTML`);
  }

  // ── Required ──
  check(label('banner-date-pending', url), text.includes('banner-date-pending'), 'Contains "banner-date-pending" (new class)', 'Missing "banner-date-pending" — new class not in homepage');
}

async function checkFrance() {
  section('France Page (production live)');

  // Try both possible France URL patterns
  const urls = [
    `${BASE_URL}/countries/france-e-invoicing/?v=${BUST}`,
    `${BASE_URL}/france/?v=${BUST}`,
  ];

  let content = '';
  let status = 0;
  let found = false;

  for (const url of urls) {
    const res = await fetchUrl(url);
    if (res.status === 200) {
      content = res.text;
      status = res.status;
      found = true;
      info(`France page found at: ${url}`);
      break;
    }
  }

  if (!found) {
    fail(`France page returned HTTP ${status} on all known URLs`);
    return;
  }

  check(label('HTTP 200', 'France'), status === 200, `HTTP 200 (status ${status})`);

  // ── Forbidden ──
  const forbidden = [
    { pattern: /2025.*full/i,    msg: 'No "2025...full" old wording' },
    { pattern: /full.*2025/i,    msg: 'No "full...2025" old wording' },
    { pattern: /Invalid Date/,    msg: 'No "Invalid Date"' },
    { pattern: /\bTBD\b/,        msg: 'No word-boundary "TBD"' },
    { pattern: /\bTODO\b/,       msg: 'No word-boundary "TODO"' },
  ];

  for (const { pattern, msg } of forbidden) {
    const found2 = pattern.test(content);
    check(label(msg, 'France'), !found2, msg, `${msg} — found in France page`);
  }

  // ── Required: phased rollout signal ──
  const phasedSignals = [
    /September 2026/i,
    /September 2027/i,
    /Sep 2026/i,
    /Sep 2027/i,
    /phased/i,
  ];
  const hasPhased = phasedSignals.some(p => p.test(content));
  check(label('Phased wording', 'France'), hasPhased, 'Contains phased rollout signal', 'Missing phased rollout signal — September 2026/2027 or "phased"');
}

// ── Helpers ────────────────────────────────────────────────────
function label(name, url) {
  return `${name}`;
}

async function checkQALive(label, url, expectedCount) {
  section(`Quick Answers — ${label} (production live)`);

  const { status, text, ok } = await fetchUrl(`${url}?v=${BUST}`);

  check(`HTTP 200`, status === 200, `HTTP 200 (${status})`, `Expected HTTP 200, got ${status}`);
  if (status !== 200) return;

  const qaMatch = text.match(/<div class="quick-answers"[^>]*>([\s\S]*?)<\/div>\s*<(section|div class="route-grid)/);
  if (!qaMatch) {
    fail(`${label}: Quick Answers block not found`);
    return;
  }
  const qaBlock = qaMatch[1];
  const itemRe = /<div class="qa-item"[^>]*>[\s\S]*?<span class="qa-number"[^>]*>([\s\S]*?)<\/span>([\s\S]*?)<\/dt>[\s\S]*?<dd[^>]*class="qa-answer"[^>]*>([\s\S]*?)<\/dd>/g;
  const items = [];
  let itemMatch;
  while ((itemMatch = itemRe.exec(qaBlock)) !== null) {
    const answerHtml = itemMatch[3];
    const answerText = answerHtml.replace(/<[^>]+>/g, '').trim();
    items.push({ number: itemMatch[1].trim(), question: itemMatch[2].trim(), answerText });
  }

  if (items.length !== expectedCount) {
    fail(`${label}: Expected ${expectedCount} Q&A items, found ${items.length}`);
  } else {
    pass(`${label}: Q&A item count = ${expectedCount}`);
  }

  let emptyCount = 0;
  for (const item of items) {
    if (item.answerText.length === 0) {
      emptyCount++;
      fail(`${label}: Q${item.number} answer is empty — Q: "${item.question.slice(0, 60)}"`);
    }
  }
  if (emptyCount === 0) {
    pass(`${label}: All ${items.length} Q&A answers have visible text`);
  }
}

// ── Main ───────────────────────────────────────────────────────
async function main() {
  console.log('\n');
  console.log(`${C.bold}╔════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}║   EInvoiceAtlas — Production Live Gate              ║${C.reset}`);
  console.log(`${C.bold}╚════════════════════════════════════════════════════════╝${C.reset}`);
  console.log(`  Base URL: ${BASE_URL}`);
  console.log(`  Cache-bust: v=${BUST}`);
  console.log(`  Time: ${new Date().toISOString()}`);

  await checkRobots();
  await checkSitemap();
  await checkLlms();
  await checkHomepage();
  await checkFrance();
  await checkWwwRedirect('https://www.einvoiceatlas.com/');
  await checkWwwRedirect('https://www.einvoiceatlas.com/countries/?status=upcoming');
  await checkWwwRedirect('http://www.einvoiceatlas.com/standards/en-16931/?x=1');
  await checkApexNoLoop('https://einvoiceatlas.com/');
  await checkApexNoLoop('https://einvoiceatlas.com/countries/?status=upcoming');
  await checkApexNoLoop('https://einvoiceatlas.com/standards/en-16931/?x=1');
  await checkPageSeo(`${BASE_URL}/standards/peppol-bis-3/`, {
    title: 'Peppol BIS Billing 3.0: Format, XML & Examples | EInvoiceAtlas',
    description: 'Learn what Peppol BIS Billing 3.0 is, how it relates to EN 16931, its UBL XML structure, validation rules, invoice examples, and routing.',
    h1: 'Peppol BIS 3.0 E-Invoice Standard',
    canonical: 'https://einvoiceatlas.com/standards/peppol-bis-3/',
  });
  await checkPageSeo(`${BASE_URL}/routes/peppol-access-point/`, {
    title: 'Peppol Access Point: Providers, Certification & How It Works | EInvoiceAtlas',
    description: 'Understand how a Peppol Access Point works, the four-corner model, provider selection, certification terminology, ERP integration, and cross-border coverage.',
    h1: 'Peppol Access Point',
    canonical: 'https://einvoiceatlas.com/routes/peppol-access-point/',
  });
  await checkPageSeo(`${BASE_URL}/standards/en-16931/`, {
    title: 'EN 16931 Invoice Standard: XML, Examples & EU E-Invoicing | EInvoiceAtlas',
    description: 'Learn EN 16931, the EU e-invoicing standard: semantic model, XML structure, invoice examples, CIUS, UBL/CII syntax, Peppol BIS 3.0, XRechnung, and Factur-X links.',
    h1: 'EN 16931 E-Invoice Standard',
    canonical: 'https://einvoiceatlas.com/standards/en-16931/',
  });
  await checkQALive('Peppol BIS 3', `${BASE_URL}/standards/peppol-bis-3/`, 5);
  await checkQALive('EN 16931', `${BASE_URL}/standards/en-16931/`, 5);
  await checkQALive('Peppol Access Point', `${BASE_URL}/routes/peppol-access-point/`, 4);

  console.log(`\n${'═'.repeat(64)}`);

  if (fails > 0) {
    console.log(`\n${C.red}${C.bold}RESULT: LIVE GATE FAILED — ${fails} failure(s)${C.reset}`);
    console.log(`  Production has violations. Do not proceed.\n`);
    process.exit(1);
  } else {
    console.log(`\n${C.green}${C.bold}RESULT: LIVE GATE PASSED — All production checks green${C.reset}\n`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error(`\n${C.red}[FATAL]${C.reset} Script error: ${err.message}\n`);
  process.exit(1);
});
