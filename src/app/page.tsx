import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Crown,
  ExternalLink,
  Images,
  ShieldCheck,
  Search,
} from "@/components/icons";
import { PlanSelector } from "@/components/PlanSelector";
import { SiteShell } from "@/components/SiteShell";
import { features, officialMedia, roadmapPillars, sources } from "@/data/academy";
import {
  aoe3Cards,
  aoe3Civilizations,
  aoe3Matchups,
  aoe3Plans,
  roadmapSummary,
} from "@/data/aoe3";
import { aoe3CivGuides } from "@/data/aoe3/civGuides";
import { civFlagUrl } from "@/lib/aoe3/aoe3explorer-assets";

const HERO_CIVS = ["french", "british", "ottomans", "spanish"] as const;

const HEADLINE_STATS = [
  { label: "civs", value: aoe3Civilizations.length },
  { label: "planes", value: aoe3Plans.length },
  { label: "cards", value: aoe3Cards.length },
  { label: "matchups", value: aoe3Matchups.length },
  { label: "civ guides", value: aoe3CivGuides.length },
];

export default function HomePage() {
  return (
    <SiteShell>
      <main>
        <section
          className="hero"
          style={{ "--hero-image": `url(${officialMedia.academyHero})` } as React.CSSProperties}
        >
          <div className="wrap hero-content">
            <div>
              <span className="eyebrow">
                <Crown size={16} aria-hidden="true" /> Academia de decisiones AoE3
              </span>
              <h1>Decks, shipments y timings con intención.</h1>
              <p className="lead">
                Una academia para Age of Empires III que no se queda en listas de cartas: une civilización, plan, opening,
                matchup y transición para que sepas qué hacer en partida.
              </p>
              <div className="actions">
                <Link className="button" href="/civ-guide">
                  Empezar por una civ <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link className="button secondary" href="/ai-coach">
                  Probar Coach IA <Search size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <aside className="hero-panel" aria-label="Estado del producto">
              <div className="hero-panel-header">
                <span>Sprint 6 ejecutado</span>
                <BadgeCheck size={18} aria-hidden="true" />
              </div>
              <div className="hero-panel-body">
                <ul className="signal-list">
                  <li>
                    <ShieldCheck size={18} aria-hidden="true" />
                    <div>
                      Modelo canónico AoE3
                      <br />
                      <span>10 planes · 53 cards · 14 matchups · 13 tests verdes.</span>
                    </div>
                  </li>
                  <li>
                    <Search size={18} aria-hidden="true" />
                    <div>
                      Coach con 20 tools
                      <br />
                      <span>Knowledge Core + guardrails anti-invención + history local.</span>
                    </div>
                  </li>
                  <li>
                    <Images size={18} aria-hidden="true" />
                    <div>
                      Seed pack propio
                      <br />
                      <span>8 SVG civ heroes; Nano Banana 2 reemplaza cuando haya key.</span>
                    </div>
                  </li>
                  <li>
                    <BadgeCheck size={18} aria-hidden="true" />
                    <div>
                      Roadmap 100 vivo
                      <br />
                      <span>
                        {roadmapSummary.done}/{roadmapSummary.total} done, {roadmapSummary.active} active,{" "}
                        {roadmapSummary.queued} queued, {roadmapSummary.blocked} blocked.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Civilizaciones destacadas</h2>
              <p>
                Las 4 civs needs-review con corpus más maduro. Clic en cualquiera para ver identidad, planes, cartas,
                politicians, units y matchups en una sola página.
              </p>
            </div>
            <div className="grid">
              {HERO_CIVS.map((civId) => {
                const civ = aoe3Civilizations.find((c) => c.id === civId);
                if (!civ) return null;
                const officialFlag = civFlagUrl(civ.id);
                return (
                  <Link className="card" key={civ.id} href={`/civs/${civ.id}`} style={{ padding: 0 }}>
                    {officialFlag ? (
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "5 / 3",
                          background: `linear-gradient(135deg, ${civ.accent}55, rgba(17,17,15,0.55))`,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <img
                          src={officialFlag}
                          alt={`${civ.name} flag oficial`}
                          loading="lazy"
                          style={{ maxWidth: "55%", maxHeight: "80%", objectFit: "contain" }}
                        />
                      </div>
                    ) : (
                      <img
                        src={`/assets/generated/civ-${civ.id}.svg`}
                        alt={`${civ.name} hero (seed)`}
                        width={400}
                        height={240}
                        loading="lazy"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    )}
                    <div style={{ padding: "1rem 1.25rem" }}>
                      <h3>{civ.name}</h3>
                      <p>{civ.identity}</p>
                      <div className="meta-row">
                        <span className="pill">{civ.difficulty}</span>
                        <span className="pill">{civ.region}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Elige un plan</h2>
              <p>
                Busca por civ, arquetipo o problema. Cada resultado lleva a una guía jugable con deck, opening y ramas.
              </p>
            </div>
            <PlanSelector />
          </div>
        </section>

        <section className="section tight">
          <div className="wrap">
            <div className="grid two">
              <article className="card">
                <h3>Métricas reales del corpus</h3>
                <div className="meta-row" style={{ gap: "0.75rem", flexWrap: "wrap" }}>
                  {HEADLINE_STATS.map((stat) => (
                    <span className="pill" key={stat.label}>
                      <strong>{stat.value}</strong> {stat.label}
                    </span>
                  ))}
                </div>
                <p className="muted" style={{ marginTop: "1rem" }}>
                  Todo con sourceId + reviewStatus visible. La academia distingue seed editorial, needs-review y canonical.
                </p>
              </article>
              <article className="card">
                <h3>Coach IA con 20 tools</h3>
                <p>
                  Pregunta sobre plan, deck, carta, opening, matchup, política, unidad, tech, civ-guide, crate-start,
                  treasure-priority, counter, hotkey o replay-summary. Sin clave OpenRouter, responde con búsqueda directa
                  en corpus.
                </p>
                <div className="actions">
                  <Link className="button" href="/ai-coach">
                    Probar coach <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link className="button secondary" href="/knowledge">
                    Buscar manual <Search size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Herramientas base</h2>
              <p>
                Las herramientas no son decoración: reducen una decisión real de partida. Empieza por la que más urge en tu
                próximo ranked.
              </p>
            </div>
            <div className="grid">
              {features.slice(0, 12).map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link href={feature.href} className="card" key={feature.title}>
                    <div className="card-top">
                      <span className="icon-tile">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="status">{feature.signal}</span>
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </Link>
                );
              })}
            </div>
            <div className="actions" style={{ marginTop: "1.5rem" }}>
              <Link className="button secondary" href="/roadmap">
                Ver roadmap 100 <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="wrap">
            <div className="grid two">
              <div className="card">
                <h3>Criterios 10/10</h3>
                <ul className="list">
                  {roadmapPillars.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label}>
                        <Icon size={16} aria-hidden="true" /> {item.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="card">
                <h3>Fuentes y assets</h3>
                <ul className="list">
                  {sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer">
                        {source.label} <ExternalLink size={14} aria-hidden="true" />
                      </a>
                      <br />
                      <span>{source.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
