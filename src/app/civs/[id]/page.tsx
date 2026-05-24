import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Civilizations, getCiv, getCivPlans } from "@/data/aoe3";

export async function generateStaticParams() {
  return aoe3Civilizations.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const civ = getCiv(id);
  if (!civ) return { title: "Civilización · Academia AoE3" };
  return {
    title: `${civ.name} · Academia AoE3`,
    description: `${civ.identity} Tempo: ${civ.tempo}`,
  };
}

export default async function CivDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const civ = getCiv(id);
  if (!civ) notFound();

  const plans = getCivPlans(id);

  return (
    <SiteShell>
      <main>
        <section className="civ-hero" style={{ ["--accent" as string]: civ.accent }}>
          <div className="wrap">
            <div className="crumb">
              <Link href="/">Inicio</Link> &nbsp;/&nbsp; <Link href="/civs">Civilizaciones</Link> &nbsp;/&nbsp;{" "}
              <span>{civ.name}</span>
            </div>
            <div className="civ-hero-row">
              <div className="crest-lg">{civ.shortName}</div>
              <div>
                <h1>{civ.name}</h1>
                <div className="region">{civ.region}</div>
                <p className="identity">{civ.identity}</p>
                <div className="diff-row">
                  <span className="diff">{civ.difficulty}</span>
                  <span className="diff ghost">{civ.reviewStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="kicker">
              <span className="num">I</span>Identidad
            </div>
            <h2 style={{ marginBottom: 14 }}>
              Tempo y <em>spikes</em>.
            </h2>
            <p className="identity" style={{ maxWidth: 680, color: "var(--ink-soft)", marginBottom: 28 }}>
              {civ.tempo}
            </p>
            <div className="spec-grid">
              <div className="spec">
                <h3>Power spikes</h3>
                <ul>
                  {civ.powerSpikes.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="spec mistakes">
                <h3 className="warn">Errores frecuentes</h3>
                <ul>
                  {civ.mistakes.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {plans.length > 0 ? (
          <section className="section">
            <div className="wrap">
              <div className="kicker">
                <span className="num">II</span>Planes recomendados
              </div>
              <h2 style={{ marginBottom: 14 }}>
                Decks y planes <em>activos</em>.
              </h2>
              <div className="plan-grid">
                {plans.map((p) => (
                  <Link key={p.id} className="plan-card" href={`/plans/${p.id}`}>
                    <div className="meta">
                      <span className="arche">{p.archetype}</span>
                      <span className="open">Abrir →</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.promise}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                      <span className="diff ghost">{p.mode}</span>
                      <span className="diff ghost">{p.difficulty}</span>
                      <span className="diff">{p.reviewStatus}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </SiteShell>
  );
}
