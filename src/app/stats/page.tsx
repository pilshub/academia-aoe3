import { BadgeAlert, BadgeCheck, Search, ShieldCheck, TrendingUp } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { statDomains, statSummary, type StatDomainStatus } from "@/data/aoe3";

const statusLabels: Record<StatDomainStatus, string> = {
  "live-source": "Fuente viva",
  "adapter-needed": "Adapter pendiente",
  "manual-seed": "Seed manual",
  blocked: "Bloqueado",
};

const statusCopy: Record<StatDomainStatus, string> = {
  "live-source": "Existe fuente actual que podemos enlazar o revisar.",
  "adapter-needed": "Hay que crear contrato tecnico antes de mostrar dato vivo.",
  "manual-seed": "Se puede publicar como contenido editorial con review.",
  blocked: "No se debe prometer hasta validar que una fuente lo expone.",
};

const statusIcons = {
  "live-source": BadgeCheck,
  "adapter-needed": TrendingUp,
  "manual-seed": ShieldCheck,
  blocked: BadgeAlert,
} satisfies Record<StatDomainStatus, typeof BadgeCheck>;

export default function StatsPage() {
  const statuses = Object.keys(statSummary) as StatDomainStatus[];

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Stats matrix"
          title="Todas las stats que necesita la academia."
          body="La academia separa fuente viva, seed editorial, adapter pendiente y bloqueo. Asi se pueden integrar datos sin inventar winrates, timings o outputs de replay."
        />

        <section className="section tight">
          <div className="wrap">
            <div className="ops-summary">
              {statuses.map((status) => {
                const Icon = statusIcons[status];
                return (
                  <article className="card compact-card" key={status}>
                    <span className={`status status-${status}`}>
                      <Icon size={14} aria-hidden="true" />
                      {statusLabels[status]}
                    </span>
                    <strong>{statSummary[status]}</strong>
                    <p>{statusCopy[status]}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Dominios de datos</h2>
              <p>Meta, perfiles, replays, mapas y contenido se diseñan como contratos separados para poder crecer sin mezclar fuentes.</p>
            </div>
            <div className="stack">
              {statDomains.map((domain) => (
                <article className="card" key={domain.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <Search size={20} aria-hidden="true" />
                    </span>
                    <span className="status">{domain.fields.length} campos</span>
                  </div>
                  <h3>{domain.title}</h3>
                  <p>{domain.goal}</p>
                  <div className="stat-field-grid">
                    {domain.fields.map((field) => {
                      const Icon = statusIcons[field.status];
                      return (
                        <div className="mini-card" key={field.key}>
                          <div className="card-top">
                            <strong>{field.label}</strong>
                            <span className={`pill status-${field.status}`}>
                              <Icon size={12} aria-hidden="true" />
                              {statusLabels[field.status]}
                            </span>
                          </div>
                          <p>{field.use}</p>
                          <span className="muted">{field.source}</span>
                        </div>
                      );
                    })}
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
