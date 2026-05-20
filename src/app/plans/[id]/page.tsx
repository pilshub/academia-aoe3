import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CheckCircle2, Eye, Timer, WalletCards } from "@/components/icons";
import { EvidencePanel } from "@/components/EvidencePanel";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Plans, getCard, getCardsForCiv, getPlanBundle } from "@/data/aoe3";

export function generateStaticParams() {
  return aoe3Plans.map((plan) => ({ id: plan.id }));
}

export default async function PlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bundle = getPlanBundle(id);
  if (!bundle) notFound();
  const { plan, civ, deck, opening } = bundle;
  if (!civ || !deck || !opening) notFound();
  const civCards = getCardsForCiv(civ.id);

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow={`${civ.name} / ${plan.archetype}`} title={plan.title} body={plan.promise} />
        <section className="section">
          <div className="wrap split">
            <aside className="rail">
              <div
                className="crest"
                style={{ "--accent": civ.accent } as React.CSSProperties}
                aria-label={`Civ ${civ.name}`}
              >
                {civ.shortName}
              </div>
              <h2>{civ.name}</h2>
              <p>{civ.identity}</p>
              <div className="meta-row">
                <span className="pill">{plan.mode}</span>
                <span className="pill">{plan.difficulty}</span>
                <span className="status">{plan.reviewStatus}</span>
              </div>
              <div className="actions">
                <Link className="button secondary" href={`/decks/${deck.id}`}>
                  Deck <WalletCards size={16} aria-hidden="true" />
                </Link>
              </div>
              <EvidencePanel evidence={plan.evidence} fallbackSourceId={plan.sourceId} compact />
            </aside>

            <div className="stack">
              <section className="grid two">
                <article className="card">
                  <h3>Deck</h3>
                  <p>{deck.goal}</p>
                  <ul className="list">
                    {deck.shipmentOrder.map((cardId) => (
                      <li key={cardId}>
                        <WalletCards size={15} aria-hidden="true" /> {getCard(cardId)?.name ?? cardId}
                      </li>
                    ))}
                  </ul>
                  <Link className="button secondary" href={`/decks/${deck.id}`}>
                    Abrir deck <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
                <article className="card">
                  <h3>Benchmarks</h3>
                  <ul className="list">
                    {plan.benchmarks.map((benchmark) => (
                      <li key={benchmark}>
                        <Timer size={15} aria-hidden="true" /> {benchmark}
                      </li>
                    ))}
                  </ul>
                </article>
              </section>

              <section className="card">
                <h3>Opening: {opening.title}</h3>
                <p>{opening.benchmark}</p>
                <div className="timeline">
                  {opening.steps.map((step) => (
                    <div className="timeline-step" key={`${step.time}-${step.action}`}>
                      <span className="time">{step.time}</span>
                      <div>
                        <strong>{step.population}: {step.action}</strong>
                        <p>{step.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid two">
                <article className="card">
                  <h3>Logica de shipments</h3>
                  <ul className="list">
                    {plan.shipmentLogic.map((line) => (
                      <li key={line}>
                        <CheckCircle2 size={15} aria-hidden="true" /> {line}
                      </li>
                    ))}
                  </ul>
                </article>
                <article className="card">
                  <h3>Ramas</h3>
                  <ul className="list">
                    {plan.branches.map((branch) => (
                      <li key={branch}>
                        <AlertTriangle size={15} aria-hidden="true" /> {branch}
                      </li>
                    ))}
                  </ul>
                </article>
              </section>

              <section className="grid two">
                <article className="card">
                  <h3>Scouting</h3>
                  <ul className="list">
                    {opening.scoutChecks.map((check) => (
                      <li key={check}>
                        <Eye size={15} aria-hidden="true" /> {check}
                      </li>
                    ))}
                  </ul>
                </article>
                <article className="card">
                  <h3>Practica</h3>
                  <ul className="list">
                    {plan.practiceChecklist.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={15} aria-hidden="true" /> {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </section>

              <section>
                <h3>Cartas relacionadas</h3>
                <div className="grid">
                  {civCards.slice(0, 3).map((card) => (
                    <article className="card" key={card.id}>
                      <div className="card-top">
                        <span className="pill">{card.age}</span>
                        <span className="status">{card.role}</span>
                      </div>
                      <h3>{card.name}</h3>
                      <p>{card.explanation}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
