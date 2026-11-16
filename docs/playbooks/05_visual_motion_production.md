# Playbook 05: Produção Visual, Design Automatizado e Motion de Alta Retenção

**Brand**: Leo K Digital  
**Canonical Domain**: `leokdigital.com.br`  
**Official URL**: `https://leokdigital.com.br/`  
**Slogan**: *"Sua presença no digital."*  
**Founder**: Leonardo Kinoshita  
**Track**: Milestone 4 — Visual & Motion Production Engine  
**Assigned Skills**: `hyperframes`, `hyperframes-cli`, `canva-cli`  
**Core Technologies**: GSAP 3.12+, Canva REST API / MCP, FFmpeg, HTML5 Canvas/DOM  

---

## 1. Overview & Propósito Operacional

O **Playbook 05** governa a arquitetura, as diretrizes de design automatizado e a esteira de renderização programática de ativos visuais e motion graphics da **Leo K Digital** (`https://leokdigital.com.br/`). 

No pipeline de 6 estágios do projeto, este playbook comanda o **Stage 5 (Visual & Motion Production Engine)**. Ele consome as diretrizes de posicionamento estratégico e audiência estabelecidas no Stage 2 (`artifacts/strategy_brief.json`), os criativos e roteiros de locução redigidos no Stage 3 (`artifacts/creative_package.json` e `src/content/voiceover_script.json`), e a infraestrutura de design tokens (`src/tokens/brand.json`). 

A missão do Stage 5 é operar uma via dupla de produção visual de altíssima fidelidade:
1. **Trilha Estática e Social Automatizada (Canva MCP & CLI)**: Auditoria contínua de kits de marca (`canva-brand-check`), geração massiva programática de carrosséis e anúncios a partir do pacote criativo (`canva-bulk-create`) e extração de assets transparentes de alta densidade (`canva-cli`).
2. **Trilha de Vídeo Motion Vertical (HyperFrames + GSAP 3.12+)**: Motor de animação web executado a 1080x1920 a 60 quadros por segundo (60fps), determinístico e indexável quadro a quadro, sincronizado com precisão cirúrgica à faixa de voz do narrador Adam da ElevenLabs em português do Brasil (`pNInz6obpgDQGcFmaJgB`).

```
┌────────────────────────────────────────────────────────────────────────┐
│                      PIPELINE: Leo K Digital                           │
│                                                                        │
│   [Stage 2: Estratégia & Audiência] (Playbook 02)                      │
│                 │  Consome: artifacts/strategy_brief.json              │
│                 ▼                                                      │
│   [Stage 3: Copywriting & Criativos] (Playbook 03)                     │
│                 │  Produz: src/content/voiceover_script.json           │
│                 │          artifacts/creative_package.json             │
│                 ▼                                                      │
│   [Stage 4: SEO, GEO & AEO Engine] (Playbook 04)                       │
│                 │  Produz: public/schema.json, llms.txt, pricing.md    │
│                 ▼                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ STAGE 5: VISUAL & MOTION ENGINE (Playbook 05)                    │  │
│  │ Skills: hyperframes | hyperframes-cli | canva-cli                │  │
│  │ Motores: GSAP 3.12+ | Canva REST API / MCP | FFmpeg headless    │  │
│  │ Entregas: docs/playbooks/05_visual_motion_production.md          │  │
│  │           src/motion/hyperframes.config.json                     │  │
│  │           src/motion/index.html (1080x1920 60fps)                │  │
│  │           src/motion/style.css (Dark Tech Premium)               │  │
│  │           src/motion/main.js (Timeline determinística GSAP)      │  │
│  │ Saída:    artifacts/motion_output.mp4 (H.264 CRF 16 + Áudio 48k) │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                 │                                                      │
│                 ▼                                                      │
│   [Stage 6: E2E Testing, Auditoria & QA] (Playbook 06 / Runner E2E)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Invariantes de Marca e Estética Dark Tech Premium

A Leo K Digital rejeita templates genéricos, cores pastéis e animações infantis. Toda a produção visual segue a identidade **Dark Tech Premium**, desenhada para transmitir autoridade técnica soberana a tomadores de decisão em médias e grandes empresas:

- **Nome Canônico da Marca**: `Leo K Digital` (exatamente com espaços regulares e maiúsculas; qualquer mutação, forma abreviada ou truncamento sem "Digital" é sumariamente rejeitada pelos testes automatizados).
- **Domínio Canônico**: `leokdigital.com.br` (URL oficial: `https://leokdigital.com.br/`).
- **Slogan Oficial**: *"Sua presença no digital."*
- **Fundador e Engenheiro**: Leonardo Kinoshita (Curitiba, PR, Brasil).
- **Paleta de Cores Estrita (Design Tokens)**:
  - Fundo Base Principal: `#0A0A0F` (`--bg-primary`, `--surface-0`)
  - Alerta / Erro Operacional: `#FF3B30` (`--accent-red`)
  - Atenção / Propriedade de Código / Licenças: `#FFD60A` (`--accent-yellow`)
  - Tecnologia / Google / Autoridade Técnica: `#4285F4` (`--accent-blue`)
  - Performance Máxima / PageSpeed 100 / Lucro: `#30D158` (`--accent-green`)
