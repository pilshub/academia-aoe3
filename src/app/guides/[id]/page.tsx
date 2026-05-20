import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, FileText } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { getGuide, getPlan, guides } from "@/data/academy";

export function generateStaticParams() {
  return guides.map((guide) => ({ id: guide.id }));
}

export default async function GuideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guide = getGuide(id);
  if (!guide) notFound();

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow={`${guide.category} / ${guide.level}`} title={guide.title} body={guide.summary} />
        <section className="section">
          <div className="wrap split">
            <aside className="rail">
              <span className="icon-tile">
                <FileText size={22} aria-hidden="true" />
              </span>
              <h2>{guide.category}</h2>
              <p>{guide.readTime} de lectura. Estado: {guide.reviewStatus}.</p>
              <div className="meta-row">
                <span className="pill">{guide.level}</span>
                <span className="status">{guide.reviewStatus}</span>
              </div>
              <div className="stack">
                {guide.linkedPlans.map((planId) => {
                  const plan = getPlan(planId);
                  return plan ? (
                    <Link className="button secondary" href={`/plans/${plan.id}`} key={plan.id}>
                      {plan.title} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  ) : null;
                })}
              </div>
            </aside>
            <div className="stack">
              {guide.sections.map((section) => (
                <article className="card" key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                  <ul className="list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>
                        <CheckCircle2 size={15} aria-hidden="true" /> {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
              <article className="card">
                <h3>Drills</h3>
                <ul className="list">
                  {guide.drills.map((drill) => (
                    <li key={drill}>
                      <CheckCircle2 size={15} aria-hidden="true" /> {drill}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
