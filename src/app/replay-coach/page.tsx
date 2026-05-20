import { PageHero } from "@/components/PageHero";
import { ReplayCoach } from "@/components/ReplayCoach";
import { SiteShell } from "@/components/SiteShell";

export default function ReplayCoachPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Replay coach"
          title="Cada derrota termina en una correccion jugable."
          body="V1 manual conectada al futuro parser: age-ups, shipments, primer peligro rival, scouting e idle TC producen turning point, warnings y drill siguiente."
        />
        <section className="section">
          <div className="wrap">
            <ReplayCoach />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
