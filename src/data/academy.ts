import {
  Anchor,
  BadgeAlert,
  BookOpen,
  Castle,
  Crosshair,
  Crown,
  Eye,
  ExternalLink,
  Flame,
  FileText,
  Images,
  Landmark,
  ListTree,
  LucideIcon,
  Map,
  PackageOpen,
  Search,
  Shield,
  ShieldCheck,
  Swords,
  Timer,
  TrendingUp,
  Users,
  WalletCards,
} from "@/components/icons";

export type ReviewStatus = "source-backlog" | "needs-review" | "reference-ready" | "canonical";
export type Mode = "Supremacy 1v1" | "Team" | "Treaty";
export type Difficulty = "Start" | "Intermediate" | "Advanced";
export type CardAge = "Age I" | "Age II" | "Age III" | "Age IV";
export type PlanArchetype = "Rush" | "Semi-FF" | "Boom" | "Timing" | "Control";
export type GuideCategory = "Fundamentos" | "Decks" | "Macro" | "Scouting" | "Mapas" | "Modos";

export type SourceLink = {
  label: string;
  url: string;
  note: string;
};

export type CivilizationProfile = {
  id: string;
  name: string;
  shortName: string;
  region: string;
  difficulty: Difficulty;
  identity: string;
  tempo: string;
  powerSpikes: string[];
  mistakes: string[];
  recommendedPlans: string[];
  image: string;
  imageCredit: string;
  accent: string;
  reviewStatus: ReviewStatus;
};

export type ShipmentCard = {
  id: string;
  name: string;
  civ: string;
  age: CardAge;
  role: "Core" | "Flex" | "Greed" | "Defense" | "Trap";
  timing: string;
  explanation: string;
  competesWith: string[];
  planTags: string[];
  reviewStatus: ReviewStatus;
};

export type Deck = {
  id: string;
  title: string;
  civ: string;
  mode: Mode;
  planTags: PlanArchetype[];
  patch: string;
  goal: string;
  coreCards: string[];
  flexCards: string[];
  trapCards: string[];
  shipments: string[];
  source: SourceLink;
  reviewStatus: ReviewStatus;
};

export type OpeningStep = {
  time: string;
  population: string;
  action: string;
  why: string;
};

export type Opening = {
  id: string;
  title: string;
  civ: string;
  mode: Mode;
  difficulty: Difficulty;
  benchmark: string;
  crates: string;
  ageUp: string;
  firstShipments: string[];
  steps: OpeningStep[];
  scoutChecks: string[];
  transition: string;
  source: SourceLink;
  reviewStatus: ReviewStatus;
};

export type MatchupGuide = {
  id: string;
  ownCiv: string;
  enemy: string;
  mapTag: string;
  threat: string;
  deckId: string;
  openingId: string;
  planId: string;
  firstDecision: string;
  winCondition: string;
  danger: string;
  reviewStatus: ReviewStatus;
};

export type Plan = {
  id: string;
  title: string;
  civ: string;
  mode: Mode;
  archetype: PlanArchetype;
  difficulty: Difficulty;
  mapTags: string[];
  matchupTags: string[];
  promise: string;
  deckId: string;
  openingId: string;
  shipmentLogic: string[];
  branches: string[];
  benchmarks: string[];
  practiceChecklist: string[];
  reviewStatus: ReviewStatus;
};

export type Feature = {
  title: string;
  body: string;
  href: string;
  icon: LucideIcon;
  signal: string;
};

export type GuideSection = {
  title: string;
  body: string;
  bullets: string[];
};

export type AcademyGuide = {
  id: string;
  title: string;
  category: GuideCategory;
  level: Difficulty;
  summary: string;
  readTime: string;
  linkedPlans: string[];
  sections: GuideSection[];
  drills: string[];
  reviewStatus: ReviewStatus;
};

export type MatchMoment = {
  time: string;
  label: string;
  event: string;
  verdict: "good" | "warning" | "critical";
  lesson: string;
};

export type MatchAnalysis = {
  id: string;
  title: string;
  map: string;
  playerCiv: string;
  enemyCiv: string;
  result: "Win" | "Loss" | "Training";
  duration: string;
  planId: string;
  thesis: string;
  keyMistake: string;
  turningPoint: string;
  moments: MatchMoment[];
  corrections: string[];
  practice: string[];
  reviewStatus: ReviewStatus;
};

export const officialMedia = {
  academyHero: "/assets/generated/academy-strategy-hero.png",
  mexicoSplash: "/assets/generated/academy-strategy-hero.png",
  plaza: "/assets/generated/academy-strategy-hero.png",
};

export const sources: SourceLink[] = [
  {
    label: "AOE3 Explorer tools",
    url: "https://aoe3explorer.com/tools",
    note: "Referencia viva para herramientas, decks, counter, replay parser y datos comunitarios.",
  },
  {
    label: "AOE 3 Companion App",
    url: "https://eso-community.net/viewtopic.php?t=24568",
    note: "Referencia de utilidad comunitaria: deck builder, cards, maps, natives, ELO y counters.",
  },
  {
    label: "Age of Empires official media",
    url: "https://www.ageofempires.com/games/aoeiiide/",
    note: "Imagenes oficiales usadas como fondos remotos, sin redistribuir archivos locales.",
  },
];

