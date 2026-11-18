---
name: digital-presence-engine
description: Automated agency-grade digital presence engine by Leo K Digital. Generates dynamic brand tokens, vertical motion reels (GSAP/HyperFrames), cinematic landing pages (MotionSites recipes), native modern web performance (Google Chrome Modern Web Guidance), event-driven sound design (-14 LUFS), SEO/GEO/AEO schemas, Motion Vault reference intelligence (131 curated styles), and runs a 79-point E2E quality gate for any client or niche. Use when setting up, generating, or auditing a complete digital presence for a company.
---

# Digital Presence Engine

Created and maintained by **[Leo K Digital](https://leokdigital.com.br)**.

An automated, open-source engine for digital agencies, developers, and AI agents to scaffold, configure, and validate full multi-channel digital presence for any business in under 2 minutes.

---

## ⚡ When to Use This Skill

Activate this skill when you need to:
- Generate brand tokens (`brand.json`, `theme.css`) from any company profile, hex colors, and typography.
- Build award-level cinematic landing pages and hero sections using **MotionSites Web Builder** techniques (media shelf, liquid glass, depth carousels, text reveals, and look-and-fix visual verification).
- Enforce cutting-edge web performance and native browser standards using **Google Chrome Modern Web Guidance** (Popover API, Anchor Positioning, native `<dialog>`, View Transitions, and `scheduler.yield()` for 100/100 Core Web Vitals).
- Generate vertical high-converting motion reels (1080x1920 60fps) powered by GSAP and HyperFrames.
- Execute event-driven sound design (`events.json` + `sound-design-engine.mjs`) with precise SFX transient alignment, music ducking (-15 dB), and -14 LUFS broadcast mastering.
- Leverage the **Motion Vault Reference Intelligence** (`docs/references/motion_vault_catalog.md`) with 131 battle-tested motion references across 17 styles (UI-produto, SaaS, Dark Tech, Apple Claro, Narrado).
- Inspect videos frame-by-frame and generate mosaic contact sheets with `node scripts/inspect-reference.mjs <video>`.
- Generate Google Ads RSA, Meta Ads hooks, and voiceover scripts tailored to a business niche.
- Generate deep technical SEO and GEO/AEO machine context (`public/schema.json`, `llms.txt`, `robots.txt`).
- Validate complete brand compliance and asset integrity with a **79-point native Node.js E2E test suite** across 5 tiers.

---

## 🚀 How to Run

### 1. Using Built-in Niche Presets
You can instantly apply one of the battle-tested niche presets:

```bash
# Healthcare & Dental Clinics
npm run setup -- --preset=clinica-odontologica

# Law Firms & Legal Advisory
npm run setup -- --preset=advocacia

# Restaurants & Local Gastronomy
npm run setup -- --preset=restaurante
```

### 2. Custom Client Configuration
Edit `client.config.json` with the target business details:

```json
{
  "name": "Nome da Empresa",
  "legalName": "Razão Social Completa LTDA",
  "domain": "empresa.com.br",
  "niche": "Tecnologia / Saúde / Advocacia",
  "city": "São Paulo",
  "phone": "+55 11 99999-9999",
  "theme": {
    "primary": "#0A2540",
    "secondary": "#635BFF",
    "accent": "#00D4B6",
    "background": "#FFFFFF",
    "text": "#1A1F36"
  },
  "voice": {
    "name": "Adam",
    "tone": "confident, consultative and authoritative"
  },
  "services": [
    "Serviço 1",
    "Serviço 2",
    "Serviço 3"
  ]
}
```

Then compile the assets:
```bash
node scripts/setup-client.mjs
```

### 3. Sound Design & Audio Mixing Engine
Compile synchronized sound effects and master audio:
```bash
node scripts/sound-design-engine.mjs
```

### 4. Frame-by-Frame Video Inspection (Contact Sheet)
Inspect any reference video or rendered reel:
```bash
node scripts/inspect-reference.mjs artifacts/videos/meu_video.mp4 --grid=4x3
```

### 5. Run Quality Verification (79 E2E Tests)
Always run the 5-tier test suite to verify 100% compliance:

```bash
npm test
```

### 6. Modern Web Guidance & Core Web Vitals Audit
Scan codebase for obsolete JavaScript patterns and replace with native platform APIs:

```bash
npx -y modern-web-guidance@latest legacy-scan .
```

---

## 📦 Output Artifacts Generated

1. **Design Tokens**: `src/tokens/brand.json` & `src/styles/theme.css`
2. **Motion Video**: `src/motion/index.html` & `src/motion/main.js` (GSAP 60fps)
3. **Sound Design Map & Report**: `src/motion/events.json` & `artifacts/audio_mix_report.json`
4. **Advertising Copy**: `src/content/ads_google_rsa.json` & `src/content/ads_meta.json`
5. **Voiceover Script**: `src/content/voiceover_script.json`
6. **SEO & AEO Schemas**: `public/schema.json`, `public/llms.txt`, `public/robots.txt`
7. **Reference Intelligence**: `docs/references/motion_vault_catalog.md` (131 referências)
8. **Strategy Handoffs**: `artifacts/strategy_brief.json` & `artifacts/creative_package.json`
