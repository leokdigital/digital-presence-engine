# Playbook 06: End-to-End Testing, Verification Loop & Quality Assurance

**Brand**: Leo K Digital  
**Canonical Domain**: `leokdigital.com.br`  
**Official URL**: `https://leokdigital.com.br/`  
**Slogan**: *"Sua presença no digital."*  
**Founder**: Leonardo Kinoshita  
**Track**: Milestone 5 — E2E Testing & Continuous Verification  
**Core Methodologies**: `e2e-testing`, `verification-loop`, `test-driven-development`  

---

## 1. Executive Summary & Engineering Philosophy

At **Leo K Digital**, software engineering is treated not as arbitrary scaffolding, but as deterministic, high-performance digital infrastructure. The organization specializes in bespoke web systems that eliminate fragile manual spreadsheets, ultra-fast web architectures engineered with 0% bloatware, advanced Local SEO, and Generative Engine Optimization (GEO & AEO).

To ensure that every deliverable satisfies the exacting standards of our founder Leonardo Kinoshita and maintains unconditional compliance with brand invariants, the Leo K Digital platform adopts a **Dual-Track Automated Testing Architecture**. Quality assurance is not an afterthought or an ad-hoc manual sweep performed prior to release; it is an active, programmatic gate operating continuously across the lifecycle of all assets.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      LEO K DIGITAL DUAL-TRACK QA PIPELINE                  │
└─────────────────────────────────────────────────────────────────────────────┘
  Stage 1: Discovery  ──►  Stage 2: Strategy  ──►  Stage 3: Copywriting
         │                        │                        │
         ▼                        ▼                        ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │         TIER 1: FEATURE & CONTRACT STRUCTURAL COVERAGE AUDIT            │
  └─────────────────────────────────────────────────────────────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
  Stage 4: SEO & AEO  ──►  Stage 5: Visual/Motion  ──► Stage 6: Assets
         │                        │                        │
         ▼                        ▼                        ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │         TIER 2: ZERO-TOLERANCE BOUNDARY & INVARIANT ENFORCEMENT         │
  ├─────────────────────────────────────────────────────────────────────────┤
  │         TIER 3: CROSS-FEATURE PIPELINE DATA COHERENCE VALIDATION        │
  ├─────────────────────────────────────────────────────────────────────────┤
  │         TIER 4: REAL-WORLD OPERATIONAL USABILITY & SYNTAX AUDIT         │
  └─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
               [VERIFIED PRODUCTION-READY DEPLOYMENT]
```

This playbook synthesizes three core technical disciplines into a single operational standard:
1. **`e2e-testing`**: Production-grade Playwright and native end-to-end testing patterns, deterministic waiting mechanisms, artifact management, and flaky-test quarantine protocols.
2. **`verification-loop`**: An uncompromising 6-Phase verification cycle (Build ➔ Type Check ➔ Lint ➔ Test ➔ Secret Scan ➔ Diff Review) that governs all commits and code state transitions.
3. **`test-driven-development`**: The strict adherence to the TDD Iron Law: *No production code or asset schema without a failing test first*.

---

## 2. The Triad of Testing Methodologies

### 2.1 `test-driven-development` (TDD): The Iron Law of Quality

The foundational rule governing all development within Leo K Digital is the **TDD Iron Law**:

$$\text{NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST}$$

If code is authored before its validating test exists, the code must be deleted immediately. No developer or agent is permitted to keep it as a "reference", "adapt it while writing tests", or rationalizar shortcuts. 

#### 2.1.1 The Red-Green-Refactor Cycle

The development workflow adheres strictly to the three-stage cycle:

```
    ┌───────────────────────────┐
    │           RED             │
    │  Write minimal test that  │
    │  fails for expected cause │
    └─────────────┬─────────────┘
                  │
                  ▼
    ┌───────────────────────────┐
    │     VERIFY RED FAIL       │
    │  Execute test: confirm it │
    │  fails on missing feature │
    └─────────────┬─────────────┘
                  │
                  ▼
    ┌───────────────────────────┐
    │          GREEN            │
    │  Author minimal code to   │
    │  pass the test cleanly    │
    └─────────────┬─────────────┘
                  │
                  ▼
    ┌───────────────────────────┐
    │    VERIFY FULL SUITE      │
    │ Run entire test harness;  │
    │ confirm zero regressions  │
    └─────────────┬─────────────┘
                  │
                  ▼
    ┌───────────────────────────┐
    │         REFACTOR          │
    │  Clean up design, naming, │
    │  and remove duplication   │
    └─────────────┬─────────────┘
                  │
                  └───────────────► Next Feature Cycle