export const civilizations: CivilizationProfile[] = [
  {
    id: "french",
    name: "French",
    shortName: "FR",
    region: "Europa occidental",
    difficulty: "Intermediate",
    identity:
      "Economia elastica con Coureurs des Bois, semi-FF muy natural y caballeria que castiga ventanas pequenas.",
    tempo: "Colonial estable hacia Fortress con presion de caballeria.",
    powerSpikes: ["3 CDB estabiliza", "700 Wood abre infraestructura", "Fortress con Skirmisher/Dragoon"],
    mistakes: ["Mandar eco sin scouting", "Entrar a Fortress sin anti-cav", "Sobreinvertir en Hussar si el rival cierra"],
    recommendedPlans: ["french-semi-ff", "french-map-control"],
    image: officialMedia.mexicoSplash,
    imageCredit: "Fondo remoto oficial de Age of Empires III: Definitive Edition.",
    accent: "#2f7dd1",
    reviewStatus: "needs-review",
  },
  {
    id: "british",
    name: "British",
    shortName: "BR",
    region: "Europa occidental",
    difficulty: "Start",
    identity:
      "Boom de manors, masa temprana flexible y economia que premia construir casas con intencion.",
    tempo: "Colonial ancho: eco + defensa + timing de Longbow/Musketeer.",
    powerSpikes: ["Manor boom", "6 Longbow para estabilizar", "Timing con Musketeer + Longbow"],
    mistakes: ["Hacer manors sin seguridad", "No convertir eco en timing", "Quedarse sin madera para casas/rax"],
    recommendedPlans: ["british-manor-boom", "british-longbow-contain"],
    image: officialMedia.plaza,
    imageCredit: "Fondo remoto oficial de Age of Empires III: Definitive Edition.",
    accent: "#c04a2b",
    reviewStatus: "needs-review",
  },
  {
    id: "ottomans",
    name: "Ottomans",
    shortName: "OT",
    region: "Mediterraneo oriental",
    difficulty: "Start",
    identity:
      "Produccion automatica de aldeanos, timings militares directos y decisiones claras entre presion y Fortress.",
    tempo: "Presion colonial o FF con shipments militares de alto impacto.",
    powerSpikes: ["Janissary mass", "700 Coin hacia Fortress", "Falconets/Spahi como cierre"],
    mistakes: ["No forzar nada con ventaja de tempo", "Perder Jans gratis", "Tardar en transicionar si el rush falla"],
    recommendedPlans: ["ottoman-jan-rush", "ottoman-fast-fortress"],
    image: officialMedia.mexicoSplash,
    imageCredit: "Fondo remoto oficial de Age of Empires III: Definitive Edition.",
    accent: "#19a77a",
    reviewStatus: "needs-review",
  },
];

export const cards: ShipmentCard[] = [
  {
    id: "3-cdb",
    name: "3 Coureurs des Bois",
    civ: "French",
    age: "Age I",
    role: "Core",
    timing: "Primer envio economico si no necesitas reaccion militar inmediata.",
    explanation: "Acelera el plan sin encerrarte: mas comida/madera y transicion limpia a Age II.",
    competesWith: ["Advanced Trading Post", "Economic Theory"],
    planTags: ["Semi-FF", "Control"],
    reviewStatus: "needs-review",
  },
  {
    id: "700-wood",
    name: "700 Wood",
    civ: "French",
    age: "Age II",
    role: "Core",
    timing: "Primer o segundo envio colonial segun presion y mapa.",
    explanation: "Convierte el semi-FF en infraestructura: barracks/stable, houses, market, TP o defensa.",
    competesWith: ["4 CDB", "8 Crossbowmen"],
    planTags: ["Semi-FF", "Control"],
    reviewStatus: "needs-review",
  },
  {
    id: "4-cdb",
    name: "4 Coureurs des Bois",
    civ: "French",
    age: "Age II",
    role: "Greed",
    timing: "Cuando el scouting confirma que no mueres a timing temprano.",
    explanation: "Refuerza la economia antes de Fortress, pero puede ser castigado por rushes cerrados.",
    competesWith: ["700 Wood", "8 Crossbowmen"],
    planTags: ["Boom", "Semi-FF"],
    reviewStatus: "needs-review",
  },
  {
    id: "3-villagers",
    name: "3 Villagers",
    civ: "British",
    age: "Age I",
    role: "Core",
    timing: "Primer envio estandar para acelerar manors y edad II.",
    explanation: "Base economica sencilla y consistente; buena para aprender sin ramas raras.",
    competesWith: ["Virginia Company", "Advanced Trading Post"],
    planTags: ["Boom"],
    reviewStatus: "needs-review",
  },
  {
    id: "virginia-company",
    name: "Virginia Company",
    civ: "British",
    age: "Age I",
    role: "Greed",
    timing: "Plan de manor boom cuando el mapa y matchup permiten invertir.",
    explanation: "Hace mas eficiente el boom de casas, pero exige buena defensa y macro de madera.",
    competesWith: ["3 Villagers"],
    planTags: ["Boom"],
    reviewStatus: "needs-review",
  },
  {
    id: "6-longbow",
    name: "6 Longbowmen",
    civ: "British",
    age: "Age II",
    role: "Defense",
    timing: "Respuesta o presion inicial tras estabilizar economia.",
    explanation: "Compra espacio, defiende manors y permite contener sin gastar demasiado food.",
    competesWith: ["700 Wood", "5 Villagers"],
    planTags: ["Timing", "Control"],
    reviewStatus: "needs-review",
  },
  {
    id: "3-hussars",
    name: "3 Hussars",
    civ: "Ottomans",
    age: "Age II",
    role: "Core",
    timing: "Ventana temprana para negar tesoros, cazar aldeanos o fijar defensa rival.",
    explanation: "Da movilidad al Janissary pressure y obliga al rival a respetar mapa.",
    competesWith: ["700 Coin", "5 Janissaries"],
    planTags: ["Rush", "Timing"],
    reviewStatus: "needs-review",
  },
  {
    id: "5-janissaries",
    name: "5 Janissaries",
    civ: "Ottomans",
    age: "Age II",
    role: "Core",
    timing: "Primer refuerzo si quieres sostener presion colonial.",
    explanation: "Convierte produccion automatica de aldeanos en una amenaza directa.",
    competesWith: ["3 Hussars", "700 Coin"],
    planTags: ["Rush"],
    reviewStatus: "needs-review",
  },
  {
    id: "700-coin",
    name: "700 Coin",
    civ: "Ottomans",
    age: "Age II",
    role: "Flex",
    timing: "Rama de FF o transicion si el dano colonial no es limpio.",
    explanation: "Abre Fortress y evita quedarte atrapado en un rush que ya fue defendido.",
    competesWith: ["5 Janissaries", "3 Hussars"],
    planTags: ["Semi-FF", "Timing"],
    reviewStatus: "needs-review",
  },
];

