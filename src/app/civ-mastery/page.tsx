import { CivMasteryBoard } from "@/components/CivMasteryBoard";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

export default function CivMasteryPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Civ mastery"
          title="Una civilizacion, cinco niveles, cero saltos de fe."
          body="Cada civ tiene identidad, spikes, errores y una escalera de practica. El objetivo es acumular repeticiones comparables antes de cambiar de deck o civ."
        />
        <section className="section">
          <div className="wrap">
            <CivMasteryBoard />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
