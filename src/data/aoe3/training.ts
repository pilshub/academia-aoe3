import { aoe3Cards } from "./cards";
import { aoe3Civilizations } from "./civs";
import { aoe3Decks, aoe3Openings, aoe3Plans } from "./decks";
import { aoe3Maps } from "./maps";
import { contentCitations, provenanceSources } from "./sourceProvenance";

export type TrainingLevel = "Start" | "Intermediate" | "Advanced";
export type TrainingGoalId = "aoe2-returner" | "ranked-1v1" | "replay-review" | "team-treaty";
export type TrustLevelId = "canonical" | "source-backed" | "fixture-backed" | "editorial-seed" | "blocked";

export type CareerTrack = {
  id: TrainingGoalId;
  label: string;
  promise: string;
  targetPlayer: string;
  focus: string[];
  firstRoutes: string[];
  weeklyPlan: Array<{
    day: string;
    drill: string;
    toolHref: string;
    metric: string;
  }>;
  sourceIds: string[];
};

export type MasteryStage = {
  level: number;
  title: string;
  unlock: string;
  drill: string;
  evidenceRule: string;
  route: string;
};

export type OpeningPracticeProfile = {
  openingId: string;
  planId: string;
  target: string;
  passRule: string;
  resetRule: string;
  scoreWeights: string[];
};

export type ReplayCoachTemplate = {
  id: string;
  title: string;
  thesis: string;
  inputFields: string[];
  checks: Array<{
    label: string;
    good: string;
    warning: string;
  }>;
  output: {
    summary: string;
    corrections: string[];
    drill: string;
    sourceIds: string[];
  };
};

export type ErrorLibraryItem = {
  id: string;
  category: "Eco" | "Scouting" | "Deck" | "Shipments" | "Army" | "Map" | "Mindset";
  symptom: string;
  diagnosis: string;
  fix: string;
  drill: string;
  routes: string[];
  confidence: TrustLevelId;
};

export type TrustLevel = {
  id: TrustLevelId;
  label: string;
  use: string;
  publishRule: string;
  badgeClass: string;
};

export type CoachTool = {
  id: string;
  label: string;
  input: string;
  output: string;
  allowedSources: string[];
  guardrail: string;
  href: string;
};

export type AssetBrief = {
  id: string;
  family: "civ" | "tool" | "map" | "card" | "coach";
  title: string;
  prompt: string;
  placement: string;
  status: "ready" | "in-app" | "generate-next";
};

