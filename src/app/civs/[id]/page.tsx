import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Castle,
  Crosshair,
  Crown,
  PackageOpen,
  ShieldCheck,
  Timer,
} from "@/components/icons";
import { EvidencePanel } from "@/components/EvidencePanel";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import {
  aoe3Civilizations,
  getCardsForCiv,
  getCiv,
  getCivPlans,
  getMatchupsForCiv,
  getPoliticiansForCiv,
  getTechsForCiv,
  getUnitsForCiv,
} from "@/data/aoe3";
import { getCivGuide } from "@/data/aoe3/civGuides";
import { getCrateStartForCiv } from "@/data/aoe3/crateStarts";
import { getTreasuresForCiv } from "@/data/aoe3/treasures";

const CIV_HERO_SVG = new Set([
  "french",
  "british",
  "ottomans",
  "spanish",
  "dutch",
  "germans",
  "russians",
  "aztecs",
]);

export async function generateStaticParams() {
  return aoe3Civilizations.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const civ = getCiv(id);
  if (!civ) return { title: "Civilización - Academia AoE3" };
  return {
    title: `${civ.name} - Academia AoE3`,
    description: `Identidad, planes, decks, politicians, units, techs y matchups de ${civ.name}.`,
  };
}

export default async function CivDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const civ = getCiv(id);
  if (!civ) notFound();

  const plans = getCivPlans(id);
  const guide = getCivGuide(id);
  const crateStart = getCrateStartForCiv(id);
  const treasures = getTreasuresForCiv(id).filter((t) => t.civId === id);
  const politicians = getPoliticiansForCiv(id);
  const units = getUnitsForCiv(id);
  const techs = getTechsForCiv(id).filter((t) => t.civId === id);
  const cards = getCardsForCiv(id);
  const matchups = getMatchupsForCiv(id);
  const hasSvg = CIV_HERO_SVG.has(id);

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow={`Civilización / ${civ.difficulty}`}
          title={civ.name}
          body={civ.identity}
        />

        <section className="section">
          <div className="wrap">
            <div className="grid two">
              <article className="card" style={{ padding: 0, overflow: "hidden" }}>
                {hasSvg ? (
                  <img
                    src={`/assets/generated/civ-${civ.id}.svg`}
                    alt={`${civ.name} hero tile`}
                    width={400}
                    height={240}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                ) : (
                  <div
                    className="civ-band"
                    style={
                      {
                        margin: 0,
                        "--civ-image": `linear-gradient(135deg, ${civ.accent}, rgba(17, 17, 15, 0.2))`,
                        "--accent": civ.accent,
                      } as React.CSSProperties
                    }
                  >
                    <span className="crest">{civ.shortName}</span>
                  </div>
                )}
                <div style={{ padding: "1rem 1.25rem" }}>
                  <div className="meta-row">
                    <span className="pill">{civ.region}</span>
                    <span className="pill">{civ.difficulty}</span>
                    <span className="status">{civ.reviewStatus}</span>
                  </div>
                  <p style={{ marginTop: "0.75rem" }}>{civ.tempo}</p>
                </div>
              </article>

              <article className="card">
                <h3>
                  <Crown size={18} aria-hidden="true" /> Power spikes
                </h3>
                <ul className="list">
                  {civ.powerSpikes.map((spike) => (
                    <li key={spike}>{spike}</li>
                  ))}
                </ul>
                <h3>
                  <AlertTriangle size={18} aria-hidden="true" /> Errores comunes
                </h3>
                <ul className="list">
                  {civ.mistakes.map((mistake) => (
                    <li key={mistake}>{mistake}</li>
                  ))}
                </ul>
                <EvidencePanel evidence={civ.evidence} compact />
              </article>
            </div>
          </div>
        </section>

        {plans.length > 0 ? (
          <section className="section">
            <div className="wrap">
              <div className="section-heading">
                <h2>
                  <Castle size={18} aria-hidden="true" /> Planes ({plans.length})
                </h2>
                <p>Cada plan es civ + deck + opening + shipmentLogic + ramas + benchmarks.</p>
              </div>
              <div className="grid">
                {plans.map((plan) => (
                  <Link key={plan.id} className="card" href={`/plans/${plan.id}`}>
                    <div className="card-top">
                      <span className="pill">{plan.archetype}</span>
                      <span className="status">{plan.reviewStatus}</span>
                    </div>
                    <h3>{plan.title}</h3>
                    <p>{plan.promise}</p>
                    <div className="actions">
                      <span className="button secondary">
                        Abrir plan <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {guide || crateStart || treasures.length > 0 ? (
          <section className="section">
            <div className="wrap">
              <div className="section-heading">
                <h2>Entrenamiento</h2>
                <p>Cómo empezar y qué practicar con esta civ.</p>
              </div>
              <div className="grid">
                {guide ? (
                  <Link className="card" href={`/civ-guide/${guide.civId}`}>
                    <div className="card-top">
                      <span className="icon-tile">
                        <BookOpen size={20} aria-hidden="true" />
                      </span>
                      <span className="status">{guide.level}</span>
                    </div>
                    <h3>{guide.title}</h3>
                    <p>{guide.thesis}</p>
                    <div className="actions">
                      <span className="button secondary">
                        Abrir guía <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ) : null}

                {crateStart ? (
                  <article className="card">
                    <div className="card-top">
                      <span className="icon-tile">
                        <PackageOpen size={20} aria-hidden="true" />
                      </span>
                      <span className="status">crate-start</span>
                    </div>
                    <h3>Primeros 30 segundos</h3>
                    <p className="muted">{crateStart.villagerSplit}</p>
                    <ul className="list">
                      {crateStart.firstActions.slice(0, 3).map((a, i) => (
                        <li key={i}>
                          {i + 1}. {a}
                        </li>
                      ))}
                    </ul>
                    <div className="actions">
                      <Link className="button secondary" href="/crate-start">
                        Más detalle <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ) : null}

                {treasures.length > 0 ? (
                  <article className="card">
                    <div className="card-top">
                      <span className="icon-tile">
                        <ShieldCheck size={20} aria-hidden="true" />
                      </span>
                      <span className="status">treasures</span>
                    </div>
                    <h3>Tesoros prioritarios</h3>
                    <p className="muted">{treasures[0].context}</p>
                    <ul className="list">
                      {treasures[0].priorityOrder.slice(0, 3).map((p, i) => (
                        <li key={i}>
                          {i + 1}. {p}
                        </li>
                      ))}
                    </ul>
                    <div className="actions">
                      <Link className="button secondary" href="/treasure-priority">
                        Más detalle <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {politicians.length > 0 || units.length > 0 || techs.length > 0 ? (
          <section className="section">
            <div className="wrap">
              <div className="section-heading">
                <h2>Reference</h2>
                <p>Politicians, units y techs específicos o compartidos de esta civ.</p>
              </div>

              {politicians.length > 0 ? (
                <>
                  <h3>
                    <Crown size={16} aria-hidden="true" /> Politicians ({politicians.length})
                  </h3>
                  <div className="grid">
                    {politicians.map((p) => (
                      <article className="card" key={p.id}>
                        <div className="card-top">
                          <span className="status">{p.ageUpTo}</span>
                          <span className="pill">{p.civId}</span>
                        </div>
                        <h3>{p.name}</h3>
                        <p>{p.notes}</p>
                      </article>
                    ))}
                  </div>
                </>
              ) : null}

              {units.length > 0 ? (
                <>
                  <h3>
                    <PackageOpen size={16} aria-hidden="true" /> Units ({units.length})
                  </h3>
                  <div className="grid">
                    {units.map((u) => (
                      <article className="card" key={u.id}>
                        <div className="card-top">
                          <span className="status">{u.ageAvailable}</span>
                          <span className="pill">{u.trainedAt}</span>
                        </div>
                        <h3>{u.name}</h3>
                        <p>
                          <strong>Rol:</strong> {u.primaryRole}
                        </p>
                        <div className="meta-row">
                          {u.tags.slice(0, 3).map((tag) => (
                            <span className="pill" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              ) : null}

              {techs.length > 0 ? (
                <>
                  <h3>
                    <Timer size={16} aria-hidden="true" /> Techs específicos ({techs.length})
                  </h3>
                  <div className="grid">
                    {techs.map((t) => (
                      <article className="card" key={t.id}>
                        <div className="card-top">
                          <span className="status">{t.ageRequired}</span>
                          <span className="pill">{t.category}</span>
                        </div>
                        <h3>{t.name}</h3>
                        <p>{t.description}</p>
                      </article>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </section>
        ) : null}

        {cards.length > 0 ? (
          <section className="section">
            <div className="wrap">
              <div className="section-heading">
                <h2>Cartas registradas ({cards.length})</h2>
                <p>Shipment cards canónicas con timing, rol y compite-con.</p>
              </div>
              <div className="grid">
                {cards.map((card) => (
                  <article className="card" key={card.id}>
                    <div className="card-top">
                      <span className="status">{card.age}</span>
                      <span className="pill">{card.role}</span>
                    </div>
                    <h3>{card.name}</h3>
                    <p className="muted">{card.timing}</p>
                    <p>{card.explanation}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {matchups.length > 0 ? (
          <section className="section">
            <div className="wrap">
              <div className="section-heading">
                <h2>
                  <Crosshair size={18} aria-hidden="true" /> Matchups ({matchups.length})
                </h2>
              </div>
              <div className="grid">
                {matchups.map((m) => (
                  <article className="card" key={m.id}>
                    <div className="card-top">
                      <span className="pill">vs {m.enemyArchetype}</span>
                      <span className="status">{m.mapTag}</span>
                    </div>
                    <h3>Threat: {m.threat}</h3>
                    <p>
                      <strong>Primer decisión:</strong> {m.firstDecision}
                    </p>
                    <p>
                      <strong>Win:</strong> {m.winCondition}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </SiteShell>
  );
}
