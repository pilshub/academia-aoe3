import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { VodPipelineTool } from "@/components/VodPipelineTool";

export default function VodPipelinePage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="VOD pipeline"
          title="De video largo a deck, matchup y drill."
          body="Herramienta editorial para convertir YouTube/Twitch en contenido verificable: metadatos, tesis, deck, shipments, matchup y cita."
        />
        <section className="section">
          <div className="wrap">
            <VodPipelineTool />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
