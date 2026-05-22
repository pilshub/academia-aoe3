import Link from "next/link";
import { AlertTriangle, ShieldCheck } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";

export const metadata = {
  title: "Treaty Deck Checker - Academia AoE3",
  description: "Checker para decks Treaty. Modo separado de Supremacy 1v1.",
};

export default function TreatyDeckCheckerPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Treaty Deck Checker"
          title="Treaty no es Supremacy."
          body="Los decks Treaty premian economía máxima, upgrades full y composición tardía. Esta tool separa explícitamente Treaty de Supremacy y advierte si un deck Supremacy se intenta usar como Treaty."
        />
        <section className="section">
          <div className="wrap">
            <article className="card">
              <div className="card-top">
                <span className="icon-tile">
                  <AlertTriangle size={20} aria-hidden="true" />
                </span>
                <span className="status">v0 - awaiting corpus</span>
              </div>
              <h3>Por qué este checker existe</h3>
              <p>
                Un deck de Supremacy 1v1 en Treaty pierde por construcción: no tiene upgrades full, ni economía late, ni
                composición Industrial/Imperial. El checker Treaty necesita un schema propio (decks marcados con{" "}
                <code>modeTags: [&quot;Treaty&quot;]</code>) para poder auditar.
              </p>
              <h3>Reglas que aplicará cuando tenga corpus</h3>
              <ul className="list">
                <li>El deck debe tener ≥3 upgrades de Arsenal full (Counter Inf Rifling, Bayonet, Pillage, Trample Mode).</li>
                <li>El deck debe incluir al menos un shipment Industrial o Imperial.</li>
                <li>El deck NO debe optimizar para timings colonial (3 CDB, Virginia Company, 5 Janissaries).</li>
                <li>Debe declarar Treaty time target (10 / 20 / 40 min) para validar economía.</li>
              </ul>
              <h3>Estado</h3>
              <p className="muted">
                Treaty está diferido en v1 del producto. Ver{" "}
                <Link href="/modes/treaty">/modes/treaty</Link> para el corpus pendiente.
              </p>
            </article>

            <article className="card">
              <h3>
                <ShieldCheck size={18} aria-hidden="true" /> Mientras tanto: regla universal
              </h3>
              <p>
                Si tu partida es Treaty y abres este checker, la respuesta hoy es: <strong>no uses tu deck de Supremacy</strong>.
                Crea uno específico con cartas de Industrial/Imperial age y upgrades Arsenal completos.
              </p>
            </article>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