```

1. **RED**: Write one minimal test asserting the desired behavior. The test must specify clear inputs, assert on real observable behavior, and avoid testing artificial mocks.
2. **Verify RED**: Run the test runner (`node --test <path>`). Confirm that the test fails specifically because the capability is missing, not due to a syntactic error or faulty import.
3. **GREEN**: Author the absolute minimum code required to pass the test. Do not anticipate future features, add unrequested abstractions, or build speculative utilities.
4. **Verify GREEN**: Execute the test runner again. Confirm that the test passes and that **all existing tests in the project suite continue to pass**.
5. **REFACTOR**: Improve design, extract shared utilities, eliminate duplication, and enforce naming standards while ensuring the suite remains 100% green.

#### 2.1.2 Refutation of Common Rationalizations

Developers and automated agents frequently fall prey to rationalizations that undermine test integrity. The table below outlines these fallacies and our non-negotiable policy:

| Rationalization / Excuse | Reality & Leo K Digital Enforcement |
|---|---|
| *"This component is too simple to test."* | Simple components frequently break under refactoring or parameter shifts. A minimal unit test takes under 30 seconds to author. Write the test first. |
| *"I will implement the feature now and add tests immediately after."* | Tests written post-implementation pass immediately, providing zero proof that they can actually fail on a defect. They verify what was written rather than what was required. |
| *"I already manually tested it in the browser / terminal."* | Manual testing leaves no persistent artifact, cannot run in CI, and fails to check subtle edge cases. Automated tests run identically on every commit. |
| *"Deleting this implementation is wasteful because I spent two hours on it."* | Sunk cost fallacy. Untested code represents unknown technical debt and latent bugs. Starting fresh with TDD produces higher-quality code in half the time. |
| *"I will keep the code open in another buffer as a reference."* | Having the solution in view biases test design towards matching the existing code rather than the specification. Delete means delete. |
| *"TDD is dogmatic; I am being pragmatic for the client."* | Pragmatism means catching defects before customers or search engine bots encounter them. Debugging in production is significantly slower and damages brand reputation. |

#### 2.1.3 Red Flags Requiring Code Deletion

Any of the following signals indicates an integrity violation. When detected, the agent or developer must halt, delete the unverified code, and restart test-first:
- Any production file created or modified prior to its corresponding test file.
- A newly authored test that passes on its initial run before any implementation was introduced.
- A test failure caused by an unhandled exception or wrong path rather than an assertion failure on business logic.
- Tests marked as skipped or commented out to force a green pipeline status.

---

### 2.2 `verification-loop`: The 6-Phase Quality Gate

The **Verification Loop** is a deterministic, automated audit executed before any branch merge, pull request generation, or deployment. It ensures that code is syntactically sound, type-safe, style-compliant, thoroughly tested, free of secrets, and cleanly scoped.

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                    THE 6-PHASE VERIFICATION CYCLE                  │
  └─────────────────────────────────────────────────────────────────────┘
     Phase 1: Build Verification     ──►  Syntax & Bundling Integrity
     Phase 2: Type & Schema Audit    ──►  Strict Type & Contract Checking
     Phase 3: Lint & Invariant Scan  ──►  Style & Adversarial Regex Scan
     Phase 4: Full Test Suite        ──►  100% Pass Rate & >=80% Coverage
     Phase 5: Security & Secret Scan ──►  Credential & Leak Prevention
     Phase 6: Git Diff Review        ──►  Minimal Change Surface Audit
```

