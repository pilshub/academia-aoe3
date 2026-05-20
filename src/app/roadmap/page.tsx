import Link from "next/link";
import { BadgeAlert, BadgeCheck, ExternalLink, ListTree, Timer, TrendingUp } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { roadmap100, roadmapSummary, type RoadmapStatus } from "@/data/aoe3";

const statusLabels: Record<RoadmapStatus, string> = {
  done: "Hecho",
  active: "Activo",
  queued: "Cola",
  blocked: "Bloqueado",
};

const statusDescriptions: Record<RoadmapStatus, string> = {
  done: "Ya existe como producto visible o contrato de datos.",
  active: "Esta en ejecucion, seed o validacion editorial.",
  queued: "Tiene destino claro, falta contenido/adaptador.",
  blocked: "Depende de una fuente externa o dato que aun no podemos garantizar.",
};

const statusIcons = {
  done: BadgeCheck,
  active: TrendingUp,
  queued: Timer,
  blocked: BadgeAlert,
} satisfies Record<RoadmapStatus, typeof BadgeCheck>;

const phaseOrder = Array.from(new Set(roadmap100.map((step) => step.phase)));

function phaseStats(phase: string) {
  const steps = roadmap100.filter((step) => step.phase === phase);
  return {
    total: steps.length,
    done: steps.filter((step) => step.status === "done").length,
    active: steps.filter((step) => step.status === "active").length,
    queued: steps.filter((step) => step.status === "queued").length,
    blocked: steps.filter((step) => step.status === "blocked").length,
  };
}

export default function RoadmapPage() {
  const operationalScore = Math.round(((roadmapSummary.done + roadmapSummary.active * 0.55) / roadmapSummary.total) * 100);

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Roadmap 100/100"
          title="Los 100 pasos convertidos en sistema operativo."
          body="No es una promesa escondida en un documento: cada paso tiene fase, entregable y estado para saber que ya existe, que esta activo y que queda bloqueado por fuentes reales."
        />

        <section className="section tight">
          <div className="wrap">
            <div className="ops-summary">
              <article className="card compact-card">
                <span className="status">Total</span>
                <strong>{roadmapSummary.total}</strong>
                <p>pasos trazados para llevar la academia a nivel producto.</p>
              </article>
              <article className="card compact-card">
                <span className="status status-done">Hechos</span>
                <strong>{roadmapSummary.done}</strong>
                <p>pantallas, modelos o herramientas ya ejecutadas.</p>
              </article>
              <article className="card compact-card">
                <span className="status status-active">Activos</span>
                <strong>{roadmapSummary.active}</strong>
                <p>trabajo con seed, investigacion o validacion en marcha.</p>
              </article>
              <article className="card compact-card">
                <span className="status status-blocked">Bloqueos</span>
                <strong>{roadmapSummary.blocked}</strong>
                <p>datos que no se deben inventar sin parser o API fiable.</p>
              </article>
            </div>
            <div className="progress-panel">
              <div>
                <span className="eyebrow">
                  <ListTree size={16} aria-hidden="true" /> Control de ejecucion
                </span>
                <h2>{operationalScore}% operacionalizado</h2>
                <p>
                  Cuenta como progreso lo hecho y lo activo. La cola queda priorizada sin maquillar como completada: asi la
                  academia crece con datos verificables.
                </p>
              </div>
              <div className="progress-track" aria-label={`${operationalScore}% operacionalizado`}>
                <span style={{ width: `${operationalScore}%` }} />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Fases</h2>
              <p>Mapa de trabajo por bloque: producto, datos, stats, replays, fuentes, video, ingestion, contenido, tools, simuladores e IA.</p>
            </div>
            <div className="grid">
              {phaseOrder.map((phase) => {
                const stats = phaseStats(phase);
                return (
                  <article className="card compact-card" key={phase}>
                    <div className="card-top">
                      <span className="icon-tile">
                        <ListTree size={20} aria-hidden="true" />
                      </span>
                      <span className="status">{stats.total} pasos</span>
                    </div>
                    <h3>{phase}</h3>
                    <div className="mini-stats">
                      <span className="pill status-done">{stats.done} hecho</span>
                      <span className="pill status-active">{stats.active} activo</span>
                      <span className="pill">{stats.queued} cola</span>
                      <span className="pill status-blocked">{stats.blocked} bloqueo</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Los 100 pasos</h2>
              <p>Cada fila tiene un entregable concreto. Lo bloqueado queda marcado para evitar claims falsos sobre stats o replay data.</p>
            </div>
            <div className="roadmap-list">
              {roadmap100.map((step) => {
                const Icon = statusIcons[step.status];
                return (
                  <article className="roadmap-row" key={step.id}>
                    <span className="roadmap-id">{step.id}</span>
                    <div>
                      <div className="roadmap-heading">
                        <h3>{step.title}</h3>
                        <span className={`status status-${step.status}`}>
                          <Icon size={14} aria-hidden="true" />
                          {statusLabels[step.status]}
                        </span>
                      </div>
                      <p>{step.deliverable}</p>
                      <div className="meta-row">
                        <span className="pill">{step.phase}</span>
                        <span className="pill">{statusDescriptions[step.status]}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="wrap">
            <Link className="button secondary" href="/source-queue">
              Abrir cola de fuentes <ExternalLink size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
