import type { ReviewStatus } from "./schema";

export type TreasurePriority = {
  id: string;
  civId: string; // o "shared"
  context: string; // ej "rush plan", "FF plan", "boom plan"
  priorityOrder: string[]; // ordenado: primero a primero pelearlo
  alwaysSkip: string[];
  notes: string;
  sourceId: string;
  reviewStatus: ReviewStatus;
};

export const aoe3TreasurePriorities: TreasurePriority[] = [
  {
    id: "french-semi-ff-treasures",
    civId: "french",
    context: "Semi-FF: XP acelera shipments y permite Fortress mas seguro.",
    priorityOrder: [
      "XP treasures (acelera primer envio)",
      "Food treasures (mejora age-up timing)",
      "Wood treasures (permite mas estructuras)",
      "Coin treasures (solo si confirmas Fortress)",
    ],
    alwaysSkip: [
      "Tesoros con guardianes pesados que requieren mas de 2 villager-loss equivalentes.",
      "Tesoros lejos de tu ruta natural si retrasan el ageup.",
    ],
    notes: "French gana mucho con un primer envio acelerado; XP > coin en colonial.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "british-boom-treasures",
    civId: "british",
    context: "Manor boom: madera para casas y aldeanos vivos son prioridad.",
    priorityOrder: [
      "Wood treasures (manors directos)",
      "Food treasures (boom de aldeanos)",
      "XP treasures (acelera Longbow/Musketeer shipment)",
      "Coin treasures (para upgrades militares mas tarde)",
    ],
    alwaysSkip: [
      "Tesoros peligrosos que requieren explorer extra; British depende de eco temprana.",
    ],
    notes: "British no debe pelear tesoros que paren su rate de manors.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "ottoman-rush-treasures",
    civId: "ottomans",
    context: "Janissary rush: XP para envios militares y food para ageup.",
    priorityOrder: [
      "XP treasures (acelera 5 Jans/3 Hussars)",
      "Food treasures (auto-villagers + ageup)",
      "Coin treasures (refuerza Jan production)",
      "Wood treasures (casas y rax forward)",
    ],
    alwaysSkip: [
      "Tesoros lejos de tu ruta forward; el explorer otomano debe scoutar rival.",
    ],
    notes: "Ottoman necesita el explorer agresivo para tesoros + scout.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "spanish-ff-treasures",
    civId: "spanish",
    context: "Fast Fortress: XP es el recurso clave para shipments rapidos.",
    priorityOrder: [
      "XP treasures (acelera ruta a Age III)",
      "Coin treasures (700 Coin posterior)",
      "Food treasures (ageup mas rapido)",
      "Wood treasures (infraestructura minima)",
    ],
    alwaysSkip: [
      "Tesoros que arriesgan al explorer; Spanish lo necesita para XP boost de tesoros mayores.",
    ],
    notes: "El XP de tesoros es lo que hace Spanish FF viable; no negocies el explorer.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "shared-anti-rush-treasures",
    civId: "shared",
    context: "Cualquier civ bajo amenaza de rush.",
    priorityOrder: [
      "Tesoros cercanos al TC (seguros)",
      "Food treasures (compensa idle por defensa)",
      "Coin treasures (upgrades militares)",
    ],
    alwaysSkip: [
      "Tesoros lejos del TC: bajo rush no se pelean.",
      "Tesoros con guardianes pesados.",
    ],
    notes: "Regla universal anti-rush: tesoro = tiempo en hostilidad; cualquier riesgo > beneficio.",
    sourceId: "academy-seed",
    reviewStatus: "needs-review",
  },
];

export function getTreasuresForCiv(civId: string): TreasurePriority[] {
  return aoe3TreasurePriorities.filter((t) => t.civId === civId || t.civId === "shared");
}
