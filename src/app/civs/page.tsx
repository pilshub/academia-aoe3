import Link from "next/link";
import { ArrowRight, AlertTriangle } from "@/components/icons";
import { EvidencePanel } from "@/components/EvidencePanel";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Civilizations, getPlan } from "@/data/aoe3";

export default function CivsPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Civilizaciones"
          title="Perfiles que explican identidad, tempo y errores."
          body="Cada civ conecta directamente con planes recomendados. El objetivo no es memorizar stats, sino entender que partida quiere jugar."
        />
        <section className="section">
          <div className="wrap grid">
            {aoe3Civilizations.map((civ) => (
              <article className="card" key={civ.id}>
                <div
                  className="civ-band"
                  style={
                    {
                      "--civ-image": `linear-gradient(135deg, ${civ.accent}, rgba(17, 17, 15, 0.2))`,
                      "--accent": civ.accent,
                    } as React.CSSProperties
                  }
                >
                  <span className="crest">{civ.shortName}</span>
                </div>
                <div className="card-top">
                  <span className="status">{civ.reviewStatus}</span>
                  <span className="pill">{civ.difficulty}</span>
                </div>
                <h3>{civ.name}</h3>
                <p>{civ.identity}</p>
                <div className="meta-row">
                  <span className="pill">{civ.region}</span>
                  <span className="pill">{civ.tempo}</span>
                </div>
                <EvidencePanel evidence={civ.evidence} compact />
                <h3>Errores comunes</h3>
                <ul className="list">
                  {civ.mistakes.map((mistake) => (
                    <li key={mistake}>
                      <AlertTriangle size={15} aria-hidden="true" /> {mistake}
                    </li>
                  ))}
                </ul>
                <div className="actions">
                  {civ.recommendedPlanIds.map((planId) => {
                    const plan = getPlan(planId);
                    return plan ? (
                      <Link className="button secondary" href={`/plans/${plan.id}`} key={plan.id}>
                        {plan.title} <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    ) : null;
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