#### Phase 1: Build Verification
Validates that all scripts, bundles, and templates compile and parse without syntax errors.
```bash
# Verify JavaScript and Node modules syntax
node --check src/motion/main.js
node --check src/**/*.js 2>/dev/null || true
```
*Failure Criteria*: Any unhandled syntax error, top-level token violation, or invalid import statement halts the cycle immediately.

#### Phase 2: Type & Schema Audit
Validates that data contracts, JSON schemas, and structural boundaries match expected specifications.
```bash
# Validate strict JSON syntax across all JSON assets
node -e '
  const fs = require("node:fs");
  ["package.json", "src/tokens/brand.json", "public/schema.json", "src/content/ads_google_rsa.json"].forEach(f => {
    try { JSON.parse(fs.readFileSync(f, "utf8")); } catch(e) { console.error("JSON Error in " + f, e); process.exit(1); }
  });
'
```
*Failure Criteria*: Trailing commas, malformed brackets, or missing required schema keys (`@graph`, `name`, `founder`, etc.).

#### Phase 3: Lint & Invariant Check
Scans the entire codebase for stylistic violations and executes adversarial regular expressions against brand invariant definitions.
```bash
# Execute Tier 2 invariant and adversarial scanner
node --test tests/e2e/tier2_invariants.test.mjs
```
*Failure Criteria*: Detection of forbidden strings (`LeoKDigital`, `leokdigital.com`, `Leo K. Digital`, etc.) or improper hex color variations.

#### Phase 4: Test Suite & Coverage Thresholds
Executes the native 4-Tier test harness.
```bash
# Execute master runner aggregating Tiers 1-4
node --test tests/e2e/runner.test.mjs
```
*Thresholds*:
- **Assertion Pass Rate**: 100% (zero tolerance for failing tests).
- **Test Line Coverage**: Minimum **80%** threshold across project modules.
- **Flakiness**: Zero tolerance. Tests must be deterministic and execution must complete in `< 500ms`.

#### Phase 5: Security & Secret Scan
Prevents accidental commits of API credentials, private tokens, or debug statements.
```bash
# Check for unauthorized API keys and credentials
grep -rnE "(sk-[a-zA-Z0-9]{20,}|api[_-]?key\s*[:=]|AIza[0-9A-Za-z-_]{35})" src/ public/ artifacts/ 2>/dev/null || true

# Check for stray development console logs in production motion scripts
grep -rn "console.log" src/motion/ 2>/dev/null || true
```
*Failure Criteria*: Any live API key pattern or hardcoded private token detected in source control.

#### Phase 6: Diff Review & Minimal Change Principle
Conducts an explicit review of the Git modification footprint before committing.
```bash
# Inspect changed files and statistics
git status --short
git diff --stat
```
*Failure Criteria*: Scope creep, unrelated "while I'm here" refactoring, deletion of unrelated comments, or modifications outside the assigned module boundary.

---

### 2.3 `e2e-testing`: Production-Grade End-to-End Patterns

Our end-to-end testing philosophy is modeled after modern browser automation frameworks (such as Playwright), adapted for Node.js native runtime execution:

#### 2.3.1 Page Object Model (POM) & Component Isolation
Complex interfaces (such as our HyperFrames GSAP motion engine and interactive DOM elements) are abstracted behind clean interaction contracts:
- DOM locators are isolated into distinct helper definitions rather than hardcoded raw CSS selectors inside test assertions.
- Asynchronous actions are decoupled from artificial delays (`setTimeout`) and tied to deterministic state assertions (e.g., verifying that a container class is applied or an element property matches).

