import { ExternalLink, Search, ShieldCheck } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import {
  contentCitations,
  provenanceSources,
  provenanceStatusLabels,
  provenanceSummary,
  sourceReliabilityLabels,
} from "@/data/aoe3";

const statusClass = {
  verified: "status-done",
  "needs-sample": "status-active",
  "context-only": "status-manual-seed",
  blocked: "status-blocked",
};

export default function SourceProvenancePage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Provenance interno"
          title="Cada claim importante con su fuente."
          body="Este registro conecta herramientas, patches, foros, wikis y contenido seed con la informacion que alimentan. Sirve para citar despues sin tener que reconstruir de donde salio cada decision."
        />

        <section className="section tight">
          <div className="wrap">
            <div className="ops-summary">
              <article className="card compact-card">
                <span className="status">Fuentes</span>
                <strong>{provenanceSummary.sources}</strong>
                <p>registros con URL, prioridad y uso.</p>
              </article>
              <article className="card compact-card">
                <span className="status status-done">Facts</span>
                <strong>{provenanceSummary.facts}</strong>
                <p>claims internos conectados a una fuente.</p>
              </article>
              <article className="card compact-card">
                <span className="status status-manual-seed">Citas</span>
                <strong>{provenanceSummary.citations}</strong>
                <p>mapeos info a fuente para producto.</p>
              </article>
              <article className="card compact-card">
                <span className="status status-active">Samples</span>
                <strong>{provenanceSummary.needsSample}</strong>
                <p>pendientes de fixture, parser o muestra real.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Fuentes verificadas</h2>
              <p>Las fuentes oficiales pueden cerrar datos de patch. Las comunitarias alimentan backlog y requieren thread, replay o video concreto para canonical.</p>
            </div>
            <div className="stack">
              {provenanceSources.map((source) => (
                <article className="card provenance-source" id={source.id} key={source.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <ShieldCheck size={20} aria-hidden="true" />
                    </span>
                    <span className="status">{sourceReliabilityLabels[source.reliability]}</span>
                  </div>
                  <h3>{source.title}</h3>
                  <p>{source.sourceFor.join(" / ")}</p>
                  <div className="meta-row">
                    <span className="pill">{source.kind}</span>
                    <span className="pill">revisado {source.lastChecked}</span>
                    <a className="pill" href={source.url} target={source.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      abrir fuente <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </div>
                  <div className="provenance-facts">
                    {source.facts.map((fact) => (
                      <div className="mini-card" key={fact.id}>
                        <div className="card-top">
                          <strong>{fact.claim}</strong>
                          <span className={`pill ${statusClass[fact.status]}`}>{provenanceStatusLabels[fact.status]}</span>
                        </div>
                        <p>{fact.useInAcademy}</p>
                        <div className="meta-row">
                          {fact.appliesTo.map((item) => (
                            <span className="pill" key={item}>
                              {item}
                            </span>
                          ))}
                        </div>
                        <p className="muted">{fact.citationNote}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Info &gt; fuente</h2>
              <p>Este es el mapa que usaremos cuando toque poner citas visibles en guias, decks, replays o fichas de stats.</p>
            </div>
            <div className="citation-grid">
              {contentCitations.map((citation) => (
                <article className="card compact-card" key={citation.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <Search size={18} aria-hidden="true" />
                    </span>
                    <span className={`status ${statusClass[citation.status]}`}>{provenanceStatusLabels[citation.status]}</span>
                  </div>
                  <h3>{citation.contentType}: {citation.contentId}</h3>
                  <p>{citation.statement}</p>
                  <div className="meta-row">
                    <span className="pill">{citation.field}</span>
                    {citation.sourceIds.map((sourceId) => (
                      <a className="pill" href={`#${sourceId}`} key={sourceId}>
                        {sourceId}
                      </a>
                    ))}
                  </div>
                  <div className="source-action">
                    <strong>Politica de cita</strong>
                    <p>{citation.citationPolicy}</p>
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