export const careerTracks: CareerTrack[] = [
  {
    id: "aoe2-returner",
    label: "Vengo de AoE2",
    promise: "Traducir macro, counters y timing a Home City, shipments, tesoros y politicians.",
    targetPlayer: "Jugador que ya entiende RTS pero no entiende por que AoE3 castiga tanto el deck inicial.",
    focus: ["Deck antes de partida", "Primer shipment", "Scouting de produccion", "No sobregreed"],
    firstRoutes: ["/guides/empezar-aoe3-desde-aoe2", "/opening-timer", "/shipments", "/errors"],
    weeklyPlan: [
      { day: "Dia 1", drill: "British safe boom 3 repeticiones sin housed.", toolHref: "/opening-timer", metric: "Age II antes de 4:50 y sin bloqueo de poblacion." },
      { day: "Dia 2", drill: "Shipment trainer: respuestas anti-rush.", toolHref: "/shipments", metric: "3 decisiones correctas seguidas." },
      { day: "Dia 3", drill: "Replay coach manual de una derrota.", toolHref: "/replay-coach", metric: "Identificar minuto de perdida y un drill." },
      { day: "Dia 4", drill: "Matchup scout antes de jugar ranked.", toolHref: "/matchup-scout", metric: "Plan + peligro + scouting escritos antes de minuto 0." },
    ],
    sourceIds: ["academy-seed", "esoc-wiki", "aoe3-explorer"],
  },
  {
    id: "ranked-1v1",
    label: "Ranked 1v1",
    promise: "Preparar una civ main con opening repetible, deck sano y plan de matchup.",
    targetPlayer: "Jugador que quiere subir ladder sin cambiar de civ cada derrota.",
    focus: ["Civ mastery", "Opening timer", "Deck audit", "Replay review"],
    firstRoutes: ["/career", "/civ-mastery", "/deck-builder", "/replay-coach"],
    weeklyPlan: [
      { day: "Sesion A", drill: "5 openings seguidos con el mismo plan.", toolHref: "/opening-timer", metric: "80+ en timer y age-up dentro de ventana." },
      { day: "Sesion B", drill: "3 matchups scouts antes de cola.", toolHref: "/matchup-scout", metric: "No jugar sin primer peligro identificado." },
      { day: "Sesion C", drill: "2 derrotas convertidas en errores.", toolHref: "/errors", metric: "Cada derrota termina en una correccion." },
      { day: "Sesion D", drill: "Deck limpio contra rush y greed.", toolHref: "/deck-builder", metric: "Grade A/B y sin core faltante." },
    ],
    sourceIds: ["aoe3-explorer", "esoc-strategy", "esoc-recorded-games"],
  },
  {
    id: "replay-review",
    label: "Analizar partidas",
    promise: "Convertir replay o texto de parser en timeline, diagnostico y practica repetible.",
    targetPlayer: "Jugador que ya juega y necesita saber que error se repite.",
    focus: ["Replay fixtures", "Timeline", "Turning point", "Drill posterior"],
    firstRoutes: ["/parser-solution", "/replay-import", "/replay-coach", "/analysis"],
    weeklyPlan: [
      { day: "Replay 1", drill: "Normalizar timeline y detectar shipments.", toolHref: "/replay-import", metric: "Mapa, civs, age-ups y 3 shipments detectados." },
      { day: "Replay 2", drill: "Marcar minuto de perdida.", toolHref: "/replay-coach", metric: "Una causa principal, no diez sospechas." },
      { day: "Replay 3", drill: "Repetir opening corregido.", toolHref: "/opening-timer", metric: "La correccion aparece antes de volver a ranked." },
      { day: "Replay 4", drill: "Guardar analisis canonical solo con fuente.", toolHref: "/trust", metric: "Fuente, patch y confianza visibles." },
    ],
    sourceIds: ["horse-feed-python-parser", "freefoodparty-replayparser", "aoe3-explorer"],
  },
  {
    id: "team-treaty",
    label: "Team / Treaty",
    promise: "Separar roles y no contaminar 1v1 con logica de team o treaty.",
    targetPlayer: "Jugador que juega con amigos o treaty y necesita deck/rol distinto.",
    focus: ["Rol de equipo", "Deck separado", "Timing de boom", "Proteccion de flanco"],
    firstRoutes: ["/stats", "/deck-builder", "/maps", "/roadmap"],
    weeklyPlan: [
      { day: "Team 1", drill: "Elegir rol antes del deck.", toolHref: "/deck-builder", metric: "Rush/boom/support definido antes de seleccionar cartas." },
      { day: "Team 2", drill: "Mapa y natives por equipo.", toolHref: "/maps", metric: "Ruta de TP/agua/natives marcada." },
      { day: "Treaty 1", drill: "No usar deck 1v1 como treaty.", toolHref: "/trust", metric: "Modo visible en cada dato." },
      { day: "Review", drill: "Anotar si la derrota fue rol, eco o timing.", toolHref: "/errors", metric: "Error clasificado en una categoria." },
    ],
    sourceIds: ["aoe3-explorer", "official-forums", "academy-seed"],
  },
];

export const openingPracticeProfiles: OpeningPracticeProfile[] = aoe3Openings.map((opening) => ({
  openingId: opening.id,
  planId: opening.planId,
  target: opening.benchmark,
  passRule: "80+ puntos, ningun paso bloqueado y scouting registrado antes de la decision principal.",
  resetRule: "Si te housed, pierdes explorer o mandas greed bajo all-in, reinicia la repeticion.",
  scoreWeights: ["Paso hecho a tiempo = +20", "Tarde = +8", "Bloqueado = 0", "Scouting clave completado = +10"],
}));

