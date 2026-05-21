import Link from "next/link";
import { ArrowRight, Crosshair } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { matchups as legacyMatchups } from "@/data/academy";
import { aoe3Matchups, getCiv, getPlan } from "@/data/aoe3";

export default function MatchupsPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Matchups"
          title="Briefs para decidir antes de la cola."
          body="Cada matchup apunta a deck, opening, primer desvio y condicion de victoria. La matriz aoe3 cubre civ vs arquetipo enemigo (Rush/Boom/FF/Treaty)."
        />

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Matriz canónica (civ vs arquetipo)</h2>
              <p>
                {aoe3Matchups.length} briefs editoriales conectados al corpus AoE3 con planId verificado. Estado{" "}
                <code>needs-review</code>: validar contra Samurai Strategy School/ESOC antes de canonical.
              </p>
            </div>
            <div className="grid">
              {aoe3Matchups.map((matchup) => {
                const civ = getCiv(matchup.ownCivId);
                const plan = getPlan(matchup.planId);
                return (
                  <article className="card" key={matchup.id}>
                    <div className="card-top">
                      <span className="icon-tile">
                        <Crosshair size={22} aria-hidden="true" />
                      </span>
                      <span className="status">{matchup.reviewStatus}</span>
                    </div>
                    <h3>
                      {civ?.name ?? matchup.ownCivId} vs {matchup.enemyArchetype}
                    </h3>
                    {matchup.enemyExample ? (
                      <p className="muted">Ejemplos: {matchup.enemyExample}</p>
                    ) : null}
                    <p>{matchup.threat}</p>
                    <div className="meta-row">
                      <span className="pill">map: {matchup.mapTag}</span>
                      <span className="pill">arquetipo: {matchup.enemyArchetype}</span>
                    </div>
                    <ul className="list">
                      <li>
                        <strong>Primer decisión:</strong> {matchup.firstDecision}
                      </li>
                      <li>
                        <strong>Win condition:</strong> {matchup.winCondition}
                      </li>
                      <li>
                        <strong>Peligro:</strong> {matchup.danger}
                      </li>
                    </ul>
                    {matchup.scoutSignals.length ? (
                      <>
                        <h3>Scout signals</h3>
                        <ul className="list">
                          {matchup.scoutSignals.map((signal) => (
                            <li key={signal}>{signal}</li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                    <div className="actions">
                      {plan ? (
                        <Link className="button secondary" href={`/plans/${plan.id}`}>
                          Abrir plan: {plan.title} <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                      ) : null}
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
              <h2>Briefs legacy (civ vs civ específico)</h2>
              <p>
                Estructura original con {legacyMatchups.length} matchups civ-vs-civ. Mantenidos hasta completar migración a
                la matriz canónica.
              </p>
            </div>
            <div className="grid">
              {legacyMatchups.map((matchup) => (
                <article className="card" key={matchup.id}>
                  <div className="card-top">
                    <span className="icon-tile">
                      <Crosshair size={22} aria-hidden="true" />
                    </span>
                    <span className="status">{matchup.reviewStatus}</span>
                  </div>
                  <h3>
                    {matchup.ownCiv} vs {matchup.enemy}
                  </h3>
                  <p>{matchup.threat}</p>
                  <ul className="list">
                    <li>
                      <strong>Primer decisión:</strong> {matchup.firstDecision}
                    </li>
                    <li>
                      <strong>Win condition:</strong> {matchup.winCondition}
                    </li>
                    <li>
                      <strong>Peligro:</strong> {matchup.danger}
                    </li>
                  </ul>
                  <div className="actions">
                    <Link className="button secondary" href={`/plans/${matchup.planId}`}>
                      Abrir plan <ArrowRight size={16} aria-hidden="true" />
                    </Link>
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
