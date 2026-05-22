import Link from "next/link";
import { ArrowRight, Crown } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3CivGuides } from "@/data/aoe3/civGuides";
import { getCiv } from "@/data/aoe3";

export const metadata = {
  title: "Civ Guides - Academia AoE3",
  description: "Índice de guías por civilización. Tesis + start here + drills.",
};

export default function CivGuidesIndexPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Civ Guides"
          title="Una guía por civilización."
          body="Cada guía resume tesis, qué mirar primero, errores comunes y drills accionables. Apunta al plan recomendado."
        />
        <section className="section">
          <div className="wrap">
            <div className="grid">
              {aoe3CivGuides.map((guide) => {
                const civ = getCiv(guide.civId);
                return (
                  <Link className="card" key={guide.civId} href={`/civ-guide/${guide.civId}`}>
                    <div className="card-top">
                      <span className="icon-tile">
                        <Crown size={20} aria-hidden="true" />
                      </span>
                      <span className="status">{guide.level}</span>
                    </div>
                    <h3>{guide.title}</h3>
                    <p>{guide.thesis}</p>
                    <div className="meta-row">
                      <span className="pill">{civ?.region ?? "región pendiente"}</span>
                      <span className="pill">{guide.reviewStatus}</span>
                    </div>
                    <div className="actions">
                      <span className="button secondary">
                        Abrir guía <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