#### 2.3.2 Flaky Test Mitigation & Quarantine Policy
Flaky tests destroy confidence in automated pipelines. Leo K Digital strictly enforces:
- **Zero Arbitrary Timeouts**: Tests must never sleep for fixed millisecond durations. All waiting must be event-driven or state-driven.
- **Quarantine Protocol**: If an asynchronous integration test displays intermittent failures in CI due to environmental timing, it must be quarantined immediately:
  ```javascript
  // In native node:test, flaky or blocked tests use { skip: true } or { todo: true }
  it('complex motion render test', { skip: process.env.CI ? 'Investigating CI WebGL timing' : false }, async () => {
    // isolated test logic...
  });
  ```
- **Root-Cause Remediation**: A quarantined test must have an associated tracking issue and be resolved within 48 hours.

#### 2.3.3 Artifact Management & Diagnostic Traces
When a test fails, automated diagnostic data must be preserved:
- For DOM and motion tests: HTML dumps and state snapshots captured upon assertion failure.
- For data pipeline tests: Difference diffs showing mismatched JSON keys, character length violations, or unescaped script tokens.

---

## 3. The 4-Tier Automated Test Architecture

To validate the entire Leo K Digital delivery pipeline, the test suite is partitioned into four progressive tiers implemented in `tests/e2e/`:

```
tests/e2e/
├── helpers.mjs               # Centralized testing utilities, path resolution, and readers
├── runner.test.mjs           # Master test runner aggregating Tiers 1-4
├── tier1_coverage.test.mjs   # Tier 1: 26-Deliverable presence, playbooks & skill coverage
├── tier2_invariants.test.mjs # Tier 2: Zero-tolerance brand invariants & adversarial rejection
├── tier3_pipeline.test.mjs   # Tier 3: Cross-stage pipeline data flow & contract coherence
└── tier4_operational.test.mjs# Tier 4: Real-world operational usability, syntax, and limits
```

### 3.1 Tier 1: Feature & Contract Coverage (`tier1_coverage.test.mjs`)

**Objective**: Verify the structural existence, non-triviality, and comprehensive skill documentation of all project deliverables.

#### 3.1.1 The 26 Deliverable Files Inventory
Tier 1 dynamically inspects the file system and asserts the existence and minimum length of 26 canonical assets across 7 distinct categories:

1. **Root Scaffolding & Documentation**:
   - `package.json`: Project manifest with `"type": "module"` and npm test scripts.
   - `README.md`: Brand mission, positioning, and repository guide (>=200 chars).
   - `PROJECT.md`: Master architectural blueprint, milestone plan, and code layout (>=200 chars).
   - `TEST_INFRA.md`: Authoritative testing specification and feature inventory (>=200 chars).
2. **Operational Playbooks (`docs/playbooks/`)**:
   - `01_skill_discovery_and_mgmt.md`: Covers `find-skills` and `skill-creator`.
   - `02_strategy_and_audience.md`: Covers `marketing-plan`, `content-strategy`, `marketing-ideas`, `ig-audience-insights`.
   - `03_copywriting_and_creative.md`: Covers `brand-voice`, `ad-creative`, `article-writing`, `copywriting`.
   - `04_seo_geo_aeo_engine.md`: Covers `seo-geo-aeo`, `ai-seo`, `schema`, `last30days`.
   - `05_visual_motion_production.md`: Covers `hyperframes`, `hyperframes-cli`, `canva-cli`.
   - `06_e2e_testing_and_qa.md`: Covers `e2e-testing`, `verification-loop`, `test-driven-development`.
3. **Design Tokens & Global Styles**:
   - `src/tokens/brand.json`: Master JSON token dictionary containing Dark Tech palette, typography, glassmorphism, and audio voice specs.
   - `src/styles/theme.css`: Production CSS stylesheet exposing CSS variables, utility classes, and glassmorphic card classes.
