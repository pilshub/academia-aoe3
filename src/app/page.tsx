import Link from "next/link";
import { LandingScripts } from "@/components/LandingScripts";
import "./landing-styles.css";

export const metadata = {
  title: "Academia AoE3 · Decks, shipments y planes con intención",
  description:
    "Plataforma editorial Age of Empires III: 22 civilizaciones, 10 planes con deck + opening + ramas, 14 matchups por arquetipo, Coach IA con guardrails y fuentes verificables.",
};

const PILLARS = [
  {
    num: "I · IA",
    title: "Coach IA con tools",
    body:
      "Endpoint cableado al Knowledge Core con 20 tools. Cita sourceIds siempre; advierte cuando reviewStatus ≠ canonical. Sin invención.",
    tags: ["20 tools", "Guardrails"],
    img: "/landing-assets/img/av-como-mejorar.png",
    href: "/ai-coach",
  },
  {
    num: "II · Civs",
    title: "22 civilizaciones",
    body:
      "Identidad, tempo, power spikes, errores comunes y planes recomendados. Flags oficiales hospedados por la comunidad.",
    tags: ["22 perfiles", "21 flags oficiales"],
    img: "/landing-assets/img/japanese.png",
    href: "/civs",
  },
  {
    num: "III · Plan",
    title: "10 planes con ramas",
    body:
      "Civ + deck + opening + shipmentLogic + branches + benchmarks. La unidad central que une todo el corpus AoE3:DE.",
    tags: ["10 planes", "Bundle"],
    img: "/landing-assets/img/av-team-games.png",
    href: "/civs/french",
  },
  {
    num: "IV · Live",
    title: "Replay normalizer",
    body:
      "POST /api/replay normaliza JSON/texto del parser a NormalizedReplay con timeline + mistakes deterministas. Coach IA puede leerlo.",
    tags: ["/api/replay", "Coach"],
    img: "/landing-assets/img/ec-ejercito.png",
    href: "/replay-coach",
  },
  {
    num: "V · Train",
    title: "Counters · Hotkeys · Crates",
    body:
      "Counter Matrix con relaciones cualitativas, Hotkey Trainer por modo y Crate Start con primer minuto por civ. Práctica fuera de partida.",
    tags: ["Hotkeys", "Counter Matrix"],
    img: "/landing-assets/img/av-hotkeys2.png",
    href: "/counter-matrix",
  },
  {
    num: "VI · Trust",
    title: "Fuentes y reviewStatus",
    body:
      "Cada item con sourceIds + status (source-backlog → needs-review → reference-ready → canonical). Sin meta inventada.",
    tags: ["Trust", "Provenance"],
    img: "/landing-assets/img/av-conocete.png",
    href: "/trust",
  },
];

const TOOLS = [
  { name: "Chat IA", meta: "20 tools", href: "/ai-coach" },
  { name: "Civilizaciones", meta: "22", href: "/civs" },
  { name: "Planes", meta: "10", href: "/civs/french" },
  { name: "Matchups", meta: "14 + matriz", href: "/matchups" },
  { name: "Decks", meta: "10 + checker", href: "/decks" },
  { name: "Replay Coach", meta: "Beta", href: "/replay-coach" },
  { name: "Counter Matrix", meta: "Cualitativa", href: "/counter-matrix" },
  { name: "Hotkey Trainer", meta: "Modos", href: "/hotkeys" },
  { name: "Crate Start", meta: "Por civ", href: "/crate-start" },
  { name: "Treasure Priority", meta: "Editorial", href: "/treasure-priority" },
  { name: "Treaty Decks", meta: "v0", href: "/treaty-deck-checker" },
  { name: "Civ Guides", meta: "10", href: "/civ-guide" },
  { name: "Reference", meta: "Politicians/Units/Techs", href: "/reference" },
  { name: "Opening Timer", meta: "Drill", href: "/opening-timer" },
  { name: "Matchup Scout", meta: "Live", href: "/matchup-scout" },
  { name: "Deck Builder", meta: "Audit", href: "/deck-builder" },
  { name: "Series Prep", meta: "BO3/5", href: "/series-prep" },
  { name: "VOD Pipeline", meta: "Ingest", href: "/vod-pipeline" },
  { name: "Knowledge Search", meta: "Corpus", href: "/knowledge" },
  { name: "Career", meta: "Modo", href: "/career" },
];

