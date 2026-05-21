import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, Crown, ExternalLink, Images, ShieldCheck } from "@/components/icons";
import { PlanSelector } from "@/components/PlanSelector";
import { SiteShell } from "@/components/SiteShell";
import { features, officialMedia, roadmapPillars, sources } from "@/data/academy";

export default function HomePage() {
  return (
    <SiteShell>
      <main>
        <section className="hero" style={{ "--hero-image": `url(${officialMedia.academyHero})` } as React.CSSProperties}>
          <div className="wrap hero-content">
            <div>
              <span className="eyebrow">
                <Crown size={16} aria-hidden="true" /> Academia de decisiones AoE3
              </span>
              <h1>Decks, shipments y timings con intencion.</h1>
              <p className="lead">
                Una academia para Age of Empires III que no se queda en listas de cartas: une civilizacion, plan, opening,
                matchup y transicion para que sepas que hacer en partida.
              </p>
              <div className="actions">
                <Link className="button" href="/plans/french-semi-ff">
                  Abrir plan ejemplo <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link className="button secondary" href="/decks">
                  Ver decks <BookOpen size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <aside className="hero-panel" aria-label="Estado del MVP">
              <div className="hero-panel-header">
                <span>MVP ejecutado</span>
                <BadgeCheck size={18} aria-hidden="true" />
              </div>
              <div className="hero-panel-body">
                <ul className="signal-list">
                  <li>
                    <ShieldCheck size={18} aria-hidden="true" />
                    <div>
                      Modelo propio AoE3
                      <br />
                      <span>Plan = civ + deck + opening + ramas.</span>
                    </div>
                  </li>
                  <li>
                    <Images size={18} aria-hidden="true" />
                    <div>
                      Seed pack propio de civ heroes
                      <br />
                      <span>8 SVG generados (FR/BR/OT/SP/DU/GE/RU/AZ); Nano Banana 2 reemplaza cuando haya key.</span>
                    </div>
                  </li>
                  <li>
                    <ExternalLink size={18} aria-hidden="true" />
                    <div>
                      Fuentes visibles
                      <br />
                      <span>AOE3 Explorer, Companion App y media oficial.</span>
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
              <h2>Elige un plan</h2>
              <p>
                La home ya funciona como herramienta: busca por civ, arquetipo o problema. Cada resultado lleva a una guia
                jugable con deck, opening y ramas.
              </p>
            </div>
            <PlanSelector />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Herramientas base</h2>
              <p>
                El primer corte cubre la experiencia minima que diferencia una academia de una wiki: informacion conectada y
                orientada a decisiones.
              </p>
            </div>
            <div className="grid">
              {features.map((feature) => {
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
