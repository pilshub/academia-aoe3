import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Plans, aoe3Sources, getCard, getPlanBundle } from "@/data/aoe3";

export function generateStaticParams() {
  return aoe3Plans.map((plan) => ({ id: plan.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bundle = getPlanBundle(id);
  if (!bundle?.plan) return { title: "Plan · Academia AoE3" };
  return {
    title: `${bundle.plan.title} · Academia AoE3`,
    description: bundle.plan.promise,
  };
}

function resolveSource(sourceId: string | undefined) {
  if (!sourceId) return null;
  return aoe3Sources.find((s) => s.id === sourceId) ?? null;
}

export default async function PlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bundle = getPlanBundle(id);
  if (!bundle) notFound();
  const { plan, civ, deck, opening } = bundle;
  if (!civ || !deck || !opening) notFound();

  const coreCards = deck.coreCardIds.map((cid) => getCard(cid)).filter(Boolean);
  const flexCards = deck.flexCardIds.map((cid) => getCard(cid)).filter(Boolean);
  const trapCards = deck.trapCardIds.map((cid) => getCard(cid)).filter(Boolean);
  const source = resolveSource(plan.sourceId);

  return (
    <SiteShell>
      <main>
        <section className="page-hero with-accent" style={{ ["--accent" as string]: civ.accent }}>
          <div className="wrap">
            <div className="crumb">
              <Link href="/">Inicio</Link> &nbsp;/&nbsp; <Link href="/civs">Civilizaciones</Link> &nbsp;/&nbsp;{" "}
              <Link href={`/civs/${civ.id}`}>{civ.name}</Link> &nbsp;/&nbsp; <span>{plan.title}</span>
            </div>
            <div className="hero-row">
              <div className="crest-lg" style={{ width: 96, height: 96, fontSize: "1.6rem" }}>
                {civ.shortName}
              </div>
              <div className="hero-info">
                <h1>{plan.title}</h1>
                <p className="promise">{plan.promise}</p>
                <div className="tag-row">
                  <span className="tag">{plan.archetype}</span>
                  <span className="tag">{civ.name}</span>
                  <span className="tag">{plan.mode}</span>
                  <span className="tag">{plan.difficulty}</span>
                  {plan.mapTags.map((t) => (
                    <span className="tag ghost" key={`map-${t}`}>
                      {t}
                    </span>
                  ))}
                  {plan.matchupTags.map((t) => (
                    <span className="tag ghost" key={`mu-${t}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="layout">
            <div className="main-col">
              <section className="block">
                <span className="kicker">
                  <span className="num">I</span>Deck
                </span>
                <h2>
                  Deck: <em>{deck.title}</em>.
                </h2>
                <p className="lead">{deck.goal}</p>
                <div className="deck-cols">
                  <div className="deck-col">
                    <h3>Core</h3>
                    <ul>
                      {coreCards.map((c) => (
                        <li key={c!.id}>{c!.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="deck-col">
                    <h3>Flex</h3>
                    <ul>
                      {flexCards.length > 0 ? (
                        flexCards.map((c) => <li key={c!.id}>{c!.name}</li>)
                      ) : (
                        <li>Sin cartas flex registradas.</li>
                      )}
                    </ul>
                  </div>
                  <div className="deck-col warn">
                    <h3 className="warn">Cartas trampa</h3>
                    <ul>
                      {trapCards.length > 0 ? (
                        trapCards.map((c) => <li key={c!.id}>{c!.name}</li>)
                      ) : (
                        <li>Ninguna identificada.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="block">
                <span className="kicker">
                  <span className="num">II</span>Opening
                </span>
                <h2>
                  Opening: <em>{opening.title}</em>.
                </h2>
                <p className="lead">{opening.benchmark}</p>
                <div className="timeline">
                  {opening.steps.map((step, i) => (
                    <div className="step" key={i}>
                      <div>
                        <div className="time">{step.time}</div>
                        <div className="pop">{step.population}</div>
                      </div>
                      <div>
                        <div className="action">{step.action}</div>
                        <div className="why">{step.why}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="block">
                <span className="kicker">
                  <span className="num">III</span>Lógica de shipments
                </span>
                <h2>
                  Orden de envíos <em>con ramas</em>.
                </h2>
                <p className="lead">
                  El orden no es fijo: cada envío responde a lo que ve el scout, no a memoria mecánica.
                </p>
                <ol className="benchmarks" style={{ listStyle: "decimal inside" }}>
                  {plan.shipmentLogic.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </section>

              <section className="block">
                <span className="kicker">
                  <span className="num">IV</span>Ramas
                </span>
                <h2>
                  Cuándo <em>desviarte</em>.
                </h2>
                <p className="lead">El mejor jugador no es el que nunca se desvía; es el que se desvía pronto.</p>
                <div className="branches">
                  {plan.branches.map((branch, i) => {
                    const [head, ...rest] = branch.split(":");
                    const condition = rest.length > 0 ? head : "rama";
                    const action = rest.length > 0 ? rest.join(":").trim() : branch;
                    return (
                      <div className="branch" key={i}>
                        <div className="if">
                          <span>SI</span>
                          <span>{condition}</span>
                        </div>
                        <div className="then">{action}</div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {opening.scoutChecks && opening.scoutChecks.length > 0 ? (
                <section className="block">
                  <span className="kicker">
                    <span className="num">V</span>Scout checks
                  </span>
                  <h2>
                    Qué <em>mirar</em>.
                  </h2>
                  <ul className="benchmarks">
                    {opening.scoutChecks.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside className="side-col">
              <div className="block">
                <span className="kicker">
                  <span className="num">VI</span>Benchmarks
                </span>
                <h3>
                  Benchmarks <em>practicables</em>.
                </h3>
                <ul className="benchmarks">
                  {plan.benchmarks.map((b, i) => (
                    <li
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: b.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"),
                      }}
                    />
                  ))}
                </ul>
              </div>

              <div className="block">
                <span className="kicker">
                  <span className="num">VII</span>Práctica
                </span>
                <h3>
                  Checklist <em>scouting</em>.
                </h3>
                <ul className="checklist">
                  {plan.practiceChecklist.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {opening.transition ? (
                <div className="block">
                  <span className="kicker">
                    <span className="num">VIII</span>Transición
                  </span>
                  <h3>
                    Cómo <em>cerrar</em>.
                  </h3>
                  <p style={{ color: "var(--ink-soft)", lineHeight: 1.55 }}>{opening.transition}</p>
                </div>
              ) : null}

              <div className="block">
                <span className="kicker">
                  <span className="num">IX</span>Fuente
                </span>
                <h3>Cita.</h3>
                <div className="source">
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "var(--gold-hi)", flex: "0 0 auto" }}
                  >
                    <path d="M14 3h7v7" />
                    <path d="M21 3l-9 9" />
                    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                  </svg>
                  {source ? (
                    <>
                      Referencia:{" "}
                      <a href={source.url} target="_blank" rel="noreferrer">
                        {source.label}
                      </a>{" "}
                      · <span>{plan.reviewStatus}</span>
                    </>
                  ) : (
                    <span>{plan.reviewStatus} — sin fuente registrada.</span>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
