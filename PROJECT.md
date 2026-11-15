# Project Specification: Agency Digital Presence Engine

## Overview
The **Agency Digital Presence Engine** is a high-performance operating system and client presence framework designed for agencies, software consultancies, and digital presence specialists. It automates client onboarding, visual motion production, SEO/GEO/AEO contextual indexing, and E2E brand compliance verification.

## Core Capabilities
- **Brand Token Synchronization:** Centralized token definition (`src/tokens/brand.json`) mapped dynamically to CSS variables (`src/styles/theme.css`).
- **Programmatic Motion Reels:** 1080x1920 60fps vertical reels authored in clean HTML/CSS and animated via GSAP for headless rendering with HyperFrames.
- **Answer Engine & Generative Optimization (GEO/AEO):** Native JSON-LD Schema.org `@graph`, machine-readable `llms.txt`, and crawler configuration for modern AI search engines (ChatGPT, Perplexity, Claude, Google AI Overviews).
- **Automated High-Conversion Copywriting:** RSA search headlines, Meta ad hooks, and authoritative technical articles tailored to each client's industry niche.
- **Zero-Dependency E2E Quality Gate:** 4-Tier verification harness built directly on Node.js native test runner (`node:test`).

## Directory Hierarchy
```
agency-digital-presence-template/
├── PROJECT.md                      # Project specification and operating model
├── README.md                       # Open-source documentation and quickstart
├── TEST_INFRA.md                   # 4-Tier test architecture and coverage matrix
├── client.config.json              # Active client configuration profile
├── presets/                        # Ready-to-use industry client presets
│   ├── advocacia.json
│   ├── clinica-odontologica.json
│   └── restaurante.json
├── docs/playbooks/                 # Universal agency standard operating procedures
│   ├── 01_skill_discovery_and_mgmt.md
│   ├── 02_strategy_and_audience.md
│   ├── 03_copywriting_and_creative.md
│   ├── 04_seo_geo_aeo_engine.md
│   ├── 05_visual_motion_production.md
│   └── 06_e2e_testing_and_qa.md
├── scripts/
│   └── setup-client.mjs            # Client onboarding generator & validator
├── src/
│   ├── tokens/brand.json           # Synchronized brand tokens
│   ├── styles/theme.css            # Dynamic CSS variables
│   ├── content/                    # Generated ad copy, voiceover, and articles
│   └── motion/                     # HyperFrames + GSAP motion template
├── public/                         # Public-facing SEO, AEO, and AI crawler assets
└── tests/e2e/                      # 4-Tier automated quality gate
```
