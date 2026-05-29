#!/usr/bin/env node
/**
 * EInvoiceAtlas — Content Validation Script
 * ==========================================
 * Validates:
 *   - Build readiness (required files exist)
 *   - Prohibited phrases (guaranteed compliance, fake review, misleading official claims)
 *   - Data source structure (structured Source[] with required fields)
 *   - Relationship fields (relatedStandards, relatedCountries, primaryHook, targetIntent, nextStepCta)
 *   - SEO routes (sitemap, robots, llms, playground)
 *   - Disclaimer and source section presence
 *   - No placeholder text (TODO, TBD, [placeholder], {{ }})
 *   - FAQPage schema is NOT used as primary SEO (deprecated May 2026)
 *   - Content handoff fields (nextStepCta, targetIntent, disclaimer, sources on all pages)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// ── Color codes ──────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

// ── State ────────────────────────────────────────────────────────
let errors = 0;
let warnings = 0;
let filesChecked = 0;

function log(section, message, type = 'info') {
  const prefixes = {
    info:   `${C.blue}[INFO]${C.reset}`,
    pass:   `${C.green}[PASS]${C.reset}`,
    warn:   `${C.yellow}[WARN]${C.reset}`,
    fail:   `${C.red}[FAIL]${C.reset}`,
    section:`${C.cyan}${C.bold}[${section}]${C.reset}`,
  };
  const p = prefixes[type] ?? prefixes.info;
  console.log(`  ${p} ${message}`);
}

function err(msg) {
  errors++;
  log('CHECK', msg, 'fail');
}

function warn(msg) {
  warnings++;
  log('CHECK', msg, 'warn');
}

function ok(msg) {
  log('CHECK', msg, 'pass');
}

function section(name) {
  console.log(`\n${C.cyan}${C.bold}━━━ ${name} ━━━${C.reset}`);
}

// ── File utilities ───────────────────────────────────────────────
function scanDir(dir, exts = ['.ts', '.tsx', '.astro', '.js', '.mjs']) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...scanDir(full, exts));
    else if (exts.includes(extname(entry.name))) out.push(full);
  }
  return out;
}

function readContent(filePath) {
  try { return readFileSync(filePath, 'utf-8'); }
  catch { return null; }
}

// ── Validation rules ──────────────────────────────────────────────

/**
 * 1. PROHIBITED PHRASES
 * No guaranteed compliance, fake reviews, misleading official claims, etc.
 */
function checkProhibitedPhrases(content, relPath) {
  const prohibited = [
    { pattern: /guaranteed\s+compliance/i,             msg: 'Prohibited phrase: "guaranteed compliance"' },
    { pattern: /best\s+e-?invoice\s+provider/i,       msg: 'Prohibited phrase: "best e-invoice provider"' },
    { pattern: /official\s+guide\s+to\s+\w/i,         msg: 'Prohibited phrase: "official guide to..."' },
    { pattern: /official\s+resource\s+for/i,           msg: 'Prohibited phrase: "official resource for"' },
    { pattern: /100%\s+compliant/i,                     msg: 'Prohibited phrase: "100% compliant"' },
    { pattern: /approved\s+by\s+\[/i,                   msg: 'Prohibited phrase: "approved by [Government]"' },
    { pattern: /expert-?verified(?!\s+\w)/i,           msg: 'Prohibited phrase: "expert-verified" (without named experts)' },
    { pattern: /fake\s+review|fake\s+testimonial/i,   msg: 'Prohibited phrase: fake reviews' },
    { pattern: /our\s+top\s+pick/i,                    msg: 'Prohibited phrase: "our top pick"' },
    { pattern: /number\s+one\s+e-?invoice/i,          msg: 'Prohibited phrase: "number one e-invoice"' },
    { pattern: /will\s+(definitely|certainly)\s+(make\s+you\s+)?compliant/i, msg: 'Prohibited: certainty of compliance outcome' },
    { pattern: /compliance\s+guarantee/i,              msg: 'Prohibited phrase: "compliance guarantee"' },
  ];

  let found = false;
  for (const { pattern, msg } of prohibited) {
    if (pattern.test(content)) {
      err(`${relPath}: ${msg}`);
      found = true;
    }
  }
  return found;
}

/**
 * 2. PLACEHOLDER TEXT
 * Warns on common placeholder patterns.
 */
function checkPlaceholderText(content, relPath) {
  const patterns = [
    { pattern: /\bTODO\b/,                           msg: 'TODO found — replace with actual content' },
    { pattern: /\bTBD\b/,                           msg: 'TBD found — replace with actual content' },
    { pattern: /\[placeholder\]/i,                   msg: '[placeholder] found — replace with actual content' },
    { pattern: /\{\{[^}]+\}\}/,                     msg: '{{double-brace}} template found — replace with actual content' },
    { pattern: /\{\{[^{}]+\}\}/,                    msg: '{{template}} found — replace with actual content' },
    { pattern: /\|YOUR_[A-Z_]+\|/,                   msg: 'Pipe-variable placeholder found (|YOUR_VAR|)' },
    { pattern: /<!--[\s\S]*?-->/,                     msg: 'HTML comment placeholder found' },
  ];

  for (const { pattern, msg } of patterns) {
    if (pattern.test(content)) {
      const count = (content.match(pattern) || []).length;
      warn(`${relPath}: ${msg} (${count} instance${count > 1 ? 's' : ''})`);
    }
  }
}

