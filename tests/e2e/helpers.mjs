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
  : (fs.existsSync(path.join(calculatedRoot, 'PROJECT.md'))
      ? calculatedRoot
      : (fs.existsSync('/Users/leo/teamwork_projects/leo_k_digital_team')
          ? '/Users/leo/teamwork_projects/leo_k_digital_team'
          : calculatedRoot));

/**
 * Resolves path relative to the project root, with fallback to local staged files.
 */
export function resolvePath(...subpaths) {
  const primaryPath = path.resolve(PROJECT_ROOT, ...subpaths);
  if (fs.existsSync(primaryPath)) return primaryPath;

  // Fallback to local staged directory (2 levels up from tests/e2e/) if present
  const localStagedPath = path.resolve(__dirname, '../../', ...subpaths);
  if (fs.existsSync(localStagedPath)) return localStagedPath;

  return primaryPath;
}

/**
 * Resolves artifact path handling both snake_case and kebab-case variants.
 * e.g. strategy_brief.json vs strategy-brief.json
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
 * Hardened forbidden brand and domain patterns for adversarial invariant testing.
 */
export const FORBIDDEN_BRAND_PATTERNS = [
  // 1. Any variation of "Leo K Digital" with spaces, dots, hyphens that is NOT exact "Leo K Digital"
  {
    pattern: /\bLeo[\s._-]+K[\s._-]+Digital\b/i,
    predicate: (match) => match !== 'Leo K Digital',
    reason: 'Found non-canonical brand casing, spacing or punctuation'
  },
  // 2. "LeoK Digital" (missing space between Leo and K)
  {
    pattern: /\bLeoK[\s._-]+Digital\b/i,
    reason: 'Found "LeoK Digital" (missing space between Leo and K)'
  },
  // 2b. "Leo KDigital" (missing delimiter between K and Digital)
  {
    pattern: /\bLeo[\s._-]+KDigital\b/i,
    reason: 'Found "Leo KDigital" (missing space between K and Digital)'
  },
  // 3. Continuous "LeoKDigital" (any casing) without domain extension .com.br
  {
    pattern: /\bLeoKDigital\b(?!\.com\.br)/i,
    reason: 'Found "LeoKDigital" or "leokdigital" brand text missing spaces'
  },
  // 4. Truncated "Leo K" or "LeoK" (with or without space/punctuation) not followed by "Digital"
  {
    pattern: /\bLeo[\s._-]*K\b(?![\s._-]*Digital)/i,
    reason: 'Found truncated "Leo K" without "Digital"'
  },
  // 5. Unauthorized abbreviation "LKD" (case-insensitive)
  {
    pattern: /\bLKD\b/i,
    reason: 'Found unauthorized abbreviation "LKD"'
  },
  // 6. Confusing founder with brand
  {
    pattern: /\bLeo\s+Kinoshita\s+Digital\b/i,
    reason: 'Found "Leo Kinoshita Digital" (confusing founder with brand)'
  }
];

export const FORBIDDEN_DOMAIN_PATTERNS = [
  // 1. Insecure HTTP protocol
  {
    pattern: /http:\/\/leokdigital\.com\.br/i,
    reason: 'Found insecure HTTP protocol instead of HTTPS'
  },
  // 2. Non-canonical www prefix
  {
    pattern: /www\.leokdigital\.com\.br/i,
    reason: 'Found "www.leokdigital.com.br" (prohibited non-canonical www prefix)'
  },
  // 3. Any leokdigital or leok-digital domain with invalid TLD
  {
    pattern: /\bleok[\-_]?digital\.(?!com\.br(?=[^a-z0-9._-]|\.(?![a-z0-9])|$))[a-z0-9.-]+\b/i,
    reason: 'Found unauthorized domain TLD, subdomain, or domain variant'
  },
  // 4. Phishing / subdomain suffix: leokdigital.com.br followed by more domain parts
  {
    pattern: /\bleokdigital\.com\.br(?=[._-][a-z0-9]|[a-z0-9])/i,
    reason: 'Found suspicious domain suffix or phishing domain extension'
  },
  // 5. Hyphenated domain
  {
    pattern: /leok-digital\.com\.br/i,
    reason: 'Found "leok-digital.com.br" (illegal hyphen in domain)'
  },
  // 6. Non-canonical domain casing (must be strictly lowercase "leokdigital.com.br")
  {
    pattern: /\b[a-zA-Z0-9.-]*leokdigital\.com\.br[a-zA-Z0-9.-]*\b/i,
    predicate: (match) => {
      const domainMatch = match.match(/leokdigital\.com\.br/i);
      return domainMatch && domainMatch[0] !== 'leokdigital.com.br';
    },
    reason: 'Found non-canonical domain casing (must be strictly lowercase "leokdigital.com.br")'
  }
];

/**
 * Adversarial scanner that asserts text contains NO forbidden brand or domain variants.
 * Uses global iteration (matchAll) across all patterns to ensure compound documents
 * containing canonical brand names followed by mutations are strictly detected.
 */
export function assertNoForbiddenVariants(text, contextName = 'Document') {
  const violations = [];

  for (const { pattern, predicate, reason } of FORBIDDEN_BRAND_PATTERNS) {
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

  for (const { pattern, predicate, reason } of FORBIDDEN_DOMAIN_PATTERNS) {
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
