import { ExternalLink, Search } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { resourceCategories, resourceCounts, resources } from "@/data/resources";

const priorityOrder = { P0: 0, P1: 1, P2: 2, Monitor: 3 };

export default function ResourcesPage() {
  const sorted = [...resources].sort((a, b) => {
    const category = resourceCategories.indexOf(a.category) - resourceCategories.indexOf(b.category);
    if (category !== 0) return category;
    return priorityOrder[a.priority] - priorityOrder[b.priority] || a.name.localeCompare(b.name);
  });

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Fuentes y radar"
          title="Todo lo que alimenta la academia."
          body="Directorio intensivo de webs, foros, wikis, Reddit, YouTube, Twitch, TikTok, Discord, Steam, herramientas y assets. Cada fuente tiene uso concreto y accion para convertirla en producto."
        />
        <section className="section tight">
          <div className="wrap">
            <div className="grid">
              {resourceCounts().map((item) => (
                <article className="card" key={item.category}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <Search size={20} aria-hidden="true" />
                    </span>
                    <span className="status">{item.count}</span>
                  </div>
                  <h3>{item.category}</h3>
                  <p>{item.count} fuentes en radar.</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Directorio</h2>
              <p>
                P0 significa fuente central para contenido o producto. Monitor significa senal de descubrimiento: util para
                encontrar temas, no para afirmar datos de balance.
              </p>
            </div>
            <div className="resource-list">
              {sorted.map((resource) => (
                <article className="card resource-card" key={resource.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <ExternalLink size={20} aria-hidden="true" />
                    </span>
                    <span className="status">{resource.priority}</span>
                  </div>
                  <h3>{resource.name}</h3>
                  <p>{resource.use}</p>
                  <div className="meta-row">
                    <span className="pill">{resource.category}</span>
                    <span className="pill">{resource.status}</span>
                  </div>
                  <h3>Accion academia</h3>
                  <p>{resource.academyAction}</p>
                  <h3>Evidencia</h3>
                  <p>{resource.evidence}</p>
                  <a className="button secondary" href={resource.url} target="_blank" rel="noreferrer">
                    Abrir fuente <ExternalLink size={16} aria-hidden="true" />
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
