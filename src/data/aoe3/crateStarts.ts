import type { ReviewStatus } from "./schema";

export type CrateStart = {
  id: string;
  civId: string;
  startCrates: string; // ej "200 food, 100 wood"
  firstActions: string[]; // pasos en orden
  villagerSplit: string; // ej "all to food until 8, then 2 wood"
  notes: string;
  sourceId: string;
  reviewStatus: ReviewStatus;
};

export const aoe3CrateStarts: CrateStart[] = [
  {
    id: "french-standard-start",
    civId: "french",
    startCrates: "Crates estandar de civilizaciones europeas",
    firstActions: [
      "Todos los aldeanos a food.",
      "Explorer a tesoros de food/XP cercanos.",
      "Hacer casa con madera de crates cuando sea necesario.",
      "Coureurs des Bois reciben bonus en wood y food.",
    ],
    villagerSplit: "All food hasta tener buffer para ageup; switch a wood antes de Age II.",
    notes: "French escala con CDB; no necesitas wood early excepto para casa.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "british-standard-start",
    civId: "british",
    startCrates: "Crates estandar europeas + manor bonus",
    firstActions: [
      "Aldeanos a food.",
      "Madera para primer manor (no perder tempo).",
      "Explorer a tesoros wood/food.",
      "Cada manor produce villager: usa madera con intencion.",
    ],
    villagerSplit: "5 food, 3 wood inicial; ajustar segun manors planeados.",
    notes: "British depende de wood para manors; no descuidar wood income.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "ottoman-rush-start",
    civId: "ottomans",
    startCrates: "Crates estandar + auto-villager production",
    firstActions: [
      "Crates recolectados rapido; auto-villagers en marcha.",
      "Explorer agresivo: tesoros XP+scout simultaneo.",
      "Wood minimo para casa; food para ageup.",
      "Preparar barracks antes de ageup si vas rush.",
    ],
    villagerSplit: "All food + 2-3 wood para casa unica.",
    notes: "Ottoman gana cada segundo de tempo; no idle TC nunca.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "spanish-ff-start",
    civId: "spanish",
    startCrates: "Crates estandar + shipment speed bonus",
    firstActions: [
      "All food para acelerar ageup.",
      "Explorer activo en tesoros (XP boost en envios).",
      "TP early si el mapa lo permite y no hay rush.",
      "Wood minimo para casa.",
    ],
    villagerSplit: "All food hasta ageup; wood solo casa.",
    notes: "Spanish necesita XP de tesoros y TP para escalar shipments rapido.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "dutch-bank-start",
    civId: "dutch",
    startCrates: "Crates estandar; villagers limitados",
    firstActions: [
      "Todos a food para ageup.",
      "Explorer a tesoros.",
      "Madera para bank position posterior.",
      "Defensa anti-rush prioritaria (Dutch villager pool es pequena).",
    ],
    villagerSplit: "All food early; wood para casa y eventual bank.",
    notes: "Dutch tiene pop cap baja en villagers; no perder aldeanos.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "german-settler-start",
    civId: "germans",
    startCrates: "Crates estandar + Settler Wagons en shipments",
    firstActions: [
      "All food para ageup rapido.",
      "Explorer a tesoros XP (acelera Settler Wagons).",
      "Madera minima para casa.",
      "Preparar stable forward para Uhlan raid si planeas Semi-FF Raid.",
    ],
    villagerSplit: "All food; switch a wood justo antes de Age II para infraestructura.",
    notes: "Settler Wagons compensan ageup tardio. No perder Uhlans gratis.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "russian-mass-start",
    civId: "russians",
    startCrates: "Crates estandar + batch villager training",
    firstActions: [
      "All food.",
      "Explorer agresivo: TP + scout + tesoros.",
      "Wood para Blockhouse forward si el mapa lo permite.",
      "Strelet batch en cuanto edas.",
    ],
    villagerSplit: "All food + 2-3 wood para Blockhouse + casa.",
    notes: "Russian gana en colonial con masa; no greedear eco si rush.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    id: "aztec-native-start",
    civId: "aztecs",
    startCrates: "Crates estandar + War Chief activo",
    firstActions: [
      "All food para ageup.",
      "War Chief en tesoros (genera XP).",
      "Madera para casas estandar.",
      "No perder War Chief: revive tiene coste alto.",
    ],
    villagerSplit: "All food; wood casa unica.",
    notes: "War Chief es eco y combate; sin el, Aztec pierde tempo grave.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
];

export function getCrateStartForCiv(civId: string): CrateStart | undefined {
  return aoe3CrateStarts.find((c) => c.civId === civId);
}
