import { PageHero } from "@/components/PageHero";
import { ShipmentTrainer } from "@/components/ShipmentTrainer";
import { SiteShell } from "@/components/SiteShell";

export default function ShipmentsPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Shipment trainer"
          title="Entrena la decision de envio, no la memoria de una lista."
          body="AoE3 se gana muchas veces en el segundo shipment: esta herramienta plantea senales de scouting y te obliga a elegir entre greed, defensa o transicion."
        />
        <section className="section">
          <div className="wrap">
            <ShipmentTrainer />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

