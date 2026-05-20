import { AiCoachWorkbench } from "@/components/AiCoachWorkbench";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

export default function AiCoachPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="IA interna"
          title="Un coach que cita el corpus antes de hablar."
          body="Workbench de tools, knowledge search y guardrails. Si no hay fuente, fixture o seed declarado, el coach debe decir que falta informacion."
        />
        <section className="section">
          <div className="wrap">
            <AiCoachWorkbench />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
