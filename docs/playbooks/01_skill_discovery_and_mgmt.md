# Playbook 01: Skill Discovery & Management

## Overview & Operational Purpose
Este playbook estabelece os procedimentos operacionais padrão da **Leo K Digital** (disponível em `https://leokdigital.com.br/`) para a descoberta, homologação, autoria, validação estatística e governança de ciclo de vida de **Skills** de agentes autônomos.

Nosso ecossistema opera sob o padrão **Dark Tech Premium** e engenharia de software de alta performance. Nenhuma skill de terceiros ou interna é aceita em produção sem atender rigorosamente aos gates de segurança, qualidade e conformidade de marca.

---

## 1. Stage 1: Descoberta e Homologação de Skills de Terceiros (`find-skills`)

### 1.1 Interface e Comandos da CLI (`skills.sh`)
A equipe de engenharia e os agentes utilizam a CLI oficial do ecossistema de skills (`npx skills`):
```bash
# Busca de skills por palavras-chave ou escopo de proprietário
npx skills find [query] [--owner <github_owner>]

# Exemplo: busca por otimização técnica de performance
npx skills find "web performance" --owner vercel-labs

# Instalação global e sem prompts interativos (após aprovação no Gate)
npx skills add <owner/repo@skill> -g -y

# Atualização de todas as skills instaladas
npx skills update

# Inicialização de scaffold para criação de nova skill
npx skills init <skill-name>
```

### 1.2 Padrões Estratégicos de Query de Busca
Evite buscas genéricas. Utilize termos contextualizados e termos próximos (near-misses):
- **Web Development / Front-end:** `react performance`, `nextjs architecture`, `tailwind design-system`.
- **Motion & Visual:** `gsap animation`, `canvas render`, `hyperframes motion`.
- **SEO & Inteligência Artificial:** `schema json-ld`, `aeo answer engine`, `ai search visibility`.
- **QA & Validação:** `playwright e2e`, `verification loop`, `test driven development`.

### 1.3 Gate Obrigatório de Homologação (Critérios de Qualidade e Segurança)
Qualquer skill externa deve superar obrigatoriamente quatro filtros antes de ser integrada ao repositório ou ambiente da Leo K Digital:

1. **Volume Mínimo de Instalações (Gate 1.000+ Instalações):**
   - **>= 1.000 instalações:** Homologação permitida mediante auditoria de código.
   - **100 a 999 instalações:** Quarentena. Requer aprovação expressa do Tech Lead (Leonardo Kinoshita).
   - **< 100 instalações:** Rejeição automática (risco de instabilidade e vulnerabilidades).
2. **Reputação da Fonte (GitHub Stars & Owners Confiáveis):**
   - Fontes oficiais verificadas: `anthropics`, `vercel-labs`, `microsoft`, `ComposioHQ`, `mattpocock-skills`.
   - O repositório original deve possuir no mínimo **100 GitHub Stars**.
3. **Auditoria de Código e Princípio de "Falta de Surpresa" (Lack of Surprise):**
   - A skill não pode conter scripts ofuscados, chamadas de rede não autorizadas, comandos destrutivos (`rm -rf`, `reset --hard`) ou coleta de variáveis de ambiente sensíveis (`sk-`, `API_KEY`).
   - Inspeção obrigatória do arquivo `SKILL.md`, do frontmatter YAML e de todos os arquivos em `scripts/` e `references/`.
4. **Alinhamento com a Marca Leo K Digital:**
   - Habilidade de respeitar as diretrizes de código, layout e regras de invariantes de strings (`Leo K Digital` e `leokdigital.com.br`).

---

## 2. Stage 2: Autoria, Criação e Benchmarking (`skill-creator`)

### 2.1 Princípio de Divulgação Progressiva (Progressive Disclosure)
Para manter o consumo de contexto enxuto e evitar saturação de tokens, as skills internas da Leo K Digital devem seguir a arquitetura de 3 níveis:

```
[Level 1: Metadata Frontmatter]  --> Sempre presente no contexto (~100 palavras)
           │
           ▼
[Level 2: SKILL.md Body]         --> Carregado apenas quando a skill é ativada (<500 linhas)
           │
           ▼
[Level 3: Bundled Resources]     --> Executado ou lido sob demanda (unlimited)
    ├── scripts/                 (código executável determinístico)
    ├── references/              (guias profundos >100 linhas com índice TOC)
    └── assets/                  (templates, fontes, imagens, dados brutos)
```

