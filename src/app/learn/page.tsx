import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { seoLandingPages } from "@/data/aoe3";

export default function LearnIndexPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Learn index"
          title="Rutas indexables para que Google encuentre las herramientas."
          body="Landings enfocadas a intencion de busqueda: civ builds, deck checker, replay analysis y matchup scout."
        />
        <section className="section">
          <div className="wrap">
            <div className="grid">
              {seoLandingPages.map((page) => (
                <Link className="card" href={`/learn/${page.slug}`} key={page.slug}>
                  <div className="card-top">
                    <span className="status">SEO</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </div>
                  <h3>{page.title}</h3>
                  <p>{page.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
