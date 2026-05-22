import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeAlert, BookOpen, Crown } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3CivGuides, getCivGuide } from "@/data/aoe3/civGuides";
import { getCiv, getPlan } from "@/data/aoe3";

export async function generateStaticParams() {
  return aoe3CivGuides.map((g) => ({ id: g.civId }));
}

export default async function CivGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guide = getCivGuide(id);
  if (!guide) notFound();
  const civ = getCiv(guide.civId);
  const plan = getPlan(guide.recommendedPlanId);

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow={`Civ Guide / ${guide.level}`}
          title={guide.title}
          body={guide.thesis}
        />
        <section className="section">
          <div className="wrap">
            <article className="card">
              <div className="card-top">
                <span className="icon-tile">
                  <Crown size={20} aria-hidden="true" />
                </span>
                <span className="status">{guide.reviewStatus}</span>
              </div>
              <h3>Empieza aquí</h3>
              <ul className="list">
                {guide.startHere.map((item, i) => (
                  <li key={i}>
                    {i + 1}. {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="card">
              <h3>
                <BadgeAlert size={18} aria-hidden="true" /> Errores comunes
              </h3>
              <ul className="list">
                {guide.commonMistakes.map((mistake, i) => (
                  <li key={i}>{mistake}</li>
                ))}
              </ul>
            </article>

            <article className="card">
              <h3>
                <BookOpen size={18} aria-hidden="true" /> Drills
              </h3>
              <ul className="list">
                {guide.drills.map((drill, i) => (
                  <li key={i}>
                    {i + 1}. {drill}
                  </li>
                ))}
              </ul>
            </article>

            {plan ? (
              <article className="card">
                <h3>Plan recomendado</h3>
                <p>{plan.title}</p>
                <p className="muted">{plan.promise}</p>
                <div className="actions">
                  <Link className="button" href={`/plans/${plan.id}`}>
                    Abrir plan <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  {civ ? (
                    <Link className="button secondary" href={`/civs`}>
                      Ver civ
                    </Link>
                  ) : null}
                </div>
              </article>
            ) : null}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