export const replayCoachTemplates: ReplayCoachTemplate[] = [
  {
    id: "semi-ff-loss",
    title: "Semi-FF que muere a presion",
    thesis: "El replay no se juzga por llegar a Fortress, sino por si viste el all-in antes de pedir coin.",
    inputFields: ["Age II", "Age III", "Shipments propios", "Primer shipment rival", "Scouting visto"],
    checks: [
      { label: "Age II", good: "4:20-4:55 segun civ y crates.", warning: "Por encima de 5:10 suele ocultar macro rota o tesoros malos." },
      { label: "Coin a Fortress", good: "Se pide con defensa o mapa estable.", warning: "700 coin bajo forward/rush suele ser greed fatal." },
      { label: "Scouting", good: "Rax/stable/forward vistos antes de segundo shipment colonial.", warning: "Si no viste produccion, la decision de shipment fue a ciegas." },
    ],
    output: {
      summary: "Prioridad del coach: separar macro mala de mala lectura. Una derrota puede tener ambos, pero el drill debe atacar solo el primer fallo.",
      corrections: ["Escribe el primer dato de scouting antes de minuto 4:30.", "Cambia shipment eco por defensa si ves forward.", "No avances a III sin anti-cav o masa minima."],
      drill: "Repite el opening hasta hacer la decision 6:30 con scouting escrito.",
      sourceIds: ["horse-feed-python-parser", "aoe3-explorer", "academy-seed"],
    },
  },
  {
    id: "boom-no-timing",
    title: "Boom que no se convierte en dano",
    thesis: "La eco solo cuenta si compra mapa, masa o edad. Si solo sube el score, el rival decide la partida.",
    inputFields: ["Poblacion bloqueada", "Minuto primera masa", "Manors/bancos/torps", "Mapa perdido", "Transicion"],
    checks: [
      { label: "Greed", good: "La inversion eco viene con defensa minima.", warning: "Mas de una carta greed sin vision convierte el boom en apuesta." },
      { label: "Masa", good: "Primer grupo militar antes de que el rival toque eco externa.", warning: "Si produces tarde, cada edificio eco es deuda defensiva." },
      { label: "Mapa", good: "TP, hunts o minas controladas.", warning: "Boom encerrado sin mapa necesita timing claro o pierde por recursos." },
    ],
    output: {
      summary: "El coach busca el primer minuto en que la eco dejo de producir seguridad.",
      corrections: ["Marca un timing de salida antes de empezar.", "No anadas greed si el rival ya mostro unidad militar.", "Convierte 700 wood en produccion, no solo casas."],
      drill: "Juega 3 repeticiones con limite: primer batch militar antes de minuto 6:15.",
      sourceIds: ["esoc-strategy", "aoe3-explorer", "academy-seed"],
    },
  },
];

