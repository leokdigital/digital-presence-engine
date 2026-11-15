# Test Infrastructure & E2E Quality Gate

## Architecture Overview
A suíte de testes do **Agency Digital Presence Template & AI Team Engine** foi concebida e desenvolvida por **Leo K Digital** (https://leokdigital.com.br) exclusivamente sobre o test runner nativo do Node.js (`node:test` e `node:assert/strict`), sem dependências pesadas de frameworks externos (Jest, Mocha, Vitest).

Essa escolha garante tempos de execução sub-segundo (< 1s para 73 testes), zero vulnerabilidades em dependências transitivas e portabilidade completa entre sistemas operacionais (Windows, macOS, Linux).

---

## 4-Tier Test Architecture

```
[Tier 1: Feature & Contract Coverage] (34 testes)
  ├── 1.1 Presença de Entregáveis e Integridade (> 200 caracteres)
  ├── 1.2 Cobertura de Skills em Playbooks (19 skills mapeadas)
  └── 1.3 Configuração de Pacote e Scaffolding

[Tier 2: Boundary & Corner Invariants] (17 testes)
  ├── 2.1 Invariantes de Identidade e Marca Canônica
  ├── 2.2 Rejeição Adversarial de Mutações de Marca e Domínio
  ├── 2.3 Cores Hexadecimais e Tokens Dark Tech Premium
  ├── 2.4 Tipografia e Especificações Glassmorphic
  └── 2.5 Parâmetros de Motor de Motion (1080x1920 60fps) e Áudio

[Tier 3: Cross-Feature Pipeline Coherence] (8 testes)
  ├── 3.1 Continuidade de Dados: Estratégia ➔ Copywriting
  ├── 3.2 Sincronia de Frames de Locução (1800 frames / 30s @ 60fps)
  ├── 3.3 Alinhamento Estratégia / Copy ➔ SEO e Contexto Público
  ├── 3.4 Sincronização de Tokens de Design ➔ CSS Variables
  └── 3.5 Sanitização Estrita contra Injeção de Scripts HTML

[Tier 4: Real-World Operational Execution] (14 testes)
  ├── 4.1 Validação Estrita de JSON em Todos os Entregáveis
  ├── 4.2 Limites de Caracteres de Plataforma (Google RSA <= 30/90, Meta <= 125)
  ├── 4.3 Profundidade Técnica de Artigo (>= 800 palavras e código)
  ├── 4.4 Validação do Grafo Schema.org JSON-LD (@graph com 3+ Services)
  ├── 4.5 Políticas de Robôs e Contexto Estruturado para IAs (/llms.txt)
  └── 4.6 Verificação Sintática ECMAScript via node --check
```

---

## Execução

```bash
# Executar a suíte completa
npm test

# Executar por Tier específico
npm run test:tier1
npm run test:tier2
npm run test:tier3
npm run test:tier4
```

---
*Padrão de Qualidade e Conformidade E2E — Leo K Digital.*
