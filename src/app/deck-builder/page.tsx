import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { SmartDeckBuilder } from "@/components/SmartDeckBuilder";

export default function DeckBuilderPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Deck builder"
          title="Construye decks por plan, no por cartas bonitas."
          body="Selector de civ, plan, rol y cartas con score de core, defensa, transicion y greed. El builder propone swaps sin fingir que el seed ya es meta canonical."
        />
        <section className="section">
          <div className="wrap">
            <SmartDeckBuilder />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
