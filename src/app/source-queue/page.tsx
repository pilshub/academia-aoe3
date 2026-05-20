import Link from "next/link";
import { ExternalLink, Search } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { sourceQueue, type SourceKind, type SourceStage } from "@/data/aoe3";

const stages: SourceStage[] = ["watch", "extract", "validate", "publish"];
const kinds: SourceKind[] = ["official", "tool", "forum", "wiki", "reddit", "youtube", "twitch", "discord", "legacy", "art"];
const priorityOrder = { P0: 0, P1: 1, P2: 2, Monitor: 3 };

const stageLabels: Record<SourceStage, string> = {
  watch: "Vigilar",
  extract: "Extraer",
  validate: "Validar",
  publish: "Publicar",
};

export default function SourceQueuePage() {
  const sorted = [...sourceQueue].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority] || stages.indexOf(a.stage) - stages.indexOf(b.stage) || a.title.localeCompare(b.title));

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Cola de fuentes"
          title="De web, foro y video a contenido verificable."
          body="Esta cola transforma fuentes externas en datos de academia: patches, replays, decks, creators, foros, herramientas y assets. Cada entrada tiene siguiente accion."
        />

        <section className="section tight">
          <div className="wrap">
            <div className="ops-summary">
              {stages.map((stage) => (
                <article className="card compact-card" key={stage}>
                  <span className={`status stage-${stage}`}>{stageLabels[stage]}</span>
                  <strong>{sourceQueue.filter((item) => item.stage === stage).length}</strong>
                  <p>fuentes en esta fase del pipeline.</p>
                </article>
              ))}
            </div>
            <Link className="button secondary" href="/source-provenance">
              Ver provenance interno <ExternalLink size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Tipo de fuente</h2>
              <p>El objetivo no es coleccionar links: es decidir que fuente alimenta stats, guias, replay lab, arte o radar de comunidad.</p>
            </div>
            <div className="source-kind-grid">
              {kinds.map((kind) => (
                <article className="mini-card" key={kind}>
                  <strong>{kind}</strong>
                  <p>{sourceQueue.filter((item) => item.kind === kind).length} entradas</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Backlog accionable</h2>
              <p>P0 se trata como fuente central. Monitor sirve para descubrir temas o creators, no para afirmar balance.</p>
            </div>
            <div className="resource-list">
              {sorted.map((item) => (
                <article className="card source-card" key={item.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <Search size={20} aria-hidden="true" />
                    </span>
                    <span className="status">{item.priority}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.use}</p>
                  <div className="meta-row">
                    <span className="pill">{item.kind}</span>
                    <span className={`pill stage-${item.stage}`}>{stageLabels[item.stage]}</span>
                  </div>
                  <div className="source-action">
                    <strong>Siguiente accion</strong>
                    <p>{item.nextAction}</p>
                  </div>
                  <a className="button secondary" href={item.url} target="_blank" rel="noreferrer">
                    Abrir <ExternalLink size={16} aria-hidden="true" />
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
