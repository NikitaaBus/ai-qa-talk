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

  const slides = [
    {
      kicker: "Доклад",
      title: "Как ИИ усиливает QA",
      body: [
        "ИИ — это не «ещё один инструмент», а рабочий слой поверх процессов QA: анализ требований, тест-дизайн, регрессия, triage, автотесты и аналитика.",
      ],
      layout: "center",
      diagram: diagramWeb({
        center: "QA Engineer",
        top: ["Requirements/test design", "Structure/validation"],
        mid: ["Docs+code impact", "Autotests pipeline", "Evidence-first"],
        bottom: ["Regression planning", "Logs/triage", "Analytics", "Feedback loop/prod signals"],
        links: [
          ["QA", "Requirements/test design"],
          ["QA", "Docs+code impact"],
          ["QA", "Autotests pipeline"],
          ["QA", "Evidence-first"],
          ["QA", "Regression planning"],
          ["QA", "Logs/triage"],
          ["QA", "Analytics"],
          ["QA", "Structure/validation"],
          ["QA", "Feedback loop/prod signals"],

          // cross-links to feel like a system
          ["Requirements/test design", "Regression planning"],
          ["Docs+code impact", "Regression planning"],
          ["Evidence-first", "Logs/triage"],
          ["Analytics", "Regression planning"],
          ["Structure/validation", "Autotests pipeline"],
        ],
      }),
      diagramSize: "xl",
    },
    {
      kicker: "Карта доклада",
      title: "7 practical cases",
      layoutMode: "map",
      bullets: [
        { lead: "1", text: "Requirements → Test design" },
        { lead: "2", text: "Change impact (docs + code)" },
        { lead: "3", text: "Autotests pipeline" },
        { lead: "4", text: "Evidence-first execution" },
        { lead: "5", text: "Regression planning" },
        { lead: "6", text: "Logs & triage" },
        { lead: "7", text: "Analytics & validation" },
      ],
      diagram: diagramChain(["Input", "Analysis", "Execution", "Evidence", "Decision"], { size: "xl" }),
      diagramSize: "xl",
    },
    {
      kicker: "Контекст",
      title: "Как меняется роль QA с ИИ",
      layoutMode: "compact",
      bullets: [
        {
          lead: "От «инструментов выполнения»",
          text: "к «инструментам мышления»: ИИ помогает структурировать данные, видеть пробелы и связывать артефакты.",
        },
        {
          lead: "Ответственность не исчезает",
          text: "QA задаёт рамки, проверяет результат, строит воспроизводимые пайплайны и отделяет факты от правдоподобных догадок.",
        },
        {
          lead: "Ценность",
          text: "ускорение и повышение качества решений на всём жизненном цикле: от требований до результатов прогонов.",
        },
      ],
      aside: {
        title: "Главная мысль",
        bullets: [
          "Сегодня ИИ — неотъемлемая часть QA‑практики и процессов обеспечения качества.",
          "ИИ — рабочий слой поверх привычных процессов: валидация требований, тест‑дизайн, генерация автотестов, регрессия, bug triage, работа с аналитикой.",
          "Ценность: позволяет автономно выстраивать управляемые и воспроизводимые сценарии, соединяя их в единую end‑to‑end цепочку жизненного цикла качества — быстрее и эффективнее.",
        ],
      },
    },
    {
      kicker: "Кейс 1",
      title: "Анализ требований и тест‑дизайн",
      layoutMode: "compact",
      pain: "QA тратит время на ручной разбор требований — и всё равно рискует пропустить важное.",
      bullets: [
        { lead: "Agent", text: "делает REQ‑cards, gaps/questions, checks/suites, coverage matrix." },
        { lead: "Risk", text: "ничего не додумывает: пробелы → блокеры → список вопросов." },
        { lead: "Quality gate", text: "validator/repair/reviewer → проверяемый артефакт." },
      ],
      beforeAfter: {
        before: "QA вручную читает 20+ страниц, выписывает вопросы, позже собирает первые тесты.",
        after: "Агент за минуты собирает структуру и блокеры; QA делает review и фиксирует решения в документации/YAML.",
      },
      takeaway: "ИИ не заменяет QA — он делает coverage управляемым и воспроизводимым.",
      aside: {
        title: "Выходные артефакты",
        bullets: ["human‑readable doc", "структурированный YAML", "validator/repair/reviewer цепочка"],
      },
    },
    {
      kicker: "Кейс 1 · схема",
      title: "Как агент превращает требования в покрытие",
      layoutMode: "diagram",
      diagram: diagramCoverageMap(),
      diagramSize: "xl",
    },
    {
      kicker: "Кейс 1 · пример",
      title: "Smart Restart: быстрее к структуре",
      bullets: [
        { lead: "Вход", text: "PDF ~20+ страниц: state machine, ограничения платформ, acceptance criteria." },
        { lead: "Выход за минуты", text: "REQ-cards, вопросы/неоднозначности, атомарные checks, suites, YAML-контракт." },
        {
          lead: "Сигнал качества",
          text: "agent честно показывает, что «неисполняемо сейчас» и почему (нет данных/ожиданий).",
        },
      ],
      aside: {
        title: "Практика",
        bullets: [
          "Вопросы привязаны к конкретным требованиям.",
          "Проверки помечены как executable / blocked.",
          "После ответов — дополняем spec и пересобираем артефакты без ручной каши.",
        ],
      },
    },
    {
      kicker: "Кейс 2",
      title: "Анализ изменений (docs + code)",
      pain: "Один небольшой diff может сломать критичный сценарий — и это не видно без impact analysis.",
      bullets: [
        { lead: "Docs", text: "diff → affected requirements → обновить suites/checks." },
        { lead: "Code", text: "diff → зоны риска → affected scenarios → minimal checks." },
        { lead: "Value", text: "быстро связываем изменения с пользовательскими рисками." },
      ],
      takeaway: "Diff → impact → проверяем только важное (и объясняем почему).",
      aside: {
        title: "Что выигрываем",
        bullets: ["меньше ручного сравнения", "меньше зависимости от памяти", "прозрачность перед регрессией/релизом"],
      },
    },
    {
      kicker: "Кейс 2 · схема",
      title: "Change impact: docs + code → test plan",
      layoutMode: "diagram",
      diagram: diagramChain(["Doc/Code diff", "Agent", "Risk areas", "Affected scenarios", "Updated plan"], { size: "xl" }),
      diagramSize: "xl",
    },
    {
      kicker: "Кейс 3",
      title: "Генерация и поддержка автотестов",
      pain: "Автотесты быстро растут и быстро становятся дорогими в поддержке без строгого процесса.",
      bullets: [
        { lead: "Pipeline", text: "plan → code → review → fix → approved." },
        { lead: "Traceability", text: "Qase ID → @Qase test → runs/evidence → итог." },
        { lead: "Quality", text: "единый стиль + меньше flaky/дубликатов." },
      ],
      beforeAfter: {
        before: "Просим ИИ «напиши тест» → получаем код без стандарта и с риском flakiness.",
        after: "Оркестратор ведёт роли: Planner/Dev/Reviewer → предсказуемый стиль и quality gate.",
      },
      takeaway: "ИИ ускоряет automation только внутри строгого процесса.",
    },
    {
      kicker: "Кейс 3 · схема",
      title: "Autotests pipeline: roles + quality gate",
      layoutMode: "diagram",
      diagram: diagramChain(["Qase case", "Planner", "Dev agent", "Reviewer", "APPROVED PR"], { size: "xl" }),
      diagramSize: "xl",
    },
    {
      kicker: "Кейс 3 · критерии",
      title: "Что делает автотест «хорошим»",
      bullets: [
        { lead: "Проверяет реальный риск", text: "а не просто «повторяет клики»." },
        { lead: "Читаемость и структура", text: "предсказуемый стиль в репозитории, понятная цель." },
        { lead: "Стабильность", text: "сильные ожидания, устойчивые локаторы, разумные ожидания/тайминги." },
        { lead: "Стоимость поддержки", text: "не плодим дубли и fragile реализации." },
      ],
    },
    {
      kicker: "Кейс 4",
      title: "Evidence‑first в agentic‑подходе",
      pain: "Тест упал, но причины не видно — без evidence triage превращается в ручную отладку.",
      bullets: [
        { lead: "Evidence", text: "screenshot + UI‑dump + шаги + состояние UI." },
        { lead: "Triage", text: "product bug vs flaky vs env/data vs locator/timing." },
        { lead: "Loop", text: "фиксируем паттерн как правило для следующих прогонов." },
      ],
      beforeAfter: {
        before: "Fail → QA вручную разбирает «что было на экране» и почему не сработало.",
        after: "Fail → evidence пакет → классификация причины → стабилизация + обновление runbook.",
      },
      takeaway: "Не «упал тест», а полный контекст падения и следующий шаг.",
      aside: {
        title: "История",
        bullets: ["“tap ≠ focus” → видно по evidence → правим взаимодействие → закрепляем паттерн"],
      },
    },
    {
      kicker: "Кейс 4 · схема",
      title: "Feedback loop: evidence → triage → улучшение правил",
      layoutMode: "diagram",
      diagram: diagramLoopXL(
        ["Run step", "Collect evidence", "Triage", "Fix / stabilize", "Update rules"],
        "Каждый fail оставляет след"
      ),
      diagramSize: "xl",
    },
    {
      kicker: "Кейс 4 · реализация",
      title: "Black‑box iOS через iPhone MCP",
      bullets: [
        { lead: "YAML‑сценарии", text: "runner готовит план, агент выполняет на устройстве." },
        { lead: "Наблюдаемость шага", text: "что было на экране, что найдено/не найдено, что изменилось до/после." },
        { lead: "Артефакты", text: "runs с evidence → база для triage и стабилизации сценариев." },
      ],
    },
    {
      kicker: "Кейс 5",
      title: "Регрессия и приоритизация проверок",
      pain: "Регресс растёт быстрее продукта: дубли, flaky и проверки «по привычке».",
      bullets: [
        { lead: "Agent", text: "анализирует регресс как систему, а не как список." },
        { lead: "Risk-based", text: "smoke / critical path / high‑risk / platform matrix." },
        { lead: "Outputs", text: "automation candidates + open questions + final recommendation." },
      ],
      beforeAfter: {
        before: "Запускаем «всё подряд», потому что так исторически сложилось.",
        after: "Строим план: smoke → high‑risk → full regression + явные риски и причины.",
      },
      takeaway: "ИИ помогает выбрать, что проверять первым — но решение остаётся за QA.",
      aside: {
        title: "Принципы",
        bullets: ["не додумывать данные", "отделять факты от гипотез", "объяснять «почему» приоритизации"],
      },
    },
    {
      kicker: "Кейс 5 · архитектура",
      title: "Regression Planning Agent: агент + skills",
      layoutMode: "diagram",
      diagram: diagramAgentSkills(),
      diagramSize: "xl",
    },
    {
      kicker: "Кейс 6",
      title: "Логи, ошибки приложения и triage",
      bullets: [
        { lead: "От симптома к гипотезе", text: "группировка ошибок, сравнение успешного/неуспешного сценария." },
        {
          lead: "Классификация причин",
          text: "product bug vs flaky test vs test data vs environment issue (и что проверить дальше).",
        },
        { lead: "Bug report", text: "превратить «сырое наблюдение» в структурированный репорт с evidence." },
      ],
    },
    {
      kicker: "Кейс 7",
      title: "Аналитика: scenario mining + analytics validation",
      pain: "Если аналитика неверная — решения по продукту и тестированию тоже будут неверными.",
      bullets: [
        { lead: "Mining", text: "events → sessions → journeys → critical paths." },
        { lead: "Contract", text: "spec → expected → actual → diff report." },
        { lead: "Triage", text: "dispatch vs persistence → где именно проблема." },
      ],
      beforeAfter: {
        before: "Проверяем аналитику «глазами»: ушёл ли запрос — непонятно, сохранилось ли событие.",
        after: "Проверяем как контракт: expected → actual → strict compare → diff report.",
      },
      takeaway: "Аналитика — часть качества продукта, её нужно тестировать доказательно.",
      aside: {
        title: "Зачем QA это нужно",
        bullets: ["приоритизация по реальному поведению", "доверие к данным", "быстрый triage расхождений"],
      },
    },
    {
      kicker: "Кейс 7 · схема",
      title: "Analytics validation: expected → actual → diff",
      layoutMode: "diagram",
      diagram: diagramChain(
        ["Spec", "Expected", "UI run", "Dispatch", "Persistence", "Actual", "Compare", "Diff"],
        { size: "xl" }
      ),
      diagramSize: "xl",
    },
    {
      kicker: "Синтез",
      title: "Что объединяет все кейсы",
      bullets: [
        { lead: "Структура > текст", text: "артефакты должны быть проверяемыми (валидация/ремонт/ревью)." },
        { lead: "Пайплайны", text: "от требований до evidence: планирование и исполнение разделены." },
        { lead: "Feedback loop", text: "каждый fail оставляет след и улучшает правила/процесс." },
        { lead: "Production signals", text: "логи, аналитика и реальные пути пользователей усиливают QA‑решения." },
      ],
    },
    {
      kicker: "Практика",
      title: "С чего начать прямо сейчас",
      bullets: [
        { lead: "Начать с малого", text: "одна регулярная задача с понятным входом/выходом → усилить ИИ." },
        {
          lead: "Примеры задач",
          text: "requirements review, impact analysis, smoke/regression selection, triage падений, bug report, summary.",
        },
        { lead: "Важно", text: "безопасность данных + проверяемый процесс дают реальную ценность." },
      ],
      aside: {
        title: "Финал",
        bullets: ["ИИ не заменяет опыт QA.", "ИИ умножает скорость и способность видеть риски раньше."],
      },
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

  function renderSlide(i) {
    const s = slides[i];
    slideRoot.innerHTML = "";
    slideRoot.setAttribute("aria-label", `${i + 1} из ${slides.length}`);
    slideRoot.classList.toggle("is-center", s.layout === "center");
    slideRoot.classList.toggle("is-diagram", s.layoutMode === "diagram");
    slideRoot.classList.toggle("is-map", s.layoutMode === "map");
    slideRoot.classList.toggle("is-compact", s.layoutMode === "compact");

    if (s.kicker) slideRoot.appendChild(el("div", "kicker", s.kicker));
    slideRoot.appendChild(el(s.title.length > 26 ? "h2" : "h1", "", s.title));

    if (s.body?.length) {
      for (const p of s.body) slideRoot.appendChild(el("p", "", p));
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
      slideRoot.appendChild(el("div", "case-takeaway", s.takeaway));
    }

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

    if (s.kicker) targetEl.appendChild(el("div", "kicker", s.kicker));
    targetEl.appendChild(el(s.title.length > 26 ? "h2" : "h1", "", s.title));

    if (s.body?.length) {
      for (const p of s.body) targetEl.appendChild(el("p", "", p));
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
      targetEl.appendChild(el("div", "case-takeaway", s.takeaway));
    }

    if (!opts.suppressCounter) {
      counterCurrent.textContent = String(i + 1);
      prevLink.setAttribute("aria-disabled", i === 0 ? "true" : "false");
      nextLink.setAttribute("aria-disabled", i === slides.length - 1 ? "true" : "false");
    }
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

    const draw = nodes
      .map((n) => {
        const { w, h } = getWH(n);
        const x = n.x - w / 2;
        const y = n.y - h / 2;
        const isCenter = n.id === "Checks";
        const fill = isCenter ? "rgba(124,92,255,0.14)" : "rgba(255,255,255,0.06)";
        const stroke = isCenter ? "rgba(124,92,255,0.40)" : "rgba(255,255,255,0.14)";
        return `
          <g>
            <rect x="${x}" y="${y}" rx="16" ry="16" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}"/>
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

    const lines = (model.links || [])
      .map(([a, b]) => {
        const na = nodePos.get(a);
        const nb = nodePos.get(b);
        if (!na || !nb) return "";
        const mx = (na.x + nb.x) / 2;
        const my = (na.y + nb.y) / 2;
        const bend = a === model.center || b === model.center ? 0 : -14;
        return `<path d="M ${na.x} ${na.y} Q ${mx} ${my + bend} ${nb.x} ${nb.y}" stroke="rgba(255,255,255,0.22)" stroke-width="2" fill="none"/>`;
      })
      .join("");

    const drawNode = (n, isCenter = false) => {
      const x = n.x - n.w / 2;
      const y = n.y - n.h / 2;
      const fill = isCenter ? "rgba(124,92,255,0.16)" : "rgba(255,255,255,0.06)";
      const stroke = isCenter ? "rgba(124,92,255,0.42)" : "rgba(255,255,255,0.14)";
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

  function escapeSvg(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();

