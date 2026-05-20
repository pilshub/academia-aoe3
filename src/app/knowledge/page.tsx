import { KnowledgeSearch } from "@/components/KnowledgeSearch";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

export default function KnowledgePage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Knowledge core"
          title="Busqueda interna antes del Chat IA."
          body="El roadmap dice que el chat debe llegar despues del corpus. Esta pagina es el primer core local: busca en civs, cartas, decks, planes, mapas y escenarios."
        />
        <section className="section">
          <div className="wrap">
            <KnowledgeSearch />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

