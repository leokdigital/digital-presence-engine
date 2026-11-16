# Palácio Mental: Catálogo de Referências de Motion Design

> Curadoria técnica extraída do guia **Palácio Mental** (Do Zero ao Motion com IA) e integrada ao **Digital Presence Engine da Leo K Digital**.
> Base: 131 referências de 58 criadores internacionais, organizadas por estilos, técnicas e links diretos.

---

## 🎯 Como Utilizar no Pipeline de Produção

Antes de criar qualquer animação em HyperFrames, GSAP ou Remotion:
1. Identifique o **estilo** desejado (`saas`, `ui-produto`, `apple-claro`, `dark-neon`, `narrado`).
2. Consulte os criadores de referência para aquele estilo na tabela abaixo.
3. Extraia a folha de contato do vídeo com `node scripts/inspect-reference.mjs <caminho-do-video>` para estudar os quadros exatos de transição.
4. Aplique as técnicas catalogadas (mola, bezier, morph de container, som nos eventos).

---

## 📂 Índice por Estilo Predominante

| Estilo | Qtd | Criadores Principais | Técnicas Chave |
|---|---|---|---|
| **UI-Produto** | 85 | YouMotion, @illdari, uxpeak, NaughtyyJuan, Android | Morph de componente por tamanho/raio, cursor ativo, vidro translúcido, spotlight |
| **Minimalista** | 36 | Easlo, PartoMotion, @illdari, Kole Jain, Google | Espaço negativo, 1 ideia por vez, ausência de ruído, cortes secos na batida |
| **Tipografia Cinética** | 29 | @wecreate, @the_krishray, Afterflix, Mojtaba Sorbi | Palavra por palavra saindo do blur, texto com máscara, peso tipográfico dinâmico |
| **Anúncio / Performance** | 27 | Higgsfield AI, @riki.bosso, Kram.Visuals, Zakaria HQ | Hook nos primeiros 2s, prova visual contínua, quebra de padrão, CTA interativo |
| **Escuro com Neon (Dark Tech)** | 20 | Mojtaba Sorbi, @ssupernova.studio, Twobase, YouMotion | Linhas de luz, grade fina, gradientes #4285F4, vidro escuro com reflexo fino |
| **Narrado / Explicativo** | 20 | uxpeak, Clube do Motion, Breno Perrucho, @fabianocarvalhojr | Nada aparece antes de ser dito, 1 ideia a cada 1,5s, metáforas físicas tangíveis |
| **Apple Claro** | 19 | Bart_VFX, Kole Jain, @noflexstudio, Zakaria HQ | Fundo cinza neutro, SF Pro / Plus Jakarta Sans, Dynamic Island, mola elástica |
| **SaaS** | 19 | Editwithtrix, Motion Swell, Zelios, Noflex Academy | Forma herói que atravessa o vídeo, clique infla e inunda a cor, morphing sem corte |
| **Sound Design** | 14 | Multiply Sound, NaughtyyJuan, Jacob Nordin | Sincronia acústica no evento, efeitos tonais no tom da música, ducking -15 dB |

---

## 📋 Catálogo Completo das 131 Referências

### 1. Interface de Produto & SaaS (Seleção Chave)
- **#02 Android (Gemini Intelligence):** `https://www.youtube.com/watch?v=4f7VamjPHaM` — Pílula de vidro com estados do agente, tela que recua para cartão 3D e cresce até tela cheia.
- **#03 Bart_VFX (Apple Morph Dan Ebberts):** `https://www.youtube.com/watch?v=cpQzSKuEAkM` — Ponto que vira botão, pílula, card e status via mola inercial.
- **#12 Editwithtrix (Elemento Vivo Atravessando):** `https://www.youtube.com/watch?v=POffjDZbdlQ` — Um único container conduz o vídeo inteiro. O clique aperta e inunda a tela com a cor da marca.
- **#13 Editwithtrix (Pílula que Vira Modal):** `https://www.youtube.com/watch?v=S_TswZL-Qbw` — Texto que nasce quando dito, cascata a cada 0,25s, efeito sonoro a cada 0,8s.
- **#14 @fabianocarvalhojr (Gravação em 22s):** `https://www.instagram.com/reel/DeK6rXOirDb/` — Gancho forte em 3s, gravação de tela com terminal e comando virando tabela.
- **#15 feitangyuan (Onetake):** `https://github.com/feitangyuan/onetake` — Motion em take contínuo sem cortes, câmera com mola perseguindo o elemento.
- **#31 @illdari (UI Motion Liso):** `https://www.instagram.com/illdari/` — Cada cena nasce de uma peça da cena anterior; elementos entram e saem com blur direcional.
- **#46 Mojtaba Sorbi (ChatGPT Prompt Bar):** `https://www.youtube.com/watch?v=GmWuQYFmEt0` — Arco de luz vira barra de busca, botão infla e vira card; câmera em cadeia de nulls com curva 86/93.
- **#71 @noflexstudio (Codex App Build):** `https://www.instagram.com/reel/Dc1g8F3psru/` — Ícone sai da dock, digitação real com cursor, botão com mola.
- **#90 uxpeak & NaughtyyJuan (Cadência de Abertura):** `https://www.youtube.com/watch?v=U7jTCgIWS4w` — Algo novo a cada 0,37s a 0,65s na abertura; no corpo, 1 elemento por segundo e troca a cada 2,3s.
- **#99 YouMotion (Ask AI Workflow):** `https://youmotion.com/video-templates/ask-ai-workflow-391546` — Barra vira prompt, digitação com brilho na ponta, bolhas que caem na pasta.

### 2. Sound Design & Acústica
- **#48 Multiply Sound (Normal vs Tonal):** `https://www.youtube.com/shorts/GGnRh76n35w` — Efeitos comuns vs efeitos no tom da música (Dó, Lá menor).
- **#51 Multiply Sound (Comparação na Timeline):** `https://www.youtube.com/watch?v=WFplMDlHibY` — Regra da agulha: música entra junto com o impacto; transientes alinhados a ≤ 25ms.
- **#53 Multiply Sound (Trilha por Momentos):** `https://www.youtube.com/watch?v=HqFt3rDyiZ4` — Loops no mesmo tom mudando nas viradas do roteiro; silêncio de 0,5s antes do drop.
- **#58 NaughtyyJuan (Processo de Sound Design):** `https://www.youtube.com/watch?v=DJFQpmqAZ0U` — Empilhamento de 2 a 5 camadas curtas por momento forte; pico do swoosh no meio da transição.

---

## 📐 Regras de Ouro Extraídas para o Digital Presence Engine

1. **A regra "Nada antes de ser dito" (Clube do Motion & uxpeak):**  
   O elemento entra no momento exato em que a palavra que o descreve é pronunciada (no máximo 0,15s antes). A tela se constrói organicamente.
2. **Morphing de Container Único (Editwithtrix):**  
   Em vez de destruir e recriar cartões, altere as propriedades `{x, y, width, height, borderRadius}` do mesmo container HTML.
3. **Câmera Nunca Morta:**  
   Mantenha um drift sutil contínuo (`scale: 1.0 -> 1.04` ou leve rotação de 0.5°) para manter o dinamismo da tela.
4. **Precisão de Áudio:**  
   - Fala principal no centro a -14 LUFS integrado.
   - Ducking automático da música para -15 dB quando há voz.
   - SFX posicionado em `at = evento - pico_ms/1000`.