export const errorLibrary: ErrorLibraryItem[] = [
  {
    id: "greed-under-rush",
    category: "Shipments",
    symptom: "Mando eco aunque el rival ya enseno presion.",
    diagnosis: "El deck tiene respuestas, pero la decision llega por inercia de build order.",
    fix: "Crear regla: si veo forward, stable temprana o shipment militar, el siguiente envio compra supervivencia.",
    drill: "Shipment trainer hasta acertar 3 escenarios anti-rush seguidos.",
    routes: ["/shipments", "/replay-coach", "/deck-builder"],
    confidence: "editorial-seed",
  },
  {
    id: "late-age-up",
    category: "Eco",
    symptom: "Age II o Age III llega tarde sin que haya pelea real.",
    diagnosis: "Crates, aldeanos o macro de food/coin estan desordenados.",
    fix: "Practicar opening con timer y reset obligatorio si el age-up se va de ventana.",
    drill: "5 repeticiones del mismo opening con nota de desviacion.",
    routes: ["/opening-timer", "/civ-mastery"],
    confidence: "editorial-seed",
  },
  {
    id: "blind-deck",
    category: "Deck",
    symptom: "El deck no tiene respuesta al plan que necesito jugar.",
    diagnosis: "Se mezclan cartas de boom, team o late game sin core del plan.",
    fix: "Auditar core/flex/trap por plan y quitar la carta que solo parece buena si nadie te molesta.",
    drill: "Deck builder: dejar grade A/B contra el plan elegido.",
    routes: ["/deck-builder", "/deck-checker"],
    confidence: "source-backed",
  },
  {
    id: "no-scout-before-choice",
    category: "Scouting",
    symptom: "El segundo shipment se decide sin saber que produce el rival.",
    diagnosis: "El explorer busca tesoros pero no informacion.",
    fix: "Antes de 4:30, mirar forward, edificio militar, TP y minas expuestas.",
    drill: "En cada partida escribir un dato de scouting antes del segundo envio.",
    routes: ["/matchup-scout", "/opening-timer"],
    confidence: "editorial-seed",
  },
  {
    id: "army-without-role",
    category: "Army",
    symptom: "Tengo unidades, pero no se si debo defender, raidear o cerrar.",
    diagnosis: "La composicion se produce por costumbre, no por win condition.",
    fix: "Asignar rol a la masa: comprar tiempo, negar mapa, matar eco, proteger Fortress o romper base.",
    drill: "Despues de cada batch, decir en voz alta su funcion antes de mover.",
    routes: ["/matchup-scout", "/errors"],
    confidence: "editorial-seed",
  },
  {
    id: "map-ignored",
    category: "Map",
    symptom: "Juego el mismo plan en mapa abierto, trade route y agua.",
    diagnosis: "El opening no responde a recursos externos ni rutas de raid.",
    fix: "Elegir plan con mapa: trade route, agua, natives, tesoros y minas seguras.",
    drill: "Antes de cola, abrir Map helper y marcar dos riesgos.",
    routes: ["/maps", "/matchup-scout"],
    confidence: "source-backed",
  },
  {
    id: "tilt-switch-civ",
    category: "Mindset",
    symptom: "Cambio de civ o deck tras cada derrota.",
    diagnosis: "El aprendizaje se rompe antes de acumular repeticiones comparables.",
    fix: "Mantener civ main una semana y cambiar solo un parametro por sesion.",
    drill: "Modo Carrera: 4 sesiones con la misma civ y un unico objetivo.",
    routes: ["/career", "/civ-mastery"],
    confidence: "editorial-seed",
  },
];

export const trustLevels: TrustLevel[] = [
  {
    id: "canonical",
    label: "Canonical",
    use: "Dato listo para guia principal.",
    publishRule: "Fuente, patch, fecha, sample y revision visibles.",
    badgeClass: "trust-canonical",
  },
  {
    id: "fixture-backed",
    label: "Fixture replay",
    use: "Analisis derivado de replay parseado.",
    publishRule: "Guardar raw replay, output parser y validacion.",
    badgeClass: "trust-fixture-backed",
  },
  {
    id: "source-backed",
    label: "Fuente viva",
    use: "Dato apoyado por web, wiki, parser o herramienta comunitaria.",
    publishRule: "Citar URL, fecha de revision y alcance.",
    badgeClass: "trust-source-backed",
  },
  {
    id: "editorial-seed",
    label: "Seed editorial",
    use: "Hipotesis util para entrenar, pendiente de validar.",
    publishRule: "Mostrar como needs-review y no como meta actual.",
    badgeClass: "trust-editorial-seed",
  },
  {
    id: "blocked",
    label: "Bloqueado",
    use: "Campo que no se puede afirmar aun.",
    publishRule: "No publicar cifra ni conclusion hasta tener muestra.",
    badgeClass: "trust-blocked",
  },
];

