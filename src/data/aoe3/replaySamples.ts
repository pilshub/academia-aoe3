import { sourceBackedEvidence } from "./evidence";
import type { NormalizedReplay } from "./schema";

export const replayImportSample = `{
  "source": "manual-json",
  "map": "Great Plains",
  "mode": "Supremacy 1v1",
  "duration": "14:32",
  "patch": "13.690",
  "players": [
    {
      "name": "Alumno",
      "civ": "French",
      "result": "Loss",
      "deck": ["3 Coureurs des Bois", "700 Wood", "4 Coureurs des Bois", "700 Coin"],
      "shipments": [
        { "time": "2:05", "card": "3 Coureurs des Bois" },
        { "time": "5:10", "card": "700 Wood" },
        { "time": "6:55", "card": "4 Coureurs des Bois" }
      ],
      "ageUps": [
        { "age": "Age II", "time": "4:35", "politician": "Quartermaster" },
        { "age": "Age III", "time": "9:20", "politician": "Exiled Prince" }
      ]
    },
    {
      "name": "Rival",
      "civ": "Ottomans",
      "result": "Win",
      "shipments": [
        { "time": "4:55", "card": "3 Hussars" },
        { "time": "6:20", "card": "5 Janissaries" }
      ],
      "ageUps": [
        { "age": "Age II", "time": "4:25", "politician": "Governor" }
      ]
    }
  ]
}`;

export const replayFieldMatrix = [
  {
    field: "map/mode/duration",
    aoe3Explorer: "validator",
    freeFoodParty: "validator",
    academyUse: "ReplayHeader y busqueda de plan/mapa.",
  },
  {
    field: "players/civs/result",
    aoe3Explorer: "validator",
    freeFoodParty: "validator",
    academyUse: "Briefing, matchup y reporte postgame.",
  },
  {
    field: "shipments",
    aoe3Explorer: "validator",
    freeFoodParty: "validator",
    academyUse: "Comparar deck real contra plan y detectar greed bajo presion.",
  },
  {
    field: "age-ups/politicians",
    aoe3Explorer: "validator",
    freeFoodParty: "validator",
    academyUse: "Benchmarks y desvio de opening.",
  },
  {
    field: "idle TC/score curve/unit production",
    aoe3Explorer: "blocked",
    freeFoodParty: "blocked",
    academyUse: "Solo publicar si un parser lo expone con fiabilidad.",
  },
];

export const replaySeedReports: NormalizedReplay[] = [
  {
    header: {
      source: "manual-json",
      map: "Great Plains",
      mode: "Supremacy 1v1",
      duration: "14:32",
      patch: "13.690",
      players: [
        { name: "Alumno", civ: "French", result: "Loss", deck: ["3 Coureurs des Bois", "700 Wood", "4 Coureurs des Bois", "700 Coin"] },
        { name: "Rival", civ: "Ottomans", result: "Win" },
      ],
    },
    shipments: [
      { player: "Alumno", civ: "French", time: "2:05", card: "3 Coureurs des Bois" },
      { player: "Alumno", civ: "French", time: "5:10", card: "700 Wood" },
      { player: "Alumno", civ: "French", time: "6:55", card: "4 Coureurs des Bois" },
      { player: "Rival", civ: "Ottomans", time: "4:55", card: "3 Hussars" },
      { player: "Rival", civ: "Ottomans", time: "6:20", card: "5 Janissaries" },
    ],
    ageUps: [
      { player: "Alumno", age: "Age II", time: "4:35", politician: "Quartermaster" },
      { player: "Alumno", age: "Age III", time: "9:20", politician: "Exiled Prince" },
      { player: "Rival", age: "Age II", time: "4:25", politician: "Governor" },
    ],
    timeline: [],
    warnings: ["Seed manual para probar UI; no representa parser real."],
    evidence: sourceBackedEvidence("Fixture manual para probar normalizacion antes de importar parser real.", ["academy-seed"], ["academy-seed-warning"]),
  },
];