export const decks: Deck[] = [
  {
    id: "french-semi-ff-deck",
    title: "French Semi-FF flexible",
    civ: "French",
    mode: "Supremacy 1v1",
    planTags: ["Semi-FF", "Control"],
    patch: "2026 review pending",
    goal: "Llegar a Fortress sin regalar mapa: eco solida, infraestructura justa y respuesta a rush.",
    coreCards: ["3 CDB", "700 Wood", "4 CDB", "700 Coin", "8 Crossbowmen"],
    flexCards: ["3 Hussars", "Cavalry Combat", "Skirmisher upgrades"],
    trapCards: ["Cartas puramente greedy si no has scouteado presion"],
    shipments: ["3 CDB", "700 Wood", "4 CDB o 8 Crossbowmen", "700 Coin", "Fortress military"],
    source: sources[0],
    reviewStatus: "needs-review",
  },
  {
    id: "british-manor-boom-deck",
    title: "British Manor Boom seguro",
    civ: "British",
    mode: "Supremacy 1v1",
    planTags: ["Boom", "Timing"],
    patch: "2026 review pending",
    goal: "Convertir manors en masa colonial sin morir a la primera presion.",
    coreCards: ["3 Villagers", "Virginia Company", "700 Wood", "6 Longbowmen", "5 Villagers"],
    flexCards: ["Musketeer combat", "Longbow upgrades", "Team eco cards en team games"],
    trapCards: ["Boom sin unidades contra rush claro"],
    shipments: ["3 Villagers", "Virginia Company o 700 Wood", "6 Longbowmen", "5 Villagers", "Military upgrade"],
    source: sources[1],
    reviewStatus: "needs-review",
  },
  {
    id: "ottoman-jan-rush-deck",
    title: "Ottoman Janissary pressure",
    civ: "Ottomans",
    mode: "Supremacy 1v1",
    planTags: ["Rush", "Timing"],
    patch: "2026 review pending",
    goal: "Forzar defensa rival con Jans y movilidad, y transicionar si no cierras.",
    coreCards: ["3 Hussars", "5 Janissaries", "700 Coin", "700 Wood", "Falconets"],
    flexCards: ["Spahi", "Abus Gun support", "Fortress transition cards"],
    trapCards: ["Seguir spameando Age II cuando el rival ya estabilizo"],
    shipments: ["3 Hussars o 5 Janissaries", "5 Janissaries", "700 Coin", "700 Wood", "Fortress finisher"],
    source: sources[0],
    reviewStatus: "needs-review",
  },
];

export const openings: Opening[] = [
  {
    id: "french-semi-ff-opening",
    title: "French Semi-FF con control",
    civ: "French",
    mode: "Supremacy 1v1",
    difficulty: "Intermediate",
    benchmark: "Age II cercano a 4:30 y decision de Fortress segun scouting.",
    crates: "Prioriza food para edad y madera suficiente para casa/mercado segun start.",
    ageUp: "Politician economico o militar segun presion esperada.",
    firstShipments: ["3 CDB", "700 Wood", "4 CDB o defensa", "700 Coin"],
    steps: [
      {
        time: "0:00",
        population: "Start",
        action: "Todos a food, recoge crates y manda scout a tesoros de comida/XP.",
        why: "French escala bien si el primer envio llega rapido y no pierdes explorer tempo.",
      },
      {
        time: "1:30",
        population: "Early",
        action: "Ajusta madera para casa/mercado si el start lo permite.",
        why: "La mejora economica o market temprano define lo limpia que sera la transicion.",
      },
      {
        time: "2:40",
        population: "Age up",
        action: "Avanza con plan de 700 Wood salvo scouting de rush.",
        why: "El semi-FF necesita infraestructura antes de pedir coin.",
      },
      {
        time: "4:30",
        population: "Colonial",
        action: "700 Wood: stable/rax, houses y TP/market si hay espacio.",
        why: "Construyes la respuesta, no solo economia.",
      },
      {
        time: "6:30",
        population: "Decision",
        action: "Si el rival no golpea, 700 Coin hacia Fortress; si golpea, shipment defensivo.",
        why: "La clave del plan es no convertir el FF en una muerte lenta.",
      },
    ],
    scoutChecks: ["Cuartel/stable enemigo", "Trade route libre", "Minas expuestas", "Segundo TC o greed rival"],
    transition: "Fortress con Skirmisher/Dragoon, o colonial estable si el mapa exige pelea.",
    source: sources[0],
    reviewStatus: "needs-review",
  },
  {
    id: "british-manor-boom-opening",
    title: "British Manor Boom con defensa",
    civ: "British",
    mode: "Supremacy 1v1",
    difficulty: "Start",
    benchmark: "Age II estable, manors constantes y primer bloque militar antes de greed extra.",
    crates: "Madera inicial convertida en manors sin bloquear aldeanos.",
    ageUp: "Politician defensivo/economico segun matchup.",
    firstShipments: ["3 Villagers", "Virginia Company o 700 Wood", "6 Longbowmen"],
    steps: [
      {
        time: "0:00",
        population: "Start",
        action: "Food para avanzar, madera inicial a manors controlados.",
        why: "Cada manor es economia, pero tambien una deuda de defensa si te pasas.",
      },
      {
        time: "2:30",
        population: "Age up",
        action: "Avanza manteniendo produccion y planea donde cerrar tu base.",
        why: "British no quiere pelear en campo abierto antes de tener masa.",
      },
      {
        time: "4:40",
        population: "Colonial",
        action: "Decide entre Virginia Company/700 Wood y shipment militar segun scouting.",
        why: "El deck no es automatico: el rival decide cuanto puedes greedear.",
      },
      {
        time: "6:00",
        population: "First mass",
        action: "Saca Longbow/Musketeer para defender manors y negar mapa cercano.",
        why: "La economia solo gana si llega viva al timing.",
      },
    ],
    scoutChecks: ["Rush directo", "Forward base", "Caballeria temprana", "Mapa con trade/natives"],
    transition: "Timing colonial o Fortress posterior si tu eco no fue castigada.",
    source: sources[1],
    reviewStatus: "needs-review",
  },
  {
    id: "ottoman-jan-rush-opening",
    title: "Ottoman Jan pressure",
    civ: "Ottomans",
    mode: "Supremacy 1v1",
    difficulty: "Start",
    benchmark: "Presion colonial temprana con Janissaries y shipment militar.",
    crates: "Food/wood para avanzar y construir produccion sin parar tempo.",
    ageUp: "Politician que refuerce presion o recursos para produccion.",
    firstShipments: ["3 Hussars o 5 Janissaries", "5 Janissaries", "700 Coin"],
    steps: [
      {
        time: "0:00",
        population: "Start",
        action: "Recolecta crates rapido y manda explorer a tesoros de XP/comida.",
        why: "Ottoman gana mucho si sus envios llegan antes de que el rival cierre.",
      },
      {
        time: "2:40",
        population: "Age up",
        action: "Prepara barracks y rally hacia el punto de presion.",
        why: "La amenaza tiene que aparecer antes de que el rival respire.",
      },
      {
        time: "4:30",
        population: "Colonial",
        action: "Produce Jans y decide shipment: Hussars para movilidad o Jans para masa.",
        why: "El primer envio debe castigar lo que el scout ya vio.",
      },
      {
        time: "6:30",
        population: "Pressure",
        action: "Si haces dano, refuerza; si no haces dano, 700 Coin y transicion.",
        why: "El error clasico es seguir golpeando una defensa ya preparada.",
      },
    ],
    scoutChecks: ["Torre/defensa rival", "Rax temprana", "Aldeanos expuestos", "Minas/cazas lejos"],
    transition: "Fortress con Falconets/Spahi o colonial sostenido si el rival esta abierto.",
    source: sources[0],
    reviewStatus: "needs-review",
  },
];

