import { OpeningTimer } from "@/components/OpeningTimer";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

export default function OpeningTimerPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Opening timer"
          title="Practica el primer error, no la teoria entera."
          body="Timer, checklist de scouting y scoring por paso. La meta es repetir el mismo opening hasta que el desvio tenga nombre."
        />
        <section className="section">
          <div className="wrap">
            <OpeningTimer />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
