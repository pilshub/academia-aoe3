"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { features as academyFeatures, sources as academySources } from "@/data/academy";
import { aoe3Civilizations, aoe3Plans } from "@/data/aoe3";

// --- Inline SVG icon (Heroicons-ish) shared in this page ---
const ICON_PATHS: Record<string, string> = {
  swords: '<path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/>',
  flame: '<path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4-2 2-2 5 0 7"/>',
  landmark: '<path d="M3 21h18"/><path d="M4 21V10"/><path d="M20 21V10"/><path d="M9 21V12"/><path d="M15 21V12"/><polygon points="12,3 20,9 4,9"/>',
  crosshair: '<circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',
  shield: '<path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6z"/>',
  anchor: '<circle cx="12" cy="6" r="2"/><path d="M12 8v13"/><path d="M5 17a7 7 0 0 0 14 0"/><path d="M3 17h4M17 17h4"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>',
  trending: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/>',
  map: '<polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M4 5v14"/>',
  extlink: '<path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
};

function I({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] ?? "" }}
    />
  );
}

const ARCH_ICON: Record<string, string> = {
  Rush: "flame",
  "Semi-FF": "swords",
  Boom: "landmark",
  Timing: "crosshair",
  Control: "shield",
  Water: "anchor",
  Treaty: "landmark",
};

const PILLARS = [
  { label: "Decks como decisiones", icon: "wallet" },
  { label: "Shipments con ramas", icon: "trending" },
  { label: "Benchmarks practicables", icon: "timer" },
  { label: "Mapas y natives importan", icon: "map" },
  { label: "Modos separados", icon: "users" },
  { label: "Fuentes visibles", icon: "book" },
];

const DA_RECIPES: Record<string, { plan: string; title: string; ship: string; scout: string; age: string }> = {
  french: {
    plan: "french-semi-ff",
    title: "French Semi-FF flexible",
    ship: "3 CDB → 700 Wood → 4 CDB / def",
    scout: "Stable + rax rival",
    age: "Castle vía Politician económico",
  },
  british: {
    plan: "british-manor-boom",
    title: "British Manor Boom seguro",
    ship: "3 Vill → 700 Wood → 6 Longbow",
    scout: "Forward villager o forward base",
    age: "Castle vía Politician defensivo",
  },
  ottomans: {
    plan: "ottoman-jan-rush",
    title: "Ottoman Janissary pressure",
    ship: "3 Hussars → 5 Jans → 700 Coin",
    scout: "Torre o defensa cerrada rival",
    age: "Castle vía político militar",
  },
};

const DA_DANGER: Record<string, string> = {
  "Rush colonial": "Timing antes de tu 4 CDB / 4 manor / 5 Jans.",
  "Standard colonial": "Mapa libre y greed castiga.",
  "Boom / FF greedy": "Que el rival llegue a su power spike sin pagar peaje.",
};

const FEATURED_TOOL_TITLES = new Set([
  "Civ Mastery",
  "Opening Timer",
  "Deck Builder",
  "Matchup Scout",
  "Replay Coach",
  "IA con citas",
  "Patch tracker",
  "Series prep",
]);