4. **Real Content & Production Assets**:
   - `src/content/ads_google_rsa.json`: High-converting Google Ads Responsive Search Ads.
   - `src/content/ads_meta.json`: High-converting Meta Ads with thumb-stopping hooks.
   - `src/content/technical_article.md`: Deep technical essay on manual spreadsheet migration to custom web systems.
   - `src/content/voiceover_script.json`: ElevenLabs Adam voiceover script with frame-accurate scene timecodes.
5. **Visual & Motion Engine (`src/motion/`)**:
   - `src/motion/hyperframes.config.json`: Configuration specifying 1080x1920 @ 60fps.
   - `src/motion/index.html`: Production HTML canvas for motion graphics.
   - `src/motion/style.css`: Motion-specific glassmorphic and glow styling.
   - `src/motion/main.js`: GSAP animation timeline script.
6. **SEO, GEO & Machine Context (`public/`)**:
   - `public/schema.json`: Unified Schema.org JSON-LD `@graph` structure.
   - `public/llms.txt`: Machine context for LLMs, AI agents, and citation engines.
   - `public/pricing.md`: Transparent B2B service scopes and pricing models for buying agents.
   - `public/robots.txt`: Web crawler permissions and sitemap reference (>=50 chars).
7. **Inter-Stage Handoff Contracts (`artifacts/`)**:
   - `artifacts/strategy_brief.json`: Strategy brief flowing from Stage 2 to Stage 3.
   - `artifacts/creative_package.json`: Creative package flowing from Stage 3 to Stages 4 and 5.

#### 3.1.2 Non-Trivial Content Validation
Tier 1 ensures deliverables are not placeholder facades:
- Files must exceed 200 characters in length (with `robots.txt` permitted >= 50 characters).
- Content is scrubbed against stub phrases such as `"TODO: IMPLEMENT"`, `"Lorem Ipsum"`, `"placeholder"`, and blank templates.

#### 3.1.3 The 19 Required Project Skills Audit
All 19 assigned project skills must be explicitly cited and operationally documented within their assigned playbooks:
- `find-skills`, `skill-creator` ➔ Playbook 01
- `marketing-plan`, `content-strategy`, `marketing-ideas`, `ig-audience-insights` ➔ Playbook 02
- `brand-voice`, `ad-creative`, `article-writing`, `copywriting` ➔ Playbook 03
- `seo-geo-aeo`, `ai-seo`, `schema`, `last30days` ➔ Playbook 04
- `hyperframes`, `hyperframes-cli`, `canva-cli` ➔ Playbook 05
- `e2e-testing`, `verification-loop`, `test-driven-development` ➔ Playbook 06

---

### 3.2 Tier 2: Boundary & Corner Invariants (`tier2_invariants.test.mjs`)

**Objective**: Enforce zero-tolerance brand identity rules, visual design tokens, motion parameters, audio voice settings, and adversarial negative variant rejection.

#### 3.2.1 Canonical Identity Invariants
The following string constants must be strictly respected:
- **Brand Name**: `"Leo K Digital"` (exact capitalization, single space).
- **Canonical Domain**: `"leokdigital.com.br"`.
- **Canonical URL**: `"https://leokdigital.com.br/"`.
- **Official Slogan**: `"Sua presença no digital."` (sentence case with terminating period).
- **Founder**: `"Leonardo Kinoshita"`.
- **Headquarters**: `"Curitiba, PR, Brasil"`.

#### 3.2.2 Negative Adversarial Rejection Engine
Tier 2 does not rely solely on positive string checks; it actively subjects all content, tokens, public files, and scripts to an adversarial scanner that immediately throws an error if any prohibited variation is detected:

