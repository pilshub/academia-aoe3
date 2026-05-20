import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Search } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { getSeoLanding, seoLandingPages } from "@/data/aoe3";

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoLanding(slug);
  if (!page) return {};
  return {
    title: `${page.title} | Academia AoE3`,
    description: page.description,
  };
}

export default async function LearnLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSeoLanding(slug);
  if (!page) notFound();

  return (
    <SiteShell>
      <main>
        <PageHero eyebrow="Learn / SEO" title={page.title} body={page.description} />
        <section className="section">
          <div className="wrap split">
            <aside className="rail">
              <span className="icon-tile">
                <Search size={22} aria-hidden="true" />
              </span>
              <h2>Intencion</h2>
              <p>{page.intent}</p>
              <Link className="button" href={page.primaryHref}>
                Abrir ruta principal <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </aside>
            <div className="stack">
              {page.sections.map((section) => (
                <article className="card" key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                  <div className="meta-row">
                    {section.links.map((href) => (
                      <Link className="pill" href={href} key={href}>
                        {href} <ArrowRight size={12} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
