import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Modos de juego AoE3 - Academia AoE3",
  description:
    "Supremacy 1v1, Team Games y Treaty cambian deck, tempo y plan. La academia los trata por separado para no contaminar guías.",
};

const modes = [
  {
    href: "/civs",
    title: "Supremacy 1v1",
    status: "Activo",
    body:
      "Modo principal del MVP. Civs, decks, openings, planes y matchups se publican primero contra el contexto 1v1 estándar.",
  },
  {
    href: "/modes/team",
    title: "Team Games",
    status: "Diferido",
    body:
      "Cartas de equipo, roles flanco/pocket y timing coordinado cambian decks. Sin corpus dedicado, evitamos contaminar Supremacy.",
  },
  {
    href: "/modes/treaty",
    title: "Treaty",
    status: "Diferido",
    body:
      "Economía máxima, upgrades full y composición tardía. Treaty pide guías propias; no reciclamos builds de Supremacy.",
  },
];

export default function ModesPage() {
  return (
    <>
      <PageHero
        eyebrow="Modos de juego"
        title="Supremacy, Team y Treaty se tratan por separado"
        body="El contenido y las herramientas se publican primero para Supremacy 1v1. Team y Treaty quedan diferidos hasta que tengamos corpus propio."
      />
      <section className="section">
        <div className="wrap">
          <div className="grid">
            {modes.map((mode) => (
              <Link className="card" key={mode.href} href={mode.href}>
                <div className="card-top">
                  <span className="pill">{mode.status}</span>
                </div>
                <h3>{mode.title}</h3>
                <p>{mode.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
