/* eslint-disable no-use-before-define */
(() => {
  /**
   * Slide model:
   * - title: string
   * - kicker?: string
   * - body?: string[]
   * - bullets?: Array<{ lead?: string, text: string }>
   * - aside?: { title: string, bullets: string[] }
   * - pills?: Array<{ text: string, tone?: "accent" | "accent2" }>
   */

  // Shared semantic tones for SVG diagrams (must be defined before slides[] init)
  const TONE = {
    input: { rgb: "74,163,255" }, // blue
    agent: { rgb: "124,92,255" }, // purple
    risk: { rgb: "255,202,92" }, // amber
    human: { rgb: "37,214,199" }, // teal
    output: { rgb: "110,231,168" }, // green
    neutral: { rgb: "255,255,255" }, // gray/white
  };

  function toneFill(tone, a = 0.18) {
    const t = TONE[tone] || TONE.neutral;
    return `rgba(${t.rgb},${a})`;
  }

  function toneStroke(tone, a = 0.62) {
    const t = TONE[tone] || TONE.neutral;
    return `rgba(${t.rgb},${a})`;
  }

  function svgNode({ x, y, w, h, text, tone = "neutral", emphasis = false, dashed = false, caption, glowId = "softGlow" }) {
    const rx = 16;
    const fill = toneFill(tone, emphasis ? 0.28 : 0.20);
    const stroke = toneStroke(tone, emphasis ? 0.78 : 0.66);
    const dash = dashed ? 'stroke-dasharray="6 8"' : "";
    const sw = emphasis ? 2.2 : 1.8;
    const label = escapeSvg(String(text || ""));
    const filt = emphasis ? `filter="url(#${glowId})"` : "";
    return `<g ${filt}>
      <rect x="${x}" y="${y}" rx="${rx}" ry="${rx}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${dash}/>
      ${
        caption
          ? `<text x="${x + w / 2}" y="${y - 10}" text-anchor="middle" font-family="Manrope, system-ui" font-size="11" fill="rgba(255,255,255,0.60)">${escapeSvg(
              caption
            )}</text>`
          : ""
      }
      <text x="${x + w / 2}" y="${y + h / 2 + 7}" text-anchor="middle" font-family="Manrope, system-ui" font-size="14" font-weight="700" fill="rgba(255,255,255,0.86)">${label}</text>
    </g>`;
  }

  function svgChip({ x, y, text, tone = "agent" }) {
    const w = Math.max(92, Math.min(180, String(text).length * 8 + 46));
    const h = 30;
    return `<g>
      <rect x="${x}" y="${y}" rx="999" ry="999" width="${w}" height="${h}" fill="${toneFill(
        tone,
        0.12
      )}" stroke="${toneStroke(tone, 0.40)}" stroke-width="1.4"/>
      <text x="${x + w / 2}" y="${y + 20}" text-anchor="middle" font-family="Manrope, system-ui" font-size="12" font-weight="700" fill="rgba(255,255,255,0.82)">${escapeSvg(
        text
      )}</text>
    </g>`;
  }

  function svgArrowPath({ d, tone = "neutral", width = 2, dashed = false, marker = "arrS", opacity = 0.26 }) {
    const dash = dashed ? 'class="conn dash"' : 'class="conn"';
    return `<path ${dash} d="${d}" stroke="${toneStroke(tone, opacity)}" stroke-width="${width}" fill="none" marker-end="url(#${marker})"/>`;
  }

  const slides = [
    {
      kicker: "QA × AI",
      title: "Как ИИ усиливает QA",
      context: "От разрозненных задач к управляемым QA‑пайплайнам.",
      layout: "center",
      layoutMode: "orbit-hero",
      diagram: diagramOrbitHero({
        center: "QA Engineer",
        nodes: ["Requirements", "Impact", "Autotests", "Evidence", "Regression", "Logs", "Analytics"],
      }),
      diagramSize: "xl",
      takeaway: "Вывод: ИИ усиливает роль QA инженера, а не заменяет её.",
    },
    {
      kicker: "Карта доклада",
      title: "7 cases",
      context: "Две части: daily QA tasks → managed QA pipelines.",
      layoutMode: "constellation-map",
      diagram: diagramConstellationMap({
        leftTitle: "Part 1 · daily tasks",
        rightTitle: "Part 2 · pipelines",
        left: ["Case 1", "Case 2", "Case 3"],
        right: ["Case 4", "Case 5", "Case 6", "Case 7"],
      }),
      diagramSize: "xl",
      takeaway: "Вывод: Сначала структура, потом выполнение.",
    },
    {
      kicker: "Контекст",
      title: "QA становится Quality Engineer",
      context: "ИИ помогает быстрее думать, а QA — задаёт рамки и проверяет результат.",
      cards: [
        { text: "FRAME", tone: "human" },
        { text: "CHECK", tone: "human" },
        { text: "PIPELINE", tone: "ai" },
        { text: "EVIDENCE", tone: "output" },
      ],
      takeaway: "Вывод: Ответственность остаётся у инженера.",
    },
    {
      kicker: "Case 1",
      title: "Requirements → test design",
      context: "Требования плотные и неоднозначные — нужен управляемый разбор.",
      layoutMode: "diagonal-flow",
      diagram: diagramDiagonalFlow(["Spec", "Agent", "Checks", "YAML", "Review"]),
      diagramSize: "xl",
      takeaway: "Вывод: Coverage становится трассируемым и проверяемым.",
    },
    {
      kicker: "Case 2",
      title: "Change impact",
      context: "Diff есть — impact неочевиден. Нужен быстрый bridge до тест‑плана.",
      layoutMode: "diagram",
      diagram: diagramChangeImpactForkJoin(),
      diagramSize: "xl",
      takeaway: "Вывод: Проверяем минимум критичного — осознанно.",
    },
    {
      kicker: "Case 3",
      title: "Autotests pipeline",
      context: "Не «ИИ пишет тест», а процесс: план → код → ревью.",
      layoutMode: "role-triangle",
      diagram: diagramAutotestsTriangle(),
      diagramSize: "xl",
      takeaway: "Вывод: ИИ ускоряет automation только в строгих правилах.",
    },
    {
      kicker: "Case 4",
      title: "Evidence-first execution",
      context: "Fail без evidence = ручная отладка. Evidence делает падение расследуемым.",
      layoutMode: "evidence-board",
      diagram: diagramEvidenceBoard(["SCREEN", "UI DUMP", "ACTION LOG", "TRIAGE", "RULE"]),
      diagramSize: "xl",
      takeaway: "Вывод: Каждый fail улучшает runbook и стабильность.",
    },
    {
      kicker: "Case 5",
      title: "Regression planning",
      context: "Регресс растёт: дубли, flaky, low-value — нужен risk‑based план.",
      layoutMode: "hub-skills",
      diagram: diagramRegressionPlanningAgent(),
      diagramSize: "xl",
      takeaway: "Вывод: План объясняет «почему» и порядок проверок.",
    },
    {
      kicker: "Case 6",
      title: "Logs & triage",
      context: "Симптом → логи → причина → понятный bug report.",
      layoutMode: "terminal-triage",
      terminal: [
        "analyze logs",
        "[OK] grouped errors",
        "[OK] hypothesis",
        "[OK] bug report",
      ],
      takeaway: "Вывод: Быстрее от наблюдения к проверяемой гипотезе.",
    },
    {
      kicker: "Case 7",
      title: "Analytics validation",
      context: "Если аналитика неверна — решения неверны. Проверяем как контракт.",
      layoutMode: "diagram",
      diagram: diagramAnalyticsValidationStack(),
      diagramSize: "xl",
      takeaway: "Вывод: expected → actual → diff = доказательная проверка.",
    },
    {
      kicker: "Синтез",
      title: "QA lifecycle",
      context: "Один жизненный цикл качества — как кольцо.",
      layoutMode: "lifecycle-ring",
      diagram: diagramLifecycleRing([
        "Requirements",
        "Test design",
        "Automation",
        "Evidence",
        "Triage",
        "Regression",
        "Analytics",
        "Better decisions",
      ]),
      diagramSize: "xl",
      takeaway: "Вывод: ИИ превращает опыт QA в повторяемый процесс.",
    },
  ];

  const deckRoot = document.querySelector(".deck");
  const slideRoot = document.getElementById("slide");
  const counterCurrent = document.getElementById("counter-current");
  const counterTotal = document.getElementById("counter-total");
  const prevLink = document.querySelector(".nav-prev");
  const nextLink = document.querySelector(".nav-next");

  counterTotal.textContent = String(slides.length);

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function getIndexFromHash() {
    const raw = (window.location.hash || "").replace("#", "").trim();
    const n = Number.parseInt(raw, 10);
    if (!Number.isFinite(n)) return 0;
    return clamp(n - 1, 0, slides.length - 1);
  }

  function setHashFromIndex(i) {
    const n = i + 1;
    window.location.hash = `#${n}`;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderBoardCards(targetEl, cards) {
    if (!cards?.length) return;
    const board = el("div", "board");
    const grid = el("div", "board-grid");
    for (const [idx, c] of cards.slice(0, 5).entries()) {
      const card = el("div", "board-card", c.text);
      card.style.setProperty("--d", `${idx * 70}ms`);
      if (c.tone) card.classList.add(String(c.tone));
      grid.appendChild(card);
    }
    board.appendChild(grid);
    targetEl.appendChild(board);
  }

  function renderTerminal(targetEl, lines) {
    if (!lines?.length) return;
    const wrap = el("div", "terminal");
    const pre = el("pre", "terminal-pre");
    pre.textContent = lines.join("\n");
    wrap.appendChild(pre);
    targetEl.appendChild(wrap);
  }

  function renderStack(targetEl, layers) {
    if (!layers?.length) return;
    const wrap = el("div", "stack");
    const max = Math.min(layers.length, 8);
    for (let i = 0; i < max; i++) {
      const layer = el("div", "stack-layer", layers[i]);
      layer.style.setProperty("--i", String(i));
      layer.style.setProperty("--d", `${i * 60}ms`);
      wrap.appendChild(layer);
    }
    targetEl.appendChild(wrap);
  }

  function applyEnterMotion(targetEl) {
    if (deckRoot.classList.contains("is-print")) return;
    targetEl.classList.remove("enter");
    // Force reflow for retrigger.
    // eslint-disable-next-line no-unused-expressions
    targetEl.offsetHeight;
    targetEl.classList.add("enter");
    const kids = Array.from(targetEl.children);
    kids.forEach((k, idx) => k.style?.setProperty("--d", `${idx * 60}ms`));
  }

  function renderSlide(i) {
    const s = slides[i];
    slideRoot.innerHTML = "";
    slideRoot.setAttribute("aria-label", `${i + 1} из ${slides.length}`);
    slideRoot.classList.toggle("is-center", s.layout === "center");
    slideRoot.classList.toggle("is-diagram", s.layoutMode === "diagram");
    slideRoot.classList.toggle("is-map", s.layoutMode === "map");
    slideRoot.classList.toggle("is-compact", s.layoutMode === "compact");
    slideRoot.classList.toggle("is-case-tight", s.layoutMode === "case-tight");
    slideRoot.classList.toggle("is-orbit-hero", s.layoutMode === "orbit-hero");
    slideRoot.classList.toggle("is-constellation", s.layoutMode === "constellation-map");
    slideRoot.classList.toggle("is-diagonal", s.layoutMode === "diagonal-flow");
    slideRoot.classList.toggle("is-role-triangle", s.layoutMode === "role-triangle");
    slideRoot.classList.toggle("is-evidence-board", s.layoutMode === "evidence-board");
    slideRoot.classList.toggle("is-hub-skills", s.layoutMode === "hub-skills");
    slideRoot.classList.toggle("is-terminal", s.layoutMode === "terminal-triage");
    slideRoot.classList.toggle("is-contract", s.layoutMode === "contract-stack");
    slideRoot.classList.toggle("is-ring", s.layoutMode === "lifecycle-ring");
    slideRoot.classList.remove("overflow-1", "overflow-2");

    if (s.kicker) slideRoot.appendChild(el("div", "kicker", s.kicker));
    slideRoot.appendChild(el(s.title.length > 26 ? "h2" : "h1", "", s.title));

    if (s.context) {
      slideRoot.appendChild(el("p", "context", s.context));
    }

    if (s.body?.length) {
      for (const p of s.body) slideRoot.appendChild(el("p", "", p));
    }

    if (s.cards?.length) {
      renderBoardCards(slideRoot, s.cards);
    }

    if (s.terminal?.length) {
      renderTerminal(slideRoot, s.terminal);
    }

    if (s.stack?.length) {
      renderStack(slideRoot, s.stack);
    }

    if (s.pain) {
      slideRoot.appendChild(el("div", "case-pain", s.pain));
    }

    const contentWrap = s.aside && s.bullets ? el("div", "grid-2") : null;

    const bulletHost = s.bullets ? el("ul", "") : null;
    if (bulletHost) {
      for (const b of s.bullets) {
        const li = el("li", "");
        if (b.lead) {
          const strong = document.createElement("strong");
          strong.textContent = `${b.lead}: `;
          li.appendChild(strong);
        }
        li.appendChild(document.createTextNode(b.text));
        bulletHost.appendChild(li);
      }
    }

    if (s.aside) {
      const aside = el("aside", "aside");
      aside.appendChild(el("div", "aside-title", s.aside.title));
      const aul = el("ul", "");
      for (const t of s.aside.bullets) {
        const li = el("li", "");
        li.textContent = t;
        aul.appendChild(li);
      }
      aside.appendChild(aul);

      if (contentWrap && bulletHost) {
        contentWrap.appendChild(bulletHost);
        contentWrap.appendChild(aside);
        slideRoot.appendChild(contentWrap);
      } else {
        slideRoot.appendChild(aside);
      }
    } else if (bulletHost) {
      slideRoot.appendChild(bulletHost);
    }

    if (s.beforeAfter) {
      const grid = el("div", "ba-grid");
      const before = el("div", "ba-card");
      before.appendChild(el("div", "ba-title", "Before"));
      before.appendChild(el("div", "ba-text", s.beforeAfter.before || ""));
      const after = el("div", "ba-card");
      after.appendChild(el("div", "ba-title", "After"));
      after.appendChild(el("div", "ba-text", s.beforeAfter.after || ""));
      grid.appendChild(before);
      grid.appendChild(after);
      slideRoot.appendChild(grid);
    }

    if (s.diagram) {
      const wrap = el("div", "diagram");
      if (s.diagramSize === "xl") wrap.classList.add("is-xl");
      wrap.innerHTML = s.diagram;
      slideRoot.appendChild(wrap);
    }

    if (s.takeaway) {
      slideRoot.appendChild(el("div", "takeaway", s.takeaway));
    }

    requestAnimationFrame(() => {
      applyOverflowFix(slideRoot);
      applyEnterMotion(slideRoot);
    });

    counterCurrent.textContent = String(i + 1);
    prevLink.setAttribute("aria-disabled", i === 0 ? "true" : "false");
    nextLink.setAttribute("aria-disabled", i === slides.length - 1 ? "true" : "false");
  }

  function renderSlideInto(targetEl, i, opts = {}) {
    const s = slides[i];
    targetEl.innerHTML = "";
    targetEl.setAttribute("aria-label", `${i + 1} из ${slides.length}`);
    targetEl.classList.toggle("is-center", s.layout === "center");
    targetEl.classList.toggle("is-diagram", s.layoutMode === "diagram");
    targetEl.classList.toggle("is-map", s.layoutMode === "map");
    targetEl.classList.toggle("is-compact", s.layoutMode === "compact");
    targetEl.classList.toggle("is-case-tight", s.layoutMode === "case-tight");
    targetEl.classList.toggle("is-orbit-hero", s.layoutMode === "orbit-hero");
    targetEl.classList.toggle("is-constellation", s.layoutMode === "constellation-map");
    targetEl.classList.toggle("is-diagonal", s.layoutMode === "diagonal-flow");
    targetEl.classList.toggle("is-role-triangle", s.layoutMode === "role-triangle");
    targetEl.classList.toggle("is-evidence-board", s.layoutMode === "evidence-board");
    targetEl.classList.toggle("is-hub-skills", s.layoutMode === "hub-skills");
    targetEl.classList.toggle("is-terminal", s.layoutMode === "terminal-triage");
    targetEl.classList.toggle("is-contract", s.layoutMode === "contract-stack");
    targetEl.classList.toggle("is-ring", s.layoutMode === "lifecycle-ring");

    if (s.kicker) targetEl.appendChild(el("div", "kicker", s.kicker));
    targetEl.appendChild(el(s.title.length > 26 ? "h2" : "h1", "", s.title));

    if (s.context) {
      targetEl.appendChild(el("p", "context", s.context));
    }

    if (s.body?.length) {
      for (const p of s.body) targetEl.appendChild(el("p", "", p));
    }

    if (s.cards?.length) {
      renderBoardCards(targetEl, s.cards);
    }

    if (s.terminal?.length) {
      renderTerminal(targetEl, s.terminal);
    }

    if (s.stack?.length) {
      renderStack(targetEl, s.stack);
    }

    if (s.pain) {
      targetEl.appendChild(el("div", "case-pain", s.pain));
    }

    const contentWrap = s.aside && s.bullets ? el("div", "grid-2") : null;

    const bulletHost = s.bullets ? el("ul", "") : null;
    if (bulletHost) {
      for (const b of s.bullets) {
        const li = el("li", "");
        if (b.lead) {
          const strong = document.createElement("strong");
          strong.textContent = `${b.lead}: `;
          li.appendChild(strong);
        }
        li.appendChild(document.createTextNode(b.text));
        bulletHost.appendChild(li);
      }
    }

    if (s.aside) {
      const aside = el("aside", "aside");
      aside.appendChild(el("div", "aside-title", s.aside.title));
      const aul = el("ul", "");
      for (const t of s.aside.bullets) {
        const li = el("li", "");
        li.textContent = t;
        aul.appendChild(li);
      }
      aside.appendChild(aul);

      if (contentWrap && bulletHost) {
        contentWrap.appendChild(bulletHost);
        contentWrap.appendChild(aside);
        targetEl.appendChild(contentWrap);
      } else {
        targetEl.appendChild(aside);
      }
    } else if (bulletHost) {
      targetEl.appendChild(bulletHost);
    }

    if (s.beforeAfter) {
      const grid = el("div", "ba-grid");
      const before = el("div", "ba-card");
      before.appendChild(el("div", "ba-title", "Before"));
      before.appendChild(el("div", "ba-text", s.beforeAfter.before || ""));
      const after = el("div", "ba-card");
      after.appendChild(el("div", "ba-title", "After"));
      after.appendChild(el("div", "ba-text", s.beforeAfter.after || ""));
      grid.appendChild(before);
      grid.appendChild(after);
      targetEl.appendChild(grid);
    }

    if (s.diagram) {
      const wrap = el("div", "diagram");
      if (s.diagramSize === "xl") wrap.classList.add("is-xl");
      wrap.innerHTML = s.diagram;
      targetEl.appendChild(wrap);
    }

    if (s.takeaway) {
      targetEl.appendChild(el("div", "takeaway", s.takeaway));
    }

    if (!opts.suppressCounter) applyEnterMotion(targetEl);

    // In print mode we don't want dynamic overflow scaling.
    if (!opts.suppressCounter) requestAnimationFrame(() => applyOverflowFix(targetEl));

    if (!opts.suppressCounter) {
      counterCurrent.textContent = String(i + 1);
      prevLink.setAttribute("aria-disabled", i === 0 ? "true" : "false");
      nextLink.setAttribute("aria-disabled", i === slides.length - 1 ? "true" : "false");
    }
  }

  function applyOverflowFix(targetEl) {
    // Only needed on shorter screens.
    if (window.innerHeight > 820) return;
    const tooTall = () => targetEl.scrollHeight > targetEl.clientHeight + 2;

    // Apply baseline compact scale for *all* slides on low-height screens,
    // then escalate only if still overflowing.
    targetEl.classList.add("overflow-1");
    if (!tooTall()) return;
    targetEl.classList.add("overflow-2");
  }

  function enterPrintMode() {
    deckRoot?.classList.add("is-print");
    slideRoot.remove();

    for (let i = 0; i < slides.length; i += 1) {
      const section = document.createElement("section");
      section.className = "slide print-slide";
      section.setAttribute("role", "group");
      section.setAttribute("aria-roledescription", "slide");
      renderSlideInto(section, i, { suppressCounter: true });
      deckRoot.appendChild(section);
    }
  }

  function move(delta) {
    const i = getIndexFromHash();
    const next = clamp(i + delta, 0, slides.length - 1);
    if (next === i) return;
    setHashFromIndex(next);
  }

  const url = new URL(window.location.href);
  const isPrint = url.searchParams.get("print") === "1";

  if (!isPrint) {
    window.addEventListener("hashchange", () => renderSlide(getIndexFromHash()));
  }

  window.addEventListener("keydown", (e) => {
    if (isPrint) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      move(+1);
    }
    if (e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "PageUp") {
      e.preventDefault();
      move(-1);
    }
    if (e.key === "Home") {
      e.preventDefault();
      setHashFromIndex(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setHashFromIndex(slides.length - 1);
    }
  });

  prevLink.addEventListener("click", (e) => {
    if (isPrint) return;
    e.preventDefault();
    move(-1);
  });

  nextLink.addEventListener("click", (e) => {
    if (isPrint) return;
    e.preventDefault();
    move(+1);
  });

  // Initial render
  if (isPrint) {
    enterPrintMode();
  } else {
    if (!window.location.hash) setHashFromIndex(0);
    renderSlide(getIndexFromHash());
  }

  function diagramChain(labels, opts = {}) {
    const size = opts.size || "md";
    const padX = 18;
    const nodeW = size === "xl" ? 188 : 165;
    const nodeH = size === "xl" ? 52 : 44;
    const gap = size === "xl" ? 22 : 18;
    const fontSize = size === "xl" ? 14 : 13;
    const height = size === "xl" ? 160 : 120;
    const width = padX * 2 + labels.length * nodeW + (labels.length - 1) * gap;
    const y = size === "xl" ? 56 : 38;

    const nodes = labels
      .map((t, idx) => {
        const x = padX + idx * (nodeW + gap);
        const nextX = x + nodeW + gap;
        const arrow =
          idx < labels.length - 1
            ? `<path d="M ${x + nodeW} ${y + nodeH / 2} L ${nextX - 8} ${y + nodeH / 2}" stroke="rgba(255,255,255,0.34)" stroke-width="2" fill="none"/>
               <path d="M ${nextX - 12} ${y + nodeH / 2 - 5} L ${nextX - 4} ${y + nodeH / 2} L ${nextX - 12} ${y + nodeH / 2 + 5}" fill="rgba(255,255,255,0.34)"/>`
            : "";
        return `
          <g>
            <rect x="${x}" y="${y}" rx="14" ry="14" width="${nodeW}" height="${nodeH}"
              fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)"/>
            <text x="${x + nodeW / 2}" y="${y + (nodeH / 2 + 6)}" text-anchor="middle"
              font-family="Manrope, system-ui" font-size="${fontSize}" fill="rgba(255,255,255,0.82)">${escapeSvg(
                t
              )}</text>
            ${arrow}
          </g>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Схема пайплайна">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(124,92,255,0.55)"/>
          <stop offset="1" stop-color="rgba(37,214,199,0.45)"/>
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="18" fill="rgba(0,0,0,0.0)" stroke="rgba(255,255,255,0.06)"/>
      <path d="M 24 20 C ${width * 0.35} 2, ${width * 0.65} 2, ${width - 24} 20" stroke="url(#g1)" stroke-width="2" fill="none" opacity="0.8"/>
      ${nodes}
    </svg>`;
  }

  function diagramLoop(labels, caption) {
    const width = 980;
    const height = 250;
    const nodeW = 178;
    const nodeH = 48;
    const fontSize = 14;

    const pts = [
      { x: 490, y: 52 },
      { x: 820, y: 108 },
      { x: 700, y: 186 },
      { x: 280, y: 186 },
      { x: 160, y: 108 },
    ];

    const nodes = labels
      .map((t, i) => {
        const p = pts[i];
        const x = p.x - nodeW / 2;
        const y = p.y - nodeH / 2;
        return `
          <g>
            <rect x="${x}" y="${y}" rx="14" ry="14" width="${nodeW}" height="${nodeH}"
              fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)"/>
            <text x="${p.x}" y="${p.y + 7}" text-anchor="middle"
              font-family="Manrope, system-ui" font-size="${fontSize}" fill="rgba(255,255,255,0.82)">${escapeSvg(
                t
              )}</text>
          </g>`;
      })
      .join("");

    const edgePoint = (from, to) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      return { x: from.x + ux * (nodeW / 2), y: from.y + uy * (nodeH / 2) };
    };

    const arrows = labels
      .map((_, i) => {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const start = edgePoint(a, b);
        const end = edgePoint(b, a);
        const mx = (start.x + end.x) / 2;
        const my = (start.y + end.y) / 2;
        const bend = i % 2 === 0 ? -18 : 18;
        return `<path d="M ${start.x} ${start.y} Q ${mx} ${my + bend} ${end.x} ${end.y}" stroke="rgba(255,255,255,0.24)" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Схема feedback loop">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.26)"/>
        </marker>
        <linearGradient id="loopg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(124,92,255,0.45)"/>
          <stop offset="1" stop-color="rgba(37,214,199,0.40)"/>
        </linearGradient>
      </defs>
      <circle cx="490" cy="122" r="66" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)"/>
      <path d="M 424 122 A 66 66 0 1 0 540 92" stroke="url(#loopg)" stroke-width="3" fill="none" opacity="0.9"/>
      <text x="490" y="118" text-anchor="middle" font-family="Manrope, system-ui" font-size="13" fill="rgba(255,255,255,0.86)">Feedback</text>
      <text x="490" y="136" text-anchor="middle" font-family="Manrope, system-ui" font-size="12" fill="rgba(255,255,255,0.70)">loop</text>
      ${arrows}
      ${nodes}
      <text x="490" y="${height - 22}" text-anchor="middle"
        font-family="Manrope, system-ui" font-size="13" fill="rgba(255,255,255,0.70)">${escapeSvg(
          caption
        )}</text>
    </svg>`;
  }

  function diagramLoopXL(labels, caption) {
    const width = 980;
    const height = 360;
    const nodeW = 210;
    const nodeH = 56;
    const fontSize = 16;

    const pts = [
      { x: 490, y: 66 },
      { x: 850, y: 146 },
      { x: 720, y: 266 },
      { x: 260, y: 266 },
      { x: 130, y: 146 },
    ];

    const nodes = labels
      .map((t, i) => {
        const p = pts[i];
        const x = p.x - nodeW / 2;
        const y = p.y - nodeH / 2;
        return `
          <g>
            <rect x="${x}" y="${y}" rx="16" ry="16" width="${nodeW}" height="${nodeH}"
              fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.16)"/>
            <text x="${p.x}" y="${p.y + 8}" text-anchor="middle"
              font-family="Manrope, system-ui" font-size="${fontSize}" fill="rgba(255,255,255,0.86)">${escapeSvg(
                t
              )}</text>
          </g>`;
      })
      .join("");

    const edgePoint = (from, to) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      return { x: from.x + ux * (nodeW / 2), y: from.y + uy * (nodeH / 2) };
    };

    const arrows = labels
      .map((_, i) => {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const start = edgePoint(a, b);
        const end = edgePoint(b, a);
        const mx = (start.x + end.x) / 2;
        const my = (start.y + end.y) / 2;
        const bend = i % 2 === 0 ? -22 : 22;
        return `<path d="M ${start.x} ${start.y} Q ${mx} ${my + bend} ${end.x} ${end.y}" stroke="rgba(255,255,255,0.26)" stroke-width="2.4" fill="none" marker-end="url(#arrow)"/>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Схема feedback loop (крупно)">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.28)"/>
        </marker>
        <linearGradient id="loopgxl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(124,92,255,0.45)"/>
          <stop offset="1" stop-color="rgba(37,214,199,0.40)"/>
        </linearGradient>
      </defs>
      <circle cx="490" cy="175" r="88" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)"/>
      <path d="M 402 175 A 88 88 0 1 0 560 132" stroke="url(#loopgxl)" stroke-width="3.2" fill="none" opacity="0.9"/>
      <text x="490" y="170" text-anchor="middle" font-family="Manrope, system-ui" font-size="16" fill="rgba(255,255,255,0.90)">Evidence‑first</text>
      <text x="490" y="192" text-anchor="middle" font-family="Manrope, system-ui" font-size="13" fill="rgba(255,255,255,0.72)">feedback loop</text>
      ${arrows}
      ${nodes}
      <text x="490" y="${height - 22}" text-anchor="middle"
        font-family="Manrope, system-ui" font-size="13" fill="rgba(255,255,255,0.72)">${escapeSvg(
          caption
        )}</text>
    </svg>`;
  }

  // (tone helpers moved to top of file)

  function diagramCoverageMap() {
    const width = 980;
    const height = 360;
    const nodeW = 200;
    const nodeH = 54;
    const fontSize = 15;

    const nodes = [
      { id: "PDF/Spec", x: 490, y: 56 },
      { id: "REQ‑cards", x: 260, y: 140 },
      { id: "Gaps/Questions", x: 720, y: 140 },
      { id: "Checks", x: 490, y: 160, w: 210, h: 60 },
      { id: "Suites", x: 720, y: 250 },
      { id: "Coverage matrix", x: 260, y: 250 },
      { id: "YAML contract", x: 490, y: 294 },
      { id: "Validator/Repair/Reviewer", x: 490, y: 336 },
    ];

    const byId = new Map(nodes.map((n) => [n.id, n]));
    const getWH = (n) => ({ w: n.w || nodeW, h: n.h || nodeH });
    const edgePoint = (from, to) => {
      const f = byId.get(from);
      const t = byId.get(to);
      if (!f || !t) return { x1: 0, y1: 0, x2: 0, y2: 0 };
      const fw = getWH(f).w;
      const fh = getWH(f).h;
      const tw = getWH(t).w;
      const th = getWH(t).h;
      const dx = t.x - f.x;
      const dy = t.y - f.y;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      return {
        x1: f.x + ux * (fw / 2),
        y1: f.y + uy * (fh / 2),
        x2: t.x - ux * (tw / 2),
        y2: t.y - uy * (th / 2),
      };
    };

    const links = [
      ["PDF/Spec", "REQ‑cards"],
      ["PDF/Spec", "Gaps/Questions"],
      ["REQ‑cards", "Checks"],
      ["Gaps/Questions", "Checks"],
      ["Checks", "Suites"],
      ["Checks", "Coverage matrix"],
      ["Suites", "YAML contract"],
      ["Coverage matrix", "YAML contract"],
      ["YAML contract", "Validator/Repair/Reviewer"],
    ];

    const paths = links
      .map(([a, b]) => {
        const p = edgePoint(a, b);
        const mx = (p.x1 + p.x2) / 2;
        const my = (p.y1 + p.y2) / 2;
        const bend = a === "PDF/Spec" ? -10 : 0;
        return `<path d="M ${p.x1} ${p.y1} Q ${mx} ${my + bend} ${p.x2} ${p.y2}" stroke="rgba(255,255,255,0.24)" stroke-width="2.2" fill="none" marker-end="url(#arr)"/>`;
      })
      .join("");

    const toneFor = (id) => {
      if (id === "PDF/Spec") return "input";
      if (id === "REQ‑cards") return "agent";
      if (id === "Gaps/Questions") return "risk";
      if (id === "Checks") return "agent";
      if (id === "Suites" || id === "Coverage matrix" || id === "YAML contract") return "output";
      if (id === "Validator/Repair/Reviewer") return "human";
      return "neutral";
    };

    const draw = nodes
      .map((n) => {
        const { w, h } = getWH(n);
        const x = n.x - w / 2;
        const y = n.y - h / 2;
        const tone = toneFor(n.id);
        const isGate = n.id === "Validator/Repair/Reviewer";
        const fill = toneFill(tone, isGate ? 0.16 : 0.11);
        const stroke = toneStroke(tone, isGate ? 0.55 : 0.42);
        const dash = isGate ? 'stroke-dasharray="6 8"' : "";
        const cap = isGate ? "QUALITY GATE" : null;
        return `
          <g>
            <rect x="${x}" y="${y}" rx="16" ry="16" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${
              isGate ? 2.2 : 1.8
            }" ${dash}/>
            ${
              cap
                ? `<text x="${n.x}" y="${n.y - 12}" text-anchor="middle" font-family="Manrope, system-ui" font-size="11" fill="rgba(255,255,255,0.62)">${cap}</text>`
                : ""
            }
            <text x="${n.x}" y="${n.y + 7}" text-anchor="middle"
              font-family="Manrope, system-ui" font-size="${fontSize}" fill="rgba(255,255,255,0.86)">${escapeSvg(
                n.id
              )}</text>
          </g>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Карта покрытия требований">
      <defs>
        <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.28)"/>
        </marker>
      </defs>
      <rect x="12" y="12" width="${width - 24}" height="${height - 24}" rx="18" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.06)"/>
      ${paths}
      ${draw}
    </svg>`;
  }

  function diagramWeb(model) {
    const width = 980;
    const height = 360;
    const nodeW = 200;
    const nodeH = 50;
    const fontSize = 14;

    const center = { id: model.center, x: 490, y: 170, w: 140, h: 56 };
    const nodePos = new Map();
    nodePos.set(model.center, center);
    const mk = (id, x, y) => ({ id, x, y, w: nodeW, h: nodeH });

    const layoutRow = (ids, y, margin = 120) => {
      if (ids.length === 1) return [mk(ids[0], width / 2, y)];
      const span = width - margin * 2;
      const step = span / (ids.length - 1);
      return ids.map((id, i) => mk(id, margin + i * step, y));
    };

    const top = layoutRow(model.top, 58, 190);
    const mid = layoutRow(model.mid, 140, 130);
    const bottom = layoutRow(model.bottom, 276, 110);
    for (const n of [...top, ...mid, ...bottom]) nodePos.set(n.id, n);

    const isCenterLink = (a, b) => a === model.center || b === model.center;

    const lines = (model.links || [])
      .map(([a, b]) => {
        const na = nodePos.get(a);
        const nb = nodePos.get(b);
        if (!na || !nb) return "";
        const mx = (na.x + nb.x) / 2;
        const my = (na.y + nb.y) / 2;
        const secondary = !isCenterLink(a, b);
        const bend = secondary ? -14 : 0;
        const dash = secondary ? 'class="conn dash"' : 'class="conn"';
        const opacity = secondary ? 0.18 : 0.26;
        return `<path ${dash} d="M ${na.x} ${na.y} Q ${mx} ${my + bend} ${nb.x} ${nb.y}" stroke="rgba(255,255,255,${opacity})" stroke-width="${
          secondary ? 1.7 : 2.2
        }" fill="none"/>`;
      })
      .join("");

    const toneFor = (id) => {
      if (id === model.center) return "human";
      const allInputs = new Set([...(model.top || [])]);
      const allProcess = new Set([...(model.mid || [])]);
      const allOutputs = new Set([...(model.bottom || [])]);
      if (allInputs.has(id)) return "input";
      if (allProcess.has(id)) return "agent";
      if (allOutputs.has(id)) return "output";
      return "neutral";
    };

    const drawNode = (n, isCenter = false) => {
      const x = n.x - n.w / 2;
      const y = n.y - n.h / 2;
      const tone = toneFor(n.id);
      const fill = toneFill(tone, isCenter ? 0.18 : 0.10);
      const stroke = toneStroke(tone, isCenter ? 0.55 : 0.35);
      return `
        <g>
          <rect x="${x}" y="${y}" rx="16" ry="16" width="${n.w}" height="${n.h}" fill="${fill}" stroke="${stroke}"/>
          <text x="${n.x}" y="${n.y + 6}" text-anchor="middle"
            font-family="Manrope, system-ui" font-size="${fontSize}" fill="rgba(255,255,255,0.84)">${escapeSvg(n.id)}</text>
        </g>
      `;
    };

    const nodesSvg = [
      drawNode(center, true),
      ...top.map((n) => drawNode(n)),
      ...mid.map((n) => drawNode(n)),
      ...bottom.map((n) => drawNode(n)),
    ].join("");

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Карта QA × AI">
      <defs>
        <linearGradient id="webg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(124,92,255,0.35)"/>
          <stop offset="1" stop-color="rgba(37,214,199,0.25)"/>
        </linearGradient>
      </defs>
      <rect x="12" y="12" width="${width - 24}" height="${height - 24}" rx="18" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.06)"/>
      <path d="M 28 26 C 340 0, 640 0, ${width - 28} 26" stroke="url(#webg)" stroke-width="2" fill="none" opacity="0.8"/>
      ${lines}
      ${nodesSvg}
    </svg>`;
  }

  function diagramAgentSkills() {
    const width = 980;
    const height = 310;
    const fontSize = 13;

    const box = (x, y, w, h, title, items) => {
      const ix = x + 14;
      const iy = y + 36;
      const lines = items
        .slice(0, 8)
        .map(
          (t, i) => {
            const fs = String(t).length > 70 ? 11 : fontSize;
            return `<text x="${ix}" y="${iy + i * 18}" font-family="Manrope, system-ui" font-size="${fs}" fill="rgba(255,255,255,0.78)">${escapeSvg(
              t
            )}</text>`;
          }
        )
        .join("");
      return `
        <g>
          <rect x="${x}" y="${y}" rx="16" ry="16" width="${w}" height="${h}" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>
          <text x="${x + 14}" y="${y + 24}" font-family="Manrope, system-ui" font-size="14" fill="rgba(255,255,255,0.88)">${escapeSvg(
            title
          )}</text>
          ${lines}
        </g>
      `;
    };

    const agent = `
      <g>
        <rect x="388" y="104" rx="18" ry="18" width="204" height="92" fill="rgba(124,92,255,0.14)" stroke="rgba(124,92,255,0.42)"/>
        <text x="490" y="138" text-anchor="middle" font-family="Manrope, system-ui" font-size="14" fill="rgba(255,255,255,0.92)">RegressionPlanningAgent</text>
        <text x="490" y="162" text-anchor="middle" font-family="Manrope, system-ui" font-size="12" fill="rgba(255,255,255,0.72)">selects skills by input</text>
      </g>
    `;

    const inputs = box(34, 56, 292, 198, "Inputs", [
      "Regression checklist / suite",
      "Qase suite / cases",
      "Release notes / Jira",
      "Docs diff / code diff",
      "Bug history / customer issues",
      "Flaky list / run history",
      "Platform matrix",
      "Product analytics (optional)",
    ]);

    const skills = box(654, 36, 292, 238, "Skills", [
      "regression-planning (core)",
      "change-impact-analysis",
      "qase-regression-analysis",
      "flaky-test-triage",
      "automation-candidate-analysis",
      "qa-summary-reporter",
    ]);

    const outputs = box(364, 214, 582, 74, "Outputs", [
      "Smoke • CriticalPath • HighRisk • PlatformMatrix",
      "AutomationCandidates • OpenQuestions • FinalRecommendation",
    ]);

    const arrows = `
      <defs>
        <marker id="arr2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.26)"/>
        </marker>
        <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(124,92,255,0.35)"/>
          <stop offset="1" stop-color="rgba(37,214,199,0.25)"/>
        </linearGradient>
      </defs>
      <path d="M 326 150 L 388 150" stroke="rgba(255,255,255,0.26)" stroke-width="2" fill="none" marker-end="url(#arr2)"/>
      <path d="M 592 150 L 654 150" stroke="rgba(255,255,255,0.26)" stroke-width="2" fill="none" marker-end="url(#arr2)"/>
      <path d="M 490 196 L 490 214" stroke="url(#ag)" stroke-width="3" fill="none" marker-end="url(#arr2)"/>
    `;

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Архитектура regression planning">
      <rect x="12" y="12" width="${width - 24}" height="${height - 24}" rx="18" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.06)"/>
      ${arrows}
      ${inputs}
      ${agent}
      ${skills}
      ${outputs}
    </svg>`;
  }

  function diagramOrbitHero(model) {
    const width = 980;
    const height = 420;
    const cx = width / 2;
    const cy = height / 2 + 12;
    const r = 150;
    const nodes = model?.nodes || [];

    const pts = nodes.map((t, i) => {
      const a = (Math.PI * 2 * i) / Math.max(1, nodes.length) - Math.PI / 2;
      return { t, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
    });

    const lines = pts
      .map(
        (p) =>
          `<path class="conn dash" d="M ${cx} ${cy} L ${p.x} ${p.y}" stroke="rgba(255,255,255,0.16)" stroke-width="1.6" fill="none"/>`
      )
      .join("");

    const orbit = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>`;

    const nodeSvg = pts
      .map((p, i) => {
        const w = 150;
        const h = 44;
        const x = p.x - w / 2;
        const y = p.y - h / 2;
        const phase = (i % 6) * 0.7;
        return `<g class="float" style="--ph:${phase}s">
          <rect x="${x}" y="${y}" rx="14" width="${w}" height="${h}" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
          <text x="${p.x}" y="${p.y + 7}" text-anchor="middle" font-family="Manrope, system-ui" font-size="14" fill="rgba(255,255,255,0.82)">${escapeSvg(
            p.t
          )}</text>
        </g>`;
      })
      .join("");

    const center = `<g>
      <circle cx="${cx}" cy="${cy}" r="52" fill="rgba(124,92,255,0.14)" stroke="rgba(124,92,255,0.45)" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="40" fill="rgba(0,0,0,0.12)" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
      <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-family="Manrope, system-ui" font-size="15" font-weight="700" fill="rgba(255,255,255,0.92)">${escapeSvg(
        model?.center || "QA Engineer"
      )}</text>
    </g>`;

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="QA orbit">
      <defs>
        <linearGradient id="orbG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(124,92,255,0.65)"/>
          <stop offset="1" stop-color="rgba(37,214,199,0.55)"/>
        </linearGradient>
      </defs>
      <path d="M 40 46 C 240 8, 740 8, 940 46" stroke="url(#orbG)" stroke-width="2" fill="none" opacity="0.85"/>
      ${orbit}
      ${lines}
      ${nodeSvg}
      ${center}
    </svg>`;
  }

  function diagramConstellationMap(model) {
    const width = 980;
    const height = 420;
    const leftX = 280;
    const rightX = 700;
    const yTop = 120;
    const gapY = 74;

    const left = (model?.left || []).map((t, i) => ({ t, x: leftX, y: yTop + i * gapY }));
    const right = (model?.right || []).map((t, i) => ({ t, x: rightX, y: yTop + i * gapY }));

    const all = [...left, ...right];

    const connectors = [
      ...left.map((p) => `<path class="conn dash" d="M ${p.x} ${p.y} C ${p.x + 90} ${p.y - 10}, ${rightX - 90} ${p.y - 10}, ${rightX} ${p.y}" />`),
      `<path class="conn dash" d="M ${leftX} ${left[left.length - 1]?.y || 0} C ${leftX + 120} ${height - 70}, ${
        rightX - 120
      } ${height - 70}, ${rightX} ${right[right.length - 1]?.y || 0}" />`,
    ].join("");

    const title = `<text x="${leftX}" y="78" text-anchor="middle" font-family="Manrope, system-ui" font-size="13" fill="rgba(255,255,255,0.58)">${escapeSvg(
      model?.leftTitle || "Part 1"
    )}</text>
    <text x="${rightX}" y="78" text-anchor="middle" font-family="Manrope, system-ui" font-size="13" fill="rgba(255,255,255,0.58)">${escapeSvg(
      model?.rightTitle || "Part 2"
    )}</text>`;

    const nodes = all
      .map((p, i) => {
        const phase = (i % 5) * 0.65;
        return `<g class="float" style="--ph:${phase}s">
          <circle cx="${p.x}" cy="${p.y}" r="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
          <text x="${p.x}" y="${p.y + 5}" text-anchor="middle" font-family="Manrope, system-ui" font-size="13" font-weight="700" fill="rgba(255,255,255,0.86)">${escapeSvg(
            p.t
          )}</text>
        </g>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Cases constellation">
      <defs>
        <linearGradient id="cG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(37,214,199,0.40)"/>
          <stop offset="1" stop-color="rgba(124,92,255,0.40)"/>
        </linearGradient>
      </defs>
      <path d="M 40 46 C 240 8, 740 8, 940 46" stroke="url(#cG)" stroke-width="2" fill="none" opacity="0.8"/>
      <g stroke="rgba(255,255,255,0.14)" stroke-width="1.6" fill="none">
        ${connectors}
      </g>
      ${title}
      ${nodes}
    </svg>`;
  }

  function diagramDiagonalFlow(labels) {
    const width = 980;
    const nodeW = 170;
    const nodeH = 48;
    const startX = 120;
    const startY = 60;
    const stepX = 150;
    const stepY = 46;
    const height = Math.max(340, startY + (labels.length - 1) * stepY + nodeH + 28);

    const pts = labels.map((t, i) => ({
      t,
      x: startX + i * stepX,
      y: startY + i * stepY,
    }));

    const arrows = pts
      .slice(0, -1)
      .map((p, i) => {
        const n = pts[i + 1];
        const x1 = p.x + nodeW - 6;
        const y1 = p.y + nodeH / 2;
        const x2 = n.x + 6;
        const y2 = n.y + nodeH / 2;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2 - 18;
        return `<path class="conn dash" d="M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}" stroke="rgba(255,255,255,0.22)" stroke-width="2" fill="none" marker-end="url(#arr)"/>`;
      })
      .join("");

    const nodes = pts
      .map((p, i) => {
        const phase = (i % 5) * 0.6;
        return `<g class="float" style="--ph:${phase}s">
          <rect x="${p.x}" y="${p.y}" rx="16" width="${nodeW}" height="${nodeH}" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)"/>
          <text x="${p.x + nodeW / 2}" y="${p.y + (nodeH / 2 + 6)}" text-anchor="middle" font-family="Manrope, system-ui" font-size="14" font-weight="700" fill="rgba(255,255,255,0.84)">${escapeSvg(
            p.t
          )}</text>
        </g>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Diagonal flow">
      <defs>
        <marker id="arr" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="rgba(255,255,255,0.28)"/>
        </marker>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feColorMatrix in="blur" type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 0.35 0" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="dG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(124,92,255,0.55)"/>
          <stop offset="1" stop-color="rgba(255,202,92,0.30)"/>
        </linearGradient>
      </defs>
      <path d="M 60 48 C 220 10, 760 10, 920 48" stroke="url(#dG)" stroke-width="2" fill="none" opacity="0.8"/>
      ${arrows}
      ${nodes}
    </svg>`;
  }

  function diagramRoleTriangle(model) {
    const width = 980;
    const height = 360;
    const A = { x: 490, y: 82, t: model?.a || "Planner" };
    const B = { x: 690, y: 220, t: model?.b || "Dev agent" };
    const C = { x: 290, y: 220, t: model?.c || "Reviewer" };
    const center = { x: 490, y: 198, t: model?.center || "Quality gate" };
    const bottom = { x: 490, y: 300, t: model?.bottom || "Approved" };

    const node = (p, tone, i) => {
      const w = 178;
      const h = 52;
      const x = p.x - w / 2;
      const y = p.y - h / 2;
      const phase = (i % 5) * 0.55;
      return `<g class="float ${tone || ""}" style="--ph:${phase}s">
        <rect x="${x}" y="${y}" rx="16" width="${w}" height="${h}" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)"/>
        <text x="${p.x}" y="${p.y + 7}" text-anchor="middle" font-family="Manrope, system-ui" font-size="14" font-weight="700" fill="rgba(255,255,255,0.86)">${escapeSvg(
          p.t
        )}</text>
      </g>`;
    };

    const arrows = [
      [A, B],
      [B, C],
      [C, A],
    ]
      .map((pair) => {
        const [p, q] = pair;
        const mx = (p.x + q.x) / 2;
        const my = (p.y + q.y) / 2;
        return `<path class="conn dash" d="M ${p.x} ${p.y} Q ${mx} ${my - 18} ${q.x} ${q.y}" stroke="rgba(255,255,255,0.22)" stroke-width="2" fill="none" marker-end="url(#arrT)"/>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Role triangle">
      <defs>
        <marker id="arrT" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="rgba(255,255,255,0.28)"/>
        </marker>
        <linearGradient id="tG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(37,214,199,0.45)"/>
          <stop offset="1" stop-color="rgba(124,92,255,0.45)"/>
        </linearGradient>
      </defs>
      <path d="M 60 48 C 220 10, 760 10, 920 48" stroke="url(#tG)" stroke-width="2" fill="none" opacity="0.8"/>
      ${arrows}
      ${node(A, "ai", 0)}
      ${node(B, "ai", 1)}
      ${node(C, "human", 2)}
      <g>
        <circle cx="${center.x}" cy="${center.y}" r="44" fill="rgba(110,231,168,0.10)" stroke="rgba(110,231,168,0.38)" stroke-width="2"/>
        <text x="${center.x}" y="${center.y + 5}" text-anchor="middle" font-family="Manrope, system-ui" font-size="13" font-weight="700" fill="rgba(255,255,255,0.88)">${escapeSvg(
          center.t
        )}</text>
      </g>
      <g>
        <rect x="${bottom.x - 110}" y="${bottom.y - 22}" rx="16" width="220" height="44" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>
        <text x="${bottom.x}" y="${bottom.y + 7}" text-anchor="middle" font-family="Manrope, system-ui" font-size="14" font-weight="700" fill="rgba(255,255,255,0.88)">${escapeSvg(
          bottom.t
        )}</text>
      </g>
    </svg>`;
  }

  function diagramChangeImpactForkJoin() {
    const width = 980;
    const height = 360;

    const defs = `<defs>
      <marker id="arrS" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.26)"/>
      </marker>
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.35 0" result="glow"/>
        <feMerge>
          <feMergeNode in="glow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="ciG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${toneStroke("input", 0.55)}"/>
        <stop offset="1" stop-color="${toneStroke("agent", 0.55)}"/>
      </linearGradient>
    </defs>`;

    const leftA = { x: 120, y: 92, w: 180, h: 52, text: "Doc diff", tone: "input" };
    const leftB = { x: 120, y: 168, w: 180, h: 52, text: "Code diff", tone: "input" };
    const agent = { x: 360, y: 126, w: 220, h: 66, text: "Impact agent", tone: "agent", emphasis: true };

    const out = [
      { x: 650, y: 72, w: 240, h: 52, text: "Risk areas", tone: "risk" },
      { x: 650, y: 138, w: 240, h: 52, text: "Affected", tone: "risk" },
      { x: 650, y: 204, w: 240, h: 52, text: "Minimal checks", tone: "agent" },
      { x: 650, y: 270, w: 240, h: 52, text: "Updated plan", tone: "output" },
    ];

    const nodes = [
      svgNode({ ...leftA, x: leftA.x, y: leftA.y }),
      svgNode({ ...leftB, x: leftB.x, y: leftB.y }),
      svgNode({ ...agent, x: agent.x, y: agent.y }),
      ...out.map((n) => svgNode({ ...n, x: n.x, y: n.y })),
    ].join("");

    const a1 = svgArrowPath({
      d: `M ${leftA.x + leftA.w} ${leftA.y + leftA.h / 2} C 300 ${leftA.y + 20}, 320 ${agent.y + 10}, ${agent.x} ${
        agent.y + agent.h / 2
      }`,
      tone: "input",
      width: 2.2,
      dashed: false,
      opacity: 0.36,
    });
    const a2 = svgArrowPath({
      d: `M ${leftB.x + leftB.w} ${leftB.y + leftB.h / 2} C 300 ${leftB.y + 20}, 320 ${agent.y + agent.h - 10}, ${agent.x} ${
        agent.y + agent.h / 2
      }`,
      tone: "input",
      width: 2.2,
      dashed: false,
      opacity: 0.36,
    });

    const outs = out
      .map((n, i) =>
        svgArrowPath({
          d: `M ${agent.x + agent.w} ${agent.y + agent.h / 2} C 610 ${agent.y + 50 + i * 4}, 620 ${n.y + 10}, ${n.x} ${
            n.y + n.h / 2
          }`,
          tone: "agent",
          width: 2.0,
          dashed: i < 2,
          opacity: i < 2 ? 0.22 : 0.30,
        })
      )
      .join("");

    const header = `<path d="M 60 48 C 220 10, 760 10, 920 48" stroke="url(#ciG)" stroke-width="2" fill="none" opacity="0.8"/>`;

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Change impact fork/join">
      ${defs}
      ${header}
      ${a1}
      ${a2}
      ${outs}
      ${nodes}
    </svg>`;
  }

  function diagramAutotestsTriangle() {
    // Qase case as input, Approved as output; dashed fix loop Reviewer -> Dev.
    const width = 980;
    const height = 380;
    const defs = `<defs>
      <marker id="arrS" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.26)"/>
      </marker>
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.35 0" result="glow"/>
        <feMerge>
          <feMergeNode in="glow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="atG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${toneStroke("input", 0.55)}"/>
        <stop offset="1" stop-color="${toneStroke("output", 0.55)}"/>
      </linearGradient>
    </defs>`;

    const qase = { x: 110, y: 168, w: 170, h: 52, text: "Qase case", tone: "input" };
    const A = { x: 400, y: 78, w: 190, h: 56, text: "Planner", tone: "agent" };
    const B = { x: 640, y: 206, w: 190, h: 56, text: "Dev agent", tone: "agent" };
    const C = { x: 340, y: 206, w: 190, h: 56, text: "Reviewer", tone: "human" };
    const gate = { x: 470, y: 158, w: 160, h: 56, text: "Quality gate", tone: "human", emphasis: true };
    const out = { x: 770, y: 294, w: 180, h: 52, text: "PR ready", tone: "output" };

    const nodes = [
      svgNode(qase),
      svgNode(A),
      svgNode(B),
      svgNode(C),
      svgNode(gate),
      svgNode(out),
    ].join("");

    const arrows = [
      svgArrowPath({ d: `M ${qase.x + qase.w} ${qase.y + 26} C 300 178, 320 120, ${A.x} ${A.y + 28}`, tone: "input", width: 2.2, opacity: 0.34 }),
      svgArrowPath({ d: `M ${A.x + A.w / 2} ${A.y + A.h} Q 520 168 ${B.x + 10} ${B.y + 10}`, tone: "agent", width: 2.0, opacity: 0.30 }),
      svgArrowPath({ d: `M ${B.x} ${B.y + 28} Q 520 254 ${C.x + C.w} ${C.y + 28}`, tone: "agent", width: 2.0, opacity: 0.26 }),
      svgArrowPath({ d: `M ${C.x + 40} ${C.y} Q 450 132 ${A.x + 40} ${A.y + A.h}`, tone: "human", width: 2.0, opacity: 0.26 }),
      // quality gate links
      svgArrowPath({ d: `M ${A.x + A.w} ${A.y + 28} L ${gate.x} ${gate.y + 28}`, tone: "human", width: 2.0, opacity: 0.30 }),
      svgArrowPath({ d: `M ${gate.x + gate.w} ${gate.y + 28} L ${B.x} ${B.y + 28}`, tone: "human", width: 2.0, opacity: 0.30 }),
      svgArrowPath({ d: `M ${B.x + B.w} ${B.y + 28} C 830 236, 860 268, ${out.x} ${out.y + 26}`, tone: "output", width: 2.2, opacity: 0.34 }),
      // dashed fix loop Reviewer -> Dev
      svgArrowPath({
        d: `M ${C.x + C.w} ${C.y + 28} C 520 320, 600 320, ${B.x} ${B.y + 28}`,
        tone: "risk",
        width: 2.0,
        dashed: true,
        opacity: 0.22,
      }),
    ].join("");

    const header = `<path d="M 60 48 C 220 10, 760 10, 920 48" stroke="url(#atG)" stroke-width="2" fill="none" opacity="0.8"/>`;

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Autotests role triangle">
      ${defs}
      ${header}
      ${arrows}
      ${nodes}
    </svg>`;
  }

  function diagramRegressionPlanningAgent() {
    const width = 980;
    const height = 420;
    const defs = `<defs>
      <marker id="arrS" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.26)"/>
      </marker>
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.35 0" result="glow"/>
        <feMerge>
          <feMergeNode in="glow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="rpG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${toneStroke("input", 0.50)}"/>
        <stop offset="1" stop-color="${toneStroke("output", 0.50)}"/>
      </linearGradient>
    </defs>`;

    const center = { x: 410, y: 160, w: 160, h: 64, text: "Regression agent", tone: "agent", emphasis: true };

    const left = [
      { text: "Qase", tone: "input" },
      { text: "Release notes", tone: "input" },
      { text: "Flaky list", tone: "risk" },
      { text: "Bug history", tone: "input" },
      { text: "Platforms", tone: "input" },
    ].map((n, i) => ({ ...n, x: 90, y: 66 + i * 60, w: 200, h: 50 }));

    const right = [
      { text: "Smoke", tone: "output" },
      { text: "Critical path", tone: "output" },
      { text: "High risk", tone: "risk" },
      { text: "Platform matrix", tone: "output" },
      { text: "Final plan", tone: "output" },
    ].map((n, i) => ({ ...n, x: 690, y: 66 + i * 60, w: 220, h: 50 }));

    const skills = ["impact", "qase", "flaky", "automation", "summary"];
    const chips = skills
      .map((t, i) => svgChip({ x: 250 + i * 138, y: 362, text: t, tone: "agent" }))
      .join("");

    const nodes = [
      svgNode(center),
      ...left.map((n) => svgNode(n)),
      ...right.map((n) => svgNode(n)),
    ].join("");

    const links = [
      ...left.map((n, i) =>
        svgArrowPath({
          d: `M ${n.x + n.w} ${n.y + 25} C 320 ${n.y + 25}, 340 ${center.y + 10 + i * 2}, ${center.x} ${center.y + center.h / 2}`,
          tone: n.tone,
          width: 1.9,
          opacity: 0.26,
          dashed: i === 2,
        })
      ),
      ...right.map((n, i) =>
        svgArrowPath({
          d: `M ${center.x + center.w} ${center.y + center.h / 2} C 610 ${center.y + 20 + i * 2}, 640 ${n.y + 25}, ${n.x} ${
            n.y + 25
          }`,
          tone: n.tone,
          width: 2.0,
          opacity: 0.28,
          dashed: i === 2,
        })
      ),
    ].join("");

    const header = `<path d="M 60 48 C 220 10, 760 10, 920 48" stroke="url(#rpG)" stroke-width="2" fill="none" opacity="0.8"/>`;

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Regression planning hub">
      ${defs}
      ${header}
      ${links}
      ${nodes}
      ${chips}
    </svg>`;
  }

  function diagramAnalyticsValidationStack() {
    const width = 980;
    const height = 420;
    const defs = `<defs>
      <marker id="arrS" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.26)"/>
      </marker>
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.35 0" result="glow"/>
        <feMerge>
          <feMergeNode in="glow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="avG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${toneStroke("input", 0.50)}"/>
        <stop offset="1" stop-color="${toneStroke("output", 0.50)}"/>
      </linearGradient>
    </defs>`;

    const layers = [
      { t: "SPEC", tone: "input" },
      { t: "EXPECTED EVENTS", tone: "agent" },
      { t: "UI RUN", tone: "human" },
      { t: "DISPATCH EVIDENCE", tone: "output" },
      { t: "PERSISTENCE / CSV", tone: "output" },
      { t: "ACTUAL EVENTS", tone: "input" },
      { t: "STRICT COMPARE", tone: "agent" },
      { t: "DIFF REPORT", tone: "risk" },
    ];

    const x0 = 160;
    const y0 = 74;
    const w = 660;
    const h = 44;
    const dy = 36;

    const nodes = layers
      .map((l, i) =>
        svgNode({
          x: x0 + i * 10,
          y: y0 + i * dy,
          w,
          h,
          text: l.t,
          tone: l.tone,
          emphasis: i === 0 || i === layers.length - 1,
        })
      )
      .join("");

    const arrows = layers
      .slice(0, -1)
      .map((_, i) =>
        svgArrowPath({
          d: `M ${x0 + i * 10 + w - 26} ${y0 + i * dy + h} L ${x0 + (i + 1) * 10 + w - 26} ${
            y0 + (i + 1) * dy
          }`,
          tone: "neutral",
          width: 1.8,
          opacity: 0.16,
          dashed: true,
        })
      )
      .join("");

    const header = `<path d="M 60 48 C 220 10, 760 10, 920 48" stroke="url(#avG)" stroke-width="2" fill="none" opacity="0.8"/>`;

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Analytics validation stack">
      ${defs}
      ${header}
      ${arrows}
      ${nodes}
    </svg>`;
  }

  function diagramEvidenceBoard(labels) {
    const width = 980;
    const height = 380;
    const pts = [
      { t: labels[0] || "SCREEN", x: 240, y: 120 },
      { t: labels[1] || "UI DUMP", x: 740, y: 120 },
      { t: labels[2] || "ACTION LOG", x: 240, y: 250 },
      { t: labels[3] || "TRIAGE", x: 740, y: 250 },
      { t: labels[4] || "RULE", x: 490, y: 318 },
    ];

    const lines = [
      [0, 4],
      [1, 4],
      [2, 4],
      [3, 4],
      [0, 2],
      [1, 3],
    ]
      .map(([a, b]) => {
        const p = pts[a];
        const q = pts[b];
        const mx = (p.x + q.x) / 2;
        const my = (p.y + q.y) / 2;
        return `<path class="conn dash" d="M ${p.x} ${p.y} Q ${mx} ${my - 12} ${q.x} ${q.y}" stroke="rgba(255,255,255,0.16)" stroke-width="1.8" fill="none"/>`;
      })
      .join("");

    const node = (p, i) => {
      const w = p.t === (labels[4] || "RULE") ? 210 : 190;
      const h = 52;
      const x = p.x - w / 2;
      const y = p.y - h / 2;
      const phase = (i % 5) * 0.6;
      return `<g class="float" style="--ph:${phase}s">
        <rect x="${x}" y="${y}" rx="16" width="${w}" height="${h}" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)"/>
        <text x="${p.x}" y="${p.y + 7}" text-anchor="middle" font-family="Manrope, system-ui" font-size="14" font-weight="700" fill="rgba(255,255,255,0.86)">${escapeSvg(
          p.t
        )}</text>
      </g>`;
    };

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Evidence board">
      <defs>
        <linearGradient id="eG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(110,231,168,0.35)"/>
          <stop offset="1" stop-color="rgba(255,202,92,0.25)"/>
        </linearGradient>
      </defs>
      <path d="M 60 48 C 220 10, 760 10, 920 48" stroke="url(#eG)" stroke-width="2" fill="none" opacity="0.8"/>
      ${lines}
      ${pts.map(node).join("")}
    </svg>`;
  }

  function diagramHubSkills(model) {
    const width = 980;
    const height = 380;
    const cx = 490;
    const cy = 200;
    const r = 150;
    const nodes = model?.nodes || [];
    const pts = nodes.map((t, i) => {
      const a = (Math.PI * 2 * i) / Math.max(1, nodes.length) - Math.PI / 2;
      return { t, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
    });

    const lines = pts
      .map(
        (p) =>
          `<path class="conn dash" d="M ${cx} ${cy} L ${p.x} ${p.y}" stroke="rgba(255,255,255,0.16)" stroke-width="1.8" fill="none"/>`
      )
      .join("");

    const node = (p, i) => {
      const w = 160;
      const h = 46;
      const x = p.x - w / 2;
      const y = p.y - h / 2;
      const phase = (i % 6) * 0.6;
      return `<g class="float" style="--ph:${phase}s">
        <rect x="${x}" y="${y}" rx="16" width="${w}" height="${h}" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
        <text x="${p.x}" y="${p.y + 7}" text-anchor="middle" font-family="Manrope, system-ui" font-size="14" font-weight="700" fill="rgba(255,255,255,0.86)">${escapeSvg(
          p.t
        )}</text>
      </g>`;
    };

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Hub skills">
      <defs>
        <linearGradient id="hG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(255,202,92,0.32)"/>
          <stop offset="1" stop-color="rgba(124,92,255,0.42)"/>
        </linearGradient>
      </defs>
      <path d="M 60 48 C 220 10, 760 10, 920 48" stroke="url(#hG)" stroke-width="2" fill="none" opacity="0.8"/>
      ${lines}
      ${pts.map(node).join("")}
      <g>
        <circle cx="${cx}" cy="${cy}" r="56" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-family="Manrope, system-ui" font-size="14" font-weight="700" fill="rgba(255,255,255,0.92)">${escapeSvg(
          model?.center || "Regression agent"
        )}</text>
      </g>
    </svg>`;
  }

  function diagramLifecycleRing(labels) {
    const width = 980;
    const height = 420;
    const cx = width / 2;
    const cy = height / 2 + 10;
    const r = 150;
    const n = Math.max(1, labels.length);

    const pts = labels.map((t, i) => {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2;
      return { t, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
    });

    const arrows = pts
      .map((p, i) => {
        const q = pts[(i + 1) % n];
        const mx = (p.x + q.x) / 2;
        const my = (p.y + q.y) / 2;
        return `<path class="conn dash" d="M ${p.x} ${p.y} Q ${mx} ${my} ${q.x} ${q.y}" stroke="rgba(255,255,255,0.18)" stroke-width="2" fill="none" marker-end="url(#rArr)"/>`;
      })
      .join("");

    const nodes = pts
      .map((p, i) => {
        const w = 160;
        const h = 46;
        const x = p.x - w / 2;
        const y = p.y - h / 2;
        const phase = (i % 8) * 0.5;
        return `<g class="float" style="--ph:${phase}s">
          <rect x="${x}" y="${y}" rx="16" width="${w}" height="${h}" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
          <text x="${p.x}" y="${p.y + 7}" text-anchor="middle" font-family="Manrope, system-ui" font-size="13" font-weight="700" fill="rgba(255,255,255,0.86)">${escapeSvg(
            p.t
          )}</text>
        </g>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Lifecycle ring">
      <defs>
        <marker id="rArr" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="rgba(255,255,255,0.26)"/>
        </marker>
        <linearGradient id="rG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(37,214,199,0.40)"/>
          <stop offset="1" stop-color="rgba(110,231,168,0.28)"/>
        </linearGradient>
      </defs>
      <path d="M 60 48 C 220 10, 760 10, 920 48" stroke="url(#rG)" stroke-width="2" fill="none" opacity="0.8"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
      ${arrows}
      ${nodes}
    </svg>`;
  }

  function escapeSvg(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();