### 2.2 Validação Estrita do Frontmatter (`quick_validate.py`)
Todo arquivo `SKILL.md` gerado deve passar na validação programática:
- **`name`:** String em kebab-case (`^[a-z0-9-]+$`), sem hifens duplos ou nas bordas, máximo 64 caracteres.
- **`description`:** String detalhada indicando claramente O QUE faz e QUANDO ativar. Máximo 1024 caracteres. **Proibido o uso de `<` ou `>`.**
- **Propriedades permitidas:** Apenas `name`, `description`, `license`, `allowed-tools`, `metadata`, `compatibility`.
- **`compatibility`:** Máximo 500 caracteres (opcional).

### 2.3 Suíte de Avaliação (`evals/evals.json`)
Antes de finalizar qualquer skill, desenvolva pelo menos 3 casos de teste objetivos:
```json
{
  "skill_name": "leo-k-digital-asset-builder",
  "evals": [
    {
      "id": 1,
      "prompt": "Gere um briefing técnico para migração de sistema ERP de PME com as diretrizes da Leo K Digital.",
      "expected_output": "Briefing estruturado contendo a marca exata Leo K Digital e link leokdigital.com.br",
      "files": [],
      "expectations": [
        "O texto inclui a string exata 'Leo K Digital'",
        "O texto inclui o domínio oficial 'leokdigital.com.br'",
        "O plano contempla redução de retrabalho manual com arquitetura própria sem bloatware"
      ]
    }
  ]
}
```

### 2.4 Harness de Benchmarking e Execução Comparativa
A avaliação é empírica e segue o padrão TDD:
1. **Execução Concorrente:** Disparar no mesmo turno a execução com a skill (`with_skill`) e a linha de base (`without_skill` para novas skills, ou `old_skill` para revisões).
2. **Coleta Imediata de Telemetria (`timing.json`):** Capturar `total_tokens` e `duration_ms` imediatamente no callback de término da sub-tarefa.
3. **Métricas de Execução (`metrics.json`):** Registrar contagem de chamadas de ferramentas (`tool_calls`), passos executados e possíveis erros.
4. **Avaliação Automatizada (`agents/grader.md`):** O Grader avalia cada expectativa gerando `grading.json`:
   ```json
   {
     "expectations": [
       {
         "text": "O texto inclui a string exata 'Leo K Digital'",
         "passed": true,
         "evidence": "Encontrado no cabeçalho: 'Solução sob medida desenvolvida por Leo K Digital'"
       }
     ],
     "summary": { "passed": 1, "failed": 0, "total": 1, "pass_rate": 1.0 }
   }
   ```
5. **Agregação Estatística (`scripts/aggregate_benchmark.py`):**
   Calcula média (`mean`), desvio padrão (`stddev`), valores mínimo e máximo para taxa de acerto (`pass_rate`), tempo de resposta e consumo de tokens, gerando o relatório `benchmark.json` e `benchmark.md`.
6. **Análise Pós-Hoc (`agents/analyzer.md`):** Identifica se houve asserções não-discriminatórias (que passam com e sem a skill) ou instabilidades com alta variância.

### 2.5 Interface de Revisão Visual (`eval-viewer`)
Os resultados de cada iteração são avaliados humanamente:
- **Modo Servidor Interativo:**
  ```bash
  python -m eval-viewer.generate_review <workspace>/iteration-1 \
    --skill-name "leo-k-digital-skill" \
    --benchmark <workspace>/iteration-1/benchmark.json
  ```
- **Modo Headless / CI (Static HTML):**
  ```bash
  python -m eval-viewer.generate_review <workspace>/iteration-1 \
    --skill-name "leo-k-digital-skill" \
    --benchmark <workspace>/iteration-1/benchmark.json \
    --static artifacts/eval_review_iter1.html
  ```
  O revisor inspeciona as abas **Outputs** e **Benchmark** e submete o feedback, gravado em `feedback.json`.

