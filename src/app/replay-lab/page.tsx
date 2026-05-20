import Link from "next/link";
import { ArrowRight, BadgeCheck, ExternalLink, FileText, Timer } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { replayPipeline, sourceQueue } from "@/data/aoe3";

const confidenceLabels = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
  unknown: "Por validar",
};

const replaySources = sourceQueue.filter((item) => item.id.includes("replay") || item.use.toLowerCase().includes("replay"));

export default function ReplayLabPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Replay lab"
          title="Analisis de partidas sin humo."
          body="Primero manual, luego parser externo, despues coach automatizado con citas internas. El lab define exactamente que entra, que sale y que confianza tiene cada paso."
        />

        <section className="section tight">
          <div className="wrap">
            <div className="grid two">
              <article className="card">
                <div className="card-top">
                  <span className="icon-tile">
                    <FileText size={20} aria-hidden="true" />
                  </span>
                  <span className="status">v1 activo</span>
                </div>
                <h3>Analyzer manual</h3>
                <p>Ya puedes registrar age-up, shipments, idle TC estimado y scouting para recibir diagnostico determinista.</p>
                <Link className="button secondary" href="/analyzer">
                  Abrir analyzer <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
              <article className="card">
                <div className="card-top">
                  <span className="icon-tile">
                    <Timer size={20} aria-hidden="true" />
                  </span>
                  <span className="status">siguiente</span>
                </div>
                <h3>Replay import</h3>
                <p>El siguiente salto es aceptar output de AOE3 Explorer o Free Food Party y convertirlo en timeline educativo.</p>
                <Link className="button secondary" href="/replay-import">
                  Probar import <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link className="button secondary" href="/parser-solution">
                  Ver solucion parser <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Pipeline de replay</h2>
              <p>El replay lab se construye por pasos auditables: recogida, normalizacion, timeline, deck audit, insights y narrativa IA.</p>
            </div>
            <div className="timeline replay-timeline">
              {replayPipeline.map((step, index) => (
                <article className="timeline-step" key={step.id}>
                  <span className="time">0{index + 1}</span>
                  <div>
                    <div className="roadmap-heading">
                      <strong>{step.title}</strong>
                      <span className={`status confidence-${step.confidence}`}>
                        <BadgeCheck size={13} aria-hidden="true" />
                        {confidenceLabels[step.confidence]}
                      </span>
                    </div>
                    <p>{step.output}</p>
                    <div className="meta-row">
                      {step.input.map((input) => (
                        <span className="pill" key={input}>
                          {input}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Fuentes de replay</h2>
              <p>Estas fuentes se prueban antes de prometer import automatico.</p>
            </div>
            <div className="grid">
              {replaySources.map((source) => (
                <article className="card compact-card" key={source.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <ExternalLink size={20} aria-hidden="true" />
                    </span>
                    <span className="status">{source.priority}</span>
                  </div>
                  <h3>{source.title}</h3>
                  <p>{source.use}</p>
                  <a className="button secondary" href={source.url} target="_blank" rel="noreferrer">
                    Revisar fuente <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
