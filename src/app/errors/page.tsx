import { ErrorLibraryTool } from "@/components/ErrorLibraryTool";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { trainingSummary } from "@/data/aoe3";

export default function ErrorsPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Biblioteca de errores"
          title="Diagnosticos que terminan en drill."
          body="Eco, scouting, deck, shipments, army, mapa y mentalidad. Cada error tiene sintoma, causa, correccion, herramienta y confianza."
        />
        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>{trainingSummary.errors} errores base</h2>
              <p>El corpus crecerá desde replays fixtures; hasta entonces cada entrada mantiene su sello de confianza.</p>
            </div>
            <ErrorLibraryTool />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
