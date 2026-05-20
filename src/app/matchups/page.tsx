import Link from "next/link";
import { ArrowRight, Crosshair } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { matchups } from "@/data/academy";

export default function MatchupsPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Matchups"
          title="Briefs para decidir antes de la cola."
          body="Cada matchup apunta a deck, opening, primer desvio y condicion de victoria. El corpus se ampliara por civ real y mapa."
        />
        <section className="section">
          <div className="wrap grid">
            {matchups.map((matchup) => (
              <article className="card" key={matchup.id}>
                <div className="card-top">
                  <span className="icon-tile">
                    <Crosshair size={22} aria-hidden="true" />
                  </span>
                  <span className="status">{matchup.reviewStatus}</span>
                </div>
                <h3>{matchup.ownCiv} vs {matchup.enemy}</h3>
                <p>{matchup.threat}</p>
                <ul className="list">
                  <li>
                    <strong>Primer decision:</strong> {matchup.firstDecision}
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
        </section>
      </main>
    </SiteShell>
  );
}
