import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Civilizations, getPlan } from "@/data/aoe3";

export const metadata = {
  title: "Civilizaciones · Academia AoE3",
  description: "Atlas editorial de las 22 civilizaciones AoE3:DE con identidad, tempo, power spikes y planes recomendados.",
};

const needsReviewCount = aoe3Civilizations.filter((c) => c.reviewStatus === "needs-review").length;

export default function CivilizacionesPage() {
  return (
    <SiteShell>
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="crumb">
              <Link href="/">Inicio</Link> &nbsp;/&nbsp; Civilizaciones
            </div>
            <h1>
              22 civilizaciones <em>auditables</em>.
            </h1>
            <p>
              Cada civ con identidad estratégica, tempo, power spikes y errores comunes. Conectada a sus planes
              recomendados, decks, openings y matchups. ReviewStatus visible en todo momento.
            </p>
            <dl className="stats">
              <div>
                <dt>Civs</dt>
                <dd>{aoe3Civilizations.length}</dd>
              </div>
              <div>
                <dt>Needs-review</dt>
                <dd>{needsReviewCount}</dd>
              </div>
              <div>
                <dt>Flags oficiales</dt>
                <dd>21</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="kicker">
              <span className="num">I</span>Atlas
            </div>
            <div className="civ-grid">
              {aoe3Civilizations.map((civ) => (
                <Link
                  className="civ-card"
                  key={civ.id}
                  href={`/civs/${civ.id}`}
                  style={{ ["--accent" as string]: civ.accent }}
                >
                  <div className="civ-band" style={{ ["--accent" as string]: civ.accent }}>
                    <span className="crest">{civ.shortName}</span>
                  </div>
                  <div className="civ-body">
                    <div className="civ-meta">
                      <span className="name">{civ.name}</span>
                      <span className="region">{civ.region}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span className="diff">{civ.difficulty}</span>
                      <span className="diff ghost">{civ.reviewStatus}</span>
                    </div>
                    <p className="identity">{civ.identity}</p>
                    <p className="tempo">{civ.tempo}</p>
                    <div className="civ-spec">
                      <div>
                        <h4>Power spikes</h4>
                        <ul>
                          {civ.powerSpikes.slice(0, 3).map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mistakes">
                        <h4 style={{ color: "var(--red)" }}>Errores comunes</h4>
                        <ul>
                          {civ.mistakes.slice(0, 3).map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {civ.recommendedPlanIds.length > 0 ? (
                      <div className="recommend">
                        <span className="label">Planes recomendados</span>
                        <div className="plans">
                          {civ.recommendedPlanIds.map((id) => {
                            const plan = getPlan(id);
                            return plan ? (
                              <span className="plan-pill" key={id}>
                                {plan.title}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