### 2.6 Otimizador de Descrição de Disparo (`run_loop.py`)
Para evitar que o modelo sofra de "undertriggering" ou dispare a skill indevidamente:
1. Formule 20 consultas realistas: 8 a 10 positivas (deve ativar) e 8 a 10 negativas com termos próximos (não deve ativar).
2. Execute o loop de otimização com split estratificado de 60% treino / 40% teste por até 5 iterações:
   ```bash
   python -m scripts.run_loop \
     --eval-set evals/trigger_evals.json \
     --skill-path skills/leo-k-digital-asset-builder \
     --max-iterations 5 \
     --holdout 0.4
   ```
3. A melhor descrição é selecionada com base no conjunto de teste para evitar overfitting.

### 2.7 Empacotamento para Distribuição (`package_skill.py`)
Gera o pacote `.skill` limpo:
```bash
python -m scripts.package_skill skills/leo-k-digital-asset-builder ./dist
```
O script valida o frontmatter e exclui automaticamente `__pycache__`, `node_modules`, `*.pyc`, `.DS_Store` e diretórios `evals/` da raiz.

---

## 3. Stage 3: Governança do Ciclo de Vida na Leo K Digital

### 3.1 Quality Gate Automatizado (`verification-loop`)
Antes de qualquer submissão ou merge de skill no repositório, o pipeline executa o ciclo de 6 fases:
1. **Fase 1 (Build):** Validação de empacotamento e integridade dos arquivos.
2. **Fase 2 (Type Check):** Checagem de tipagem caso scripts TypeScript ou Python estejam inclusos (`tsc --noEmit` ou `pyright`).
3. **Fase 3 (Lint Check):** Validação de formatação Markdown e scripts (`eslint` / `ruff`).
4. **Fase 4 (Test Suite):** Execução da suíte de testes de invariantes de marca e asserções com no mínimo 80% de cobertura.
5. **Fase 5 (Security Scan):** Varredura ativa contra vazamento de chaves ou chamadas de debug:
   ```bash
   grep -rn "sk-" skills/ 2>/dev/null
   grep -rn "api_key" skills/ 2>/dev/null
   grep -rn "console.log" skills/ 2>/dev/null
   ```
6. **Fase 6 (Diff Review & Target Acceptance):** Revisão de diff no Git para prevenir regressões e homologação de ambiente.

### 3.2 Política de Versionamento Semântico (SemVer)
O ciclo evolutivo é registrado no arquivo `history.json` de cada skill:
- **MAJOR (v1.0.0 -> v2.0.0):** Alteração incompatível na assinatura, contratos de entrada/saída ou remoção de recursos.
- **MINOR (v1.0.0 -> v1.1.0):** Adição de novos scripts auxiliares, novos guias de referência ou expansão de cobertura sem quebrar fluxos existentes.
- **PATCH (v1.0.0 -> v1.0.1):** Ajuste fino de prompts, correção de asserções, refinamento da descrição no frontmatter ou documentação.

### 3.3 Política de Depreciação e Desativação (Sunsetting)
Quando uma skill se torna obsoleta ou substituída:
1. **Aviso no Frontmatter:** A descrição da skill recebe o prefixo: `[DEPRECATED: Utilize a skill <nome-da-nova-skill> em substituição]`.
2. **Período de Transição:** Mantida por pelo menos 1 ciclo de entrega da Leo K Digital com log de alerta aos agentes.
3. **Arquivamento Seguro:** Migração da pasta para `archive/skills/<skill-name>/`, remoção das variáveis de ambiente e atualização de todos os playbooks dependentes.

---

## 4. Conformidade Rígida com Regras de Marca e Invariantes
Toda skill operada ou desenvolvida sob este playbook deve validar e propagar os identificadores canônicos da **Leo K Digital**:
- **Nome Oficial:** `"Leo K Digital"` (com L, K e D maiúsculos, espaço exato).
- **Domínio Oficial:** `"leokdigital.com.br"` (sempre com sufixo `.com.br` e minúsculo).
- **Fundador & Liderança Técnica:** Leonardo Kinoshita.
- **Posicionamento:** Engenharia de Software e Presença Digital de Alta Performance para PMEs e B2B.
- **Tema Visual:** Dark Tech Premium (`#0A0A0F`, `#FF3B30`, `#FFD60A`, `#4285F4`, `#30D158`).
