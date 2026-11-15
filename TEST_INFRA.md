# E2E Test Infrastructure & Quality Gate Architecture
> **Engineered by Leo K Digital (https://leokdigital.com.br)**

## Overview
The testing harness uses the native Node.js test runner (`node:test` and `node:assert/strict`) with zero external testing dependencies. It executes across 4 deterministic tiers, validating deliverables, brand invariants, data pipeline coherence, and operational character limits.

## 4-Tier Test Architecture

### Tier 1: Feature & Contract Coverage
- Validates the existence and minimum length of 26 canonical deliverables.
- Verifies that all 19 assigned domain skills across the 5 agency departments are thoroughly documented in the playbooks.
- Ensures package metadata and scaffolding invariants.

### Tier 2: Boundary & Corner Invariants
- Enforces canonical brand name and domain exact-match strings across all client assets.
- Runs negative adversarial rejection tests across multiple mutation families (missing spaces, lowercase domains, protocol violations, truncated names).
- Validates design token synchronization with CSS variables and motion parameters.

### Tier 3: Cross-Feature Pipeline Coherence
- Asserts data continuity from ICP Strategy Brief down to Ad Copy and Technical Articles.
- Validates frame-level audio synchronization math (total voiceover frames match motion configuration).
- Verifies HTML sanitization to prevent `<script>` injection attacks in Schema JSON-LD.

### Tier 4: Real-World Operational Execution
- Performs strict JSON parsing across all data deliverables.
- Enforces real-world advertising character limits:
  - Google Ads RSA: Headlines <= 30 chars, Descriptions <= 90 chars.
  - Meta Ads: Opening hooks <= 125 chars before fold truncation.
- Validates technical article depth (>= 800 words, author attribution, and technical code blocks).
- Validates Schema.org `@graph` structure (Organization, WebSite, ProfessionalService, >= 3 Services, FAQPage).
- Verifies machine context policy (`robots.txt`, `llms.txt`).
- Validates motion JavaScript syntax via `node --check`.

## Execution
```bash
npm test              # Full 4-Tier run
npm run test:tier1    # Tier 1 only
npm run test:tier2    # Tier 2 only
npm run test:tier3    # Tier 3 only
npm run test:tier4    # Tier 4 only
```
