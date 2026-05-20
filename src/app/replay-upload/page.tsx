import { PageHero } from "@/components/PageHero";
import { ReplayUploadLab } from "@/components/ReplayUploadLab";
import { SiteShell } from "@/components/SiteShell";

export default function ReplayUploadPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Replay upload"
          title="Sube el archivo, prepara el fixture, no inventes el analisis."
          body="La web crea una cola local con metadatos y contexto. El parser real corre en el workspace para generar JSON, validar y publicar analisis con fuente."
        />
        <section className="section">
          <div className="wrap">
            <ReplayUploadLab />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