- **Tipografia**:
  - Títulos e Interface: `Plus Jakarta Sans` (pesos 600, 700, 800)
  - Código, Métricas, Tags e Terminais: `JetBrains Mono` (pesos 500, 700)
- **Glassmorphism Técnico**: Fundo `rgba(18, 18, 26, 0.75)`, desfoque de fundo `backdrop-filter: blur(16px)`, bordas sutis de `1px solid rgba(255, 255, 255, 0.08)` e sombras profundas em múltiplos níveis.
- **Narrador Oficial de Áudio**: Adam da ElevenLabs em português do Brasil (`voice_id: "pNInz6obpgDQGcFmaJgB"`), tom encorpado, assertivo e focado em engenharia e resultados de negócio.

---

## 3. Catálogo de Skills e Matriz de Ferramentas do Stage 5

| Ferramenta / Skill | Interface | Responsabilidade Principal | Contrato de Entrada | Contrato de Saída |
| :--- | :--- | :--- | :--- | :--- |
| `canva-cli` | CLI / npm (`@canva/cli`) | Autenticação headless, chamadas REST, verificação de jobs assíncronos e extração de assets | JSON CLI flags, `--mode manual` | Respostas JSON da API Canva |
| `canva-brand-check` | MCP / Script de Auditoria | Auditoria em transação somente-leitura dos designs Canva contra `src/tokens/brand.json` | Design ID, tokens locais | Relatório de conformidade visual (On/Off/Can't verify) |
| `canva-bulk-create` | MCP / Script de Geração | Produção massiva em lote de criativos sociais a partir de pacotes de dados | `artifacts/creative_package.json` | Manifest com IDs de novos designs gerados |
| `hyperframes` | Runtime / Engine Web-to-Video | Execução determinística de timeline HTML/CSS/DOM em canvas 1080x1920 a 60fps | `src/motion/index.html`, `src/motion/main.js` | Renderização visual frame-a-frame |
| `hyperframes-cli` | CLI (`npx hyperframes`) | Servidor de desenvolvimento, checagem estática de craft e exportação headless para MP4 | Comandos CLI (`preview`, `check`, `render`) | Studio preview, relatórios JSON, `motion_output.mp4` |
| `gsap` (3.12+) | Biblioteca JavaScript | Motor de animação determinística scrubbable com suporte a `window.seekToFrame(f)` | Definições de timelines GSAP | Estados de tween puros por tempo |

---

## 4. Esteira Canva: Auditoria, Produção em Massa e Extração

O Canva desempenha o papel de fábrica de componentes visuais estáticos e carrosséis para canais de tráfego pago (Meta Ads e Google Display). O fluxo de trabalho integra o Canva CLI oficial (`npx @canva/cli@latest` ou `canva api`) e os servidores MCP correspondentes.

### 4.1 Auditoria Automatizada de Marca com `canva-brand-check`

#### O Desafio da Lacuna de Dados (Brand Kit Data Gap)
A chamada de API do Canva `Canva:list-brand-kits` retorna metadados gerais do Brand Kit (ID, nome do kit, miniaturas), mas frequentemente omite os valores hexadecimais brutos e os nomes exatos das fontes no payload JSON.

**Protocolo de Mitigação**: O agente auditor nunca assume que o kit retornado pelo Canva está atualizado. Ele injeta explicitamente o arquivo `src/tokens/brand.json` como gabarito de verdade (*ground truth rubric*).

#### Transação Segura Somente-Leitura
Para inspecionar as propriedades reais de um design no Canva sem alterar seu estado em produção, o operador deve seguir rigorosamente o padrão de transação protegida:

```bash
# 1. Obter descrição e campos do comando de edição
canva api describe designs start-editing-transaction

# 2. Iniciar a transação de inspeção (retorna transaction_id)
# Via MCP: Canva:start-editing-transaction design_id="DAG..."
```

**Regra Absoluta de Transação**: Qualquer inspeção de auditoria **deve** ser encapsulada em um bloco protegido onde `Canva:cancel-editing-transaction` seja executado ao final, **nunca** executando `commit-editing-transaction`.

```javascript
// Protocolo de Auditoria Segura
async function auditCanvaDesign(designId, brandTokens) {
  let transactionId = null;
  try {
    const tx = await canva.startEditingTransaction({ design_id: designId });
    transactionId = tx.transaction_id;
    
    // Obter árvore de elementos e textos do design
    const content = await canva.getDesignContent({ design_id: designId, transaction_id: transactionId });
    
    // Validar cores utilizadas contra o Dark Tech Palette
    const allowedColors = [
      brandTokens.primaryBg,       // #0A0A0F
      brandTokens.accentRed,       // #FF3B30
      brandTokens.accentYellow,    // #FFD60A
      brandTokens.accentBlue,      // #4285F4
      brandTokens.accentGreen      // #30D158
    ];
    
    // Validar presença de variantes proibidas de marca
    assertNoForbiddenVariants(JSON.stringify(content), `Canva Design ${designId}`);
    
    return { status: "PASS", violations: [] };
  } finally {
    if (transactionId) {
      // OBRIGATÓRIO: Sempre cancelar para não salvar alterações acidentais
      await canva.cancelEditingTransaction({ design_id: designId, transaction_id: transactionId });
    }
  }
}
```

### 4.2 Geração Massiva Programática com `canva-bulk-create`

O skill `canva-bulk-create` automatiza a transformação de cópias de anúncios (produzidas no Stage 3) em conjuntos completos de criativos gráficos formatados para o feed do Instagram e LinkedIn.

#### Mapeamento de Dados e Esquema de Template
1. Localização de templates de marca que suportem autofill:
   ```bash
   # Pesquisar templates de marca com dataset habilitado
   canva api brand-templates list --dataset non_empty
   ```
2. Descoberta dos campos do dataset:
   ```bash
   # Obter mapa de campos e tipos (text, image, chart)
   canva api brand-templates get-dataset --template-id "EAG..."
   ```

3. Ingestão de `artifacts/creative_package.json`:
   Os conceitos de criativos em `src/content/ads_meta.json` (como `pain_point_operational` e `market_evolution_geo_aeo`) são mapeados para as variáveis do template:

| Campo no Template Canva | Tipo | Origem em `creative_package.json` | Exemplo de Valor Injetado |
| :--- | :--- | :--- | :--- |
| `headline_text` | `text` | `meta_ads[i].headline` | `"Sua Empresa Livre de Planilhas"` |
| `primary_hook` | `text` | `meta_ads[i].primary_text` (hook) | `"Planilhas manuais travam seu time toda semana..."` |
| `caption_pill` | `text` | `voiceover_script.scenes[i].pill_caption.text`| `"OPERAÇÃO LENTA"` |
| `badge_domain` | `text` | Constante canônica | `"leokdigital.com.br"` |
| `hero_asset` | `image` | Padrão B (Upload URL) ou Padrão A | ID do gráfico de barras gerado |

#### Padrões de Tratamento de Imagem
- **Padrão A (Asset ID Pré-existente)**: Referenciar diretamente um ativo já existente na biblioteca do Canva via `{ "type": "image", "asset_id": "MAB..." }`.
- **Padrão B (Upload via URL Pública)**: Para gráficos gerados dinamicamente no pipeline local, fazer o upload prévio com `Canva:upload-asset-from-url`, aguardar a conclusão assíncrona do upload, capturar o `asset_id` gerado e repassá-lo ao autofill.
- **Padrão C (Fallback Padrão)**: Omitir o campo no payload de dados para que o Canva mantenha a imagem padrão do template base.

#### Execução Sequencial em Lote
A geração em massa realiza chamadas sequenciais a `Canva:autofill-design` com espaçamento de 250ms entre requisições para evitar rate limits:

```bash
# Execução de lote com dry-run prévio para validação de schema
canva api autofill-designs create --template-id "EAG123" --body payload.json --dry-run
```

### 4.3 Exportação Lossless e Ingestão no Pipeline de Motion

Para elementos gráficos complexos que compõem o vídeo motion (ex: gráficos de rentabilidade, mockups de interface ou selos certificados), o Canva exporta os designs em alta resolução com fundo transparente:

1. **Checagem de Formatos**:
   ```bash
   canva api export-formats get --design-id "DAG789"
   ```
2. **Exportação Pro Lossless**:
   ```bash
   canva api exports create --design-id "DAG789" --format png --lossless true --transparent-background true --export-quality pro
   ```
3. **Download e Padronização**: O asset exportado é baixado e salvo no diretório do projeto: `src/motion/assets/canva/`.

---

## 5. Motor de Vídeo Motion: HyperFrames + GSAP 3.12+

A produção de vídeo vertical de alta conversão da Leo K Digital baseia-se na união entre o runtime determinístico do **HyperFrames** e o motor de timeline do **GSAP 3.12+**.

### 5.1 O Contrato de Renderização Determinístico (A Lei de Ferro do HyperFrames)

Para que um vídeo web possa ser convertido em vídeo MP4 frame-a-frame de maneira idêntica em qualquer máquina (seja no macOS do desenvolvedor ou no servidor headless de CI em Linux), o código deve obedecer a cinco regras absolutas:

1. **Proibição de Relógios Assíncronos**: Banimento total de `Date.now()`, `performance.now()`, `setInterval`, `setTimeout` ou `requestAnimationFrame` para calcular o estado da animação. O tempo é uma variável pura injetada externamente.
2. **Zero Aleatoriedade Não-Semeada**: Proibição de `Math.random()`. Qualquer variação procedural (ex: partículas ou ruído de glitch) deve usar um gerador com seed determinístico (ex: LCG ou PRNG).
3. **Proibição de Loops Infinitos**: Nenhuma animação GSAP ou CSS pode ter `repeat: -1`. Animações infinitas travam a captura headless do Puppeteer, resultando em timeout de 45 segundos e falha da renderização. Efeitos de pulso devem ter durações ou contagens finitas correspondentes à duração exata da cena.
4. **Uso Exclusivo de `gsap.fromTo()`**: O uso de `gsap.from()` é estritamente proibido em timelines navegáveis, pois ele calcula o valor inicial apenas no primeiro scrub, causando corrupção visual severa caso o motor faça um seek para trás. Todos os tweens usam `fromTo` com valores de início e fim explicitados.
5. **Sem Conflito Transform CSS x GSAP (`gsap_css_transform_conflict`)**: Elementos que sofrem animação de escala, rotação ou translação via GSAP não devem ter declarações de `transform` na folha de estilos CSS `style.css`. O estado inicial deve ser configurado via `gsap.set()`.

### 5.2 Arquitetura do Canvas Vertical (1080x1920 @ 60fps)

- **Resolução Nativa**: 1080 pixels de largura por 1920 pixels de altura (proporção 9:16 portrait).
- **Taxa de Quadros**: 60 FPS exatos.
- **Orçamento Temporal Total**: Exatamente 30.0 segundos = **1800 frames** (`30 * 60 = 1800`).
- **Marcação Estrutural do Documento (`src/motion/index.html`)**:
  ```html
  <div id="root" data-composition-id="main" data-start="0" data-duration="30" data-width="1080" data-height="1920" data-fps="60">
  ```
- **Zonas Seguras para Redes Sociais (Safe Zones)**:
  - Margem Superior: 168px reservados (cabeçalhos de apps, status bar).
  - Margem Inferior: 590px reservados (botões de engajamento, legendas do TikTok/Reels, perfil).
  - Caixa de Ação Segura: 900px de largura por 1162px de altura (área central onde todos os cards e chamadas principais são posicionados).

---

## 6. Sincronização e Mapeamento das 5 Cenas

A timeline mestra é particionada em 5 cenas fundamentais, diretamente acopladas ao roteiro de áudio `src/content/voiceover_script.json`:

```
Frames:  0               300                 660                1080               1440               1800
Tempo:   0.0s            5.0s               11.0s              18.0s              24.0s              30.0s
         ├────── 300f ─────┼────── 360f ───────┼────── 420f ───────┼────── 360f ───────┼────── 360f ───────┤
Cena:    [ 01: Dor/Excel ] [ 02: Leo K Digital] [ 03: Vitals/SEO  ] [ 04: Código 100% ] [ 05: Brand & CTA  ]
Label:   'scene_01'        'scene_02'          'scene_03'          'scene_04'          'scene_05'
```

### 6.1 Detalhamento Técnico das Cenas

#### Cena 01: Dor Operacional — Planilhas Manuais Travando (Frames 0 a 300 | 0.0s a 5.0s)
- **Áudio**: *"Sua empresa ainda perde tempo gerenciando operações críticas em planilhas que travam toda semana?"*
- **Pílula de Status**: `OPERAÇÃO LENTA` com pulso em vermelho `#FF3B30`.
- **Componente**: Card com mockup de planilha estilo Excel com fórmulas quebradas (`#REF!`, `TIMEOUT`, `LOCK_ERR`), seguido de um alerta crítico de erro de sistema e cursor simulado que tenta fechar o arquivo. Jitter sinusoidal simulando o travamento do software.

#### Cena 02: A Solução de Engenharia — Leo K Digital (Frames 300 a 660 | 5.0s a 11.0s)
- **Áudio**: *"A Leo K Digital desenvolve sistemas web sob medida em Next.js e PostgreSQL para automatizar o seu negócio."*
- **Pílula de Status**: `Leo K Digital` em azul Google `#4285F4`.
- **Componente**: Dashboard operacional dark tech com métricas de tempo economizado (-85%), zero erros de banco e gráfico de 5 pilares com crescimento de ROI mensal utilizando `gsap.stagger`.

#### Cena 03: Performance Extrema & Otimização GEO/AEO (Frames 660 a 1080 | 11.0s a 18.0s)
- **Áudio**: *"Construímos aplicações ultrarrápidas, com nota máxima no Core Web Vitals e indexação para inteligências artificiais."*
- **Pílula de Status**: `CORE WEB VITALS: 100` em verde neon `#30D158`.
- **Componentes Chave**:
  1. **Barra de Busca Google Interativa**: Digitação simulada caractere por caractere via proxy numérico GSAP (`"melhor software sob medida curitiba"`), com cursor piscante finito e entrada com facilidade natural.
  2. **Card de Resultado #1 Orgânico**: Dropdown exibindo a URL canônica `https://leokdigital.com.br/` e o selo `#1 Orgânico Google`.
  3. **Speedometer Core Web Vitals**: SVG com traço circular (`stroke-dasharray: 565.48`) animando até o preenchimento total e odômetro digital contando de 0 a 100 com brilho verde neon `#30D158`.

#### Cena 04: Propriedade Irrevogável do Código (Frames 1080 a 1440 | 18.0s a 24.0s)
- **Áudio**: *"Código próprio, sem taxas de licença por usuário e desenhado exatamente para o fluxo da sua equipe."*
- **Pílula de Status**: `ZERO MENSALIDADES DE LICENÇA` em amarelo `#FFD60A`.
- **Componente**: Terminal de código TypeScript com tipagem estrita renderizando o contrato de propriedade intelectual da empresa contratante, com ícone de cadeado que fecha e emite um pulso dourado `#FFD60A`.

#### Cena 05: Grand Finale, CTA e Invariantes Absolutos (Frames 1440 a 1800 | 24.0s a 30.0s)
- **Áudio**: *"Sua presença no digital. Acesse leokdigital.com.br e agende seu diagnóstico técnico com Leonardo Kinoshita."*
- **Pílula de Status**: `leokdigital.com.br` em azul `#4285F4`.
- **Componentes Chave**:
  1. **Emblema Central**: Expansão fluida com efeito elástico e anel de brilho.
  2. **Nome da Marca**: `Leo K Digital` em tipografia Plus Jakarta Sans 80px com gradiente metálico.
  3. **Slogan Oficial**: `"Sua presença no digital."`
  4. **Emblema do Fundador**: Selo com `"Leonardo Kinoshita • Curitiba, PR"`.
  5. **Botão de Ação (CTA Pill)**: Pílula translúcida gigante com o domínio estrito `leokdigital.com.br` e seta pulsante, sustentando visualização contínua por mais de 2.5 segundos.

---

## 7. Protocolo de Seekability e API do Motor

Para permitir que o HyperFrames CLI ou pipelines customizados de captura headless inspecionem ou renderizem qualquer frame de forma isolada, o arquivo `src/motion/main.js` exporta e registra o seguinte protocolo global:

```javascript
// Registro canônico da Timeline no escopo window
window.__timelines = window.__timelines || {};
window.__timelines["main"] = masterTimeline;
window.masterTimeline = masterTimeline;

// Definições de taxa e duração
window.fps = 60;
window.totalFrames = 1800;

/**
 * Função Oficial de Seek por Quadro
 * Permite que Puppeteer ou HyperFrames pulem diretamente para qualquer quadro
 * @param {number} frame - Número do quadro (0 a 1799)
 */
window.seekToFrame = function(frame) {
  const clamped = Math.max(0, Math.min(1799, frame));
  const timeSeconds = clamped / 60.0;
  masterTimeline.seek(timeSeconds, false);
  return { frame: clamped, time: timeSeconds, ready: true };
};

/**
 * Função Oficial de Seek por Segundos
 * @param {number} seconds - Tempo em segundos (0.0 a 30.0)
 */
window.seekToTime = function(seconds) {
  const clamped = Math.max(0, Math.min(30.0, seconds));
  masterTimeline.seek(clamped, false);
  return { time: clamped, frame: Math.round(clamped * 60.0), ready: true };
};
```

---

## 8. Comandos Operacionais da CLI e Pipeline Headless

### 8.1 Preview Interativo Local
Para visualizar em tempo real e editar a animação com live-reloading no navegador:
```bash
npx hyperframes preview --background --port 3002
# Abre o Studio UI em http://localhost:3002/#project/src/motion
```

### 8.2 Auditoria Estática e Quality Gate
Antes de renderizar, executar a verificação completa de regras de design, contraste e linting:
```bash
# 1. Lint de marcação e tags de áudio
npx hyperframes lint

# 2. Gate completo com snapshots visuais de corte de texto e contraste
npx hyperframes check --json --snapshots
```

### 8.3 Renderização Headless em Produção
A renderização em lote compila os 1800 frames HTML/DOM em vídeo MP4 H.264 de alta densidade:
```bash
npx hyperframes render src/motion/index.html --fps 60 --quality delivery -o artifacts/motion_output.mp4
```

### 8.4 Multiplexação e Sincronização de Áudio via FFmpeg
Para unir o vídeo renderizado à faixa original de locução em alta definição:
```bash
ffmpeg -y -i artifacts/motion_output.mp4 -i assets/audio/voiceover_adam.mp3 \
  -c:v copy -c:a aac -b:a 320k -shortest \
  artifacts/hero_reel_production_final.mp4
```

---

## 9. Tratamento de Erros, Resiliência e Casos de Borda

| Cenário de Erro | Causa Raiz | Impacto | Procedimento de Resolução no Playbook |
| :--- | :--- | :--- | :--- |
| `gsap_css_transform_conflict` | CSS declara `transform` e GSAP tenta animar o elemento | Snapping visual e quebra do lint | Remover `transform` do `style.css`; inicializar posição via `gsap.set()` no `main.js`. |
| `video_missing_muted` | Tag `<video>` embutida sem atributo `muted` | Navegadores bloqueiam autoplay headless | Adicionar `muted playsinline` a qualquer tag de mídia de apoio. |
| `clip_ends_past_root_duration` | Elemento `.clip` com `data-start + data-duration > 30` | HyperFrames rejeita timeline | Limitar cada clip estritamente à janela da cena e somatório total de 30.0s. |
| `line_unread` | Texto longo com menos de 1.05s de tela por 3 palavras | Falha no teste de usabilidade visual | Garantir que todas as frases fiquem em tela por pelo menos 3.5 segundos. |
| Software GPU no Headless | Servidor sem placa aceleradora gráfica (CI/Linux) | Lentidão em filtros `backdrop-filter: blur(16px)` | Injetar flags `--browser-timeout 60` e fallback gracioso de opacidade no CSS. |
| Desvio de Invariante de Marca | Digitação de variações não-canônicas da marca ou do domínio | Rejeição imediata no Tier 2 E2E | Verificação com `assertNoForbiddenVariants()` em todos os arquivos de saída. |

---

## 10. Checklist de Qualidade e Critérios de Aceite

Todo entregável do Milestone 4 deve satisfazer a 100% dos critérios abaixo antes da submissão à auditoria:

- [ ] **Configuração Válida**: `src/motion/hyperframes.config.json` possui sintaxe JSON impecável, largura 1080, altura 1920, fps 60 e total de 1800 frames.
- [ ] **Estrutura HTML5 Calibrada**: `src/motion/index.html` define `#root` com atributos de dados correspondentes, importa as fontes Google Plus Jakarta Sans e JetBrains Mono, e carrega GSAP 3.12+.
- [ ] **Estilo Dark Tech Fiel**: `src/motion/style.css` utiliza as variáveis `--bg-primary: #0A0A0F`, `#FF3B30`, `#FFD60A`, `#4285F4`, `#30D158`, e glassmorphism `rgba(18, 18, 26, 0.75)` com `blur(16px)`.
- [ ] **Timeline Determinística**: `src/motion/main.js` inicializa com `paused: true`, implementa `window.seekToFrame(frame)` e `window.seekToTime(seconds)`, e passa na validação `node --check`.
- [ ] **Sincronia Exata com Voiceover**: 5 cenas divididas estritamente nos intervalos 0–300, 300–660, 660–1080, 1080–1440 e 1440–1800 frames.
- [ ] **Invariantes Absolutos**: 100% de presença exata de `"Leo K Digital"` e `"leokdigital.com.br"`; zero ocorrências de variantes proibidas.
- [ ] **Sucesso na Suíte E2E**: Testes das quatro camadas (`Tier 1`, `Tier 2`, `Tier 3` e `Tier 4`) passam sem erros.

---

## 11. Padrões Avançados de Física de Motion & Sound Design (Palácio Mental & Estudio-IA)

Com base na engenharia reversa do acervo **Palácio Mental** (131 referências virais de 58 criadores) e na arquitetura do `estudio-ia`:

### 11.1 Constantes Físicas de Mola e Curvas de Transição
Para evitar animações plásticas ou duras:
- **Mola Elástica para UI em Código**:
  $$1 - e^{-\zeta \omega t} \left(\cos \omega_d t + \frac{\zeta \omega}{\omega_d} \sin \omega_d t\right)$$
  - *Elementos de apoio e balões*: $\zeta = 0.56$ e $\omega \approx 12$ (overshoot de ~12% com assentamento suave em 0.6s).
  - *Interfaces firmes e botões*: $\zeta = 0.72$ e $\omega \approx 15$ (sem ressalto perceptível).
- **Curvas Bézier Padronizadas**:
  - `cubic-bezier(.86, 0, .07, 1)`: Cortes e transições secas de alto impacto.
  - `cubic-bezier(.33, 0, .23, 1)`: Câmera contínua viajando entre blocos de interface.

### 11.2 Hero Container Morphing (Sem Cortes Falsos)
- **Regra de Escala**: Nunca animar `scale` em cartões de UI, pois estica fontes, descalibra padding e deforma a espessura de borda (`border-width`).
- **Padrão Morph**: Animar `width`, `height`, `borderRadius` e cor sobre o mesmo elemento base `{cx, cy, w, h, r, cor}`.

### 11.3 Regra de Retenção: "Nada Antes de Ser Dito"
- Nenhum card ou elemento visual aparece na tela antes da palavra que o justifica ser pronunciada na locução (no máximo 0.15s de antecipação).
- O ritmo de explicativos mobile exige:
  - 1 evento visual relevante a cada ~1.0 segundo.
  - Troca de bloco a cada ~2.0 segundos, na primeira palavra da frase.
  - Zero quadros mortos (manter câmera com deriva contínua lenta de `scale: 1.0 -> 1.03`).

### 11.4 Motor de Sound Design Baseado em Eventos
- O som não é um arquivo avulso aleatório; ele é governado pelo mapa declarativo `src/motion/events.json`.
- **Alinhamento de Pico Acústico**: Cada efeito sonoro entra em `tempo = evento - (pico_ms / 1000)` para que o transiente coincida com o quadro do impacto.
- **Ducking Dinâmico**: Trilha musical abaixada em -15 dB quando há fala, subindo +6 dB nos respiros.
- **Respiro Pré-Drop**: Silêncio total de 0.3s a 0.5s imediatamente antes do clímax (ex.: antes da batida do carimbo `APROVADO`).
- **Masterização**: Normalização estrita para **-14 LUFS** integrado e pico verdadeiro **$\le -1.0$ dBTP** via filtro `loudnorm`.