export const plans: Plan[] = [
  {
    id: "french-semi-ff",
    title: "French Semi-FF flexible",
    civ: "French",
    mode: "Supremacy 1v1",
    archetype: "Semi-FF",
    difficulty: "Intermediate",
    mapTags: ["land", "trade route", "standard"],
    matchupTags: ["anti-rush", "standard", "vs boom"],
    promise: "Llegas a Fortress sin ceder todo el mapa y con respuesta si el rival aprieta.",
    deckId: "french-semi-ff-deck",
    openingId: "french-semi-ff-opening",
    shipmentLogic: [
      "3 CDB si no hay amenaza inmediata.",
      "700 Wood para infraestructura y mapa.",
      "4 CDB si el scout confirma greedy rival; defensa si ves all-in.",
      "700 Coin cuando la ruta a Fortress es segura.",
    ],
    branches: [
      "Vs rush: cancela greed, usa shipment militar y pelea cerca de TC.",
      "Vs boom: toma mapa, TP o presion de caballeria antes de Fortress.",
      "Vs FF rival: acelera coin y prepara anti-artillery/dragoon.",
    ],
    benchmarks: ["Age II cerca de 4:30", "Decision de Fortress en 6:30-7:30", "Primer spike Fortress con composicion mixta"],
    practiceChecklist: ["Scoutear produccion enemiga", "No mandar 4 CDB a ciegas", "Tener respuesta anti-cav antes de salir"],
    reviewStatus: "needs-review",
  },
  {
    id: "british-manor-boom",
    title: "British Manor Boom seguro",
    civ: "British",
    mode: "Supremacy 1v1",
    archetype: "Boom",
    difficulty: "Start",
    mapTags: ["land", "defensible", "standard"],
    matchupTags: ["vs standard", "vs greedy", "anti-rush"],
    promise: "Conviertes casas en ventaja economica sin olvidar que el rival tambien juega.",
    deckId: "british-manor-boom-deck",
    openingId: "british-manor-boom-opening",
    shipmentLogic: [
      "3 Villagers para base solida.",
      "Virginia Company solo si el mapa permite boom.",
      "700 Wood si necesitas infraestructura y casas.",
      "6 Longbowmen si ves presion o quieres contener.",
    ],
    branches: [
      "Vs rush: prioriza units y base cerrada antes de manors extra.",
      "Vs boom: manors + timing colonial para negar expansion.",
      "Vs cavalry: Musketeer antes de Longbow puro.",
    ],
    benchmarks: ["Age II limpio", "Manors sin housed", "Primera masa militar antes de sobregreed"],
    practiceChecklist: ["No bloquear aldeanos", "No poner manors indefensos", "Convertir eco en timing"],
    reviewStatus: "needs-review",
  },
  {
    id: "ottoman-jan-rush",
    title: "Ottoman Janissary pressure",
    civ: "Ottomans",
    mode: "Supremacy 1v1",
    archetype: "Rush",
    difficulty: "Start",
    mapTags: ["open", "forward pressure", "standard"],
    matchupTags: ["vs greedy", "vs FF", "tempo"],
    promise: "Golpeas antes de que el rival ordene su partida y transicionas si la defensa aguanta.",
    deckId: "ottoman-jan-rush-deck",
    openingId: "ottoman-jan-rush-opening",
    shipmentLogic: [
      "3 Hussars si hay aldeanos expuestos o necesitas movilidad.",
      "5 Janissaries si quieres masa frontal.",
      "700 Coin si el dano no compensa seguir Age II.",
      "Fortress finisher cuando el rival esta contenido.",
    ],
    branches: [
      "Vs turtle: toma mapa y transiciona, no regales units.",
      "Vs cav: mezcla respuesta y no separes Jans.",
      "Vs greed: fuerza idle time y corta recursos externos.",
    ],
    benchmarks: ["Presion Age II temprana", "Primer dano antes de que el rival estabilice", "Decision de transicion tras primer choque"],
    practiceChecklist: ["No perder masa por goteo", "Atacar recursos, no TC", "Tener salida si el rush falla"],
    reviewStatus: "needs-review",
  },
];

export const matchups: MatchupGuide[] = [
  {
    id: "french-vs-rush",
    ownCiv: "French",
    enemy: "Rush colonial",
    mapTag: "land",
    threat: "Timing antes de que tu 4 CDB/700 Coin pague.",
    deckId: "french-semi-ff-deck",
    openingId: "french-semi-ff-opening",
    planId: "french-semi-ff",
    firstDecision: "Si ves forward/rax temprano, cambia greed por defensa y pelea cerca de TC.",
    winCondition: "Sobrevivir con eco CDB intacta y llegar a Fortress con composicion correcta.",
    danger: "Mandar eco shipment a ciegas.",
    reviewStatus: "needs-review",
  },
  {
    id: "british-vs-standard",
    ownCiv: "British",
    enemy: "Standard colonial",
    mapTag: "defensible",
    threat: "Que tu boom no llegue a masa militar.",
    deckId: "british-manor-boom-deck",
    openingId: "british-manor-boom-opening",
    planId: "british-manor-boom",
    firstDecision: "Virginia Company si el scout no ve all-in; 6 Longbow si hay presion.",
    winCondition: "Manors vivos, masa suficiente y timing que niegue mapa.",
    danger: "Confundir economia con ventaja si no produces unidades.",
    reviewStatus: "needs-review",
  },
  {
    id: "ottoman-vs-greed",
    ownCiv: "Ottomans",
    enemy: "Boom o FF greedy",
    mapTag: "open",
    threat: "Que el rival llegue a su spike sin pagar peaje.",
    deckId: "ottoman-jan-rush-deck",
    openingId: "ottoman-jan-rush-opening",
    planId: "ottoman-jan-rush",
    firstDecision: "Elige Hussars si hay aldeanos cazando lejos; Jans si necesitas romper defensa frontal.",
    winCondition: "Idle time, mapa y transicion a Fortress si no hay cierre directo.",
    danger: "Suicidar Jans contra TC/tower.",
    reviewStatus: "needs-review",
  },
];

