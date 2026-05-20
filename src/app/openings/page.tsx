import Link from "next/link";
import { ArrowRight, Timer } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Openings, getCiv } from "@/data/aoe3";

export default function OpeningsPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Openings"
          title="Aperturas con benchmarks y puntos de decision."
          body="El objetivo no es obedecer una receta ciega: es saber cuando el envio cambia y por que."
        />
        <section className="section">
          <div className="wrap grid">
            {aoe3Openings.map((opening) => {
              const civ = getCiv(opening.civId);
              return (
              <Link className="card" href={`/plans/${opening.planId}`} key={opening.id}>
                <div className="card-top">
                  <span className="icon-tile">
                    <Timer size={22} aria-hidden="true" />
                  </span>
                  <span className="status">{opening.reviewStatus}</span>
                </div>
                <h3>{opening.title}</h3>
                <p>{opening.benchmark}</p>
                <div className="meta-row">
                  <span className="pill">{civ?.name ?? opening.civId}</span>
                  <span className="pill">{opening.difficulty}</span>
                  <span className="pill">{opening.mode}</span>
                </div>
                <div className="actions">
                  <span className="button secondary">
                    Ver en plan <ArrowRight size={16} aria-hidden="true" />
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
