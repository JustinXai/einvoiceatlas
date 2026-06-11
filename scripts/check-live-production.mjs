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
async function fetchUrl(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'EInvoiceAtlas-ReleaseGate/1.0' },
      signal: AbortSignal.timeout(15000),
    });
    const text = await res.text();
    return { status: res.status, contentType: res.headers.get('content-type') ?? '', text, ok: res.ok };
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
