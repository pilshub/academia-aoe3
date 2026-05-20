import { Images, Search } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { artPipeline, assetBriefs, type ArtPipelineItem } from "@/data/aoe3";

const statusLabels: Record<ArtPipelineItem["status"], string> = {
  "brief-ready": "Brief listo",
  "needs-reference": "Referencia pendiente",
  "generate-next": "Generar siguiente",
  "in-app": "En app",
};

export default function ArtLabPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Art lab"
          title="Arte propio para no depender solo de assets oficiales."
          body="La pagina guarda briefs, prompts y destinos de imagen. Hoy usamos un hero generado; el pipeline queda preparado para Nano Banana 2 y variantes por civ, deck, mapa y tool."
        />

        <section className="section tight">
          <div className="wrap">
            <div className="ops-summary">
              {(["generate-next", "brief-ready", "needs-reference", "in-app"] as ArtPipelineItem["status"][]).map((status) => (
                <article className="card compact-card" key={status}>
                  <span className={`status art-${status}`}>{statusLabels[status]}</span>
                  <strong>{artPipeline.filter((item) => item.status === status).length}</strong>
                  <p>assets en esta fase del pipeline visual.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Briefs de imagen</h2>
              <p>Las imagenes generadas deben ser inspiradas por AoE3, sin logos ni texto embebido. La UI anade etiquetas encima.</p>
            </div>
            <div className="art-grid">
              {artPipeline.map((item) => (
                <article className="card art-card" key={item.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <Images size={20} aria-hidden="true" />
                    </span>
                    <span className={`status art-${item.status}`}>{statusLabels[item.status]}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <div className="meta-row">
                    <span className="pill">{item.type}</span>
                    <span className="pill">{item.destination}</span>
                  </div>
                  <div className="source-action">
                    <strong>Prompt</strong>
                    <p className="prompt-box">{item.prompt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="wrap">
            <article className="card">
              <div className="card-top">
                <span className="icon-tile">
                  <Search size={20} aria-hidden="true" />
                </span>
                <span className="status">politica visual</span>
              </div>
              <h3>Regla de assets</h3>
              <p>
                Los iconos y capturas oficiales se pueden usar como referencia o enlace, pero la academia debe construir un
                pack propio para civ heroes, covers, placas de tool e infografias. Cada asset generado queda con destino,
                prompt y estado.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Pack propio de academia</h2>
              <p>Estos briefs son la cola directa para Nano Banana 2: retratos, placas, mapas, backplates y sellos internos.</p>
            </div>
            <div className="art-grid">
              {assetBriefs.map((brief) => (
                <article className="card art-card" key={brief.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <Images size={20} aria-hidden="true" />
                    </span>
                    <span className={`status art-${brief.status}`}>{brief.status}</span>
                  </div>
                  <h3>{brief.title}</h3>
                  <div className="meta-row">
                    <span className="pill">{brief.family}</span>
                    <span className="pill">{brief.placement}</span>
                  </div>
                  <div className="source-action">
                    <strong>Prompt base</strong>
                    <p className="prompt-box">{brief.prompt}</p>
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
