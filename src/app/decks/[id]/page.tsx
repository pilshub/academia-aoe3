import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, WalletCards } from "@/components/icons";
import { EvidencePanel } from "@/components/EvidencePanel";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Decks, aoe3Plans, aoe3Sources, getCard, getDeck, getCiv } from "@/data/aoe3";

export function generateStaticParams() {
  return aoe3Decks.map((deck) => ({ id: deck.id }));
}

export default async function DeckDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deck = getDeck(id);
  if (!deck) notFound();
  const linkedPlan = aoe3Plans.find((plan) => plan.deckId === deck.id);
  const civ = getCiv(deck.civId);
  const source = aoe3Sources.find((item) => item.id === deck.sourceId);

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow={civ?.name ?? deck.civId} title={deck.title} body={deck.goal} />
        <section className="section">
          <div className="wrap split">
            <aside className="rail">
              <span className="icon-tile">
                <WalletCards size={22} aria-hidden="true" />
              </span>
              <h2>Lectura rapida</h2>
              <div className="meta-row">
                <span className="pill">{deck.mode}</span>
                <span className="pill">{deck.patch}</span>
                <span className="status">{deck.reviewStatus}</span>
              </div>
              {linkedPlan ? (
                <div className="actions">
                  <Link className="button" href={`/plans/${linkedPlan.id}`}>
                    Ver plan <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              ) : null}
            </aside>
            <div className="stack">
              <section className="card">
                <h3>Shipment order esperado</h3>
                <div className="timeline">
                  {deck.shipmentOrder.map((cardId, index) => (
                    <div className="timeline-step" key={cardId}>
                      <span className="time">#{index + 1}</span>
                      <div>
                        <strong>{getCard(cardId)?.name ?? cardId}</strong>
                        <p>Se confirma en partida segun scouting y presion rival.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="grid">
                <div className="card">
                  <h3>Core</h3>
                  <ul className="list">
                    {deck.coreCardIds.map((cardId) => (
                      <li key={cardId}>{getCard(cardId)?.name ?? cardId}</li>
                    ))}
                  </ul>
                </div>
                <div className="card">
                  <h3>Flex</h3>
                  <ul className="list">
                    {deck.flexCardIds.map((cardId) => (
                      <li key={cardId}>{getCard(cardId)?.name ?? cardId}</li>
                    ))}
                  </ul>
                </div>
                <div className="card">
                  <h3>Trampas</h3>
                  <ul className="list">
                    {deck.trapCardIds.map((cardId) => (
                      <li key={cardId}>{getCard(cardId)?.name ?? cardId}</li>
                    ))}
                  </ul>
                </div>
              </section>
              <section className="card">
                <h3>Fuente</h3>
                <p>{source?.note ?? "Fuente pendiente de revision."}</p>
                <EvidencePanel evidence={deck.evidence} fallbackSourceId={deck.sourceId} compact />
                <a className="button secondary" href={source?.url ?? "/resources"} target={source?.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {source?.label ?? "Fuentes"} <ExternalLink size={16} aria-hidden="true" />
                </a>
              </section>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
