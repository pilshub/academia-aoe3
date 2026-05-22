import { Timer } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Hotkeys, hotkeyCategories } from "@/data/aoe3/hotkeys";

export const metadata = {
  title: "Hotkey Trainer - Academia AoE3",
  description: "Atajos esenciales de AoE3 con drill por categoría. El que no tiene grupos no tiene micro.",
};

const CATEGORY_LABELS: Record<string, string> = {
  tc: "Town Center",
  production: "Producción militar",
  explorer: "Explorer",
  shipment: "Shipments / Home City",
  "control-group": "Grupos de control",
  economy: "Economía",
  ui: "UI",
};

export default function HotkeysPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Hotkey trainer"
          title="Atajos críticos AoE3 con drill por categoría."
          body="Sin hotkeys básicos no hay APM ni micro. Cada entrada incluye qué bind por defecto, por qué importa y un drill verificable."
        />
        {hotkeyCategories.map((category) => {
          const entries = aoe3Hotkeys.filter((h) => h.category === category);
          if (!entries.length) return null;
          return (
            <section className="section" key={category}>
              <div className="wrap">
                <div className="section-heading">
                  <h2>
                    <Timer size={18} aria-hidden="true" /> {CATEGORY_LABELS[category] ?? category}
                  </h2>
                </div>
                <div className="grid">
                  {entries.map((entry) => (
                    <article className="card" key={entry.id}>
                      <div className="card-top">
                        <span className="status">{entry.defaultBinding}</span>
                        <span className="pill">{entry.reviewStatus}</span>
                      </div>
                      <h3>{entry.action}</h3>
                      <p>{entry.whyItMatters}</p>
                      <h3>Drill</h3>
                      <p className="muted">{entry.drill}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </SiteShell>
  );
}