export const features: Feature[] = [
  {
    title: "Modo Carrera",
    body: "Dashboard personal con objetivo, civ main, nivel, plan semanal y rutas de practica.",
    href: "/career",
    icon: Users,
    signal: "training OS",
  },
  {
    title: "Civ Mastery",
    body: "Escalera de 5 niveles por civilizacion: identidad, opening, deck, scouting y replay.",
    href: "/civ-mastery",
    icon: Crown,
    signal: "22 rutas",
  },
  {
    title: "Opening Timer",
    body: "Timer interactivo con pasos, scouting obligatorio, score y reglas de reset.",
    href: "/opening-timer",
    icon: Timer,
    signal: "practice v1",
  },
  {
    title: "Replay Coach",
    body: "Formulario de review que convierte age-ups, shipments y scouting en turning point y drill.",
    href: "/replay-coach",
    icon: Eye,
    signal: "coach v1",
  },
  {
    title: "Deck Builder",
    body: "Constructor por plan con score, roles, cartas core, greed, alertas y swaps sugeridos.",
    href: "/deck-builder",
    icon: WalletCards,
    signal: "builder v1",
  },
  {
    title: "Matchup Scout",
    body: "Mi civ + rival + mapa -> plan, primer peligro, scouting y envios seguros.",
    href: "/matchup-scout",
    icon: Crosshair,
    signal: "ranked prep",
  },
  {
    title: "Errores",
    body: "Biblioteca de sintomas, diagnosticos, correcciones y drills conectados a herramientas.",
    href: "/errors",
    icon: BadgeAlert,
    signal: "7 errores",
  },
  {
    title: "IA con citas",
    body: "Workbench del futuro coach: tools, corpus, citations y guardrails anti-invencion.",
    href: "/ai-coach",
    icon: Search,
    signal: "guardrails",
  },
  {
    title: "Trust",
    body: "Sello de confianza para separar canonical, fixture, fuente viva, seed y bloqueo.",
    href: "/trust",
    icon: ShieldCheck,
    signal: "no humo",
  },
  {
    title: "Replay upload",
    body: "Drag/drop local para meter replays en cola, preparar fixture y ejecutar parser en workspace.",
    href: "/replay-upload",
    icon: FileText,
    signal: "queue local",
  },
  {
    title: "Patch tracker",
    body: "Updates oficiales/candidatos, patch-risk y targets de revision por guia o tool.",
    href: "/patch-tracker",
    icon: Shield,
    signal: "patch-risk",
  },
  {
    title: "VOD pipeline",
    body: "YouTube/Twitch pasan a metadata, tesis, deck, shipments, matchup y drill.",
    href: "/vod-pipeline",
    icon: Eye,
    signal: "ingestion",
  },
  {
    title: "Series prep",
    body: "Preparador BO3/BO5 con civ pool, mapa, ban, game plan y scouting.",
    href: "/series-prep",
    icon: Swords,
    signal: "BO3/BO5",
  },
  {
    title: "Source admin",
    body: "Panel local para capturar URLs antes de convertirlas en source queue o provenance.",
    href: "/source-admin",
    icon: ListTree,
    signal: "admin local",
  },
  {
    title: "Learn SEO",
    body: "Landings indexables para búsquedas de builds, replay analysis, deck checker y matchup scout.",
    href: "/learn",
    icon: Search,
    signal: "SEO",
  },
  {
    title: "Guias",
    body: "Lecciones editoriales para entender decks, macro, scouting y mapa.",
    href: "/guides",
    icon: FileText,
    signal: "8 guias base",
  },
  {
    title: "Analisis",
    body: "Partidas desglosadas por timeline, error clave y practica posterior.",
    href: "/analysis",
    icon: Eye,
    signal: "4 analisis",
  },
  {
    title: "Analyzer",
    body: "Herramienta manual para meter timings y recibir diagnostico post-game.",
    href: "/analyzer",
    icon: BadgeAlert,
    signal: "post-game v1",
  },
  {
    title: "Fuentes",
    body: "Radar intensivo de webs, foros, wikis, Reddit, YouTube, Twitch, TikTok, Discord y herramientas.",
    href: "/resources",
    icon: ExternalLink,
    signal: "40+ fuentes",
  },
  {
    title: "Roadmap 100",
    body: "Los 100 pasos del plan 100/100 convertidos en fases, entregables y estado.",
    href: "/roadmap",
    icon: TrendingUp,
    signal: "100 pasos",
  },
  {
    title: "Source queue",
    body: "Cola accionable para convertir patches, foros, videos y tools en contenido fiable.",
    href: "/source-queue",
    icon: ListTree,
    signal: "P0/P1/P2",
  },
  {
    title: "Stats matrix",
    body: "Contrato de datos para meta, jugadores, replays, mapas y contenido sin inventar stats.",
    href: "/stats",
    icon: Search,
    signal: "5 dominios",
  },
  {
    title: "Replay lab",
    body: "Pipeline de import, timeline, deck audit e insights para analisis de partidas.",
    href: "/replay-lab",
    icon: Eye,
    signal: "parser-ready",
  },
  {
    title: "Replay import",
    body: "Pega JSON o texto de parser externo y genera timeline, warnings y campos normalizados.",
    href: "/replay-import",
    icon: FileText,
    signal: "tool v1",
  },
  {
    title: "Art lab",
    body: "Briefs y prompts para crear arte propio inspirado por AoE3 y futuro Nano Banana 2.",
    href: "/art-lab",
    icon: Images,
    signal: "asset queue",
  },
  {
    title: "Planes",
    body: "La unidad central: civ, deck, opening, shipments, ramas y benchmarks.",
    href: "/plans/french-semi-ff",
    icon: Crown,
    signal: "4 planes core",
  },
  {
    title: "Decks",
    body: "Cartas core, flex y trampas, explicadas como decisiones de partida.",
    href: "/decks",
    icon: WalletCards,
    signal: "4 decks comentados",
  },
  {
    title: "Deck checker",
    body: "Comprueba si tu deck tiene core, defensa, transicion y demasiado greed.",
    href: "/deck-checker",
    icon: ShieldCheck,
    signal: "tool v1",
  },
  {
    title: "Shipment trainer",
    body: "Escenarios de scouting para elegir el envio correcto bajo presion.",
    href: "/shipments",
    icon: PackageOpen,
    signal: "4 escenarios",
  },
  {
    title: "Map helper",
    body: "Trade route, agua, natives, tesoros y riesgos que cambian el plan.",
    href: "/maps",
    icon: Map,
    signal: "5 mapas seed",
  },
  {
    title: "Knowledge core",
    body: "Busqueda interna en civs, cartas, decks, planes, mapas y escenarios.",
    href: "/knowledge",
    icon: Search,
    signal: "pre-chat IA",
  },
  {
    title: "Openings",
    body: "Timelines con pasos, scouting y puntos de decision.",
    href: "/openings",
    icon: Timer,
    signal: "4 aperturas",
  },
  {
    title: "Cartas",
    body: "No solo que hacen: cuando enviarlas y contra que compiten.",
    href: "/cards",
    icon: PackageOpen,
    signal: "20+ cartas seed",
  },
  {
    title: "Matchups",
    body: "Briefs rapidos para elegir deck y primer desvio.",
    href: "/matchups",
    icon: Crosshair,
    signal: "3 arquetipos",
  },
  {
    title: "Civilizaciones",
    body: "Identidad, spikes, errores comunes y planes recomendados.",
    href: "/civs",
    icon: Castle,
    signal: "22 civs atlas",
  },
];

