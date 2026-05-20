import { PageHero } from "@/components/PageHero";
import { SeriesPrepTool } from "@/components/SeriesPrepTool";
import { SiteShell } from "@/components/SiteShell";

export default function SeriesPrepPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="BO3 / BO5 prep"
          title="La serie se prepara antes del primer mapa."
          body="Civ pool, rival probable, mapa 1, bans, game plan y scouting. Para ranked serio, torneos o showmatches."
        />
        <section className="section">
          <div className="wrap">
            <SeriesPrepTool />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