// Iconos del template (lucide-style SVG paths). Mantengo el set original.
const TOOL_ICONS: Record<string, JSX.Element> = {
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12c0 4.97-4.03 9-9 9-1.5 0-2.91-.37-4.15-1.02L3 21l1.02-4.85A8.96 8.96 0 0 1 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9z"/></svg>,
  civs: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 21V8l9-5 9 5v13M9 21v-7h6v7"/></svg>,
  plans: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>,
  matchups: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14.5 17.5 21 21l-3.5-6.5M3 3l6.5 3.5L13 13m-2-2L3 21"/></svg>,
  decks: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6 9 3l6 3 6-3v15l-6 3-6-3-6 3z"/></svg>,
  replay: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  counter: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg>,
  hotkey: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M7 10h2M11 10h2M15 10h2M7 14h10"/></svg>,
  crate: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 7v10M15 7v10M3 12h18"/></svg>,
  treasure: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  treaty: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 3h14v18l-7-4-7 4z"/></svg>,
  guide: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 11h14M5 7h14M5 15h10M5 19h6"/></svg>,
  reference: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12l9-9 9 9-9 9z"/></svg>,
  timer: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>,
  scout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/></svg>,
  builder: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 12h6M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0z"/></svg>,
  series: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2L4 7l8 5 8-5z"/><path d="M4 12l8 5 8-5"/><path d="M4 17l8 5 8-5"/></svg>,
  vod: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12h6l3-7 3 14 3-7h3"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  career: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/></svg>,
};

const TOOL_ICON_KEYS = [
  "chat", "civs", "plans", "matchups", "decks", "replay", "counter", "hotkey",
  "crate", "treasure", "treaty", "guide", "reference", "timer", "scout", "builder",
  "series", "vod", "search", "career",
];

const MOSAIC = [
  { img: "/landing-assets/img/av-como-mejorar.png", label: "Coach IA" },
  { img: "/landing-assets/img/av-rankeds.png", label: "Matchup briefs" },
  { img: "/landing-assets/img/av-hotkeys2.png", label: "Hotkey trainer" },
  { img: "/landing-assets/img/av-team-games.png", label: "Team games (diferido)" },
];

