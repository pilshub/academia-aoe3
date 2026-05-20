import { PackageOpen } from "@/components/icons";
import { EvidencePanel } from "@/components/EvidencePanel";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Cards, getCiv } from "@/data/aoe3";

export default function CardsPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Cartas"
          title="Cada shipment con uso, timing y coste de oportunidad."
          body="El explorador inicial prioriza lectura estrategica. Iconos oficiales de cartas quedan como asset pack futuro."
        />
        <section className="section">
          <div className="wrap grid">
            {aoe3Cards.map((card) => {
              const civ = getCiv(card.civId);
              return (
              <article className="card" key={card.id}>
                <div className="card-top">
                  <span className="icon-tile">
                    <PackageOpen size={22} aria-hidden="true" />
                  </span>
                  <span className="status">{card.role}</span>
                </div>
                <h3>{card.name}</h3>
                <p>{card.explanation}</p>
                <div className="meta-row">
                  <span className="pill">{civ?.name ?? card.civId}</span>
                  <span className="pill">{card.age}</span>
                  <span className="pill">{card.reviewStatus}</span>
                </div>
                <h3>Timing</h3>
                <p>{card.timing}</p>
                <EvidencePanel evidence={card.evidence} fallbackSourceId={card.sourceId} compact />
                <h3>Compite con</h3>
                <ul className="list">
                  {card.competesWith.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              );
            })}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
