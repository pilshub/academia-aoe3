import { MapHelper } from "@/components/MapHelper";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

export default function MapsPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Map helper"
          title="Mapa, trade route y natives antes de elegir shipment."
          body="El mapa cambia el valor de TP, agua, tesoros, raids y greedy cards. Esta primera version convierte esos factores en lectura de plan."
        />
        <section className="section">
          <div className="wrap">
            <MapHelper />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

