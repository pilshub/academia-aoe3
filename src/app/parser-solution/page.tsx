import { ExternalLink, FileText, ShieldCheck } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { parserSolutionSummary, parserSolutions, replayFixturePlan } from "@/data/aoe3";

const statusLabels = {
  primary: "Principal",
  secondary: "Secundario",
  validator: "Validador",
  manual: "Manual",
};

export default function ParserSolutionPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Solucion parser"
          title="Como salimos del bloqueo needs-sample."
          body="La ruta viable es generar fixtures propios con un parser local reciente, y usar AOE3 Explorer / FreeFoodParty como validadores visuales mientras no haya API publica estable."
        />

        <section className="section tight">
          <div className="wrap">
            <div className="ops-summary">
              <article className="card compact-card">
                <span className="status status-done">Principal</span>
                <strong>{parserSolutionSummary.primary}</strong>
                <p>parser local para JSON/BO fixtures.</p>
              </article>
              <article className="card compact-card">
                <span className="status status-active">Fallback</span>
                <strong>{parserSolutionSummary.secondary}</strong>
                <p>parser de formato y player/deck info.</p>
              </article>
              <article className="card compact-card">
                <span className="status status-manual-seed">Validadores</span>
                <strong>{parserSolutionSummary.validators}</strong>
                <p>herramientas web para comparar resultados.</p>
              </article>
              <article className="card compact-card">
                <span className="status">Manual</span>
                <strong>{parserSolutionSummary.manual}</strong>
                <p>tool desktop como backup de inspeccion.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Stack recomendado</h2>
              <p>Separar parser, validacion y producto evita depender de una herramienta externa sin contrato de export.</p>
            </div>
            <div className="grid">
              {parserSolutions.map((solution) => (
                <article className="card compact-card" key={solution.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <ShieldCheck size={20} aria-hidden="true" />
                    </span>
                    <span className={`status parser-${solution.status}`}>{statusLabels[solution.status]}</span>
                  </div>
                  <h3>{solution.title}</h3>
                  <p>{solution.evidence}</p>
                  <div className="source-action">
                    <strong>Accion academia</strong>
                    <p>{solution.academyAction}</p>
                  </div>
                  <h3>Extrae</h3>
                  <div className="meta-row">
                    {solution.extracts.map((item) => (
                      <span className="pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <h3>Limites</h3>
                  <ul className="list">
                    {solution.limitations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a className="button secondary" href={solution.url} target="_blank" rel="noreferrer">
                    Abrir fuente <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Pipeline de fixtures</h2>
              <p>Este flujo convierte un replay real en JSON verificable antes de alimentar /replay-import.</p>
            </div>
            <div className="timeline">
              {replayFixturePlan.map((step, index) => (
                <article className="timeline-step" key={step.step}>
                  <span className="time">0{index + 1}</span>
                  <div>
                    <strong>{step.step}</strong>
                    <p>{step.command}</p>
                    <div className="meta-row">
                      <span className="pill">
                        <FileText size={13} aria-hidden="true" />
                        {step.output}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
