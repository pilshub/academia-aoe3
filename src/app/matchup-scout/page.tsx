import { MatchupScoutTool } from "@/components/MatchupScoutTool";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

export default function MatchupScoutPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Matchup scout"
          title="Antes de darle a ranked, escribe el primer peligro."
          body="Input de mi civ, civ rival y mapa. Devuelve plan, scouting exacto, primeros envios seguros y que no hacer."
        />
        <section className="section">
          <div className="wrap">
            <MatchupScoutTool />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
