export type AcademyTrack = {
  id: string;
  title: string;
  promise: string;
  outcome: string;
  currentGap: string;
  firstShips: string[];
  qualityGate: string;
  ownerSurface: string;
};

export type QualityGate = {
  id: string;
  label: string;
  rule: string;
  proof: string;
};

export type ExecutionCadence = {
  rhythm: string;
  action: string;
  expectedArtifact: string;
};

export const academyOperatingGoal = {
  title: "Academia AoE3 100/10",
  thesis:
    "Convertir la academia en el lugar donde un jugador no solo encuentra informacion, sino que mejora: entiende su civ, prepara su deck, practica un opening, analiza un replay y recibe el siguiente drill con fuentes trazables.",
  horizon:
    "Un producto que pueda trabajar durante dias en ciclos de datos, contenido, herramientas, arte, QA y deployment sin perder el criterio editorial.",
  successDefinition:
    "Cada decision importante de AoE3 debe poder responderse con una ruta: aprender, practicar, jugar, importar replay, diagnosticar, citar fuente y actualizar cuando cambie el patch.",
  nonNegotiables: [
    "Nada de stats inventadas: si no hay fuente, queda como seed/editorial o bloqueo.",
    "Cada guia debe terminar en un drill, no en teoria muerta.",
    "Cada herramienta debe explicar que decision cambia dentro de una partida real.",
    "Cada dato sensible a patch debe tener fuente, fecha o review status.",
    "La app debe sentirse como una academia de alto rendimiento, no como una wiki decorada.",
  ],
};

export const academyTracks: AcademyTrack[] = [
  {
    id: "data-core",
    title: "Knowledge Core canonico",
    promise: "Unificar civs, cartas, decks, openings, mapas, matchups, replays y fuentes en contratos tipados.",
    outcome: "La IA, las paginas y las tools leen la misma verdad.",
    currentGap: "Faltan unidades, politicians, upgrades y mas cartas validadas por fuente.",
    firstShips: ["Unit compendium v0", "Politician matrix", "Card source audit"],
    qualityGate: "Toda ficha nueva entra con sourceId, patch-risk y confidence.",
    ownerSurface: "/knowledge",
  },
  {
    id: "replay-intelligence",
    title: "Replay intelligence",
    promise: "Pasar de upload/import a diagnostico real: shipments, age-ups, deck, mapa, turning point y drill.",
    outcome: "El jugador entiende por que perdio y que practicar manana.",
    currentGap: "Parser externo no esta conectado como adapter estable y algunas metricas siguen bloqueadas.",
    firstShips: ["Parser adapter contract", "20 replay fixtures", "Replay to drill pipeline"],
    qualityGate: "Cada insight de replay debe enlazar al campo detectado o declararse manual.",
    ownerSurface: "/replay-lab",
  },
  {
    id: "training-loop",
    title: "Training loop",
    promise: "Convertir conocimiento en practica diaria: timer, shipments, errores, mastery y plan semanal.",
    outcome: "La app prescribe el siguiente ejercicio segun debilidad.",
    currentGap: "Falta persistencia de progreso y mas escenarios por civ/matchup.",
    firstShips: ["100 shipment scenarios", "Hotkey trainer", "Progress storage"],
    qualityGate: "Cada drill tiene objetivo, benchmark y criterio de reset.",
    ownerSurface: "/career",
  },
  {
    id: "matchup-engine",
    title: "Matchup engine",
    promise: "Mi civ + rival + mapa + modo produce plan, primer peligro, deck y desviacion segura.",
    outcome: "Preparacion ranked antes de entrar a cola.",
    currentGap: "Faltan 110 briefs y datos de meta con sample size real.",
    firstShips: ["5 matchups por civ", "Map modifier layer", "BO3/BO5 veto helper"],
    qualityGate: "Cada recomendacion debe decir contra que pierde.",
    ownerSurface: "/matchup-scout",
  },
  {
    id: "source-ingestion",
    title: "Source ingestion",
    promise: "Transformar foros, wikis, Reddit, YouTube, Twitch y tools en backlog accionable.",
    outcome: "La academia sabe que mirar, que extraer, que validar y que publicar.",
    currentGap: "La cola existe, pero falta extractor editorial repetible.",
    firstShips: ["Video template extractor", "Forum guide extractor", "Patch delta extractor"],
    qualityGate: "Cada fuente capturada genera tesis, patch-risk, payload esperado y destino.",
    ownerSurface: "/source-queue",
  },
  {
    id: "ai-coach",
    title: "AI coach con guardrails",
    promise: "Un coach que contesta solo con corpus interno, tools y citas, y reconoce cuando no sabe.",
    outcome: "Chat util para entrenar sin alucinar stats o builds.",
    currentGap: "Falta function layer completa para player scout, replay tool y deck/card/map lookup.",
    firstShips: ["Tool router", "Citation enforcement", "Coach memory local"],
    qualityGate: "Toda respuesta factual debe citar una entidad interna o pedir fuente.",
    ownerSurface: "/ai-coach",
  },
  {
    id: "visual-identity",
    title: "Arte y assets propios",
    promise: "Pasar de placeholders a una direccion visual reconocible: atlas, escenas, civ crests y UI de guerra academica.",
    outcome: "La app se recuerda por su look, no solo por sus datos.",
    currentGap: "Hay pack SVG seed, falta raster premium y pipeline Nano Banana 2.",
    firstShips: ["Hero scenes", "Civ portrait pack", "Card frame system"],
    qualityGate: "Asset propio, licencia clara, prompt archivado y fallback responsive.",
    ownerSurface: "/art-lab",
  },
  {
    id: "competitive-content",
    title: "Contenido competitivo",
    promise: "Guias por civ, planes por arquetipo, analisis de partidas y rutas desde AoE2/AoE4.",
    outcome: "Un jugador puede aprender una civ desde cero hasta ranked prep.",
    currentGap: "Las guias base existen, pero falta cobertura completa de 22 civs.",
    firstShips: ["22 civ guides", "66 plans", "Replay analysis library"],
    qualityGate: "Cada guia incluye deck, opening, scouting, errores y drill.",
    ownerSurface: "/guides",
  },
  {
    id: "stats-integrations",
    title: "Stats e integraciones",
    promise: "Conectar meta, ladder, player history, mapas y replays sin depender de claims manuales.",
    outcome: "La academia distingue opinion, sample pequeno y dato vivo.",
    currentGap: "AOE3 Explorer y parsers estan en investigacion/adaptador.",
    firstShips: ["Explorer adapter spike", "Stat freshness badges", "Player profile scout"],
    qualityGate: "Cada numero visible muestra fuente, fecha y sample si aplica.",
    ownerSurface: "/stats",
  },
  {
    id: "qa-release",
    title: "QA, deployment y continuidad",
    promise: "Cada ciclo termina con typecheck, tests, build, screenshots y resumen de riesgo.",
    outcome: "El proyecto puede crecer durante dias sin degradarse.",
    currentGap: "Falta suite visual amplia y presupuesto de regresion por rutas criticas.",
    firstShips: ["Playwright route audit", "Mobile nav audit", "Release checklist"],
    qualityGate: "No se marca 100/10 sin evidencia de build y navegacion.",
    ownerSurface: "/roadmap",
  },
];

