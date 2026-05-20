import { ShieldCheck } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { statDomains, trustLevels } from "@/data/aoe3";

export default function TrustPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Sello de confianza"
          title="Cada dato sabe de donde viene y cuanto pesa."
          body="La academia separa canonical, fuente viva, fixture de replay, seed editorial y bloqueo. Asi se puede crecer rapido sin vender humo."
        />
        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Estados de publicacion</h2>
              <p>El sello decide donde puede aparecer un dato: guia principal, herramienta, experimento o backlog bloqueado.</p>
            </div>
            <div className="grid">
              {trustLevels.map((level) => (
                <article className="card" key={level.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <ShieldCheck size={20} aria-hidden="true" />
                    </span>
                    <span className={`status ${level.badgeClass}`}>{level.label}</span>
                  </div>
                  <h3>{level.use}</h3>
                  <p>{level.publishRule}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section tight">
          <div className="wrap">
            <div className="section-heading">
              <h2>Aplicado a stats</h2>
              <p>Los dominios de datos no se desbloquean hasta que tengan adapter, muestra y fuente.</p>
            </div>
            <div className="stat-field-grid">
              {statDomains.map((domain) => (
                <article className="card" key={domain.id}>
                  <span className={`status status-${domain.fields[0]?.status ?? "manual-seed"}`}>{domain.fields[0]?.status ?? "manual-seed"}</span>
                  <h3>{domain.title}</h3>
                  <p>{domain.goal}</p>
                  <ul className="list">
                    {domain.fields.slice(0, 4).map((field) => (
                      <li key={field.key}>
                        {field.label}: {field.status}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
