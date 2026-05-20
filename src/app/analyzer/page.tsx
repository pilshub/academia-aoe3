import { BadgeAlert } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { PostGameAnalyzer } from "@/components/PostGameAnalyzer";
import { SiteShell } from "@/components/SiteShell";

export default function AnalyzerPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Post-game analyzer"
          title="Analiza una partida aunque aun no tengamos replay parser."
          body="Mete timings, shipments y notas de scouting. El diagnostico no inventa datos: compara tu partida con reglas del plan y te da el primer foco de practica."
        />
        <section className="section">
          <div className="wrap">
            <PostGameAnalyzer />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
