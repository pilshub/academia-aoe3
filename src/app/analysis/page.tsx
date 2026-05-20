import Link from "next/link";
import { ArrowRight, Eye } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { getPlan, matchAnalyses } from "@/data/academy";

export default function AnalysisPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Analisis de partidas"
          title="Partidas convertidas en decisiones entrenables."
          body="Cada analisis tiene tesis, error clave, turning point, timeline y drills. Es el puente entre guia y mejora real."
        />
        <section className="section">
          <div className="wrap grid">
            {matchAnalyses.map((analysis) => {
              const plan = getPlan(analysis.planId);
              return (
                <Link className="card" href={`/analysis/${analysis.id}`} key={analysis.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <Eye size={22} aria-hidden="true" />
                    </span>
                    <span className="status">{analysis.reviewStatus}</span>
                  </div>
                  <h3>{analysis.title}</h3>
                  <p>{analysis.thesis}</p>
                  <div className="meta-row">
                    <span className="pill">{analysis.playerCiv}</span>
                    <span className="pill">vs {analysis.enemyCiv}</span>
                    <span className="pill">{analysis.duration}</span>
                  </div>
                  {plan ? <span className="pill">{plan.title}</span> : null}
                  <div className="actions">
                    <span className="button secondary">
                      Abrir analisis <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
