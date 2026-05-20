import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CheckCircle2, Eye, Timer } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { getMatchAnalysis, getPlan, matchAnalyses } from "@/data/academy";

export function generateStaticParams() {
  return matchAnalyses.map((analysis) => ({ id: analysis.id }));
}

function verdictLabel(verdict: string) {
  if (verdict === "good") return "Bien";
  if (verdict === "critical") return "Critico";
  return "Aviso";
}

export default async function AnalysisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const analysis = getMatchAnalysis(id);
  if (!analysis) notFound();
  const plan = getPlan(analysis.planId);

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow={`${analysis.playerCiv} vs ${analysis.enemyCiv}`} title={analysis.title} body={analysis.thesis} />
        <section className="section">
          <div className="wrap split">
            <aside className="rail">
              <span className="icon-tile">
                <Eye size={22} aria-hidden="true" />
              </span>
              <h2>{analysis.result}</h2>
              <p>{analysis.map} / {analysis.duration}</p>
              <div className="meta-row">
                <span className="pill">{analysis.playerCiv}</span>
                <span className="pill">vs {analysis.enemyCiv}</span>
                <span className="status">{analysis.reviewStatus}</span>
              </div>
              {plan ? (
                <div className="actions">
                  <Link className="button secondary" href={`/plans/${plan.id}`}>
                    Ver plan <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              ) : null}
            </aside>
            <div className="stack">
              <section className="grid two">
                <article className="card">
                  <h3>Error clave</h3>
                  <p>{analysis.keyMistake}</p>
                </article>
                <article className="card">
                  <h3>Turning point</h3>
                  <p>{analysis.turningPoint}</p>
                </article>
              </section>
              <section className="card">
                <h3>Timeline</h3>
                <div className="timeline">
                  {analysis.moments.map((moment) => (
                    <div className="timeline-step" key={`${moment.time}-${moment.label}`}>
                      <span className="time">{moment.time}</span>
                      <div>
                        <strong>
                          {moment.label}: {moment.event}
                        </strong>
                        <p>
                          <span className="pill">{verdictLabel(moment.verdict)}</span> {moment.lesson}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="grid two">
                <article className="card">
                  <h3>Correcciones</h3>
                  <ul className="list">
                    {analysis.corrections.map((item) => (
                      <li key={item}>
                        <AlertTriangle size={15} aria-hidden="true" /> {item}
                      </li>
                    ))}
                  </ul>
                </article>
                <article className="card">
                  <h3>Practica</h3>
                  <ul className="list">
                    {analysis.practice.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={15} aria-hidden="true" /> {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </section>
              <Link className="button" href="/analyzer">
                Analizar mi partida <Timer size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