/**
 * 3. COMING-SOON DENSITY
 * Warns if "coming soon" appears too many times.
 */
function checkComingSoonDensity(content, relPath) {
  const count = (content.match(/\bcoming\s+soon\b/gi) || []).length;
  if (count > 5) {
    warn(`${relPath}: High "coming soon" density (${count} instances)`);
  }
}

/**
 * 4. H1 TAG UNiqueness in Astro files
 */
function checkH1Uniqueness(content, relPath) {
  if (!relPath.endsWith('.astro')) return;
  const h1s = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (h1s.length > 1) {
    warn(`${relPath}: Multiple H1 tags (${h1s.length}) — consider one H1 per page`);
  }
}

/**
 * 5. DATA FILE STRUCTURE — Source interface validation
 * Checks that data files have the new structured Source fields:
 * title, publisher, url, sourceType, lastChecked
 */
function checkDataSourceStructure(content, relPath) {
  if (!relPath.includes('/data/') || !relPath.endsWith('.ts')) return;

  // Check if there are officialSources arrays in this file
  const hasOfficialSources = /officialSources\s*[:=]\s*\[/.test(content);
  if (!hasOfficialSources) return;

  // Check that Source objects have the required fields
  const requiredFields = ['title', 'publisher', 'url', 'sourceType', 'lastChecked'];
  const missingFields = [];

  for (const field of requiredFields) {
    // Look for field: value patterns
    if (!new RegExp(`\\b${field}\\s*[:=]`).test(content)) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    err(`${relPath}: officialSources entries missing required Source fields: ${missingFields.join(', ')}`);
  } else {
    // Check that sourceType uses the new taxonomy
    const validTypes = ['tax-authority', 'standard-body', 'government', 'erp-docs', 'industry-reference'];
    // Find any type: 'xxx' patterns
    const typeMatches = content.match(/sourceType\s*:\s*['"](\w+[-]?\w*)['"]/g) || [];
    for (const match of typeMatches) {
      const type = match.replace(/sourceType\s*:\s*['"]|['"]$/g, '');
      if (!validTypes.includes(type)) {
        warn(`${relPath}: Non-standard sourceType value: "${type}" (expected one of: ${validTypes.join(', ')})`);
      }
    }
  }
}

/**
 * 6. COUNTRY ITEMS — required relationship fields
 */
function checkCountryRelationships(content, relPath) {
  if (relPath !== 'src/data/countries.ts') return;

  const required = ['relatedStandards', 'relatedErpSystems', 'primaryHook'];
  for (const field of required) {
    if (!new RegExp(`\\b${field}\\s*[:=]`).test(content)) {
      err(`${relPath}: Country items missing required field: ${field}`);
    }
  }
}

/**
 * 7. STANDARD ITEMS — required relatedCountries field
 */
function checkStandardRelationships(content, relPath) {
  if (relPath !== 'src/data/standards.ts') return;

  if (!/\brelatedCountries\s*[:=]/.test(content)) {
    err(`${relPath}: Standard items missing required field: relatedCountries`);
  }
}

/**
 * 8. ERP ITEMS — required relatedCountries and relatedStandards fields
 */
function checkERPRelationships(content, relPath) {
  if (relPath !== 'src/data/erpSystems.ts') return;

  if (!/\brelatedCountries\s*[:=]/.test(content)) {
    err(`${relPath}: ERPSystem items missing required field: relatedCountries`);
  }
  if (!/\brelatedStandards\s*[:=]/.test(content)) {
    err(`${relPath}: ERPSystem items missing required field: relatedStandards`);
  }
}

/**
 * 9. PROVIDER ROUTE — required officialSources field
 */
function checkProviderRouteSources(content, relPath) {
  if (relPath !== 'src/data/providers.ts') return;

  if (!/\bofficialSources\s*[:=]/.test(content)) {
    err(`${relPath}: ProviderRoute items missing required field: officialSources`);
  }
}

/**
 * 10. CONTENT HOOKS — required targetIntent and nextStepCta fields
 */
function checkHookFields(content, relPath) {
  if (relPath !== 'src/data/contentHooks.ts') return;

  if (!/\btargetIntent\s*[:=]/.test(content)) {
    err(`${relPath}: ContentHook items missing required field: targetIntent`);
  }
  if (!/\bnextStepCta\s*[:=]/.test(content)) {
    err(`${relPath}: ContentHook items missing required field: nextStepCta`);
  }
}

/**
 * 11. SEO/GEO ROUTES — check required pages exist
 */
function checkSEORoutes() {
  section('SEO Routes');
  const routes = [
    { path: 'src/pages/robots.txt.ts',      name: 'Robots.txt API route' },
    { path: 'src/pages/sitemap.xml.ts',     name: 'Sitemap.xml API route' },
    { path: 'src/pages/llms.txt.ts',        name: 'LLMs.txt API route' },
    { path: 'src/pages/playground.astro',   name: '/playground page' },
    { path: 'public/favicon.svg',           name: 'Favicon SVG' },
  ];

  for (const { path: p, name } of routes) {
    try {
      statSync(join(projectRoot, p));
      ok(`${name} exists`);
    } catch {
      err(`Missing: ${name} (${p})`);
    }
  }
}

/**
 * 12. DISCLAIMER presence
 */
function checkDisclaimer() {
  section('Disclaimer');
  const files = [
    join(projectRoot, 'src/data/site.ts'),
    join(projectRoot, 'src/layouts/BaseLayout.astro'),
  ];

  let found = false;
  for (const f of files) {
    const content = readContent(f);
    if (content && /disclaimer/i.test(content)) {
      ok(`Disclaimer found in ${relative(projectRoot, f)}`);
      found = true;
    }
  }
  if (!found) err('Disclaimer not found in site.ts or BaseLayout.astro');
}

/**
 * 13. SOURCES SECTION in templates
 * Check that BaseLayout or page templates reference SourcesBox
 */
function checkSourcesSection() {
  section('Sources Section');
  const content = readContent(join(projectRoot, 'src/components/ui/SourcesBox.astro'));
  if (content) {
    // Check it uses the new structured Source fields
    const hasPublisher = /publisher/.test(content);
    const hasSourceType = /sourceType/.test(content);
    const hasLastChecked = /lastChecked/.test(content);
    if (hasPublisher && hasSourceType && hasLastChecked) {
      ok('SourcesBox uses structured Source fields (publisher, sourceType, lastChecked)');
    } else {
      err('SourcesBox missing structured Source fields');
    }
  } else {
    err('SourcesBox.astro not found');
  }
}

/**
 * 14. FAQPage schema is NOT used for SEO
 * buildFAQSchema should return null or be deprecated
 */
function checkFAQSchemaDeprecation() {
  section('FAQ Schema (Deprecated)');
  const schemaFile = join(projectRoot, 'src/utils/schema.ts');
  const content = readContent(schemaFile);

  if (content) {
    if (/FAQPage/.test(content)) {
      // Check it has a deprecation warning or returns null
      if (/returns?\s+null|console\.warn|deprecated/i.test(content)) {
        ok('FAQPage schema has deprecation notice');
      } else {
        err('FAQPage schema found in schema.ts without deprecation notice. FAQPage is deprecated for Google Search as of May 2026.');
      }
    } else {
      ok('FAQPage schema not present (correct — deprecated)');
    }
  } else {
    err('schema.ts not found');
  }
}

/**
 * 15. BUILD READINESS
 */
function checkBuildReadiness() {
  section('Build Readiness');
  const required = [
    { path: 'astro.config.mjs', name: 'Astro config' },
    { path: 'package.json',       name: 'Package.json' },
    { path: 'tsconfig.json',     name: 'TypeScript config' },
    { path: 'src/styles/global.css', name: 'Global CSS' },
    { path: 'src/layouts/BaseLayout.astro', name: 'BaseLayout' },
    { path: 'src/pages/index.astro',      name: 'Homepage' },
  ];

  for (const { path: p, name } of required) {
    try {
      statSync(join(projectRoot, p));
      ok(name);
    } catch {
      err(`Missing: ${name}`);
    }
  }
}

/**
 * 15b. CONTENT HANDOFF VALIDATION
 * Every content item must have the fields needed to hand off to the next step.
 */
function checkContentHandoff() {
  section('Content Handoff Fields');

  // Check all countries have handoff fields
  const countriesContent = readContent(join(projectRoot, 'src/data/countries.ts'));
  if (countriesContent) {
    const requiredCountryFields = ['relatedStandards', 'relatedErpSystems', 'primaryHook', 'officialSources'];
    for (const field of requiredCountryFields) {
      if (new RegExp(`\\b${field}\\s*[:=]`).test(countriesContent)) {
        ok(`Country items have ${field}`);
      } else {
        err(`Country items missing required handoff field: ${field}`);
      }
    }
  }

  // Check all standards have handoff fields
  const standardsContent = readContent(join(projectRoot, 'src/data/standards.ts'));
  if (standardsContent) {
    const requiredStandardFields = ['relatedCountries', 'officialSources'];
    for (const field of requiredStandardFields) {
      if (new RegExp(`\\b${field}\\s*[:=]`).test(standardsContent)) {
        ok(`Standard items have ${field}`);
      } else {
        err(`Standard items missing required handoff field: ${field}`);
      }
    }
  }

  // Check all ERP items have handoff fields
  const erpContent = readContent(join(projectRoot, 'src/data/erpSystems.ts'));
  if (erpContent) {
    const requiredErpFields = ['relatedCountries', 'relatedStandards', 'officialSources'];
    for (const field of requiredErpFields) {
      if (new RegExp(`\\b${field}\\s*[:=]`).test(erpContent)) {
        ok(`ERP items have ${field}`);
      } else {
        err(`ERP items missing required handoff field: ${field}`);
      }
    }
  }

  // Check all provider routes have officialSources
  const providersContent = readContent(join(projectRoot, 'src/data/providers.ts'));
  if (providersContent) {
    if (/\bofficialSources\s*[:=]/.test(providersContent)) {
      ok('Provider route items have officialSources');
    } else {
      err('Provider route items missing officialSources');
    }
  }

  // Check content hooks have targetIntent and nextStepCta
  const hooksContent = readContent(join(projectRoot, 'src/data/contentHooks.ts'));
  if (hooksContent) {
    const requiredHookFields = ['targetIntent', 'nextStepCta'];
    for (const field of requiredHookFields) {
      if (new RegExp(`\\b${field}\\s*[:=]`).test(hooksContent)) {
        ok(`Content hooks have ${field}`);
      } else {
        err(`Content hooks missing required handoff field: ${field}`);
      }
    }
  }
}

/**
 * 15c. PRODUCTION PAGE H1 CHECK
 * Production pages (not playground) should have exactly one H1.
 * Playground is exempt as a preview/module showcase page.
 */
function checkProductionH1() {
  section('Production Page H1 (Playground Exempt)');
  const prodPages = [
    { path: 'src/pages/index.astro', name: '/' },
    { path: 'src/pages/countries/index.astro', name: '/countries' },
    { path: 'src/pages/standards/index.astro', name: '/standards' },
    { path: 'src/pages/erp/index.astro', name: '/erp' },
    { path: 'src/pages/routes/index.astro', name: '/routes' },
  ];

  for (const { path: p, name } of prodPages) {
    const content = readContent(join(projectRoot, p));
    if (!content) {
      warn(`Cannot check H1 for ${name} — file not found`);
      continue;
    }
    const h1s = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    // Also count if the page imports Hero.astro (which provides the H1)
    const hasHeroImport = /import\s+Hero\s+from\s+['"].*Hero/i.test(content);
    if (h1s.length === 0 && !hasHeroImport) {
      warn(`${name}: No H1 found — add a page heading`);
    } else if (h1s.length === 1) {
      ok(`${name}: Exactly one H1`);
    } else if (h1s.length > 1) {
      err(`${name}: ${h1s.length} H1 tags found — production pages must have exactly one H1`);
    } else {
      // Has Hero import but no inline H1 — acceptable for homepage pattern
      ok(`${name}: H1 provided by Hero component`);
    }
  }

  // Playground is exempt — note it explicitly
  const playgroundContent = readContent(join(projectRoot, 'src/pages/playground.astro'));
  if (playgroundContent) {
    const h1s = playgroundContent.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    if (h1s.length > 1) {
      ok(`/playground: ${h1s.length} H1s — playground is a module preview page and is exempt from single-H1 rule`);
    } else {
      ok(`/playground: H1 check — exempt as module preview`);
    }
  }
}

/**
 * 15d. SITEMAP/ROBOTS/LLMS CONSISTENCY
 */
function checkSEOConsistency() {
  section('SEO Consistency');

  // Check sitemap.xml points to correct sitemap
  const sitemapContent = readContent(join(projectRoot, 'src/pages/sitemap.xml.ts'));
  if (sitemapContent) {
    ok('sitemap.xml.ts generates sitemap');
    if (/countryPages|standardPages|erpPages/.test(sitemapContent)) {
      ok('sitemap includes dynamic country/standard/ERP pages');
    } else {
      warn('sitemap may be missing dynamic pages');
    }
  }

  // Check robots.txt
  const robotsContent = readContent(join(projectRoot, 'src/pages/robots.txt.ts'));
  if (robotsContent) {
    if (/sitemap\.xml/s.test(robotsContent)) {
      ok('robots.txt references sitemap.xml');
    } else {
      warn('robots.txt may be missing sitemap reference');
    }
    if (/Allow: \//.test(robotsContent) || /Allow:\s*\//.test(robotsContent.replace(/\s/g, ''))) {
      ok('robots.txt allows crawling');
    }
  }

  // Check llms.txt
  const llmsContent = readContent(join(projectRoot, 'src/pages/llms.txt.ts'));
  if (llmsContent) {
    ok('llms.txt.ts generates LLM-readable index');
    if (/Source Policy|EInvoiceAtlas is an independent/.test(llmsContent)) {
      ok('llms.txt includes site policy and disclaimer');
    }
  }
}

/**
 * 16. DATA FILES existence and basic structure
 */
function checkDataFiles() {
  section('Data Files');
  const required = [
    'site.ts', 'countries.ts', 'standards.ts',
    'erpSystems.ts', 'providers.ts', 'userJourneys.ts',
    'contentHooks.ts', 'types.ts',
  ];

  const dataDir = join(projectRoot, 'src/data');
  for (const file of required) {
    const full = join(dataDir, file);
    try {
      statSync(full);
      const content = readContent(full);
      if (content && /export/.test(content)) {
        ok(`${file} exists with exports`);
      } else {
        warn(`${file} exists but may lack exports`);
      }
    } catch {
      err(`Missing data file: ${file}`);
    }
  }
}

/**
 * 17. COMPONENTS existence
 */
function checkComponents() {
  section('Required Components');
  const required = [
    'Header.astro', 'Footer.astro',
    'StatusBadge.astro', 'SectionHeader.astro', 'Button.astro',
    'AISummaryBox.astro', 'QuickAnswerBox.astro', 'DisclaimerBox.astro',
    'SourcesBox.astro', 'Breadcrumb.astro', 'InfoBlock.astro',
    'CountryCard.astro', 'StandardCard.astro', 'ERPCard.astro', 'HookCard.astro',
    'Hero.astro', 'ImplementationChecklist.astro', 'DeadlineBanner.astro',
    'ProviderRouteBox.astro', 'ShortlistForm.astro',
  ];

  const compDir = join(projectRoot, 'src/components');
  const existing = scanDir(compDir, ['.astro']).map(f => relative(compDir, f));

  let foundCount = 0;
  for (const comp of required) {
    const found = existing.some(f => f.endsWith(comp));
    if (found) foundCount++;
    else err(`Missing component: ${comp}`);
  }
  ok(`Found ${foundCount}/${required.length} required components`);
}

/**
 * 18. SCAN ALL SOURCE FILES for prohibited/placeholder phrases
 */
function scanAllSourceFiles() {
  section('Scanning Source Files');
  const srcDir = join(projectRoot, 'src');
  const files = scanDir(srcDir);

  for (const file of files) {
    filesChecked++;
    const rel = relative(projectRoot, file);
    const content = readContent(file);
    if (!content) continue;

    checkProhibitedPhrases(content, rel);
    checkPlaceholderText(content, rel);
    checkComingSoonDensity(content, rel);
    checkH1Uniqueness(content, rel);
    checkDataSourceStructure(content, rel);
    checkCountryRelationships(content, rel);
    checkStandardRelationships(content, rel);
    checkERPRelationships(content, rel);
    checkProviderRouteSources(content, rel);
    checkHookFields(content, rel);
  }
}

// ── Main ─────────────────────────────────────────────────────────
function main() {
  console.log('\n');
  console.log(`${C.bold}╔══════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}║   EInvoiceAtlas — Content Validation Script         ║${C.reset}`);
  console.log(`${C.bold}╚══════════════════════════════════════════════════════╝${C.reset}`);
  console.log(`  Project: ${projectRoot}`);

  checkBuildReadiness();
  checkDataFiles();
  checkComponents();
  checkSEORoutes();
  checkDisclaimer();
  checkSourcesSection();
  checkFAQSchemaDeprecation();
  checkContentHandoff();
  checkProductionH1();
  checkSEOConsistency();
  scanAllSourceFiles();

  // ── Summary ──
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  Files scanned: ${filesChecked}`);

  if (errors > 0) {
    console.log(`\n${C.red}${C.bold}RESULT: VALIDATION FAILED — ${errors} error(s), ${warnings} warning(s)${C.reset}`);
    console.log(`  Please fix the errors above before proceeding.\n`);
    process.exit(1);
  } else if (warnings > 0) {
    console.log(`\n${C.yellow}${C.bold}RESULT: VALIDATION PASSED WITH WARNINGS — ${warnings} warning(s)${C.reset}`);
    console.log(`  Review warnings above, then proceed.\n`);
    process.exit(0);
  } else {
    console.log(`\n${C.green}${C.bold}RESULT: VALIDATION PASSED — All checks green${C.reset}`);
    console.log(`  No errors found.\n`);
    process.exit(0);
  }
}

main();