export const academyQualityGates: QualityGate[] = [
  {
    id: "source-first",
    label: "Fuente antes que autoridad",
    rule: "Stats, patches, parser claims y builds sensibles a meta deben tener sourceId o confidence bajo.",
    proof: "source provenance, trust badge o bloqueo explicito.",
  },
  {
    id: "tool-first",
    label: "Herramienta antes que articulo",
    rule: "Cada pieza editorial importante debe alimentar al menos una tool o drill.",
    proof: "link a timer, checker, matchup scout, replay lab o career route.",
  },
  {
    id: "replay-loop",
    label: "Replay cierra el aprendizaje",
    rule: "Toda ruta de entrenamiento debe terminar en analisis post-game o fixture manual.",
    proof: "analysis id, replay sample o plantilla de import.",
  },
  {
    id: "patch-aware",
    label: "Patch-aware",
    rule: "Contenido competitivo tiene fecha, patch target o reviewStatus.",
    proof: "patch tracker y source queue enlazados.",
  },
  {
    id: "visual-proof",
    label: "Visual proof",
    rule: "Nuevas pantallas importantes se verifican en desktop y mobile.",
    proof: "captura Playwright, build log o QA report.",
  },
];

export const academyExecutionCadence: ExecutionCadence[] = [
  {
    rhythm: "Cada 12 horas",
    action: "Elegir un slice P0/P1 que reduzca deuda real del roadmap.",
    expectedArtifact: "Commit pequeno o informe con bloqueo concreto.",
  },
  {
    rhythm: "Cada dia",
    action: "Convertir una fuente externa en dato interno, guia o fixture.",
    expectedArtifact: "source queue actualizada y provenance asociado.",
  },
  {
    rhythm: "Cada 2 dias",
    action: "Ampliar una herramienta con escenarios, validacion o UX.",
    expectedArtifact: "ruta navegable y test/build ejecutado.",
  },
  {
    rhythm: "Cada semana",
    action: "Revisar patch-risk, rutas rotas, cobertura de civs y capturas.",
    expectedArtifact: "QA report y release notes.",
  },
];

