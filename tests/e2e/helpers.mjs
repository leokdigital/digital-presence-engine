import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic root resolution: 2 levels up from tests/e2e/
const calculatedRoot = path.resolve(__dirname, '../../');
export const PROJECT_ROOT = process.env.PROJECT_ROOT
  ? path.resolve(process.env.PROJECT_ROOT)
  : calculatedRoot;

/**
 * Resolves path relative to the project root, with fallback to local staged files.
 */
export function resolvePath(...subpaths) {
  const primaryPath = path.resolve(PROJECT_ROOT, ...subpaths);
  if (fs.existsSync(primaryPath)) return primaryPath;

  const localStagedPath = path.resolve(__dirname, '../../', ...subpaths);
  if (fs.existsSync(localStagedPath)) return localStagedPath;

  return primaryPath;
}

/**
 * Resolves artifact path handling both snake_case and kebab-case variants.
 */
export function resolveArtifactPath(name) {
  const base = name.replace(/\.json$/, '');
  const snakePath = resolvePath('artifacts', `${base}.json`);
  const kebabPath = resolvePath('artifacts', `${base.replace(/_/g, '-')}.json`);

  if (fs.existsSync(snakePath)) return snakePath;
  if (fs.existsSync(kebabPath)) return kebabPath;
  return snakePath;
}

/**
 * Checks if a relative project path exists synchronously.
 */
export function fileExists(relativePath) {
  try {
    const primary = path.resolve(PROJECT_ROOT, relativePath);
    if (fs.existsSync(primary)) return true;
    const localStaged = path.resolve(__dirname, '../../', relativePath);
    return fs.existsSync(localStaged);
  } catch {
    return false;
  }
}

/**
 * Strips UTF-8 Byte Order Mark (BOM) if present.
 */
export function stripBom(content) {
  if (typeof content !== 'string') return content;
  return content.replace(/^\uFEFF/, '');
}

/**
 * Reads a project file synchronously as a UTF-8 string with BOM stripped.
 */
export function readProjectFile(relativePath) {
  const fullPath = resolvePath(relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File does not exist: ${relativePath} (resolved to ${fullPath})`);
  }
  const raw = fs.readFileSync(fullPath, 'utf8');
  return stripBom(raw);
}

/**
 * Reads and parses a JSON file synchronously.
 */
export function readJsonFile(relativePath) {
  const content = readProjectFile(relativePath);
  return JSON.parse(content);
}

/**
 * Determines whether the current module was directly executed from the CLI.
 */
export function isDirectCliRun(metaUrl) {
  if (!process.argv || !process.argv[1]) return false;
  const currentFilePath = fileURLToPath(metaUrl);
  return process.argv.some(arg => path.resolve(arg) === currentFilePath);
}

/**
 * Returns active brand configuration dynamically from tokens or client config.
 */
export function getActiveBrand() {
  if (fileExists('src/tokens/brand.json')) {
    const t = readJsonFile('src/tokens/brand.json');
    return {
      name: t.name || t.brandName || t.brand?.name || "Leo K Digital",
      domain: t.domain || t.brand?.domain || "leokdigital.com.br",
      founder: t.founder || t.brand?.founder || "Leonardo Kinoshita",
      slogan: t.slogan || t.brand?.slogan || "Sua presença no digital.",
      city: t.city || t.headquarters || "Curitiba",
      niche: t.niche || "Presença Digital"
    };
  }
  if (fileExists('client.config.json')) {
    const c = readJsonFile('client.config.json');
    return {
      name: c.clientName,
      domain: c.domain,
      founder: c.founder,
      slogan: c.slogan,
      city: c.city,
      niche: c.niche
    };
  }
  return {
    name: "Leo K Digital",
    domain: "leokdigital.com.br",
    founder: "Leonardo Kinoshita",
    slogan: "Sua presença no digital.",
    city: "Curitiba",
    niche: "Engenharia Web"
  };
}

/**
 * Generates forbidden brand and domain pattern rules dynamically for the active client.
 */
export function getForbiddenPatterns() {
  const brand = getActiveBrand();
  const escapedName = brand.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedDomain = brand.domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const brandPatterns = [
    // 1. Missing space between parts of brand name (e.g. "LeoKDigital" or "ClinicaSorriso")
    {
      pattern: new RegExp(brand.name.replace(/\s+/g, ''), 'i'),
      predicate: (match) => match !== brand.name,
      reason: `Found concatenated brand name without proper spaces`
    },
    // 2. Continuous brand name without spaces
    {
      pattern: new RegExp(`\\b${brand.name.replace(/\s+/g, '')}\\b(?!(?:\\.[a-z]{2,}))`, 'i'),
      reason: `Found continuous brand name without proper spacing`
    }
  ];

  const domainPatterns = [
    // 1. Insecure HTTP protocol
    {
      pattern: new RegExp(`http://${escapedDomain}`, 'i'),
      reason: `Found insecure HTTP protocol instead of HTTPS for ${brand.domain}`
    },
    // 2. Non-canonical www prefix if root is canonical
    {
      pattern: new RegExp(`www\\.${escapedDomain}`, 'i'),
      reason: `Found non-canonical www prefix for ${brand.domain}`
    },
    // 3. Subdomain / phishing suffix extension
    {
      pattern: new RegExp(`${escapedDomain}(?=[._-][a-z0-9]|[a-z0-9])`, 'i'),
      reason: `Found suspicious domain suffix or phishing domain extension for ${brand.domain}`
    },
    // 4. Non-canonical domain casing (must be strictly lowercase)
    {
      pattern: new RegExp(`\\b[a-zA-Z0-9.-]*${escapedDomain}[a-zA-Z0-9.-]*\\b`, 'i'),
      predicate: (match) => {
        const domainMatch = match.match(new RegExp(escapedDomain, 'i'));
        return domainMatch && domainMatch[0] !== brand.domain.toLowerCase();
      },
      reason: `Found non-canonical domain casing (must be strictly lowercase "${brand.domain}")`
    }
  ];

  return { brandPatterns, domainPatterns };
}

/**
 * Adversarial scanner that asserts text contains NO forbidden brand or domain variants.
 */
export function assertNoForbiddenVariants(text, contextName = 'Document') {
  const { brandPatterns, domainPatterns } = getForbiddenPatterns();
  const violations = [];

  for (const { pattern, predicate, reason } of brandPatterns) {
    const globalRegex = new RegExp(
      pattern.source,
      pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g'
    );
    for (const match of text.matchAll(globalRegex)) {
      if (!predicate || predicate(match[0])) {
        violations.push(`${reason}: matched "${match[0]}"`);
      }
    }
  }

  for (const { pattern, predicate, reason } of domainPatterns) {
    const globalRegex = new RegExp(
      pattern.source,
      pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g'
    );
    for (const match of text.matchAll(globalRegex)) {
      if (!predicate || predicate(match[0])) {
        violations.push(`${reason}: matched "${match[0]}"`);
      }
    }
  }

  if (violations.length > 0) {
    assert.fail(
      `Adversarial scanner found ${violations.length} forbidden variant violation(s) in [${contextName}]:\n- ` +
      violations.join('\n- ')
    );
  }
}
