import Link from "next/link";
import { ArrowRight, WalletCards } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Decks, getCiv } from "@/data/aoe3";

export default function DecksPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Decks"
          title="Decks explicados como plan, no como lista."
          body="Cada deck separa cartas core, flex y trampas. La academia debe responder que intentas ganar con esas 25 cartas."
        />
        <section className="section">
          <div className="wrap grid">
            {aoe3Decks.map((deck) => {
              const civ = getCiv(deck.civId);
              return (
              <Link className="card" href={`/decks/${deck.id}`} key={deck.id}>
                <div className="card-top">
                  <span className="icon-tile">
                    <WalletCards size={22} aria-hidden="true" />
                  </span>
                  <span className="status">{deck.reviewStatus}</span>
                </div>
                <h3>{deck.title}</h3>
                <p>{deck.goal}</p>
                <div className="meta-row">
                  <span className="pill">{civ?.name ?? deck.civId}</span>
                  <span className="pill">{deck.mode}</span>
                  <span className="pill">{deck.patch}</span>
                </div>
                <div className="actions">
                  <span className="button secondary">
                    Abrir deck <ArrowRight size={16} aria-hidden="true" />
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
