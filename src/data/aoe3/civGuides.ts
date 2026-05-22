import type { ReviewStatus } from "./schema";

export type CivGuideLevel = "start" | "intermediate" | "advanced";

export type CivGuide = {
  civId: string;
  title: string;
  level: CivGuideLevel;
  thesis: string; // 1-2 frases: qué partida quiere jugar la civ
  startHere: string[]; // 3-5 cosas que mirar primero
  commonMistakes: string[];
  recommendedPlanId: string;
  drills: string[];
  sourceId: string;
  reviewStatus: ReviewStatus;
};

export const aoe3CivGuides: CivGuide[] = [
  {
    civId: "french",
    title: "Cómo empezar con French",
    level: "intermediate",
    thesis: "Eco elástica con Coureurs des Bois y caballería para castigar ventanas pequeñas. Llegas a Fortress sin morir si scouteas.",
    startHere: [
      "Aprende qué hace el CDB: aldeano que recolecta más rápido en food/wood.",
      "Primer envío default: 3 CDB. Solo cambia si scout muestra all-in.",
      "Politician age-up: Quartermaster (military shipment) o Native Lover (eco).",
      "Tu deck core: 3 CDB, 700 Wood, 700 Coin, 8 Crossbowmen, Cavalry Combat.",
    ],
    commonMistakes: [
      "Mandar 4 CDB a ciegas cuando ya viste forward rival.",
      "Entrar a Fortress sin anti-cav (Pikeman/Crossbowman).",
      "Pelear con Cuirassiers sin Cavalry Combat upgrade.",
    ],
    recommendedPlanId: "french-semi-ff",
    drills: [
      "Juega 3 partidas siguiendo el opening sin desviarte.",
      "En cada partida, anota tu Age II time y si fue antes o después de 4:30.",
      "Antes de cada envío, di en voz alta qué carta retrasa.",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    civId: "british",
    title: "Cómo empezar con British",
    level: "start",
    thesis: "Boom de manors. Cada casa es economía pero también deuda defensiva. Convierte eco en masa militar antes de que te tomen el mapa.",
    startHere: [
      "Manor = casa + aldeano gratis. Construye con intención, no en masa ciega.",
      "Primer envío: 3 Villagers (safe) o Virginia Company (greed si no hay all-in).",
      "Tu defensa colonial: 6 Longbowmen o 700 Wood + Musketeer batch.",
      "Politician age-up: The Ambassador (defensivo) o The Vicar (eco).",
    ],
    commonMistakes: [
      "Manors indefensos a la vista del rival.",
      "Virginia Company sin confirmar que no viene rush.",
      "Quedarse housed (sin pop cap) por no construir casas con ritmo.",
    ],
    recommendedPlanId: "british-manor-boom",
    drills: [
      "Practica 5 partidas sin sobrepasar X manors antes del primer batch militar.",
      "Cuenta idle de barracks entre minutos 5 y 9.",
      "Marca tu primera unit batch y compara con benchmark del plan.",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    civId: "ottomans",
    title: "Cómo empezar con Ottomans",
    level: "start",
    thesis: "Aldeanos automáticos + tempo militar directo. Fuerzas defensa rival desde minuto 5 o transicionas si no cierras.",
    startHere: [
      "Tu TC produce aldeanos solo: nunca debe estar idle.",
      "Primer envío: 3 Hussars (movilidad) o 5 Janissaries (masa).",
      "Politician age-up: The Mufti (food) o Grand Vizier (military).",
      "Si el rush no cierra, 700 Coin para Fortress con Falconets.",
    ],
    commonMistakes: [
      "Perder Janissaries pegando TC sin siege.",
      "Quedarse en Age II tarde cuando rival ya estabilizó.",
      "No forzar nada con ventaja de tempo.",
    ],
    recommendedPlanId: "ottoman-jan-rush",
    drills: [
      "En 5 partidas, marca tu primer daño real (idle rival).",
      "Si no hay daño al 6:30, fuerza 700 Coin y transiciona.",
      "Practica retirada limpia tras forzar idle.",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    civId: "spanish",
    title: "Cómo empezar con Spanish",
    level: "intermediate",
    thesis: "Shipments rápidos. Usas XP de tesoros + TP para llegar a Fortress con golpe antes de que el rival escale.",
    startHere: [
      "El explorer pelea tesoros más rápido que otras civs. Úsalo agresivo.",
      "TP early si el mapa lo permite y no hay rush.",
      "Politician age-up: The Naturalist (eco) o The Engineer (military).",
      "Tu Fortress: 700 Coin + 2 Falconets protegidas por Pikemen.",
    ],
    commonMistakes: [
      "FF sin scouting; mueres a all-in colonial.",
      "Falconets sin Pikemen: mueren a Hussar.",
      "Perder explorer pelando tesoros mal evaluados.",
    ],
    recommendedPlanId: "spanish-fast-fortress",
    drills: [
      "Antes de minuto 2, decide si TP es realista.",
      "No mandar coin bajo presión fatal.",
      "Practica primer golpe Fortress con composición mixta.",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    civId: "dutch",
    title: "Cómo empezar con Dutch",
    level: "advanced",
    thesis: "Bancos protegidos + Skirmisher. Tu pool de aldeanos es limitado, así que cada uno cuenta. Defensa anti-rush obligatoria.",
    startHere: [
      "Dutch tiene pop cap baja en villagers; pierde 5 = partida muerta.",
      "Primer envío: 3 Villagers (safe), no 3 Envoys.",
      "Bank Wagon solo si scout no muestra forward/all-in.",
      "4 Skirmishers para defender el primer Bank.",
    ],
    commonMistakes: [
      "Bancos sin defensa.",
      "Mandar Bank Wagon bajo presión visible.",
      "Faltar madera para infraestructura por priorizar bancos.",
    ],
    recommendedPlanId: "dutch-bank-defense",
    drills: [
      "En 3 partidas, anota cuántos villagers perdiste y el resultado.",
      "Practica defender el primer Bank con Skirms.",
      "Cuenta Coin/min antes y después del primer Bank.",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    civId: "germans",
    title: "Cómo empezar con Germans",
    level: "advanced",
    thesis: "Settler Wagons (eco rápida) + Uhlans gratis. Cada shipment convierte eco en mapa con raids.",
    startHere: [
      "2 Settler Wagons como primer envío estandariza eco.",
      "Uhlans son raid: pegan recursos externos, no TC.",
      "Politician age-up: refuerza eco o militar según matchup.",
      "Tu Fortress: Doppelsoldner + Falconets.",
    ],
    commonMistakes: [
      "Perder Uhlans pegando TC sin siege.",
      "Greed con 5 Settler Wagons sin scout.",
      "No sincronizar shipment y producción.",
    ],
    recommendedPlanId: "german-semi-ff-raid",
    drills: [
      "Practica raids con Uhlans sin perder masa.",
      "Cuenta aldeanos rivales matados por raid en 5 partidas.",
      "Si el raid no paga, transiciona a Fortress sin perder Uhlans gratis.",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    civId: "russians",
    title: "Cómo empezar con Russians",
    level: "intermediate",
    thesis: "Producción por lotes. Strelet/Cossack masa con Blockhouse forward para fijar al rival temprano.",
    startHere: [
      "Strelets se producen en batch (3 a la vez): rax tempranas.",
      "Blockhouse forward si el mapa lo permite.",
      "Politician age-up: refuerza producción o military.",
      "Tu Fortress: artillería + masa acumulada.",
    ],
    commonMistakes: [
      "Atacar TC sin refuerzos.",
      "No convertir masa en mapa.",
      "Quedarse atrás en tech si no hay daño.",
    ],
    recommendedPlanId: "russian-colonial-mass",
    drills: [
      "Practica Blockhouse forward placement.",
      "Cuenta unidades vivas a los 8 minutos.",
      "Si no hay daño al 7:00, transiciona.",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    civId: "aztecs",
    title: "Cómo empezar con Aztecs",
    level: "advanced",
    thesis: "Infantería especializada + War Chief activo. Presión constante con economía nativa distinta.",
    startHere: [
      "War Chief genera XP en tesoros: úsalo agresivo desde minuto 0.",
      "Macehualtin = anti-infantería; Puma Spearman = anti-cavalry.",
      "No tienes Hussar/Cuirassier; tu cavalry-killer es Pikeman.",
      "Politician age-up: refuerza militar para presión.",
    ],
    commonMistakes: [
      "Perder War Chief: revive cuesta XP y tempo.",
      "Pelear composiciones equivocadas (cav rival sin Puma Spearman).",
      "No cerrar mapa con daño.",
    ],
    recommendedPlanId: "aztec-native-pressure",
    drills: [
      "Mantén War Chief vivo en 5 partidas seguidas.",
      "Composición Macehualtin + Puma según rival.",
      "Cuenta idle time forzado al rival.",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    civId: "haudenosaunee",
    title: "Cómo empezar con Haudenosaunee",
    level: "intermediate",
    thesis: "War Chief con aura + Tomahawk timing. Shipments militares fuertes y flexibilidad de timing.",
    startHere: [
      "Aura de War Chief: aumenta daño de unidades cercanas.",
      "Travois acelera infraestructura sin gastar madera.",
      "Tomahawk = anti-infantería + anti-cavalry mix.",
      "Politician age-up: refuerza militar/eco según matchup.",
    ],
    commonMistakes: [
      "No usar aura del War Chief en peleas.",
      "Sobreextender timing sin masa.",
      "No adaptar a cavalry/artillery enemiga.",
    ],
    recommendedPlanId: "haudenosaunee-timing",
    drills: [
      "Practica peleas con War Chief siempre adyacente al ejército.",
      "Travois para infraestructura forward.",
      "Adapta composición a rival (Aenna vs cavalry, Tomahawk vs masa).",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
  {
    civId: "portuguese",
    title: "Cómo empezar con Portuguese",
    level: "intermediate",
    thesis: "TC extra por edad + defensa estática. Boom protegido que escala si sobrevives a timings.",
    startHere: [
      "Cada age-up te da un Town Center gratis: planea su posición.",
      "Cassadores son tu defensa de mapa (rango largo, anti-pesado).",
      "Politician age-up: el que da TC extra.",
      "Tu Fortress: artillería + cassadores.",
    ],
    commonMistakes: [
      "Expandirse sin visión.",
      "No cubrir rutas de raid.",
      "Llegar tarde a producción militar.",
    ],
    recommendedPlanId: "portuguese-tc-boom",
    drills: [
      "Practica posición del segundo TC en 5 mapas diferentes.",
      "Cassadores cubriendo rutas de raid.",
      "Convertir eco en timing al 8:00.",
    ],
    sourceId: "samurai-strategy-school",
    reviewStatus: "needs-review",
  },
];

export function getCivGuide(civId: string): CivGuide | undefined {
  return aoe3CivGuides.find((g) => g.civId === civId);
}
