import { PageHero } from "@/components/PageHero";
import { ReplayUploadLab } from "@/components/ReplayUploadLab";
import { SiteShell } from "@/components/SiteShell";

export default function SubmitReplayPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Submit replay"
          title="Convierte derrotas reales en cola de analisis."
          body="Pagina publica para recopilar replays y contexto. En esta fase guarda la cola en localStorage; el siguiente paso sera backend, auth y almacenamiento."
        />
        <section className="section">
          <div className="wrap">
            <ReplayUploadLab mode="submit" />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