export const guides: AcademyGuide[] = [
  {
    id: "empezar-aoe3-desde-aoe2",
    title: "Empezar AoE3 viniendo de AoE2",
    category: "Fundamentos",
    level: "Start",
    summary: "Traduce tu intuicion de AoE2 al idioma de Home City, shipments, tesoros y politicians.",
    readTime: "8 min",
    linkedPlans: ["british-manor-boom", "ottoman-jan-rush"],
    sections: [
      {
        title: "La diferencia mental",
        body: "AoE3 no se decide solo por aldeanos, upgrades y mapa. Tu deck define que respuestas existen antes de empezar.",
        bullets: [
          "El primer envio reemplaza muchas aperturas fijas de AoE2.",
          "XP y tesoros pueden acelerar un timing mas que una microventaja economica.",
          "El politician de edad es una decision estrategica, no un tramite.",
        ],
      },
      {
        title: "Que mirar en los primeros 4 minutos",
        body: "La apertura no se valida solo por tu build: se valida por lo que ves del rival.",
        bullets: ["Produccion temprana", "Forward base", "Trade route", "Cazas/minas expuestas"],
      },
    ],
    drills: ["Juega 3 partidas mirando solo XP y primer shipment.", "Anota tu age II y que viste del rival antes de enviar la segunda carta."],
    reviewStatus: "reference-ready",
  },
  {
    id: "decks-no-son-listas",
    title: "Los decks no son listas: son promesas",
    category: "Decks",
    level: "Start",
    summary: "Aprende a leer un deck por plan: core, flex, greed, defensa y cartas trampa.",
    readTime: "7 min",
    linkedPlans: ["french-semi-ff", "british-manor-boom"],
    sections: [
      {
        title: "Core vs flex",
        body: "Una carta core sostiene el plan; una flex responde al mapa o matchup.",
        bullets: ["Core: si no la mandas, el plan pierde sentido.", "Flex: cambia segun scouting.", "Trampa: parece fuerte pero castiga tu timing real."],
      },
      {
        title: "El coste invisible",
        body: "Cada shipment enviado retrasa otro. La pregunta no es si la carta es buena, sino que ventana abre o cierra.",
        bullets: ["Eco a ciegas muere contra rush.", "Militar sin objetivo pierde valor.", "Recursos deben convertirse en infraestructura o edad."],
      },
    ],
    drills: ["Elige un deck y marca 5 cartas core.", "Antes de cada envio di en voz alta que carta estas retrasando."],
    reviewStatus: "reference-ready",
  },
  {
    id: "shipment-order-con-ramas",
    title: "Shipment order con ramas",
    category: "Decks",
    level: "Intermediate",
    summary: "Como pasar de orden fijo a arbol de decision segun scouting.",
    readTime: "9 min",
    linkedPlans: ["french-semi-ff", "ottoman-jan-rush"],
    sections: [
      {
        title: "Tres preguntas antes de enviar",
        body: "Un envio correcto responde al estado de partida, no a memoria mecanica.",
        bullets: ["Estoy vivo si greed?", "Tengo infraestructura para gastar?", "Mi rival esta defendiendo, boomeando o atacando?"],
      },
      {
        title: "La rama defensiva",
        body: "El mejor jugador no es el que nunca se desvia; es el que se desvia pronto.",
        bullets: ["Cambia eco por units si ves forward.", "Manda wood si necesitas houses/rax.", "Manda coin si el mapa ya esta cerrado y debes transicionar."],
      },
    ],
    drills: ["Pausa un VOD en el segundo envio y predice 2 ramas.", "Juega una partida obligandote a cambiar el segundo envio si ves produccion enemiga."],
    reviewStatus: "needs-review",
  },
  {
    id: "macro-minuto-ocho",
    title: "Macro al minuto 8",
    category: "Macro",
    level: "Intermediate",
    summary: "Checklist para saber si tu partida esta sana antes del primer gran choque.",
    readTime: "6 min",
    linkedPlans: ["british-manor-boom", "french-semi-ff"],
    sections: [
      {
        title: "Indicadores sanos",
        body: "Minuto 8 es cuando muchas partidas ya estan decididas aunque no haya GG.",
        bullets: ["No estar housed", "Haber gastado shipments", "Tener plan de transicion", "No flotar recursos sin edificio"],
      },
      {
        title: "Errores que parecen pequenos",
        body: "AoE3 castiga retrasar decisiones: un envio tardio y una edad tardia se multiplican.",
        bullets: ["700 Wood sin construir nada", "700 Coin sin avanzar", "Units caminando sin objetivo"],
      },
    ],
    drills: ["En cada replay anota recursos flotados al 8:00.", "Marca si tu tercer shipment tuvo impacto antes del 9:00."],
    reviewStatus: "needs-review",
  },
  {
    id: "scouting-que-cambia-envios",
    title: "Scouting que cambia envios",
    category: "Scouting",
    level: "Intermediate",
    summary: "Que informacion buscar para no mandar cartas a ciegas.",
    readTime: "8 min",
    linkedPlans: ["french-semi-ff", "ottoman-jan-rush"],
    sections: [
      {
        title: "Senales de rush",
        body: "No esperes a ver unidades en tu base para aceptar que viene presion.",
        bullets: ["Forward villager", "Barracks temprano", "Madera invertida en produccion", "Explorer agresivo"],
      },
      {
        title: "Senales de greed",
        body: "Si el rival invierte en eco, tu shipment debe castigar, igualar o acelerar.",
        bullets: ["Trade post temprano", "Segundo TC", "Envio economico visible", "Base sin produccion militar"],
      },
    ],
    drills: ["Haz una partida sin mirar tu base durante 10 segundos tras age up: solo scout.", "Clasifica al rival como rush/standard/greed antes de tu segundo envio."],
    reviewStatus: "needs-review",
  },
  {
    id: "tesoros-xp-y-trade-route",
    title: "Tesoros, XP y trade route",
    category: "Mapas",
    level: "Start",
    summary: "Por que AoE3 no empieza solo en tus crates: el mapa acelera shipments y define plan.",
    readTime: "7 min",
    linkedPlans: ["french-semi-ff", "ottoman-jan-rush"],
    sections: [
      {
        title: "XP es tempo",
        body: "Un tesoro de XP puede adelantar un envio; un trade post puede convertir un deck lento en activo.",
        bullets: ["XP temprana acelera primer power spike.", "TP libre favorece planes de control.", "Tesoros de comida limpian age up."],
      },
      {
        title: "No todo tesoro vale pelearlo",
        body: "Perder explorer por un tesoro pequeno puede retrasar mas que el recurso que ganaste.",
        bullets: ["Prioriza seguridad", "Mira guardianes", "Valora distancia real a tu ruta"],
      },
    ],
    drills: ["Antes de minuto 2 marca los 2 tesoros que mas cambian tu build.", "Juega un plan con TP y otro sin TP para comparar shipments."],
    reviewStatus: "needs-review",
  },
  {
    id: "anti-rush-basico",
    title: "Anti-rush basico",
    category: "Fundamentos",
    level: "Start",
    summary: "Como no morir por greed: leer presion, cerrar base y cambiar shipment.",
    readTime: "6 min",
    linkedPlans: ["french-semi-ff", "british-manor-boom"],
    sections: [
      {
        title: "Primero sobrevivir",
        body: "Un plan economico solo es bueno si no entrega aldeanos gratis.",
        bullets: ["Pelea cerca de TC", "No persigas de mas", "Cambia shipment antes de que el dano ocurra"],
      },
      {
        title: "Defensa activa",
        body: "Defender no significa esperar: significa comprar tiempo hasta tu spike.",
        bullets: ["Minimiza idle time", "Protege recursos externos", "Busca trade favorable, no hero plays"],
      },
    ],
    drills: ["Contra IA o sparring, practica cancelar greed al ver forward.", "Revisa si tu primer unit batch salio antes del ataque."],
    reviewStatus: "reference-ready",
  },
  {
    id: "team-y-treaty-no-son-supremacy",
    title: "Team y Treaty no son Supremacy",
    category: "Modos",
    level: "Advanced",
    summary: "Separar modos evita guias falsas: cambia deck, tempo, economia y condicion de victoria.",
    readTime: "5 min",
    linkedPlans: [],
    sections: [
      {
        title: "Team Games",
        body: "El valor de cartas de equipo, roles y timing coordinado cambia el deck.",
        bullets: ["Cartas team ganan valor", "Roles de flanco/bolsillo importan", "Timing compartido supera build individual"],
      },
      {
        title: "Treaty",
        body: "Treaty premia economia maxima, upgrades y composicion final, no openings 1v1.",
        bullets: ["No mezclar decks de Supremacy", "Separar eco boom de composicion final", "Revisar reglas y tiempo de treaty"],
      },
    ],
    drills: ["Etiqueta cada deck por modo antes de usarlo.", "No publiques guia Treaty sin benchmarks especificos de Treaty."],
    reviewStatus: "source-backlog",
  },
];

