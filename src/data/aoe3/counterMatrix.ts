import type { ReviewStatus } from "./schema";

export type CounterRelation = "hard-counter" | "soft-counter" | "even" | "soft-loss" | "hard-loss";

export type CounterRow = {
  unitTag: string;
  vsInfantry: CounterRelation;
  vsHeavyInfantry: CounterRelation;
  vsLightInfantry: CounterRelation;
  vsCavalry: CounterRelation;
  vsHeavyCavalry: CounterRelation;
  vsArtillery: CounterRelation;
  vsBuilding: CounterRelation;
  notes: string;
  sourceId: string;
  reviewStatus: ReviewStatus;
};

export const aoe3CounterMatrix: CounterRow[] = [
  {
    unitTag: "ranged-infantry",
    vsInfantry: "even",
    vsHeavyInfantry: "hard-counter",
    vsLightInfantry: "soft-loss",
    vsCavalry: "soft-loss",
    vsHeavyCavalry: "soft-loss",
    vsArtillery: "soft-counter",
    vsBuilding: "soft-loss",
    notes: "Musketeer/Janissary: anti-pesado en colonial, vulnerables a caballeria sin pikes.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    unitTag: "heavy-infantry",
    vsInfantry: "soft-counter",
    vsHeavyInfantry: "even",
    vsLightInfantry: "hard-counter",
    vsCavalry: "soft-counter",
    vsHeavyCavalry: "hard-counter",
    vsArtillery: "soft-loss",
    vsBuilding: "soft-counter",
    notes: "Pikemen/Halberdier: anti-cav esencial. No persiguen rangos largos.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    unitTag: "light-infantry",
    vsInfantry: "soft-counter",
    vsHeavyInfantry: "hard-counter",
    vsLightInfantry: "even",
    vsCavalry: "soft-loss",
    vsHeavyCavalry: "soft-loss",
    vsArtillery: "soft-counter",
    vsBuilding: "soft-loss",
    notes: "Skirmisher/Longbow/Cassador: rango+anti-pesado. Defensiva con manors o palisade.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    unitTag: "heavy-cavalry",
    vsInfantry: "hard-counter",
    vsHeavyInfantry: "soft-loss",
    vsLightInfantry: "hard-counter",
    vsCavalry: "soft-counter",
    vsHeavyCavalry: "even",
    vsArtillery: "hard-counter",
    vsBuilding: "soft-counter",
    notes: "Hussar/Cuirassier/Lancer: castiga rangos y artilleria expuesta. Mueren a Pikes/Halberd.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    unitTag: "ranged-cavalry",
    vsInfantry: "soft-counter",
    vsHeavyInfantry: "soft-loss",
    vsLightInfantry: "even",
    vsCavalry: "hard-counter",
    vsHeavyCavalry: "soft-counter",
    vsArtillery: "soft-counter",
    vsBuilding: "soft-loss",
    notes: "Dragoon/Cossack/Spahi: anti-caballeria y artilleria. No tanquea melee.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    unitTag: "artillery",
    vsInfantry: "hard-counter",
    vsHeavyInfantry: "hard-counter",
    vsLightInfantry: "soft-counter",
    vsCavalry: "soft-loss",
    vsHeavyCavalry: "hard-loss",
    vsArtillery: "even",
    vsBuilding: "hard-counter",
    notes: "Falconet: rompe masa infantil y edificios. Requiere escolta anti-cav obligatoria.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    unitTag: "siege",
    vsInfantry: "soft-counter",
    vsHeavyInfantry: "soft-counter",
    vsLightInfantry: "soft-counter",
    vsCavalry: "soft-loss",
    vsHeavyCavalry: "hard-loss",
    vsArtillery: "even",
    vsBuilding: "hard-counter",
    notes: "Culverin: anti-artilleria y siege. Solo si el rival se compromete con cañones.",
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
];

export function getCounterRow(unitTag: string): CounterRow | undefined {
  return aoe3CounterMatrix.find((row) => row.unitTag === unitTag);
}
