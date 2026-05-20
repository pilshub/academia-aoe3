import Link from "next/link";
import { ExternalLink, ShieldCheck } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { patchImpacts, patchTrackerSummary } from "@/data/aoe3";

export default function PatchTrackerPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Patch tracker"
          title="Cuando cambia el juego, cambian las guias."
          body="Registro de updates oficiales/candidatos, areas afectadas, riesgo academico y tareas de revision. Nada pasa a canonical sin fecha, fuente y diff."
        />
        <section className="section tight">
          <div className="wrap">
            <div className="ops-summary">
              <article className="card compact-card"><span className="status">total</span><strong>{patchTrackerSummary.total}</strong><p>entradas vigiladas.</p></article>
              <article className="card compact-card"><span className="status trust-canonical">oficial</span><strong>{patchTrackerSummary.official}</strong><p>patch confirmado.</p></article>
              <article className="card compact-card"><span className="status trust-source-backed">candidatos</span><strong>{patchTrackerSummary.candidates}</strong><p>requieren diff manual.</p></article>
              <article className="card compact-card"><span className="status trust-editorial-seed">watch</span><strong>{patchTrackerSummary.watch}</strong><p>alertas tempranas.</p></article>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Impactos</h2>
              <p>El patch tracker alimenta source queue, trust center, guias, decks y cards.</p>
            </div>
            <div className="resource-list">
              {patchImpacts.map((patch) => (
                <article className="card resource-card" key={patch.id}>
                  <div className="card-top">
                    <span className={`status ${patch.trust === "official" ? "trust-canonical" : patch.trust === "candidate" ? "trust-source-backed" : "trust-editorial-seed"}`}>{patch.trust}</span>
                    <span className="pill">{patch.patch}</span>
                  </div>
                  <h3>{patch.title}</h3>
                  <p>{patch.academyRisk}</p>
                  <div className="meta-row">
                    {patch.areas.map((area) => <span className="pill" key={area}>{area}</span>)}
                  </div>
                  <a className="button secondary" href={patch.url} target="_blank" rel="noreferrer">
                    Fuente <ExternalLink size={15} aria-hidden="true" />
                  </a>
                  <div className="source-action">
                    <strong>Next action</strong>
                    <p>{patch.nextAction}</p>
                  </div>
                  <div className="meta-row">
                    {patch.reviewTargets.map((href) => (
                      <Link className="pill" href={href} key={href}>
                        <ShieldCheck size={12} aria-hidden="true" /> {href}
                      </Link>
                    ))}
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
