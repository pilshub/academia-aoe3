import Link from "next/link";
import { ArrowRight, AlertTriangle } from "@/components/icons";
import { EvidencePanel } from "@/components/EvidencePanel";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Civilizations, getPlan } from "@/data/aoe3";
import { civFlagUrl } from "@/lib/aoe3/aoe3explorer-assets";

// Civs con SVG seed en public/assets/generated/civ-{id}.svg como fallback
// si aoe3explorer.com no tiene la flag oficial.
const CIV_HERO_SVG = new Set([
  "french",
  "british",
  "ottomans",
  "spanish",
  "dutch",
  "germans",
  "russians",
  "aztecs",
]);

export default function CivsPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Civilizaciones"
          title="Perfiles que explican identidad, tempo y errores."
          body="Cada civ conecta directamente con planes recomendados. El objetivo no es memorizar stats, sino entender que partida quiere jugar."
        />
        <section className="section">
          <div className="wrap grid">
            {aoe3Civilizations.map((civ) => {
              const officialFlag = civFlagUrl(civ.id);
              const fallbackSvg = CIV_HERO_SVG.has(civ.id) ? `/assets/generated/civ-${civ.id}.svg` : null;
              return (
              <Link className="card" key={civ.id} href={`/civs/${civ.id}`}>
                {officialFlag ? (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "5 / 3",
                      background: `linear-gradient(135deg, ${civ.accent}33, rgba(17,17,15,0.4))`,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "8px 8px 0 0",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <img
                      className="civ-hero"
                      src={officialFlag}
                      alt={`${civ.name} flag oficial`}
                      loading="lazy"
                      style={{ maxWidth: "60%", maxHeight: "80%", objectFit: "contain" }}
                    />
                  </div>
                ) : fallbackSvg ? (
                  <img
                    className="civ-hero"
                    src={fallbackSvg}
                    alt={`${civ.name} hero tile (seed)`}
                    width={400}
                    height={240}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px 8px 0 0" }}
                  />
                ) : (
                  <div
                    className="civ-band"
                    style={
                      {
                        "--civ-image": `linear-gradient(135deg, ${civ.accent}, rgba(17, 17, 15, 0.2))`,
                        "--accent": civ.accent,
                      } as React.CSSProperties
                    }
                  >
                    <span className="crest">{civ.shortName}</span>
                  </div>
                )}
                <div className="card-top">
                  <span className="status">{civ.reviewStatus}</span>
                  <span className="pill">{civ.difficulty}</span>
                </div>
                <h3>{civ.name}</h3>
                <p>{civ.identity}</p>
                <div className="meta-row">
                  <span className="pill">{civ.region}</span>
                  <span className="pill">{civ.tempo}</span>
                </div>
                <EvidencePanel evidence={civ.evidence} compact />
                <h3>Errores comunes</h3>
                <ul className="list">
                  {civ.mistakes.map((mistake) => (
                    <li key={mistake}>
                      <AlertTriangle size={15} aria-hidden="true" /> {mistake}
                    </li>
                  ))}
                </ul>
                <div className="actions">
                  <span className="button secondary">
                    Ver detalle <ArrowRight size={16} aria-hidden="true" />
                  </span>
                  {civ.recommendedPlanIds.slice(0, 1).map((planId) => {
                    const plan = getPlan(planId);
                    return plan ? (
                      <span className="pill" key={plan.id}>
                        plan: {plan.title}
                      </span>
                    ) : null;
                  })}
                </div>
              </Link>
              );
            })}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