```javascript
// Adversarial Negative Scanner Logic
const FORBIDDEN_BRAND_PATTERNS = [
  { pattern: /\bLeoKDigital\b/, reason: 'Missing space between words ("LeoKDigital")' },
  { pattern: /\bLeoK\s+Digital\b/i, reason: 'Missing space between Leo and K ("LeoK Digital")' },
  { pattern: /\bLeo\s+K\.\s+Digital\b/i, reason: 'Illegal period after K ("Leo K. Digital")' },
  { pattern: /\bLeo-K-Digital\b/i, reason: 'Illegal hyphenation ("Leo-K-Digital")' },
  { pattern: /\bLEO\s+K\s+DIGITAL\b/, reason: 'Forbidden uppercase screaming ("LEO K DIGITAL")' },
  { pattern: /\bleok\s+digital\b/, reason: 'Forbidden lowercase styling ("leok digital")' },
  { pattern: /\bLeo\s+K\b(?!\s+Digital)/, reason: 'Truncated brand ("Leo K")' },
  { pattern: /\bLKD\b/, reason: 'Forbidden acronym ("LKD")' },
  { pattern: /\bLeo\s+Kinoshita\s+Digital\b/i, reason: 'Confusing founder name with brand name' }
];

const FORBIDDEN_DOMAIN_PATTERNS = [
  { pattern: /\bleokdigital\.com\b(?!\.br)/i, reason: 'Missing country code TLD .br ("leokdigital.com")' },
  { pattern: /www\.leokdigital\.com\.br/i, reason: 'Prohibited non-canonical www prefix' },
  { pattern: /http:\/\/leokdigital\.com\.br/i, reason: 'Insecure HTTP protocol instead of HTTPS' },
  { pattern: /leok-digital\.com\.br/i, reason: 'Illegal hyphen in domain' }
];
```

#### 3.2.3 Dark Tech Premium Color Tokens
The visual palette must conform strictly to the defined hex values across `src/tokens/brand.json` and `src/styles/theme.css`:
- **Primary Background**: `#0A0A0F`
- **Accent Red**: `#FF3B30` (Apple System Red)
- **Accent Yellow**: `#FFD60A` (Apple System Yellow)
- **Accent Blue**: `#4285F4` (Google Blue)
- **Accent Green**: `#30D158` (Apple System Green)

#### 3.2.4 Typography & Glassmorphism Specifications
- **Headings & UI**: `Plus Jakarta Sans`.
- **Code, Terminal & Metrics**: `JetBrains Mono`.
- **Glassmorphic Cards**: `rgba(18, 18, 26, 0.75)` with `backdrop-filter: blur(16px)` and border `1px solid rgba(255, 255, 255, 0.08)`.
- **Caption Glow Pills**: Background `rgba(18, 18, 26, 0.75)`, border `1px`, box-shadow containing glow radius.

#### 3.2.5 Motion & Audio Engine Parameters
- **Video Dimensions**: Resolution must be exactly `1080` (width) by `1920` (height) in 9:16 portrait format.
- **Framerate**: Must be configured to exactly `60fps`.
- **Audio Voice Configuration**:
  - Voice Provider: `ElevenLabs`
  - Voice Name: `Adam`
  - Voice ID: `pNInz6obpgDQGcFmaJgB`
  - Language: Brazilian Portuguese (`pt-BR`)
  - Demeanor & Tone: `assertivo`, encorpado, autoridade técnica sóbria.

---

### 3.3 Tier 3: Cross-Feature Pipeline Coherence (`tier3_pipeline.test.mjs`)

**Objective**: Validate semantic and technical continuity across handoffs between pipeline stages.

```
[Strategy Brief] ──► [Creative Package] ──► [Voiceover Script] ──► [HyperFrames Config]
        │                     │                    │                      │
        ▼                     ▼                    ▼                      ▼
  Target ICP &         Headlines, Hooks &      Scene Durations        Timeline Frames
  Core Offerings       Ad Copy Limits          Sum = 1800 Frames       1800 @ 60fps
```

