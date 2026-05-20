import { CareerDashboard } from "@/components/CareerDashboard";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { trainingSummary } from "@/data/aoe3";

export default function CareerPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Modo carrera"
          title="De leer guias a entrenar una semana completa."
          body="El dashboard cruza objetivo, civ principal, nivel, rutas y drills. Es el pegamento para que la academia se comporte como plan de entrenamiento, no como wiki."
        />
        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>Ruta personal</h2>
              <p>{trainingSummary.tracks} carreras, {trainingSummary.masteryCivs} civs y {trainingSummary.openings} openings conectados a herramientas reales.</p>
            </div>
            <CareerDashboard />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