export default function HomePage() {
  return (
    <div className="landing-root">
      <LandingScripts />

      {/* Background layers */}
      <div className="bg-layer bg-tile" aria-hidden="true" />
      <div className="bg-layer bg-vignette" aria-hidden="true" />
      <div className="bg-layer bg-grain" aria-hidden="true" />
      <canvas className="particles" id="landing-particles" aria-hidden="true" />

      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="6" />
                <path d="M16 16l4 4" />
              </svg>
            </span>
            ACADEMIA AOE3
          </Link>
          <nav className="top-links" aria-label="Principal">
            <a href="#pillars">Plataforma</a>
            <a href="#showcase">Coach IA</a>
            <a href="#tools">Herramientas</a>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/trust">Trust</Link>
          </nav>
          <div className="top-actions">
            <Link className="btn btn-primary" href="/civs">
              Empezar →
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div className="reveal in">
            <span className="eyebrow">Plataforma editorial · Age of Empires III: DE</span>
            <h1 className="display">ACADEMIA AOE3</h1>
            <div className="display-sub">— AOE III · 2026 —</div>
            <p className="lede">
              Guías editoriales, planes con <em>deck + opening + ramas</em> y Coach IA con guardrails para Age of
              Empires III: Definitive Edition. Decks como decisiones de partida, no como listas estáticas.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary" href="/civs">
                Elegir civilización
              </Link>
              <a className="btn btn-ghost" href="#pillars">
                Ver herramientas
              </a>
            </div>
            <div className="beta-inline" role="note">
              <span className="beta-pill">EDITORIAL</span>
              <span>
                Corpus con reviewStatus visible (canonical → needs-review). Sin invenciones, sin meta falsa.
              </span>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="dot" /> 10 planes con ramas verificables
              </div>
              <div className="hero-meta-item">· 22 civilizaciones · 14 matchups</div>
            </div>
          </div>

          <div className="hero-visual reveal in">
            <div className="civ-stack">
              <div className="civ-card c1 civ-card-anim">
                <img src="/landing-assets/img/french.png" alt="French" />
                <div className="gradient" />
                <div className="label">French · Semi-FF</div>
              </div>
              <div className="civ-card c2 civ-card-anim">
                <img src="/landing-assets/img/english.png" alt="British" />
                <div className="gradient" />
                <div className="label">British · Boom</div>
              </div>
              <div className="civ-card c3 civ-card-anim">
                <img src="/landing-assets/img/ottomans.png" alt="Ottomans" />
                <div className="gradient" />
                <div className="label">Ottomans · Rush</div>
              </div>
              <div className="seal">
                AOE III
                <span className="seal-sub">DE</span>
                2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stat-strip">
        <div className="stat-strip-inner">
          <div className="stat">
            <div className="stat-num">
              20<span className="plus">+</span>
            </div>
            <div className="stat-label">Herramientas</div>
            <div className="stat-sub">Coach IA, replays, counter matrix, hotkeys…</div>
          </div>
          <div className="stat">
            <div className="stat-num">22</div>
            <div className="stat-label">Civilizaciones</div>
            <div className="stat-sub">21 flags oficiales · perfiles editoriales</div>
          </div>
          <div className="stat">
            <div className="stat-num">14</div>
            <div className="stat-label">Matchups</div>
            <div className="stat-sub">Matriz civ vs arquetipo (Rush/Boom/FF/Treaty)</div>
          </div>
          <div className="stat">
            <div className="stat-num">10</div>
            <div className="stat-label">Planes con ramas</div>
            <div className="stat-sub">Deck + opening + branches + benchmarks</div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="lp-section" id="pillars">
        <div className="section-head">
          <h2 className="section-title">
            Una academia entera <em>para una sola partida</em>.
          </h2>
          <p className="section-kicker">
            Todo lo que necesitas para entender por qué ganaste, por qué perdiste y qué hacer en la próxima.
          </p>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => (
            <Link key={p.title} className="pillar reveal in" href={p.href}>
              <div
                className="pillar-img pillar-img-anim"
                style={{ backgroundImage: `url('${p.img}')` }}
              >
                <span className="pillar-num">{p.num}</span>
              </div>
              <div className="pillar-body">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="pillar-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="showcase" id="showcase">
        <div className="showcase-inner">
          <div className="showcase-row">
            <div
              className="showcase-img"
              style={{ backgroundImage: "url('/landing-assets/img/av-como-mejorar.png')" }}
            >
              <span className="pin">Coach IA · /api/chat</span>
            </div>
            <div className="showcase-text">
              <h3>
                Pregunta lo que <em>quieras</em>. Recibe respuesta con sourceIds y reviewStatus.
              </h3>
              <p>
                El Coach IA ejecuta tool-calls sobre el corpus: get_plan, get_deck, get_card, get_matchup_brief,
                get_civ_guide, search_knowledge, replay_summary, y 13 más. Cada respuesta cita las fuentes y
                advierte si el item no es canonical.
              </p>
              <ul>
                <li>20 tools cableadas a 13 colecciones canónicas</li>
                <li>Modo knowledge-only sin LLM (búsqueda directa en corpus)</li>
                <li>Modo coach con OpenRouter / Kimi K2 cuando hay API key</li>
              </ul>
              <div className="hero-cta" style={{ marginTop: 28 }}>
                <Link className="btn btn-primary" href="/ai-coach">
                  Abrir Coach IA
                </Link>
              </div>
            </div>
          </div>

          <div className="showcase-row reverse">
            <div className="showcase-text">
              <h3>
                14 matchups por arquetipo. <em>Sin guesswork.</em>
              </h3>
              <p>
                Cada matchup brief tiene mapTag, threat, planId resuelto, firstDecision, winCondition, danger y
                scoutSignals. Diferenciados por Rush / Boom / FF / Treaty para que no apliques builds de Supremacy a
                modos distintos.
              </p>
              <ul>
                <li>Resolvable a plan completo con un click</li>
                <li>Separados Supremacy 1v1 / Team / Treaty</li>
                <li>Modes diferidos explícitamente declarados</li>
              </ul>
              <div className="hero-cta" style={{ marginTop: 28 }}>
                <Link className="btn btn-primary" href="/matchups">
                  Ver matchups
                </Link>
              </div>
            </div>
            <div
              className="showcase-img"
              style={{ backgroundImage: "url('/landing-assets/img/av-expansion.png')" }}
            >
              <span className="pin">Matchups · Matriz por arquetipo</span>
            </div>
          </div>

          <div className="showcase-row">
            <div
              className="showcase-img"
              style={{ backgroundImage: "url('/landing-assets/img/av-team-games.png')" }}
            >
              <span className="pin">Replay normalizer · /api/replay</span>
            </div>
            <div className="showcase-text">
              <h3>
                Tu replay normalizado y <em>auditado</em>.
              </h3>
              <p>
                POST /api/replay acepta JSON o texto del parser AoE3 (manual, aoe3explorer, freefoodparty) y
                devuelve NormalizedReplay con timeline, shipments, age-ups y mistakes deterministas. El Coach IA
                puede consumirlo después con la tool replay_summary.
              </p>
              <ul>
                <li>Timeline ordenado con confidence por evento</li>
                <li>Detección automática de greed bajo presión + Age III tardío</li>
                <li>5 fixtures seed marcados explícitamente como synthetic</li>
              </ul>
              <div className="hero-cta" style={{ marginTop: 28 }}>
                <Link className="btn btn-primary" href="/replay-coach">
                  Probar Replay Coach
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="tools-band" id="tools">
        <div className="tools-inner">
          <div className="section-head">
            <h2 className="section-title">
              Las <em>joyas de la corona</em>.
            </h2>
            <p className="section-kicker">
              20 herramientas funcionales — no decorativas. Cada una reduce una decisión real de partida.
            </p>
          </div>
          <div className="tools-grid">
            {TOOLS.map((t, i) => (
              <Link key={t.name} className="tool-chip" href={t.href}>
                <span className="tool-chip-icon">{TOOL_ICONS[TOOL_ICON_KEYS[i]] ?? TOOL_ICONS.civs}</span>
                <span className="tool-chip-name">{t.name}</span>
                <span className="tool-chip-meta">{t.meta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MOSAIC */}
      <section className="voices" id="voices">
        <div className="section-head">
          <h2 className="section-title">
            Una vista <em>de la plataforma real</em>.
          </h2>
          <p className="section-kicker">Capturas conceptuales del producto.</p>
        </div>
        <div className="mosaic">
          {MOSAIC.map((m) => (
            <div key={m.label} className="mosaic-tile" style={{ backgroundImage: `url('${m.img}')` }}>
              <span className="label">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div className="final-inner">
          <div className="final-glyph">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M5 17h14l-2-9-3 5-2-7-2 7-3-5z" />
              <path d="M5 17v3h14v-3" />
            </svg>
          </div>
          <h2>Tu mejor partida AoE3 te espera</h2>
          <p>
            Plataforma editorial en español. Sin login, sin paywall. Empieza por elegir civilización y deja que el
            corpus te explique decisiones.
          </p>
          <Link className="btn btn-primary" href="/dashboard">
            Abrir academia
          </Link>
          <div className="final-note">
            También puedes empezar desde{" "}
            <Link href="/civs/french">/civs/french</Link>,{" "}
            <Link href="/matchups">/matchups</Link> o{" "}
            <Link href="/civ-guide">/civ-guide</Link>.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="footer-inner">
          <span>Academia AoE3 · 2026</span>
          <div className="footer-links">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/trust">Trust</Link>
            <Link href="/resources">Fuentes</Link>
            <a
              href="https://aoe3explorer.com"
              target="_blank"
              rel="noreferrer"
              title="Iconos oficiales hospedados por aoe3explorer.com"
            >
              aoe3explorer.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
