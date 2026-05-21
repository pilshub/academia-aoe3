import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Treaty - diferido en v1 - Academia AoE3",
  description:
    "Treaty exige corpus propio. La academia evita publicar guías Treaty con builds de Supremacy hasta tener fuentes específicas.",
};

export default function TreatyPage() {
  return (
    <>
      <PageHero
        eyebrow="Modo Treaty"
        title="Diferido en v1 — sin corpus propio aún"
        body="Treaty premia economía máxima, upgrades full y composición tardía. La academia separa Treaty de Supremacy 1v1 y no publica guías Treaty sin benchmarks específicos del modo."
      />
      <section className="section">
        <div className="wrap">
          <article className="card">
            <h3>Qué falta antes de abrir Treaty</h3>
            <ul className="list">
              <li>Corpus de planes Treaty (eco final, upgrades, composición) con fuente.</li>
              <li>Benchmarks por civilización en treaty time estándar (20 / 40 min).</li>
              <li>Decks separados con tags <code>modeTags: [&quot;Treaty&quot;]</code>.</li>
              <li>Matchups Treaty (no aplicables a 1v1).</li>
            </ul>
            <p className="muted">
              Mientras tanto, consulta <Link href="/source-queue">/source-queue</Link> para ver qué fuentes hay priorizadas, y
              {" "}<Link href="/roadmap">/roadmap</Link> para el orden de incorporación.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
