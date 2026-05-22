import Link from "next/link";
import { ArrowRight, BadgeCheck, ExternalLink, ListTree, Search, ShieldCheck, Timer, TrendingUp } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import {
  academyExecutionCadence,
  academyOperatingGoal,
  academyQualityGates,
  academyTracks,
  roadmapSummary,
  sourceQueue,
  statSummary,
} from "@/data/aoe3";

const p0Sources = sourceQueue.filter((source) => source.priority === "P0");
const activeRoadmapScore = Math.round(((roadmapSummary.done + roadmapSummary.active * 0.55) / roadmapSummary.total) * 100);
const adapterDebt = statSummary["adapter-needed"] + statSummary.blocked;

export default function AcademyOSPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Academy OS"
          title="El goal 100/10 convertido en sistema de ejecucion."
          body="Este tablero define el trabajo ultraambicioso: que se construye, como se valida, que fuentes mandan, que no se puede inventar y que ciclo mantiene viva la academia durante dias."
        />

        <section className="section tight">
          <div className="wrap">
            <div className="os-command">
              <div>
                <span className="eyebrow">
                  <TrendingUp size={16} aria-hidden="true" /> Goal activo
                </span>
                <h2>{academyOperatingGoal.title}</h2>
                <p>{academyOperatingGoal.thesis}</p>
                <p>{academyOperatingGoal.successDefinition}</p>
                <div className="actions">
                  <Link className="button" href="/roadmap">
                    Ver 100 pasos <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link className="button secondary" href="/source-queue">
                    Abrir cola P0 <ExternalLink size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <aside className="os-doctrine" aria-label="No negociables">
                <h3>No negociables</h3>
                <ul className="list">
                  {academyOperatingGoal.nonNegotiables.map((item) => (
                    <li key={item}>
                      <ShieldCheck size={15} aria-hidden="true" /> {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="wrap">
            <div className="os-metrics">
              <article className="metric-plate">
                <span>Operacion</span>
                <strong>{activeRoadmapScore}%</strong>
                <p>Roadmap hecho o activo sin maquillar la cola.</p>
              </article>
              <article className="metric-plate">
                <span>Fuentes P0</span>
                <strong>{p0Sources.length}</strong>
                <p>Recursos que alimentan datos, replays, guias y patches.</p>
              </article>
              <article className="metric-plate">
                <span>Deuda stats</span>
                <strong>{adapterDebt}</strong>
                <p>Campos que necesitan adapter o siguen bloqueados.</p>
              </article>
              <article className="metric-plate">
                <span>Ciclo</span>
                <strong>12h</strong>
                <p>Automatizacion creada para empujar slices de alto impacto.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>10 frentes</h2>
              <p>El 100/10 se divide en frentes que producen superficies reales: tools, datos, fuentes, arte, QA y coach.</p>
            </div>
            <div className="os-track-grid">
              {academyTracks.map((track, index) => (
                <article className="os-track" key={track.id}>
                  <div className="card-top">
                    <span className="roadmap-id">{index + 1}</span>
                    <Link className="status" href={track.ownerSurface}>
                      {track.ownerSurface} <ExternalLink size={13} aria-hidden="true" />
                    </Link>
                  </div>
                  <h3>{track.title}</h3>
                  <p>{track.promise}</p>
                  <div className="source-action">
                    <strong>Gap actual</strong>
                    <p>{track.currentGap}</p>
                  </div>
                  <div className="mini-stats">
                    {track.firstShips.map((ship) => (
                      <span className="pill" key={ship}>
                        {ship}
                      </span>
                    ))}
                  </div>
                  <div className="meta-row">
                    <span className="status status-active">
                      <BadgeCheck size={13} aria-hidden="true" /> Gate
                    </span>
                    <span className="pill">{track.qualityGate}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="wrap">
            <div className="grid two">
              <div>
                <div className="section-heading compact-heading">
                  <h2>Gates de calidad</h2>
                  <p>Reglas para no confundir ambicion con humo.</p>
                </div>
                <div className="stack">
                  {academyQualityGates.map((gate) => (
                    <article className="roadmap-row" key={gate.id}>
                      <span className="roadmap-id">
                        <ShieldCheck size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <div className="roadmap-heading">
                          <h3>{gate.label}</h3>
                          <span className="status">{gate.proof}</span>
                        </div>
                        <p>{gate.rule}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-heading compact-heading">
                  <h2>Cadencia</h2>
                  <p>Como se trabaja durante dias sin romper el producto.</p>
                </div>
                <div className="stack">
                  {academyExecutionCadence.map((item) => (
                    <article className="timeline-step" key={item.rhythm}>
                      <span className="time">{item.rhythm}</span>
                      <div>
                        <strong>{item.action}</strong>
                        <p>{item.expectedArtifact}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Fuentes P0 que mandan</h2>
              <p>El goal queda atado a fuentes concretas: parsers, updates oficiales, ESOC, tools y validacion comunitaria.</p>
            </div>
            <div className="resource-list">
              {p0Sources.slice(0, 10).map((source) => (
                <article className="resource-card card" key={source.id}>
                  <div className="card-top">
                    <span className={`status stage-${source.stage}`}>
                      <ListTree size={14} aria-hidden="true" />
                      {source.stage}
                    </span>
                    <span className="pill">{source.kind}</span>
                  </div>
                  <h3>{source.title}</h3>
                  <p>{source.use}</p>
                  <div className="meta-row">
                    <span className="pill">{source.nextAction}</span>
                  </div>
                  <a className="button secondary" href={source.url} target="_blank" rel="noreferrer">
                    Fuente <ExternalLink size={15} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="wrap">
            <div className="progress-panel">
              <div>
                <span className="eyebrow">
                  <Search size={16} aria-hidden="true" /> Siguiente slice recomendado
                </span>
                <h2>Replay parser adapter + 20 fixtures.</h2>
                <p>
                  Es el mayor desbloqueo: convierte recursos externos en analisis de partidas, valida coach, alimenta
                  drills y evita que la academia dependa solo de contenido editorial.
                </p>
              </div>
              <div className="stack">
                <Link className="button" href="/parser-solution">
                  Parser solution <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link className="button secondary" href="/replay-import">
                  Import lab <Timer size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

