#!/usr/bin/env node
/**
 * EInvoiceAtlas — Local Release Gate
 * ===================================
 * Scans dist/ build output for production readiness.
 * Fails hard on any violation — no warnings, no warnings pass.
 *
 * Run after: npm run build
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const dist = join(projectRoot, 'dist');

// ── Color codes ────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  bold: '\x1b[1m',
};

// ── State ──────────────────────────────────────────────────────
let fails = 0;

function fail(msg) {
  fails++;
  console.log(`  ${C.red}[FAIL]${C.reset} ${msg}`);
}

function pass(msg) {
  console.log(`  ${C.green}[PASS]${C.reset} ${msg}`);
}

function section(name) {
  console.log(`\n${C.bold}━━━ ${name} ━━━${C.reset}`);
}

function checkFile(relPath, label) {
  const full = join(dist, relPath);
  if (!existsSync(full)) {
    fail(`${label} does not exist: ${relPath}`);
    return null;
  }
  pass(`${label} exists: ${relPath}`);
  try {
    return readFileSync(full, 'utf-8');
  } catch {
    fail(`Could not read: ${relPath}`);
    return null;
  }
}

// ── Checks ─────────────────────────────────────────────────────

function checkRobots() {
  section('robots.txt');

  const content = checkFile('robots.txt', 'robots.txt');
  if (!content) return;

  // Must contain required lines
  const checks = [
    { pattern: /User-agent: \*/i,       msg: 'Contains "User-agent: *"' },
    { pattern: /Allow: \//i,            msg: 'Contains "Allow: /"' },
    { pattern: /Sitemap: https:\/\/einvoiceatlas\.com\/sitemap\.xml/i, msg: 'Contains correct Sitemap URL' },
  ];
  for (const { pattern, msg } of checks) {
    if (pattern.test(content)) pass(msg);
    else fail(msg);
  }

  // Must NOT contain HTML
  const htmlChecks = ['<html', '<!doctype', '<!DOCTYPE html'];
  for (const tag of htmlChecks) {
    if (content.includes(tag)) {
      fail(`robots.txt contains HTML tag: "${tag}"`);
    } else {
      pass(`No HTML found in robots.txt`);
    }
    break;
  }
}

function checkSitemap() {
  section('sitemap.xml');
  checkFile('sitemap.xml', 'sitemap.xml');
  checkFile('sitemap-index.xml', 'sitemap-index.xml');
}

function checkLlms() {
  section('llms.txt');

  const content = checkFile('llms.txt', 'llms.txt');
  if (!content) return;

  // Forbidden patterns (word-boundary where possible)
  const forbidden = [
    { pattern: /Invalid Date/,                          msg: 'No "Invalid Date"' },
    { pattern: /\bTBD\b/,                              msg: 'No word-boundary "TBD"' },
    { pattern: /\bTODO\b/,                             msg: 'No word-boundary "TODO"' },
    // Note: HTML placeholder="" attributes and ::placeholder CSS are legitimate in built pages.
    // Only content-level noise (TBD, TODO, Invalid Date, undefined, null, NaN) is checked.
    { pattern: /undefined/,                            msg: 'No "undefined"' },
    { pattern: /\bnull\b/,                             msg: 'No word-boundary "null"' },
    { pattern: /\bNaN\b/,                              msg: 'No word-boundary "NaN"' },
  ];

  for (const { pattern, msg } of forbidden) {
    if (pattern.test(content)) {
      fail(`${msg} — found in llms.txt`);
    } else {
      pass(msg);
    }
  }
}

function checkHomepage() {
  section('Homepage (dist/index.html)');

  const content = checkFile('index.html', 'index.html');
  if (!content) return;

  // ── Forbidden ──
  const forbidden = [
    { pattern: /Invalid Date/,              msg: 'No "Invalid Date"' },
    { pattern: /\bTBD\b/,                  msg: 'No word-boundary "TBD"' },
    { pattern: /\bTODO\b/,                 msg: 'No word-boundary "TODO"' },
    { pattern: /undefined/,                 msg: 'No "undefined"' },
    { pattern: /\bnull\b/,                 msg: 'No word-boundary "null"' },
    { pattern: /\bNaN\b/,                  msg: 'No word-boundary "NaN"' },
    { pattern: /banner-date-tbd/,           msg: 'No "banner-date-tbd" (stale class name)' },
  ];

  for (const { pattern, msg } of forbidden) {
    if (pattern.test(content)) {
      fail(`${msg} — found in index.html`);
    } else {
      pass(msg);
    }
  }

  // ── Required ──
  if (content.includes('banner-date-pending')) {
    pass('Contains "banner-date-pending" (new class)');
  } else {
    fail('Missing "banner-date-pending" (new class not found in index.html)');
  }
}

function checkFrancePage() {
  section('France Page (dist/countries/france-e-invoicing/index.html)');

  const relPath = join('countries', 'france-e-invoicing', 'index.html');
  const fullPath = join(dist, relPath);
  if (!existsSync(fullPath)) {
    fail(`France page does not exist: ${relPath}`);
    return;
  }
  pass(`France page exists: ${relPath}`);

  let content;
  try {
    content = readFileSync(fullPath, 'utf-8');
  } catch {
    fail(`Could not read: ${relPath}`);
    return;
  }

  // ── Forbidden ──
  const forbidden = [
    { pattern: /2025.*full/i,              msg: 'No "2025...full" old wording' },
    { pattern: /full.*2025/i,              msg: 'No "full...2025" old wording' },
    { pattern: /Invalid Date/,              msg: 'No "Invalid Date"' },
    { pattern: /\bTBD\b/,               msg: 'No word-boundary "TBD"' },
    { pattern: /\bTODO\b/,              msg: 'No word-boundary "TODO"' },
  ];

  for (const { pattern, msg } of forbidden) {
    if (pattern.test(content)) {
      fail(`${msg} — found in France page`);
    } else {
      pass(msg);
    }
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
  if (hasPhased) {
    pass('Contains at least one phased rollout signal (September 2026/2027 or "phased")');
  } else {
    fail('Missing phased rollout signal — France page must retain September 2026/2027 wording or "phased"');
  }
}

// ── Main ───────────────────────────────────────────────────────
function main() {
  console.log('\n');
  console.log(`${C.bold}╔════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}║   EInvoiceAtlas — Local Release Gate                ║${C.reset}`);
  console.log(`${C.bold}╚════════════════════════════════════════════════════════╝${C.reset}`);
  console.log(`  Project: ${projectRoot}`);
  console.log(`  Build:   ${dist}`);

  if (!existsSync(dist)) {
    console.log(`\n  ${C.red}[FATAL]${C.reset} dist/ not found. Run "npm run build" first.\n`);
    process.exit(1);
  }

  checkRobots();
  checkSitemap();
  checkLlms();
  checkHomepage();
  checkFrancePage();

  console.log(`\n${'═'.repeat(64)}`);

  if (fails > 0) {
    console.log(`\n${C.red}${C.bold}RESULT: RELEASE GATE FAILED — ${fails} failure(s)${C.reset}`);
    console.log(`  Fix all failures before deploying.\n`);
    process.exit(1);
  } else {
    console.log(`\n${C.green}${C.bold}RESULT: RELEASE GATE PASSED — All checks green${C.reset}\n`);
    process.exit(0);
  }
}

main();