export const matchAnalyses: MatchAnalysis[] = [
  {
    id: "french-semi-ff-vs-rush-review",
    title: "French Semi-FF vs rush colonial",
    map: "Mapa abierto estandar",
    playerCiv: "French",
    enemyCiv: "Rush colonial",
    result: "Training",
    duration: "12:40",
    planId: "french-semi-ff",
    thesis: "La partida se gana si el jugador acepta el rush antes del segundo envio economico.",
    keyMistake: "4 CDB a ciegas cuando el scout ya habia visto produccion temprana.",
    turningPoint: "Minuto 6:30: se elige greed en vez de shipment defensivo.",
    moments: [
      { time: "2:20", label: "Scouting", event: "Se ve barracks temprano rival.", verdict: "warning", lesson: "Marca rama anti-rush inmediatamente." },
      { time: "4:35", label: "Age II", event: "700 Wood llega y se construye stable tarde.", verdict: "warning", lesson: "Wood debe convertirse en infraestructura al instante." },
      { time: "6:30", label: "Segundo envio", event: "4 CDB en vez de units/defensa.", verdict: "critical", lesson: "El envio economico no paga si pierdes idle time y aldeanos." },
      { time: "8:10", label: "Defensa", event: "Pelea cerca de TC y estabiliza.", verdict: "good", lesson: "La posicion compensa parte del error de shipment." },
    ],
    corrections: ["Si ves barracks temprano, prepara batch defensivo antes de 6:00.", "No pidas 700 Coin hasta tener mapa o defensa.", "Usa CDB para tanquear solo si salvas masa critica."],
    practice: ["Repetir opening 5 veces cambiando segundo envio segun scouting.", "Pausar replay al 5:30 y decidir: eco, defensa o coin."],
    reviewStatus: "needs-review",
  },
  {
    id: "british-manor-boom-contained",
    title: "British Manor Boom contenido",
    map: "Mapa defensible",
    playerCiv: "British",
    enemyCiv: "Standard colonial",
    result: "Training",
    duration: "15:20",
    planId: "british-manor-boom",
    thesis: "El boom funciona, pero solo si la masa militar llega antes de que el rival tome todo el mapa.",
    keyMistake: "Demasiadas manors antes de asegurar Longbow/Musketeer.",
    turningPoint: "Minuto 7:45: eco superior, pero sin presencia para negar recursos externos.",
    moments: [
      { time: "0:40", label: "Crates", event: "Manors iniciales sin housed.", verdict: "good", lesson: "Buen arranque mecanico." },
      { time: "4:50", label: "Colonial", event: "Virginia Company con scout incompleto.", verdict: "warning", lesson: "Greed aceptable solo si has confirmado que no viene all-in." },
      { time: "7:45", label: "Mapa", event: "El rival toma recursos externos gratis.", verdict: "critical", lesson: "Eco sin mapa se convierte en defensa permanente." },
      { time: "10:30", label: "Timing", event: "Primera masa sale tarde pero compacta.", verdict: "warning", lesson: "La masa debe tener objetivo: contener, defender o avanzar." },
    ],
    corrections: ["Despues de 6 Longbow, define si contienes o te cierras.", "No hagas manors si te falta produccion militar basica.", "Usa casas como vision y defensa, no solo eco."],
    practice: ["Jugar 3 partidas con limite: no mas de X manors antes de primer batch.", "Revisar idle de barracks/stable entre 5:00 y 9:00."],
    reviewStatus: "needs-review",
  },
  {
    id: "ottoman-rush-transition",
    title: "Ottoman Jan rush que transiciona",
    map: "Mapa abierto",
    playerCiv: "Ottomans",
    enemyCiv: "Boom greedy",
    result: "Training",
    duration: "13:10",
    planId: "ottoman-jan-rush",
    thesis: "El rush no necesita matar: basta forzar idle y convertirlo en Fortress antes de estrellarse.",
    keyMistake: "Seguir atacando TC cuando el dano real ya estaba hecho.",
    turningPoint: "Minuto 7:10: buena ventana para 700 Coin y transicion.",
    moments: [
      { time: "4:40", label: "Primer contacto", event: "Jans fuerzan idle en caza externa.", verdict: "good", lesson: "Atacar recursos gana mas que pegar al TC." },
      { time: "5:50", label: "Refuerzo", event: "3 Hussars encuentran aldeanos moviendose.", verdict: "good", lesson: "Movilidad convierte presion frontal en mapa." },
      { time: "7:10", label: "Decision", event: "El rival ya tiene defensa cerrada.", verdict: "warning", lesson: "Toca transicionar, no repetir el mismo golpe." },
      { time: "8:30", label: "Error", event: "Jans mueren bajo defensa.", verdict: "critical", lesson: "Perder masa borra el idle time que habias ganado." },
    ],
    corrections: ["Si el rival cierra, toma mapa y pide 700 Coin.", "No ataques TC salvo que tengas siege/timing real.", "Guarda Jans vivos para proteger Fortress."],
    practice: ["En replay, marca el primer minuto donde el rush deja de hacer dano.", "Practica retirada limpia tras forzar idle."],
    reviewStatus: "needs-review",
  },
  {
    id: "postgame-template-eight-minute",
    title: "Plantilla minuto 8 para revisar cualquier partida",
    map: "Cualquier mapa",
    playerCiv: "Cualquier civ",
    enemyCiv: "Cualquier rival",
    result: "Training",
    duration: "8:00 checkpoint",
    planId: "french-semi-ff",
    thesis: "Si al minuto 8 no sabes si estas ganando por eco, mapa, army o tech, no estabas ejecutando un plan.",
    keyMistake: "No medir benchmarks: age time, shipments, unidades y recursos flotados.",
    turningPoint: "Minuto 8 como radiografia.",
    moments: [
      { time: "4:30", label: "Age II", event: "Compara edad real contra benchmark del plan.", verdict: "warning", lesson: "Edad tarde exige compensacion: dano, eco o mapa." },
      { time: "6:00", label: "Segundo envio", event: "Comprueba si respondio al scouting.", verdict: "warning", lesson: "Shipment automatico = partida sin lectura." },
      { time: "8:00", label: "Estado", event: "Cuenta army, recursos flotados y siguiente objetivo.", verdict: "critical", lesson: "Sin objetivo, la macro se dispersa." },
    ],
    corrections: ["Registrar age II/III.", "Registrar primer y segundo envio.", "Escribir una frase: mi condicion de victoria es..."],
    practice: ["Usar `/analyzer` tras cada ranked.", "Guardar 3 partidas y comparar si se repite el mismo error."],
    reviewStatus: "reference-ready",
  },
];

