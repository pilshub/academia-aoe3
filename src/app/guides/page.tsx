import Link from "next/link";
import { ArrowRight, FileText } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { getPlan, guides } from "@/data/academy";

export default function GuidesPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Guias"
          title="La academia empieza cuando el conocimiento se puede practicar."
          body="Guias editoriales para entender AoE3: decks, shipments, scouting, macro, mapas y modos. Cada guia termina en drills concretos."
        />
        <section className="section">
          <div className="wrap grid">
            {guides.map((guide) => (
              <Link className="card" href={`/guides/${guide.id}`} key={guide.id}>
                <div className="card-top">
                  <span className="icon-tile">
                    <FileText size={22} aria-hidden="true" />
                  </span>
                  <span className="status">{guide.reviewStatus}</span>
                </div>
                <h3>{guide.title}</h3>
                <p>{guide.summary}</p>
                <div className="meta-row">
                  <span className="pill">{guide.category}</span>
                  <span className="pill">{guide.level}</span>
                  <span className="pill">{guide.readTime}</span>
                </div>
                {guide.linkedPlans.length ? (
                  <div className="meta-row">
                    {guide.linkedPlans.slice(0, 2).map((planId) => {
                      const plan = getPlan(planId);
                      return plan ? <span className="pill" key={planId}>{plan.title}</span> : null;
                    })}
                  </div>
                ) : null}
                <div className="actions">
                  <span className="button secondary">
                    Leer guia <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