export const coachTools: CoachTool[] = [
  {
    id: "tool-civ",
    label: "tool:civ",
    input: "civId",
    output: "Identidad, spikes, errores y planes recomendados.",
    allowedSources: ["aoe3Civilizations", "provenanceSources"],
    guardrail: "No inventa build actual si reviewStatus no es canonical.",
    href: "/civ-mastery",
  },
  {
    id: "tool-deck",
    label: "tool:deck",
    input: "cardIds + planId",
    output: "Score, core faltante, greed, defensa y swaps.",
    allowedSources: ["aoe3Cards", "aoe3Decks", "auditSelectedDeck"],
    guardrail: "Las cartas seed muestran reviewStatus y no sustituyen decks pro validados.",
    href: "/deck-builder",
  },
  {
    id: "tool-replay",
    label: "tool:replay",
    input: "NormalizedReplay o formulario coach.",
    output: "Timeline, warnings, turning point y drill.",
    allowedSources: ["horse-feed-python-parser", "replay fixtures", "ReplayImportLab"],
    guardrail: "Sin fixture real, solo diagnostico de baja/mediana confianza.",
    href: "/replay-coach",
  },
  {
    id: "tool-matchup",
    label: "tool:matchup",
    input: "ownCiv + enemyCiv + mapId",
    output: "Plan, peligro, scouting y primer desvio.",
    allowedSources: ["aoe3Plans", "aoe3Maps", "sourceProvenance"],
    guardrail: "Winrates solo aparecen si hay proveedor/sample.",
    href: "/matchup-scout",
  },
];

export const assetBriefs: AssetBrief[] = [
  {
    id: "civ-commanders",
    family: "civ",
    title: "Retratos de comandante por civ",
    prompt: "Editorial strategy academy portrait, historically inspired but not copying official game art, commander silhouette, parchment tactical marks, no logo, no readable text.",
    placement: "/civ-mastery y cards de civ",
    status: "generate-next",
  },
  {
    id: "tool-console",
    family: "tool",
    title: "Paneles de entrenamiento",
    prompt: "AoE3 strategy classroom interface background, wooden table, map fragments, resource tokens, clean space for UI overlay, no text, no official logos.",
    placement: "/career, /opening-timer, /replay-coach",
    status: "ready",
  },
  {
    id: "map-plates",
    family: "map",
    title: "Placas de mapa",
    prompt: "Top-down illustrated colonial strategy map plate, trade route, water edge, native settlement markers, painterly but readable, no labels.",
    placement: "/maps y /matchup-scout",
    status: "ready",
  },
  {
    id: "card-backplates",
    family: "card",
    title: "Backplates de cartas",
    prompt: "Small ornate card frame for strategy training app, brass corners, parchment center, role color variants, no text.",
    placement: "/deck-builder, /cards, /shipments",
    status: "generate-next",
  },
  {
    id: "coach-seals",
    family: "coach",
    title: "Sellos de confianza",
    prompt: "Set of academy trust seals, canonical, fixture, source, seed, blocked as abstract emblems without words, flat game UI style.",
    placement: "/trust y /ai-coach",
    status: "ready",
  },
];

export function getCareerTrack(id: TrainingGoalId) {
  return careerTracks.find((track) => track.id === id) ?? careerTracks[0];
}

export function getOpeningPractice(openingId: string) {
  return openingPracticeProfiles.find((profile) => profile.openingId === openingId) ?? openingPracticeProfiles[0];
}