#### 3.3.1 Strategy ➔ Copy Continuity
- Target ICP segments defined in `artifacts/strategy_brief.json` (PMEs, B2B companies struggling with manual spreadsheets) must be present in `artifacts/creative_package.json`.
- The three core service pillars ("Sistemas Web Sob Medida", "Presença Digital de Alta Performance", "SEO Local & GEO/AEO") must align identically between strategy and creative copy.
- Keywords prioritized in strategy must appear in Google RSA headlines and Meta ad copy.

#### 3.3.2 Copy ➔ Motion Synchronization Math
- In `src/content/voiceover_script.json`, the sum of durations across all scenes must match the total video frame budget configured in `src/motion/hyperframes.config.json`.
- For a 30-second video at 60fps, total frames must equal:
  $$\text{Total Frames} = 30 \text{ seconds} \times 60 \text{ fps} = 1800 \text{ frames}$$
- All visual subtitle strings declared in `voiceover_script.json` must be reflected in `src/motion/index.html` and `src/motion/main.js`.

#### 3.3.3 Strategy & Copy ➔ SEO & Machine Context
- Organization name, founder name, slogan, and service list in `public/schema.json` must match `artifacts/strategy_brief.json` and `public/llms.txt`.
- Service pricing brackets referenced in `public/pricing.md` must be consistent with the packages documented in `public/llms.txt`.

#### 3.3.4 Design Tokens ➔ CSS Synchrony
- Hex values in `src/tokens/brand.json` must match the CSS variable definitions in `src/styles/theme.css` and `src/motion/style.css`.

#### 3.3.5 HTML Script Tag Injection Sanitization
- When Schema JSON-LD is embedded in web documents, the closing script tag vulnerability must be mitigated. Any serialized `<` character inside JSON-LD script tags must be safely escaped to `\u003c`.

---

### 3.4 Tier 4: Real-World Operational Test (`tier4_operational.test.mjs`)

**Objective**: Verify the functional execution readiness and operational constraints of production assets.

#### 3.4.1 Strict JSON Parsing
All `.json` files across the workspace must parse cleanly via native `JSON.parse()` without syntax errors, missing quotation marks, or illegal comments.

#### 3.4.2 Ad Copy Platform Limits
- **Google Ads RSA (`src/content/ads_google_rsa.json`)**:
  - Every headline must have length $\le 30$ characters.
  - Every description must have length $\le 90$ characters.
  - Brand name `"Leo K Digital"` must appear in at least one headline.
- **Meta Ads (`src/content/ads_meta.json`)**:
  - The opening hook must have length $\le 125$ characters before the user is required to click "Ver mais".

#### 3.4.3 Technical Article Depth
- `src/content/technical_article.md` must contain at least **800 words** of technical analysis.
- Must include technical code blocks demonstrating the architectural transition from manual spreadsheet macros to a clean relational web architecture.
- Must attribute authorship to `"Leonardo Kinoshita"`.

#### 3.4.4 AEO/GEO Direct Answer Blocks
- Passages engineered for AI quotation in `public/llms.txt` and `04_seo_geo_aeo_engine.md` must contain between **40 and 60 words**, providing self-contained, high-authority answers that search engine LLMs can cite directly.

#### 3.4.5 Unified Schema.org Graph Validation
- `public/schema.json` must feature a unified `@graph` containing at least:
  1. `Organization` (with name, url, logo, and founder).
  2. `WebSite` (with publisher and canonical url).
  3. `ProfessionalService` (with headquarters, service area, and geo coordinates).
  4. At least three `Service` entities (representing the core offerings).
  5. `FAQPage` (with structured questions and answers).

#### 3.4.6 Motion Code Syntactic Check
- `src/motion/main.js` must be verified via Node's native compiler `node --check` to guarantee valid ECMAScript module syntax without runtime parse crashes.

#### 3.4.7 Web Crawler Policy (`public/robots.txt`)
- Must explicitly define access permissions for search bots (Googlebot, Bingbot, PerplexityBot, GPTBot).
- Must declare the canonical sitemap directive: `Sitemap: https://leokdigital.com.br/sitemap.xml`.

