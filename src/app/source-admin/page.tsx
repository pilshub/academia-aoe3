import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { SourceAdminPanel } from "@/components/SourceAdminPanel";

export default function SourceAdminPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Source admin"
          title="Una URL entra como borrador hasta que demuestre algo."
          body="Panel local para capturar patches, videos, foros, Reddit, wikis y tools antes de convertirlos en source queue o provenance."
        />
        <section className="section">
          <div className="wrap">
            <SourceAdminPanel />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
