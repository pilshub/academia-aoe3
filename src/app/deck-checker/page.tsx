import { DeckChecker } from "@/components/DeckChecker";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

export default function DeckCheckerPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Deck checker"
          title="Comprueba si tu deck promete lo que tu plan necesita."
          body="Selecciona civ y plan: el checker mide core, defensa, transicion y cartas greedy que solo son buenas si el scout las permite."
        />
        <section className="section">
          <div className="wrap">
            <DeckChecker />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