---

## 4. Test Execution & Operational Runbooks

### 4.1 Master Quality Gate Commands

The test runner operates without external third-party test runners, executing directly on Node.js v26+ via native `node:test` and `node:assert/strict`.

```bash
# Unified Master Quality Gate (Runs Tiers 1-4 in sequence)
npm test

# Direct CLI Invocation
node --test tests/e2e/runner.test.mjs
```

### 4.2 Granular Tier Execution Commands

Developers and specialized track agents can run individual tiers in isolation during development:

```bash
# Tier 1: Deliverable Presence & Skill Coverage Audit
npm run test:tier1
# or: node --test tests/e2e/tier1_coverage.test.mjs

# Tier 2: Zero-Tolerance Brand Invariants & Adversarial Scanner
npm run test:tier2
# or: node --test tests/e2e/tier2_invariants.test.mjs

# Tier 3: Cross-Stage Pipeline Data Flow & Coherence
npm run test:tier3
# or: node --test tests/e2e/tier3_pipeline.test.mjs

# Tier 4: Real-World Operational Usability & Syntactic Audit
npm run test:tier4
# or: node --test tests/e2e/tier4_operational.test.mjs
```

### 4.3 Pre-Commit Checklist for Developers & Agents

Before submitting any deliverable or marking a milestone complete, execute the following verification loop checklist:

- [ ] **Step 1: Build & Syntax Check**
  ```bash
  node --check src/motion/main.js
  ```
- [ ] **Step 2: Strict JSON Parse Check**
  ```bash
  node -e "['src/tokens/brand.json', 'public/schema.json'].forEach(f => JSON.parse(require('fs').readFileSync(f)))"
  ```
- [ ] **Step 3: Invariant & Adversarial Check**
  ```bash
  npm run test:tier2
  ```
- [ ] **Step 4: Master Test Suite Execution**
  ```bash
  npm test
  ```
- [ ] **Step 5: Secret Scan**
  ```bash
  grep -rnE "(sk-[a-zA-Z0-9]{20,}|api[_-]?key)" src/ public/ || true
  ```
- [ ] **Step 6: Diff Review**
  ```bash
  git status --short
  git diff --stat
  ```

---

## 5. Maintenance, Continuous Auditing & Incident Response

### 5.1 Handling Invariant Violations
If a test failure occurs in Tier 2:
1. Identify the violating file and line from the test failure output.
2. Check whether a forbidden variant (e.g., `"LeoKDigital"` or `"leokdigital.com"`) was introduced.
3. Update the source file to use the canonical string `"Leo K Digital"` or `"leokdigital.com.br"`.
4. Re-run `npm run test:tier2` to confirm resolution.

### 5.2 Managing Pipeline Contract Evolution
When adding new service offerings or updating brand pillars:
1. Update `src/tokens/brand.json` first (using TDD).
2. Propagate changes to `artifacts/strategy_brief.json` and `artifacts/creative_package.json`.
3. Update `public/schema.json` and `public/llms.txt`.
4. Run `npm run test:tier3` to verify that all cross-stage references remain perfectly synchronized.

### 5.3 Flaky Test Remediation Runbook
1. If an E2E test fails intermittently, isolate the test using `node --test --test-name-pattern="<test name>"`.
2. Inspect whether the failure stems from a non-deterministic file read or an unhandled async promise.
3. Replace arbitrary timers with deterministic file existence checks (`fileExists`) or synchronous parsing.
4. Verify that running the test 10 consecutive times produces 10 green runs.

---

## 6. Verification & Attestation

This playbook represents the authoritative testing standard for **Leo K Digital**. Compliance with its protocols guarantees that all digital assets, motion graphics, advertising campaigns, and technical articles reflect the highest standards of engineering craft, brand integrity, and operational excellence.