export const roadmapPillars = [
  { label: "Decks como decisiones", icon: WalletCards },
  { label: "Shipments con ramas", icon: TrendingUp },
  { label: "Benchmarks practicables", icon: Timer },
  { label: "Mapas y natives importan", icon: Map },
  { label: "Modos separados", icon: Users },
  { label: "Fuentes visibles", icon: BookOpen },
];

export const iconMap = {
  Rush: Flame,
  "Semi-FF": Landmark,
  Boom: Anchor,
  Timing: Swords,
  Control: Shield,
  warning: BadgeAlert,
} satisfies Record<string, LucideIcon>;

export function getCivilization(idOrName: string) {
  const key = idOrName.toLowerCase();
  return civilizations.find((civ) => civ.id === key || civ.name.toLowerCase() === key);
}

export function getPlan(id: string) {
  return plans.find((plan) => plan.id === id);
}

export function getDeck(id: string) {
  return decks.find((deck) => deck.id === id);
}

export function getOpening(id: string) {
  return openings.find((opening) => opening.id === id);
}

export function getCardsForCiv(civ: string) {
  return cards.filter((card) => card.civ === civ);
}

export function getPlanBundle(id: string) {
  const plan = getPlan(id);
  if (!plan) return null;
  const civ = getCivilization(plan.civ);
  const deck = getDeck(plan.deckId);
  const opening = getOpening(plan.openingId);
  return plan && civ && deck && opening ? { plan, civ, deck, opening } : null;
}

export function getGuide(id: string) {
  return guides.find((guide) => guide.id === id);
}

export function getMatchAnalysis(id: string) {
  return matchAnalyses.find((analysis) => analysis.id === id);
}
