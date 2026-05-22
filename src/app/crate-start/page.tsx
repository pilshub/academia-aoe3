import Link from "next/link";
import { ArrowRight, PackageOpen } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3CrateStarts } from "@/data/aoe3/crateStarts";
import { getCiv } from "@/data/aoe3";

export const metadata = {
  title: "Crate Start Helper - Academia AoE3",
  description: "Qué hacer con los crates iniciales por civilización. Split de aldeanos y primer movimiento.",
};

export default function CrateStartPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Crate Start Helper"
          title="Primeros 30 segundos por civilización."
          body="Los crates iniciales se gastan en menos de un minuto. Esta página ordena en qué tareas reparten aldeanos las civs needs-review."
        />
        <section className="section">
          <div className="wrap">
            <div className="grid">
              {aoe3CrateStarts.map((start) => {
                const civ = getCiv(start.civId);
                return (
                  <article className="card" key={start.id}>
                    <div className="card-top">
                      <span className="icon-tile">
                        <PackageOpen size={20} aria-hidden="true" />
                      </span>
                      <span className="status">{start.reviewStatus}</span>
                    </div>
                    <h3>{civ?.name ?? start.civId}</h3>
                    <p>{start.notes}</p>
                    <h3>Primeras acciones</h3>
                    <ul className="list">
                      {start.firstActions.map((action, i) => (
                        <li key={i}>
                          {i + 1}. {action}
                        </li>
                      ))}
                    </ul>
                    <h3>Villager split</h3>
                    <p>{start.villagerSplit}</p>
                    <div className="actions">
                      {civ ? (
                        <Link className="button secondary" href={`/civs`}>
                          Ver civ <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