export default function HomePage() {
  const [daCiv, setDaCiv] = useState<keyof typeof DA_RECIPES>("french");
  const [daRival, setDaRival] = useState<keyof typeof DA_DANGER>("Rush colonial");
  const [daMap, setDaMap] = useState("Land standard");
  const [planQuery, setPlanQuery] = useState("");
  const [planArch, setPlanArch] = useState("all");

  const recipe = DA_RECIPES[daCiv];

  const filteredPlans = useMemo(() => {
    const q = planQuery.trim().toLowerCase();
    return aoe3Plans.filter((p) => {
      const civ = aoe3Civilizations.find((c) => c.id === p.civId);
      const hay = `${p.title} ${civ?.name ?? ""} ${p.archetype} ${p.promise} ${p.matchupTags.join(" ")}`.toLowerCase();
      const matchesQuery = !q || hay.includes(q);
      const matchesArch = planArch === "all" || p.archetype === planArch;
      return matchesQuery && matchesArch;
    });
  }, [planQuery, planArch]);

  const featuredTools = academyFeatures.filter((f) => FEATURED_TOOL_TITLES.has(f.title));
  const featuredPlan = aoe3Plans[0];
  const featuredCiv = aoe3Civilizations.find((c) => c.id === featuredPlan?.civId);

  return (
    <SiteShell>
      <main>
        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-painting" />
            {/* SVG painting AoE3 colonial port — portado 1:1 del handoff */}
            <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="sun" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#fff4cf" />
                  <stop offset=".35" stopColor="#ffd574" />
                  <stop offset="1" stopColor="rgba(255,184,80,0)" />
                </radialGradient>
                <linearGradient id="haze" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#7a3416" stopOpacity=".65" />
                  <stop offset="1" stopColor="#1c0f10" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="far" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#502a2c" stopOpacity=".85" />
                  <stop offset="1" stopColor="#1b1018" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="mid" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#1c0f10" />
                  <stop offset="1" stopColor="#0a0608" />
                </linearGradient>
                <linearGradient id="fort" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#150709" />
                  <stop offset="1" stopColor="#000" />
                </linearGradient>
                <linearGradient id="sea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#2a1410" stopOpacity="1" />
                  <stop offset=".55" stopColor="#0a0610" stopOpacity="1" />
                  <stop offset="1" stopColor="#050308" stopOpacity="1" />
                </linearGradient>
                <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
                </pattern>
              </defs>

              <ellipse cx="1240" cy="600" rx="220" ry="80" fill="url(#sun)" opacity=".55" />
              <circle cx="1240" cy="580" r="92" fill="url(#sun)" opacity=".9" />

              <g fill="none" stroke="rgba(40,16,12,.35)" strokeWidth="1.4">
                <path d="M0,300 q60,-14 140,-2 q80,12 160,0 q70,-12 140,4 q70,18 140,-4 q70,-18 140,0" />
                <path d="M520,230 q60,-14 130,-2 q70,12 140,-2 q60,-10 130,4" />
                <path d="M1280,200 q60,-14 130,-2 q70,12 140,-2 q60,-10 130,4 q60,12 130,-2" />
                <path d="M120,420 q80,-6 160,2 q80,8 160,-4 q80,-12 160,0" />
              </g>

              <path fill="url(#haze)" opacity=".55" d="M0,520 L1920,500 L1920,720 L0,720 Z" />
              <path fill="url(#far)" d="M0,560 L100,540 L240,560 L360,510 L500,560 L640,520 L800,560 L950,520 L1080,560 L1240,510 L1400,560 L1560,520 L1720,560 L1920,540 L1920,720 L0,720 Z" />
              <path fill="url(#mid)" d="M0,660 L120,630 L240,660 L380,620 L520,660 L680,630 L840,670 L1000,630 L1180,660 L1360,620 L1520,660 L1700,630 L1920,650 L1920,760 L0,760 Z" />

              <g fill="url(#fort)">
                <rect x="980" y="600" width="320" height="80" />
                <rect x="980" y="590" width="18" height="14" />
                <rect x="1006" y="590" width="18" height="14" />
                <rect x="1032" y="590" width="18" height="14" />
                <rect x="1058" y="590" width="18" height="14" />
                <rect x="1084" y="590" width="18" height="14" />
                <rect x="1210" y="590" width="18" height="14" />
                <rect x="1236" y="590" width="18" height="14" />
                <rect x="1262" y="590" width="18" height="14" />
                <rect x="1288" y="590" width="18" height="14" />
                <rect x="1124" y="510" width="60" height="100" />
                <polygon points="1124,510 1184,510 1154,478" />
                <rect x="1142" y="540" width="8" height="14" fill="#3a1010" />
                <rect x="1162" y="540" width="8" height="14" fill="#3a1010" />
                <rect x="1149" y="572" width="16" height="22" fill="#3a1010" />
                <rect x="1153" y="446" width="2" height="34" />
                <polygon points="1155,448 1196,454 1155,462" fill="#7a1818" />
                <rect x="952" y="558" width="28" height="62" />
                <polygon points="952,558 980,558 966,540" />
                <rect x="958" y="580" width="6" height="10" fill="#3a1010" />
                <rect x="1300" y="558" width="28" height="62" />
                <polygon points="1300,558 1328,558 1314,540" />
                <rect x="1306" y="580" width="6" height="10" fill="#3a1010" />
              </g>

              {/* Galeón foreground */}
              <g transform="translate(420,750)">
                <path d="M-180,0 Q-170,36 -120,40 L120,40 Q170,36 180,0 L160,-14 L-160,-14 Z" fill="#080406" />
                <path d="M-160,-14 L160,-14 L148,-26 L-148,-26 Z" fill="#1d0d0a" />
                <rect x="-180" y="-30" width="34" height="3" transform="rotate(-22 -180 -30)" fill="#0d0608" />
                <rect x="-92" y="-180" width="3" height="160" fill="#0d0608" />
                <rect x="-2" y="-220" width="3" height="200" fill="#0d0608" />
                <rect x="88" y="-160" width="3" height="140" fill="#0d0608" />
                <path d="M-122,-110 Q-90,-128 -58,-110 L-58,-58 Q-90,-48 -122,-58 Z" fill="#2a1818" />
                <path d="M-122,-148 Q-90,-156 -58,-148 L-58,-118 Q-90,-110 -122,-118 Z" fill="#1c1010" />
                <path d="M-44,-150 Q0,-170 44,-150 L44,-80 Q0,-70 -44,-80 Z" fill="#2a1818" />
                <path d="M-44,-188 Q0,-196 44,-188 L44,-158 Q0,-150 -44,-158 Z" fill="#1c1010" />
                <path d="M-44,-216 Q0,-220 44,-216 L44,-196 Q0,-192 -44,-196 Z" fill="#1c1010" />
                <path d="M56,-126 Q88,-140 120,-126 L120,-80 Q88,-72 56,-80 Z" fill="#2a1818" />
                <polygon points="0,-228 36,-222 0,-216" fill="#7a1818" />
              </g>

              <path d="M0,720 L1920,720 L1920,1080 L0,1080 Z" fill="url(#sea)" />
              <ellipse cx="1240" cy="734" rx="280" ry="14" fill="rgba(255,184,80,.5)" />
              <ellipse cx="1240" cy="754" rx="200" ry="6" fill="rgba(255,184,80,.4)" />
              <ellipse cx="1240" cy="774" rx="120" ry="3" fill="rgba(255,184,80,.28)" />

              <path d="M0,940 L0,1080 L420,1080 Q320,940 220,940 Q130,930 80,940 Z" fill="#040206" />
              <path d="M1920,940 L1920,1080 L1500,1080 Q1600,940 1700,940 Q1790,930 1840,940 Z" fill="#040206" />

              {/* Soldier silhouette */}
              <g transform="translate(220,900)" fill="#040206">
                <ellipse cx="0" cy="0" rx="7" ry="26" />
                <circle cx="0" cy="-32" r="7" />
                <path d="M-14,-36 L14,-36 L10,-42 L-10,-42 Z" />
                <line x1="2" y1="-14" x2="30" y2="-44" stroke="#040206" strokeWidth="3" />
                <ellipse cx="0" cy="28" rx="11" ry="3" opacity=".5" />
              </g>

              {/* Heraldic banner */}
              <g transform="translate(40,40)">
                <rect x="-2" y="0" width="3" height="160" fill="#1a0a08" />
                <path d="M2,4 L100,4 L100,118 L52,106 L2,118 Z" fill="#5a1414" stroke="#8d6212" strokeWidth="1.5" opacity=".92" />
                <path d="M2,4 L100,4 L100,118 L52,106 L2,118 Z" fill="url(#hatch)" opacity=".5" />
                <path d="M51,24 L51,90 M28,52 L74,52" stroke="#d4a23a" strokeWidth="3" fill="none" />
                <rect x="48" y="60" width="6" height="20" fill="#d4a23a" />
                <circle cx="51" cy="40" r="3" fill="#d4a23a" />
                <circle cx="0" cy="-2" r="4" fill="#d4a23a" stroke="#8d6212" strokeWidth="1" />
              </g>

              <rect width="1920" height="1080" fill="url(#hatch)" opacity=".25" />
            </svg>
          </div>

          <div className="hero-content">
            <div>
              <span className="eyebrow">
                <I name="trending" size={16} /> Academia de decisiones AoE3
              </span>
              <h1>
                Decks, shipments y timings
                <br />
                con <em>intención</em>.
              </h1>
              <p className="lead">
                Una academia para Age of Empires III que no se queda en listas de cartas: une civilización, plan, opening,
                matchup y transición para que sepas{" "}
                <em style={{ color: "var(--gold-hi)", fontStyle: "normal" }}>qué hacer en partida</em>.
              </p>
              <dl className="stats-strip" aria-label="Estado del proyecto">
                <div>
                  <dt>Tests</dt>
                  <dd>
                    13<span>/13</span>
                  </dd>
                </div>
                <div>
                  <dt>Rutas SSG</dt>
                  <dd>137</dd>
                </div>
                <div>
                  <dt>Tools</dt>
                  <dd>35</dd>
                </div>
                <div>
                  <dt>Warnings</dt>
                  <dd>0</dd>
                </div>
              </dl>
              <div className="actions">
                <Link className="button" href={`/plans/${featuredPlan?.id ?? "french-semi-ff"}`}>
                  Abrir plan ejemplo
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link className="button secondary" href="/civs">
                  <I name="map" size={18} /> Ver civilizaciones
                </Link>
              </div>
            </div>

            <aside className="hero-panel" aria-label="Estado del MVP">
              <div className="hero-panel-head">
                <span>MVP ejecutado</span>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--gold-hi)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 6 6 .9-4.5 4.2 1 6.4L12 16.8 6.5 19.5l1-6.4L3 8.9 9 8z" />
                </svg>
              </div>
              <div className="hero-panel-body">
                <ul className="signal-list">
                  <li>
                    <span className="icn">
                      <I name="shield" size={16} />
                    </span>
                    <div>
                      <strong>Modelo propio AoE3</strong>
                      <span>Plan = civ + deck + opening + ramas.</span>
                    </div>
                  </li>
                  <li>
                    <span className="icn">
                      <I name="extlink" size={16} />
                    </span>
                    <div>
                      <strong>Iconos oficiales hospedados</strong>
                      <span>21 flags AoE3:DE vía aoe3explorer.com (referencia comunitaria).</span>
                    </div>
                  </li>
                  <li>
                    <span className="icn">
                      <I name="trending" size={16} />
                    </span>
                    <div>
                      <strong>Fuentes visibles</strong>
                      <span>AOE3 Explorer, Free Food Party, ESOC, Samurai Strategy School.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ============ DECISION ASSISTANT ============ */}
        <section className="section tight" style={{ paddingTop: 64 }}>
          <div className="wrap">
            <div className="da-panel">
              <div className="da-head">
                <span className="da-emblem">
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                </span>
                <div>
                  <div className="da-title">Decision Assistant</div>
                  <div className="da-sub">Plan recomendado según tu civ, mapa y rival.</div>
                </div>
                <span className="da-status">Coach v1 · LIVE</span>
              </div>
              <div className="da-body">
                <div className="da-form">
                  <label>
                    <span>Mi civ</span>
                    <select value={daCiv} onChange={(e) => setDaCiv(e.target.value as keyof typeof DA_RECIPES)}>
                      <option value="french">French</option>
                      <option value="british">British</option>
                      <option value="ottomans">Ottomans</option>
                    </select>
                  </label>
                  <label>
                    <span>Rival</span>
                    <select value={daRival} onChange={(e) => setDaRival(e.target.value as keyof typeof DA_DANGER)}>
                      <option>Rush colonial</option>
                      <option>Standard colonial</option>
                      <option>Boom / FF greedy</option>
                    </select>
                  </label>
                  <label>
                    <span>Mapa</span>
                    <select value={daMap} onChange={(e) => setDaMap(e.target.value)}>
                      <option>Land standard</option>
                      <option>Defensible</option>
                      <option>Open / trade route</option>
                    </select>
                  </label>
                </div>
                <div className="da-output">
                  <h4>Plan recomendado</h4>
                  <div className="out-row">
                    <span className="out-label">Plan</span>
                    <span className="out-val">
                      <b>{recipe.title}</b>
                    </span>
                  </div>
                  <div className="out-row">
                    <span className="out-label">Shipments</span>
                    <span className="out-val">{recipe.ship}</span>
                  </div>
                  <div className="out-row">
                    <span className="out-label">Age-up</span>
                    <span className="out-val">{recipe.age}</span>
                  </div>
                  <div className="out-row">
                    <span className="out-label">Scout</span>
                    <span className="out-val">{recipe.scout}</span>
                  </div>
                  <div className="out-row">
                    <span className="out-label">Peligro</span>
                    <span className="out-val">{DA_DANGER[daRival]}</span>
                  </div>
                  <div className="out-row">
                    <span className="out-label">Plan B</span>
                    <span className="out-val">Cancela greed, prepara batch defensivo cerca de TC.</span>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <Link className="button" href={`/plans/${recipe.plan}`} style={{ padding: "10px 18px", fontSize: ".84rem" }}>
                      Abrir plan completo{" "}
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ORNAMENTAL DIVIDER ============ */}
        <div className="wrap">
          <div className="divider" aria-hidden="true">
            <span className="rule" />
            <svg width={56} height={42} viewBox="0 0 56 42" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
              <line x1="10" y1="6" x2="42" y2="38" />
              <line x1="46" y1="6" x2="14" y2="38" />
              <line x1="6" y1="10" x2="14" y2="2" />
              <line x1="50" y1="10" x2="42" y2="2" />
              <path d="M22 14 L34 14 L34 22 Q34 30 28 32 Q22 30 22 22 Z" fill="none" />
              <path d="M28 18 L28 26 M24 21 L32 21" />
            </svg>
            <span className="rule" />
          </div>
        </div>

        {/* ============ PLAN SELECTOR ============ */}
        <section className="section" id="planes">
          <div className="wrap">
            <div className="section-heading">
              <div className="col">
                <span className="section-kicker">
                  <span className="num">I</span>Selección de plan
                </span>
                <h2>
                  Elige un <em>plan</em>.
                </h2>
              </div>
              <p>
                La home ya funciona como herramienta: busca por civ, arquetipo o problema. Cada resultado lleva a una guía
                jugable con deck, opening y ramas.
              </p>
            </div>

            <div className="plan-selector">
              <div className="selector-controls">
                <label>
                  <span className="pill">
                    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" />
                    </svg>
                    Buscar plan
                  </span>
                  <input
                    type="text"
                    placeholder="French, rush, boom, anti-rush…"
                    value={planQuery}
                    onChange={(e) => setPlanQuery(e.target.value)}
                  />
                </label>
                <label>
                  <span className="pill">
                    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <path d="M4 6h16" />
                      <path d="M7 12h10" />
                      <path d="M10 18h4" />
                    </svg>
                    Tipo
                  </span>
                  <select value={planArch} onChange={(e) => setPlanArch(e.target.value)}>
                    <option value="all">Todos</option>
                    <option>Rush</option>
                    <option>Semi-FF</option>
                    <option>Boom</option>
                    <option>Timing</option>
                    <option>Control</option>
                    <option>Water</option>
                    <option>Treaty</option>
                  </select>
                </label>
              </div>

              {featuredPlan && featuredCiv ? (
                <div className="plan-featured" style={{ ["--accent" as string]: featuredCiv.accent }}>
                  <div className="crest-sm">{featuredCiv.shortName}</div>
                  <div className="info">
                    <span className="label">Plan destacado</span>
                    <div className="title">{featuredPlan.title}</div>
                    <div className="desc">{featuredPlan.promise}</div>
                  </div>
                  <Link className="open-btn" href={`/plans/${featuredPlan.id}`}>
                    Abrir plan
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                      <path d="M5 12h14" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ) : null}

              <div className="grid">
                {filteredPlans.length === 0 ? (
                  <p style={{ color: "var(--muted)", padding: 14, gridColumn: "1/-1" }}>
                    Sin resultados para esos filtros.
                  </p>
                ) : (
                  filteredPlans.map((p) => {
                    const civ = aoe3Civilizations.find((c) => c.id === p.civId);
                    return (
                      <Link key={p.id} className="card" href={`/plans/${p.id}`}>
                        <div className="card-top">
                          <span className="icon-tile">
                            <I name={ARCH_ICON[p.archetype] ?? "swords"} size={22} />
                          </span>
                          <span className="status">{p.reviewStatus}</span>
                        </div>
                        <h3>{p.title}</h3>
                        <p>{p.promise}</p>
                        <div className="meta-row">
                          <span className="pill">{civ?.name ?? p.civId}</span>
                          <span className="pill">{p.mode}</span>
                          <span className="pill">{p.difficulty}</span>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============ HERRAMIENTAS ============ */}
        <section className="section wood-band">
          <div className="wrap">
            <div className="section-heading">
              <div className="col">
                <span className="section-kicker">
                  <span className="num">II</span>Herramientas base
                </span>
                <h2>
                  Herramientas <em>base</em>.
                </h2>
              </div>
              <p>
                El primer corte cubre la experiencia mínima que diferencia una academia de una wiki: información conectada
                y orientada a decisiones.
              </p>
            </div>

            <div className="grid">
              {featuredTools.map((f) => {
                const Icn = f.icon;
                return (
                  <Link key={f.title} className="card" href={f.href}>
                    <div className="card-top">
                      <span className="icon-tile">
                        <Icn size={22} aria-hidden="true" />
                      </span>
                      <span className="status">{f.signal}</span>
                    </div>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </Link>
                );
              })}
            </div>

            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link className="button secondary" href="/roadmap" style={{ minHeight: 42 }}>
                Ver roadmap completo
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ============ CRITERIOS + FUENTES ============ */}
        <section className="section tight">
          <div className="wrap">
            <div className="grid two">
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: "1.45rem", marginBottom: 12 }}>Criterios 10/10</h3>
                <ul className="list">
                  {PILLARS.map((p) => (
                    <li key={p.label}>
                      <span className="icn">
                        <I name={p.icon} size={16} />
                      </span>
                      <div>{p.label}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: "1.45rem", marginBottom: 12 }}>Fuentes y assets</h3>
                <ul className="list">
                  {academySources.map((s) => (
                    <li key={s.url}>
                      <span className="icn">
                        <I name="extlink" size={16} />
                      </span>
                      <div>
                        <a href={s.url} target="_blank" rel="noreferrer">
                          {s.label} <I name="extlink" size={12} />
                        </a>
                        <span className="note">{s.note}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ STRIP (minimap + slot + log) ============ */}
      <section className="strip">
        <div className="wrap strip-inner">
          <div className="mini">
            <div className="mini-head">Minimapa · Academia</div>
            <div className="mini-canvas" aria-hidden="true">
              <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="miniGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="rgba(241,207,136,.45)" />
                    <stop offset="1" stopColor="rgba(241,207,136,0)" />
                  </radialGradient>
                </defs>
                <rect width="200" height="140" fill="#08110a" />
                <g fill="none" stroke="rgba(216,173,87,.16)">
                  <path d="M0 36 L200 28" />
                  <path d="M0 72 L200 78" />
                  <path d="M0 108 L200 102" />
                  <path d="M40 0 L48 140" />
                  <path d="M120 0 L112 140" />
                </g>
                <circle cx="55" cy="95" r="12" fill="url(#miniGlow)" />
                <rect x="50" y="90" width="10" height="10" fill="#f1cf88" stroke="#5a3a0e" />
                <circle cx="152" cy="42" r="10" fill="rgba(188,75,52,.4)" />
                <rect x="148" y="38" width="8" height="8" fill="#bc4b34" stroke="#3a0a0a" />
                <polygon points="100,60 104,68 96,68" fill="#d4a526" />
                <polygon points="75,40 79,48 71,48" fill="#d4a526" />
                <polygon points="130,98 134,106 126,106" fill="#d4a526" />
                <path d="M58 92 Q90 60 152 42" fill="none" stroke="rgba(216,173,87,.7)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>

          <div className="slot">
            <div className="slot-head">
              <span className="slot-tag">Asset pending</span>
              <span className="slot-mini">Pack propio v0.1</span>
            </div>
            <div className="slot-body">
              <div className="slot-art">
                <svg viewBox="0 0 80 100" width={80} height={100} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="40" cy="32" r="14" />
                  <path d="M16 90 q24 -34 48 0" />
                  <path d="M28 28 q12 -14 24 0" />
                </svg>
              </div>
              <div className="slot-text">
                <strong>Civ heroes con cabeza</strong>
                <p>
                  21/22 flags AoE3:DE oficiales ya cableadas vía aoe3explorer. Cuando Nano Banana 2 entre con clave,
                  generamos retratos propios por civ.
                </p>
                <Link className="slot-cta" href="/art-lab">
                  Ver pipeline
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="log">
            <div className="log-head">
              <span>Log de la academia</span>
              <span className="log-meta">Mensajes</span>
            </div>
            <ul className="log-list">
              <li>
                <span className="t">2026-05-24</span>
                <span>Frontend:</span> rediseño V8 madera/dorado/burdeos aplicado
              </li>
              <li>
                <span className="t">2026-05-22</span>
                <span>Build:</span> 137 rutas estáticas prerenderizadas
              </li>
              <li>
                <span className="t">2026-05-22</span>
                <span>Tests:</span> 13/13 verdes · integridad de datos OK
              </li>
              <li>
                <span className="t">2026-05-21</span>
                <span>Iconos:</span> 21 civ flags AoE3:DE vía aoe3explorer cableadas
              </li>
              <li>
                <span className="t">2026-05-21</span>
                <span>Coach IA:</span> 20 tools del Knowledge Core en /api/chat
              </li>
            </ul>
            <Link className="slot-cta" href="/roadmap" style={{ marginTop: 10 }}>
              Ver changelog completo
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                <path d="M5 12h14" />
                <path d="M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
