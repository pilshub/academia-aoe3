import { ExternalLink } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { ReplayImportLab } from "@/components/ReplayImportLab";
import { SiteShell } from "@/components/SiteShell";
import { replayFieldMatrix } from "@/data/aoe3/replaySamples";

export default function ReplayImportPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Replay import"
          title="Pega un export y obten un reporte normalizado."
          body="Primera version funcional: acepta JSON o texto de parser externo, extrae jugadores, mapa, shipments, age-ups y warnings. No parsea archivos .age3Yrec directamente."
        />
        <section className="section">
          <div className="wrap">
            <ReplayImportLab />
          </div>
        </section>
        <section className="section tight">
          <div className="wrap">
            <div className="section-heading">
              <h2>Contrato parser</h2>
              <p>Hasta probar fixtures reales, cada campo se marca por estado. Esto evita publicar analisis automatico con datos inventados.</p>
            </div>
            <div className="grid">
              {replayFieldMatrix.map((field) => (
                <article className="card compact-card" key={field.field}>
                  <div className="card-top">
                    <span className="status">{field.field}</span>
                    <a className="pill" href="/source-provenance">
                      fuentes <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </div>
                  <p>{field.academyUse}</p>
                  <div className="meta-row">
                    <span className="pill">AOE3 Explorer: {field.aoe3Explorer}</span>
                    <span className="pill">FreeFoodParty: {field.freeFoodParty}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
