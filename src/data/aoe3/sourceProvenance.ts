export type ProvenanceStatus = "verified" | "needs-sample" | "context-only" | "blocked";
export type SourceReliability = "official" | "tool-primary" | "community-primary" | "community-signal" | "internal-seed";

export type ProvenanceFact = {
  id: string;
  claim: string;
  appliesTo: string[];
  useInAcademy: string;
  citationNote: string;
  status: ProvenanceStatus;
};

export type ProvenanceSource = {
  id: string;
  title: string;
  url: string;
  kind: "official" | "tool" | "forum" | "wiki" | "creator" | "internal";
  reliability: SourceReliability;
  lastChecked: string;
  sourceFor: string[];
  facts: ProvenanceFact[];
};

export type ContentCitation = {
  id: string;
  contentType: "roadmap" | "source-queue" | "stats" | "replay-lab" | "art-lab" | "deck" | "opening" | "plan" | "map" | "card" | "guide";
  contentId: string;
  field: string;
  statement: string;
  sourceIds: string[];
  citationPolicy: string;
  status: ProvenanceStatus;
};

export const provenanceSources: ProvenanceSource[] = [
  {
    id: "horse-feed-python-parser",
    title: "horse-feed aoe3replay.py",
    url: "https://gist.github.com/horse-feed/519f63d016ddd5a794fb89438afc30bf",
    kind: "tool",
    reliability: "community-primary",
    lastChecked: "2026-05-18",
    sourceFor: ["local replay parsing", "JSON fixtures", "build orders", "shipments", "age-ups", "action stream"],
    facts: [
      {
        id: "horse-feed-parser-capabilities",
        claim: "El gist declara parsing de .age3Yrec/.age3Ysav, settings, player info, decks, ratings, home city, chat, full action stream, BO, age-up timings, HC shipments, market trades y winner detection.",
        appliesTo: ["parser-solution", "replayFixturePlan", "roadmap100.20", "roadmap100.21", "roadmap100.22"],
        useInAcademy: "Parser local principal para generar fixtures propios sin depender de API web externa.",
        citationNote: "No vendorear codigo por licencia no declarada; descargar a .cache y guardar solo fixtures derivados.",
        status: "verified",
      },
      {
        id: "horse-feed-parser-warning",
        claim: "El post ESOC advierte bugs y ruido por button spam, aunque el build-order related stuff parsea bastante.",
        appliesTo: ["replay confidence", "fixture validation"],
        useInAcademy: "Mantener validacion cruzada con herramientas web antes de canonical.",
        citationNote: "Citar como limitacion de confianza del parser.",
        status: "verified",
      },
    ],
  },
  {
    id: "canyougiant-npm-parser",
    title: "@canyougiant/aoe3de-replay-parser",
    url: "https://www.npmjs.com/package/@canyougiant/aoe3de-replay-parser",
    kind: "tool",
    reliability: "community-primary",
    lastChecked: "2026-05-18",
    sourceFor: ["Age3Yrec format reference", "settings", "players", "initial decks", "chat"],
    facts: [
      {
        id: "canyougiant-parser-readme",
        claim: "El README del paquete npm 1.6.0 marca como hecho version/settings/player infos, initial decks y chat; shipments/techs/buildings/units/winners siguen pendientes.",
        appliesTo: ["parser-solution", "replay adapter fallback"],
        useInAcademy: "Fallback para datos de header/deck y referencia de formato, no extractor principal de shipments.",
        citationNote: "Citar version npm y fecha de revision; no prometer campos marcados pendientes.",
        status: "verified",
      },
    ],
  },
  {
    id: "forgotten-empires-civs",
    title: "Forgotten Empires - AoE III DE Civilizations",
    url: "https://www.forgottenempires.net/age-of-empires-iii-definitive-edition/civilizations",
    kind: "official",
    reliability: "official",
    lastChecked: "2026-05-18",
    sourceFor: ["civilization roster", "base game civs", "DE launch civs"],
    facts: [
      {
        id: "fe-civ-roster",
        claim: "La pagina lista civs de AoE3 DE como Aztecs, French, Indians, Portuguese, United States, British, Germans, Japanese, Russians, Chinese, Haudenosaunee, Lakota, Spanish, Dutch, Inca, Ottomans y Swedes.",
        appliesTo: ["aoe3Civilizations", "civ atlas", "roadmap100.5"],
        useInAcademy: "Fuente primaria para completar el atlas base de civilizaciones no DLC tardio.",
        citationNote: "Citar FE para existencia de civs base/DE launch; usar Steam u official pages para DLC posteriores.",
        status: "verified",
      },
    ],
  },
  {
    id: "steam-complete-history",
    title: "Steam - Age III DE Complete History bundle",
    url: "https://store.steampowered.com/app/933110/Age_of_Empires_III_Definitive_Edition/",
    kind: "official",
    reliability: "official",
    lastChecked: "2026-05-18",
    sourceFor: ["DLC roster", "United States", "Mexico", "African Royals", "Knights of the Mediterranean"],
    facts: [
      {
        id: "steam-dlc-roster",
        claim: "La pagina de Steam lista el bundle Complete History con United States Civilization, Mexico Civilization, The African Royals y Knights of the Mediterranean.",
        appliesTo: ["aoe3Civilizations", "dlc civ atlas", "source provenance"],
        useInAcademy: "Sostiene la existencia de civs DLC y expansions que completan el atlas actual.",
        citationNote: "Para identidad y mechanics de cada civ, buscar pagina oficial especifica o fuente comunitaria adicional.",
        status: "verified",
      },
    ],
  },
  {
    id: "official-african-royals",
    title: "Age of Empires - The African Royals",
    url: "https://www.ageofempires.com/games/aoeiiide/the-african-royals/",
    kind: "official",
    reliability: "official",
    lastChecked: "2026-05-18",
    sourceFor: ["Ethiopians", "Hausa", "African Royals mechanics"],
    facts: [
      {
        id: "official-african-royals-civs",
        claim: "La pagina oficial de The African Royals presenta dos nuevas civilizaciones: Ethiopians y Hausa.",
        appliesTo: ["aoe3Civilizations.ethiopians", "aoe3Civilizations.hausa"],
        useInAcademy: "Fuente oficial para existencia y contexto inicial de civs africanas.",
        citationNote: "Para builds y balance competitivo, complementar con replays/tools/ESOC.",
        status: "verified",
      },
    ],
  },
  {
    id: "official-knights-mediterranean",
    title: "Age of Empires - Knights of the Mediterranean",
    url: "https://www.ageofempires.com/games/aoeiiide/knights-of-the-mediterranean/",
    kind: "official",
    reliability: "official",
    lastChecked: "2026-05-18",
    sourceFor: ["Italy", "Malta", "Tycoon mode", "Historical Maps"],
    facts: [
      {
        id: "official-kotm-civs",
        claim: "La pagina oficial de Knights of the Mediterranean indica la addition de las civilizaciones Italy y Malta.",
        appliesTo: ["aoe3Civilizations.italians", "aoe3Civilizations.maltese"],
        useInAcademy: "Fuente oficial para existencia y contexto inicial de civs mediterraneas.",
        citationNote: "Para strategy actual, complementar con Strategy School, ESOC o replay parser.",
        status: "verified",
      },
    ],
  },
  {
    id: "official-update-13690",
    title: "Age of Empires III: Definitive Edition - Update 13.690",
    url: "https://www.ageofempires.com/news/age_of_empires_iii_de_update_13_690/",
    kind: "official",
    reliability: "official",
    lastChecked: "2026-05-18",
    sourceFor: ["patches", "balance", "maps", "British cards", "official build state"],
    facts: [
      {
        id: "official-update-13690-build",
        claim: "La pagina oficial identifica la update como Build 13.690 y recomienda comprobar ese build en la pantalla de titulo.",
        appliesTo: ["patch labels", "review dates", "freshness badges"],
        useInAcademy: "Usar como fuente primaria cuando un dato dependa de la version de juego.",
        citationNote: "Citar la URL oficial y mencionar fecha de revision interna.",
        status: "verified",
      },
      {
        id: "official-update-13690-highlights",
        claim: "La update destaca cartas nuevas para British, dos mapas nuevos, una unidad nueva y cambios de AI/UI/hotkeys/gameplay.",
        appliesTo: ["sourceQueue.official-update-13690", "roadmap100.31", "stats.patch", "map backlog"],
        useInAcademy: "Alimentar changelog interno, backlog de mapas y revision de cartas britanicas.",
        citationNote: "No usar para builds comunitarias; si afecta balance, citar seccion concreta del patch.",
        status: "verified",
      },
      {
        id: "official-update-13690-maps",
        claim: "La update oficial anuncia Arabia y Congo Basin como mapas nuevos.",
        appliesTo: ["maps", "map helper roadmap", "future map profiles"],
        useInAcademy: "Crear entradas futuras de mapa y marcar como fuente oficial.",
        citationNote: "Citar como fuente oficial de existencia del mapa, no como guia de estrategia.",
        status: "verified",
      },
    ],
  },
  {
    id: "aoe3-explorer",
    title: "AOE3 Explorer Tools",
    url: "https://aoe3explorer.com/tools",
    kind: "tool",
    reliability: "tool-primary",
    lastChecked: "2026-05-18",
    sourceFor: ["leaderboards", "lobbies", "decks", "counter tool", "deck builder", "replay parser", "wiki compendium", "maps", "natives"],
    facts: [
      {
        id: "aoe3-explorer-tool-list",
        claim: "AOE3 Explorer lista leaderboards por modo, live/lobbies, decks, tools, replay parser y wiki/compendium.",
        appliesTo: ["sourceQueue.aoe3explorer-tools", "statsMatrix.meta", "statsMatrix.players", "statsMatrix.maps"],
        useInAcademy: "P0 para enlazar herramientas externas y disenar adapters de stats.",
        citationNote: "Citar como fuente de disponibilidad de herramienta, no como API garantizada hasta probar endpoints.",
        status: "verified",
      },
      {
        id: "aoe3-explorer-replay-parser",
        claim: "La seccion Tools incluye Replay Parser para inspeccionar mapas de replay con timeline playback, trails y combat markers.",
        appliesTo: ["replayPipeline.timeline", "roadmap100.16", "roadmap100.21"],
        useInAcademy: "Fuente candidata para importar timeline de partida y map player.",
        citationNote: "Antes de mostrar datos automáticos, guardar sample de parser y version de output.",
        status: "needs-sample",
      },
      {
        id: "aoe3-explorer-usage-rules",
        claim: "El footer declara uso bajo Microsoft Game Content Usage Rules y que no esta afiliado ni respaldado por Microsoft.",
        appliesTo: ["artPipeline.asset-policy", "resource policy"],
        useInAcademy: "Recordatorio legal para no redistribuir assets sin revisar permisos.",
        citationNote: "Citar como referencia de politica de terceros, no como permiso propio.",
        status: "context-only",
      },
    ],
  },
  {
    id: "freefoodparty-replayparser",
    title: "Free Food Party Replay Parser",
    url: "https://freefoodparty.com/replayparser",
    kind: "tool",
    reliability: "tool-primary",
    lastChecked: "2026-05-18",
    sourceFor: ["player stats", "build orders", "leaderboard", "match history", "win rates", "civilization performance", "replay parser candidate"],
    facts: [
      {
        id: "freefoodparty-route-live",
        claim: "La ruta /replayparser responde HTTP 200 y carga la app de Free Food Party.",
        appliesTo: ["sourceQueue.freefoodparty-replayparser", "replayPipeline.collect"],
        useInAcademy: "Mantener como fuente P0 candidata para import manual o tutorial de replay parser.",
        citationNote: "Citar URL y fecha de comprobacion; la app es client-side, requiere sample manual para campos.",
        status: "needs-sample",
      },
      {
        id: "freefoodparty-meta",
        claim: "La metadata publica describe Free Food Party como sitio de stats, build orders, leaderboard, match history, win rates y rendimiento por civilizacion para AoE3 DE.",
        appliesTo: ["statsMatrix.meta", "statsMatrix.players", "sourceQueue.freefoodparty-replayparser"],
        useInAcademy: "Fuente alternativa/comparativa para stats y perfiles.",
        citationNote: "No citar como dato de replay concreto hasta probar un recorded game.",
        status: "verified",
      },
      {
        id: "freefoodparty-parser-risk",
        claim: "Hay reportes comunitarios de fallos del replay parser con recordings recientes o concretos.",
        appliesTo: ["replayPipeline.confidence", "roadmap100.17"],
        useInAcademy: "Marcar compatibilidad como pendiente y validar con lote de replays.",
        citationNote: "Citar Reddit solo como senal de riesgo, no como verdad tecnica definitiva.",
        status: "needs-sample",
      },
    ],
  },
  {
    id: "esoc-strategy",
    title: "ESOC Strategy",
    url: "https://eso-community.net/viewforum.php?f=983",
    kind: "forum",
    reliability: "community-primary",
    lastChecked: "2026-05-18",
    sourceFor: ["strategy discussion", "build-order backlog", "matchup debate", "community validation"],
    facts: [
      {
        id: "esoc-strategy-board",
        claim: "ESOC mantiene un foro Strategy con cientos de temas y actividad reciente.",
        appliesTo: ["sourceQueue.esoc-strategy", "roadmap100.33", "guide backlog"],
        useInAcademy: "Fuente P0 para validar guias y detectar matchups o openings a revisar.",
        citationNote: "Citar thread concreto cuando una guia derive de un post; la pagina de foro solo justifica el backlog.",
        status: "verified",
      },
      {
        id: "esoc-strategy-examples",
        claim: "La primera pagina muestra temas de matchups, builds, distribucion de aldeanos, counters y discusiones de civ.",
        appliesTo: ["content ingestion", "roadmap100.57", "roadmap100.60", "roadmap100.70"],
        useInAcademy: "Crear cola de extraccion por civ/matchup antes de publicar como canonical.",
        citationNote: "Cada extraccion necesita URL de thread, autor, fecha y patch-risk.",
        status: "verified",
      },
    ],
  },
  {
    id: "esoc-recorded-games",
    title: "ESOC Recorded Games",
    url: "https://eso-community.net/viewforum.php?f=984",
    kind: "forum",
    reliability: "community-primary",
    lastChecked: "2026-05-18",
    sourceFor: ["recorded games", "replay seeds", "VOD candidates", "match analysis"],
    facts: [
      {
        id: "esoc-recorded-board",
        claim: "ESOC mantiene un foro Recorded games y enlaza Recorded Game Search.",
        appliesTo: ["sourceQueue.esoc-recorded-games", "roadmap100.34", "roadmap100.20"],
        useInAcademy: "Fuente P0 para seleccionar replays seed y analisis de partida.",
        citationNote: "Citar post/replay especifico al publicar analisis.",
        status: "verified",
      },
      {
        id: "esoc-recorded-current",
        claim: "La pagina muestra actividad de recorded games en 2026 y temas historicos de alto volumen.",
        appliesTo: ["replayLab.sources", "content ingestion"],
        useInAcademy: "Usar como cantera de replays actuales e historicos, con version review.",
        citationNote: "No inferir meta global de la lista; usar solo como fuente de candidatos.",
        status: "verified",
      },
    ],
  },
  {
    id: "esoc-wiki",
    title: "ESOC Wiki",
    url: "https://wiki.eso-community.net/Main_Page",
    kind: "wiki",
    reliability: "community-primary",
    lastChecked: "2026-05-18",
    sourceFor: ["community background", "legacy patch context", "ESOC maps", "recorded game links", "tournament context"],
    facts: [
      {
        id: "esoc-wiki-description",
        claim: "La ESOC Wiki se presenta como un recurso completo de Age of Empires 3 hecho por y para la comunidad.",
        appliesTo: ["sourceQueue.esoc-wiki", "resources.esoc-wiki"],
        useInAcademy: "Contexto comunitario y conceptos; no reemplaza patch notes actuales.",
        citationNote: "Citar como wiki comunitaria con reviewStatus, no como fuente oficial de balance DE.",
        status: "verified",
      },
      {
        id: "esoc-wiki-community-hub",
        claim: "La pagina explica que ESOC ofrece Strategy Wall, torneos, tech support, discusiones, streams, ESOC Patch, mapas, Treaty Patch y recorded games.",
        appliesTo: ["source discovery", "resource directory", "community context"],
        useInAcademy: "Mapa de ecosistema para descubrir fuentes primarias mas concretas.",
        citationNote: "Cuando se use para historia de ESOC, citar la wiki; para estrategia, citar thread/patch especifico.",
        status: "verified",
      },
    ],
  },
  {
    id: "samurai-strategy-school",
    title: "SamuraiRevolution Strategy School",
    url: "https://www.samurairevolution.gg/strategy-school",
    kind: "creator",
    reliability: "community-primary",
    lastChecked: "2026-05-18",
    sourceFor: ["civilization guides", "video/PDF guide backlog", "creator learning path"],
    facts: [
      {
        id: "samurai-civ-index",
        claim: "Strategy School lista guias por civilizacion para British, Dutch, French, Germans, Ottomans, Portuguese, Russians, Spanish y muchas civs DE.",
        appliesTo: ["sourceQueue.samurai-strategy-school", "roadmap100.41", "roadmap100.66"],
        useInAcademy: "Fuente P0 para cola de guias por civ y extraccion video-to-guide.",
        citationNote: "Citar pagina de civ o video/PDF concreto antes de canonical.",
        status: "verified",
      },
      {
        id: "samurai-school-purpose",
        claim: "La pagina define Strategy School como guia de estrategia para civilizaciones de The Asian Dynasties y AoE3 Definitive Edition, con PDF y video.",
        appliesTo: ["guide ingestion", "creator watchlist"],
        useInAcademy: "Usar como fuente de aprendizaje estructurado y comparar con patch actual.",
        citationNote: "Marcar patch-risk si la guia viene de TAD o version antigua.",
        status: "verified",
      },
    ],
  },
  {
    id: "academy-seed",
    title: "Academia AoE3 seed review",
    url: "/resources",
    kind: "internal",
    reliability: "internal-seed",
    lastChecked: "2026-05-18",
    sourceFor: ["initial editorial scaffolding", "unverified decks", "unverified openings", "UI prototypes"],
    facts: [
      {
        id: "academy-seed-warning",
        claim: "Los decks, timings y planes iniciales con reviewStatus needs-review/source-backlog son hipotesis editoriales, no contenido canonical.",
        appliesTo: ["aoe3Decks", "aoe3Openings", "aoe3Plans", "aoe3Cards"],
        useInAcademy: "Permite construir UX y trainers mientras se valida contra fuentes externas.",
        citationNote: "Nunca citar `academy-seed` como autoridad externa; usarlo solo como estado interno.",
        status: "context-only",
      },
    ],
  },
];

