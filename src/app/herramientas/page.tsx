import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { SiteShell } from "@/components/SiteShell";
import { features as academyFeatures } from "@/data/academy";
import type { LucideIcon } from "@/components/icons";

export const metadata = {
  title: "Herramientas · Academia AoE3",
  description:
    "35 herramientas operativas agrupadas por intención: Aprender, Entrenar, Analizar y Operar. Cada una conectada a una decisión real de partida.",
};

type Feature = {
  title: string;
  body: string;
  href: string;
  icon: LucideIcon;
  signal: string;
};

const GROUPS: { title: string; roman: string; intent: string; titles: string[] }[] = [
  {
    title: "Aprender",
    roman: "I",
    intent: "Corpus editorial: civs, decks, openings, cartas, matchups, knowledge core.",
    titles: ["Guías", "Civilizaciones", "Decks", "Openings", "Cartas", "Matchups", "Knowledge core", "Learn SEO", "Map helper"],
  },
  {
    title: "Entrenar",
    roman: "II",
    intent: "Drills y herramientas de práctica fuera de la partida.",
    titles: [
      "Modo Carrera",
      "Civ Mastery",
      "Opening Timer",
      "Deck Builder",
      "Matchup Scout",
      "Series prep",
      "Errores",
      "Shipment trainer",
      "Deck checker",
    ],
  },
  {
    title: "Analizar",
    roman: "III",
    intent: "Replay normalizer, coach y análisis post-game.",
    titles: ["Replay Coach", "Replay upload", "Replay lab", "Replay import", "Analyzer", "Análisis", "Planes"],
  },
  {
    title: "Operar",
    roman: "IV",
    intent: "Coach IA con guardrails, trust, provenance y operativa interna.",
    titles: [
      "IA con citas",
      "Trust",
      "Patch tracker",
      "Source admin",
      "VOD pipeline",
      "Fuentes",
      "Roadmap 100",
      "Source queue",
      "Stats matrix",
      "Art lab",
    ],
  },
];

export default function HerramientasPage() {
  const byTitle = new Map(academyFeatures.map((f) => [f.title, f as Feature]));
  const totalFound = GROUPS.reduce(
    (acc, g) => acc + g.titles.filter((t) => byTitle.has(t)).length,
    0,
  );

  return (
    <SiteShell>
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="crumb">
              <Link href="/">Inicio</Link> &nbsp;/&nbsp; Herramientas
            </div>
            <h1>
              {totalFound} herramientas <em>operativas</em>.
            </h1>
            <p>
              El corpus completo de tools del MVP, agrupado por intención. Cada una está orientada a una decisión real de
              partida o de operación, no a llenar una wiki.
            </p>
          </div>
        </section>

        {GROUPS.map((g) => {
          const items = g.titles.map((t) => byTitle.get(t)).filter(Boolean) as Feature[];
          if (items.length === 0) return null;
          return (
            <section className="section" key={g.title}>
              <div className="wrap">
                <div className="section-head">
                  <div>
                    <div className="kicker">
                      <span className="num">{g.roman}</span>
                      {g.title}
                    </div>
                    <h2 style={{ marginTop: 8 }}>
                      {g.title} <em>· {items.length}</em>
                    </h2>
                  </div>
                  <p style={{ maxWidth: 520, color: "var(--muted)", margin: 0 }}>{g.intent}</p>
                </div>
                <div className="grid">
                  {items.map((f) => {
                    const Icn = f.icon as ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
                    return (
                      <Link className="card" href={f.href} key={f.title}>
                        <div className="card-top">
                          <span className="icon-tile">
                            <Icn size={22} aria-hidden="true" />
                          </span>
                          <span className="status">{f.signal}</span>
                        </div>
                        <h3>{f.title}</h3>
                        <p>{f.body}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </SiteShell>
  );
}