export function getMasteryStages(civId: string): MasteryStage[] {
  const civ = aoe3Civilizations.find((item) => item.id === civId) ?? aoe3Civilizations[0];
  const firstPlan = aoe3Plans.find((plan) => plan.civId === civ.id) ?? aoe3Plans[0];
  const opening = aoe3Openings.find((item) => item.id === firstPlan.openingId) ?? aoe3Openings[0];
  return [
    {
      level: 1,
      title: "Primer idioma",
      unlock: civ.identity,
      drill: `Leer identidad y jugar ${opening.title} una vez sin mirar otra civ.`,
      evidenceRule: "Seed editorial con fuente de roster; estrategia needs-review.",
      route: "/civs",
    },
    {
      level: 2,
      title: "Opening repetible",
      unlock: opening.benchmark,
      drill: "3 repeticiones en Opening Timer, anotando el primer retraso.",
      evidenceRule: "Benchmark pendiente de fixtures; usar como practica, no como dato canonical.",
      route: "/opening-timer",
    },
    {
      level: 3,
      title: "Deck sano",
      unlock: firstPlan.promise,
      drill: "Auditar deck y quitar al menos una carta trampa/greed si el plan lo exige.",
      evidenceRule: "Deck seed con reviewStatus visible.",
      route: "/deck-builder",
    },
    {
      level: 4,
      title: "Scouting antes de shipment",
      unlock: civ.mistakes[0] ?? "No decidir a ciegas.",
      drill: "Antes de segundo shipment, escribir forward, produccion, TP o mina rival.",
      evidenceRule: "Regla editorial derivada de guias y replay review.",
      route: "/matchup-scout",
    },
    {
      level: 5,
      title: "Replay a correccion",
      unlock: "Cada derrota termina en un drill pequeno.",
      drill: "Usar Replay Coach y convertir el turning point en repeticion de opening.",
      evidenceRule: "Sube a fixture-backed cuando exista replay parseado.",
      route: "/replay-coach",
    },
  ];
}

export function getDefaultDeckCards(civId: string) {
  const deck = aoe3Decks.find((item) => item.civId === civId) ?? aoe3Decks[0];
  return [...deck.coreCardIds, ...deck.flexCardIds];
}

export function buildMatchupScout(ownCivId: string, enemyCivId: string, mapId: string) {
  const ownCiv = aoe3Civilizations.find((civ) => civ.id === ownCivId) ?? aoe3Civilizations[0];
  const enemyCiv = aoe3Civilizations.find((civ) => civ.id === enemyCivId) ?? aoe3Civilizations[1];
  const map = aoe3Maps.find((item) => item.id === mapId) ?? aoe3Maps[0];
  const plan =
    aoe3Plans.find((item) => item.civId === ownCiv.id && map.goodPlanTags.includes(item.archetype)) ??
    aoe3Plans.find((item) => item.civId === ownCiv.id) ??
    aoe3Plans[0];
  const deck = aoe3Decks.find((item) => item.id === plan.deckId) ?? aoe3Decks[0];
  const cards = deck.shipmentOrder.map((id) => aoe3Cards.find((card) => card.id === id)?.name ?? id);
  const enemyFast = /rush|pressure|jan|raid|tempo|presion/i.test(`${enemyCiv.identity} ${enemyCiv.tempo}`);
  const openMap = map.type === "land" || map.type === "trade";
  return {
    ownCiv,
    enemyCiv,
    map,
    plan,
    primaryDanger: enemyFast || openMap ? `Primer peligro: ${enemyCiv.name} puede convertir tempo o mapa abierto en dano antes de tu segundo envio.` : `Primer peligro: ${enemyCiv.name} puede escalar si no lo obligas a ensenar plan.`,
    scoutChecklist: [
      "Edificio militar antes de 4:30.",
      "Forward base o torre agresiva.",
      map.tradeRoute !== "none" ? "Trade route tomada o libre." : "Ruta de raid hacia hunts/minas.",
      map.water !== "none" ? "Dock temprano o agua ignorada." : "Minas externas y hunts seguros.",
    ],
    shipmentAdvice: cards.slice(0, 4),
    dont: [
      ownCiv.mistakes[0] ?? "No decidir por inercia.",
      enemyFast ? "No mandar greed si ves unidad militar temprana." : "No dejar al rival escalar gratis.",
      map.risks[0] ?? "No jugar el mapa como si fuera standard.",
    ],
    confidence: plan.reviewStatus === "canonical" ? "canonical" : "editorial-seed",
  };
}

export function getTrustLevel(id: TrustLevelId) {
  return trustLevels.find((level) => level.id === id) ?? trustLevels[3];
}

export const trainingSummary = {
  tracks: careerTracks.length,
  masteryCivs: aoe3Civilizations.length,
  openings: openingPracticeProfiles.length,
  errors: errorLibrary.length,
  coachTools: coachTools.length,
  trustLevels: trustLevels.length,
  citations: contentCitations.length,
  sources: provenanceSources.length,
};
