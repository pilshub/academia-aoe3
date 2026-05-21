import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Team Games - diferido en v1 - Academia AoE3",
  description:
    "Team Games cambian cartas, roles (flanco/pocket) y timing. Sin corpus propio, la academia evita reciclar builds 1v1.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team Games"
        title="Diferido en v1 — corpus propio pendiente"
        body="Las team cards valen más en team que en 1v1. Los roles flanco/pocket y el timing coordinado cambian el deck. La academia separa Team Games de Supremacy."
      />
      <section className="section">
        <div className="wrap">
          <article className="card">
            <h3>Qué falta antes de abrir Team</h3>
            <ul className="list">
              <li>Decks específicos de team (cartas de equipo, roles).</li>
              <li>Planes por rol: flanco vs pocket.</li>
              <li>Matchups por arquetipo enemigo (rush flanco, FF pocket, etc).</li>
              <li>Benchmarks coordinados (no individuales).</li>
            </ul>
            <p className="muted">
              Consulta <Link href="/source-queue">/source-queue</Link> y <Link href="/roadmap">/roadmap</Link> para el orden de incorporación.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
