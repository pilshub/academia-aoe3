import { ShieldCheck } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3TreasurePriorities } from "@/data/aoe3/treasures";
import { getCiv } from "@/data/aoe3";

export const metadata = {
  title: "Treasure Priority - Academia AoE3",
  description: "Qué tesoros pelear primero por civ y plan. Cuándo skipear.",
};

export default function TreasurePriorityPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Treasure Priority"
          title="Qué tesoros pelear, qué saltar."
          body="Los tesoros son tempo. Esta página ordena la prioridad por civ/plan y declara qué saltar para no perder explorer ni partida."
        />
        <section className="section">
          <div className="wrap">
            <div className="grid">
              {aoe3TreasurePriorities.map((priority) => {
                const civ = priority.civId === "shared" ? null : getCiv(priority.civId);
                return (
                  <article className="card" key={priority.id}>
                    <div className="card-top">
                      <span className="icon-tile">
                        <ShieldCheck size={20} aria-hidden="true" />
                      </span>
                      <span className="status">{priority.reviewStatus}</span>
                    </div>
                    <h3>
                      {civ?.name ?? "Compartido"}
                      <span style={{ opacity: 0.6 }}> · {priority.context}</span>
                    </h3>
                    <h3>Orden de prioridad</h3>
                    <ul className="list">
                      {priority.priorityOrder.map((item, i) => (
                        <li key={i}>
                          {i + 1}. {item}
                        </li>
                      ))}
                    </ul>
                    <h3>Siempre skip</h3>
                    <ul className="list">
                      {priority.alwaysSkip.map((skip, i) => (
                        <li key={i}>{skip}</li>
                      ))}
                    </ul>
                    <p className="muted">{priority.notes}</p>
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