export const contentCitations: ContentCitation[] = [
  {
    id: "stats-meta-sources",
    contentType: "stats",
    contentId: "meta",
    field: "winrate/pickrate/sample/patch",
    statement: "La matriz de meta debe alimentarse de herramientas externas y patch oficial, no de datos inventados.",
    sourceIds: ["aoe3-explorer", "freefoodparty-replayparser", "official-update-13690"],
    citationPolicy: "Citar proveedor, modo, fecha de captura y sample antes de mostrar winrate.",
    status: "needs-sample",
  },
  {
    id: "stats-replay-sources",
    contentType: "stats",
    contentId: "replays",
    field: "shipments/ageups/deck/timeline",
    statement: "Los campos de replay se consideran pendientes hasta validar output real de parser.",
    sourceIds: ["aoe3-explorer", "freefoodparty-replayparser", "esoc-recorded-games"],
    citationPolicy: "Citar parser + replay source + fecha de parseo; guardar fixture interno.",
    status: "needs-sample",
  },
  {
    id: "source-queue-official-update",
    contentType: "source-queue",
    contentId: "official-update-13690",
    field: "use/nextAction",
    statement: "Patch 13.690 alimenta changelog, mapas, cartas britanicas, hotkeys y cambios de gameplay.",
    sourceIds: ["official-update-13690"],
    citationPolicy: "Citar patch oficial por seccion al publicar cambios concretos.",
    status: "verified",
  },
  {
    id: "source-queue-explorer",
    contentType: "source-queue",
    contentId: "aoe3explorer-tools",
    field: "use/nextAction",
    statement: "AOE3 Explorer es la fuente P0 para probar leaderboards, lobbies, decks, counters, compendium y replay parser.",
    sourceIds: ["aoe3-explorer"],
    citationPolicy: "Citar herramienta y no prometer adapter hasta fijar contrato tecnico.",
    status: "verified",
  },
  {
    id: "source-queue-freefoodparty",
    contentType: "source-queue",
    contentId: "freefoodparty-replayparser",
    field: "use/nextAction",
    statement: "Free Food Party queda como candidato P0 para stats/replay, con validacion de sample obligatoria.",
    sourceIds: ["freefoodparty-replayparser"],
    citationPolicy: "Citar solo como herramienta viva hasta parsear 5 recorded games.",
    status: "needs-sample",
  },
  {
    id: "source-queue-esoc-strategy",
    contentType: "source-queue",
    contentId: "esoc-strategy",
    field: "use/nextAction",
    statement: "ESOC Strategy alimenta backlog de guias, builds y matchups.",
    sourceIds: ["esoc-strategy"],
    citationPolicy: "Cada guia debe citar thread, autor, fecha y patch-risk.",
    status: "verified",
  },
  {
    id: "source-queue-esoc-recorded",
    contentType: "source-queue",
    contentId: "esoc-recorded-games",
    field: "use/nextAction",
    statement: "ESOC Recorded Games alimenta replay seeds y analisis de partidas.",
    sourceIds: ["esoc-recorded-games"],
    citationPolicy: "Cada analisis debe citar post/replay exacto.",
    status: "verified",
  },
  {
    id: "source-queue-esoc-wiki",
    contentType: "source-queue",
    contentId: "esoc-wiki",
    field: "use/nextAction",
    statement: "ESOC Wiki sirve como contexto comunitario y mapa de ecosistema.",
    sourceIds: ["esoc-wiki"],
    citationPolicy: "Citar como contexto, no como patch actual.",
    status: "verified",
  },
  {
    id: "source-queue-samurai",
    contentType: "source-queue",
    contentId: "samurai-strategy-school",
    field: "use/nextAction",
    statement: "SamuraiRevolution Strategy School alimenta cola de guias por civilizacion y video/PDF extraction.",
    sourceIds: ["samurai-strategy-school"],
    citationPolicy: "Citar pagina/video/PDF exacto y revisar patch-risk.",
    status: "verified",
  },
  {
    id: "replay-lab-parser-contract",
    contentType: "replay-lab",
    contentId: "replayPipeline",
    field: "normalize/timeline/deck/insights",
    statement: "El replay lab debe aceptar outputs externos solo tras normalizar campos y guardar fixtures.",
    sourceIds: ["aoe3-explorer", "freefoodparty-replayparser", "esoc-recorded-games"],
    citationPolicy: "Citar parser y replay source; mostrar confianza por campo.",
    status: "needs-sample",
  },
  {
    id: "replay-import-contract",
    contentType: "replay-lab",
    contentId: "replay-import",
    field: "manual-json/text normalizer",
    statement: "Replay import v1 normaliza JSON/texto pegado y extrae header, jugadores, shipments, age-ups, timeline y warnings.",
    sourceIds: ["aoe3-explorer", "freefoodparty-replayparser", "academy-seed"],
    citationPolicy: "Tratar como herramienta local seed hasta validar fixtures de parsers externos.",
    status: "needs-sample",
  },
  {
    id: "parser-solution-fixtures",
    contentType: "replay-lab",
    contentId: "parser-solution",
    field: "fixture generation",
    statement: "La solucion al bloqueo needs-sample es generar fixtures locales con horse-feed aoe3replay.py y validar contra AOE3 Explorer/FreeFoodParty.",
    sourceIds: ["horse-feed-python-parser", "aoe3-explorer", "freefoodparty-replayparser", "esoc-recorded-games"],
    citationPolicy: "Cada fixture debe guardar replay source, parser raw output y validacion manual/web.",
    status: "verified",
  },
  {
    id: "civ-atlas-roster",
    contentType: "guide",
    contentId: "civ-atlas",
    field: "22 civilization roster",
    statement: "El atlas base cubre las 22 civilizaciones actuales de AoE3 DE con existencia trazada a FE/oficial/Steam y estrategia marcada como seed.",
    sourceIds: ["forgotten-empires-civs", "steam-complete-history", "official-african-royals", "official-knights-mediterranean", "academy-seed"],
    citationPolicy: "Citar roster/expansion para existencia de civ; citar guia/replay para claims de estrategia.",
    status: "verified",
  },
  {
    id: "roadmap-stats-replay-block",
    contentType: "roadmap",
    contentId: "11-30",
    field: "Stats/Replay",
    statement: "Los pasos 11-30 estan basados en herramientas existentes, pero varios quedan pendientes por output no validado.",
    sourceIds: ["aoe3-explorer", "freefoodparty-replayparser", "esoc-recorded-games"],
    citationPolicy: "No marcar como done sin adapter o muestra manual.",
    status: "needs-sample",
  },
  {
    id: "deck-opening-seed-policy",
    contentType: "deck",
    contentId: "all-seed-decks-openings-plans",
    field: "goal/shipments/benchmarks",
    statement: "Los decks, openings y benchmarks iniciales son contenido editorial seed hasta validarlos con ESOC/Samurai/replays.",
    sourceIds: ["academy-seed", "esoc-strategy", "samurai-strategy-school", "esoc-recorded-games"],
    citationPolicy: "Al promocionar a reference-ready, sustituir academy-seed por fuente externa concreta.",
    status: "context-only",
  },
  {
    id: "art-policy",
    contentType: "art-lab",
    contentId: "asset-policy",
    field: "asset rules",
    statement: "El art lab debe producir assets propios y separar referencias oficiales/comunitarias de assets redistribuidos.",
    sourceIds: ["aoe3-explorer", "academy-seed"],
    citationPolicy: "Revisar Microsoft Game Content Usage Rules antes de usar assets del juego.",
    status: "context-only",
  },
];

export const provenanceStatusLabels: Record<ProvenanceStatus, string> = {
  verified: "Verificado",
  "needs-sample": "Necesita sample",
  "context-only": "Contexto",
  blocked: "Bloqueado",
};

export const sourceReliabilityLabels: Record<SourceReliability, string> = {
  official: "Oficial",
  "tool-primary": "Tool primaria",
  "community-primary": "Comunidad primaria",
  "community-signal": "Senal comunidad",
  "internal-seed": "Seed interna",
};

export function getProvenanceSource(id: string) {
  return provenanceSources.find((source) => source.id === id);
}

export function getCitationsForContent(contentId: string) {
  return contentCitations.filter((citation) => citation.contentId === contentId || citation.contentId.includes(contentId));
}

export const provenanceSummary = {
  sources: provenanceSources.length,
  facts: provenanceSources.reduce((sum, source) => sum + source.facts.length, 0),
  citations: contentCitations.length,
  verifiedFacts: provenanceSources.flatMap((source) => source.facts).filter((fact) => fact.status === "verified").length,
  needsSample: provenanceSources.flatMap((source) => source.facts).filter((fact) => fact.status === "needs-sample").length,
};
