export type ParserSolutionStatus = "primary" | "secondary" | "validator" | "manual";

export type ParserSolution = {
  id: string;
  title: string;
  url: string;
  status: ParserSolutionStatus;
  evidence: string;
  extracts: string[];
  limitations: string[];
  academyAction: string;
};

export const parserSolutions: ParserSolution[] = [
  {
    id: "horse-feed-python",
    title: "horse-feed aoe3replay.py",
    url: "https://gist.github.com/horse-feed/519f63d016ddd5a794fb89438afc30bf",
    status: "primary",
    evidence:
      "ESOC thread 2026-03-11: parser Python para .age3Yrec/.age3Ysav con summary, JSON, build-order output, age-up timings, HC shipments, market trades y winner detection via resign.",
    extracts: ["settings/map", "players/civs/decks", "full action stream", "build order", "age-up timings", "HC shipments", "market trades", "JSON output"],
    limitations: ["Gist sin licencia clara: no vendorear codigo en repo.", "El autor avisa bugs y spam de botones.", "Necesita fixture real por patch."],
    academyAction: "Usar como parser local principal para generar fixtures JSON en `fixtures/replays/` y alimentar `/replay-import`.",
  },
  {
    id: "canyougiant-npm",
    title: "@canyougiant/aoe3de-replay-parser",
    url: "https://www.npmjs.com/package/@canyougiant/aoe3de-replay-parser",
    status: "secondary",
    evidence:
      "Paquete npm 1.6.0, parsing de Age3Yrec. README declara game version/settings/player infos, initial decks y chat; shipments/techs/buildings/units siguen pendientes.",
    extracts: ["game version", "settings", "player info", "initial decks", "chat"],
    limitations: ["Repo sin licencia declarada.", "No extrae shipments/techs en README.", "Pushed 2023; puede estar atrasado frente a parches actuales."],
    academyAction: "Mantener como fallback tecnico y referencia de formato, no como extractor principal de shipments.",
  },
  {
    id: "aoe3-explorer-parser",
    title: "AOE3 Explorer Replay Parser",
    url: "https://aoe3explorer.com/tools/replayparser",
    status: "validator",
    evidence: "Herramienta web viva dentro de AOE3 Explorer Tools; util para map player/timeline y comprobacion visual.",
    extracts: ["map player", "timeline visual", "replay inspection"],
    limitations: ["Sin contrato API publico confirmado.", "Requiere captura manual o export si existe."],
    academyAction: "Usarlo para comparar visualmente fixtures generados por horse-feed y detectar discrepancias.",
  },
  {
    id: "freefoodparty-parser",
    title: "Free Food Party Replay Parser",
    url: "https://freefoodparty.com/replayparser",
    status: "validator",
    evidence: "Ruta viva HTTP 200 y metadata publica de stats, build orders, leaderboard, match history, win rates y civ performance.",
    extracts: ["stats/player context", "build order signals", "match history context"],
    limitations: ["App client-side; falta contrato export estable.", "Reportes comunitarios de compatibilidad variable por replay/version."],
    academyAction: "Usarlo como segundo validador y como UX reference, no como unica fuente de fixtures.",
  },
  {
    id: "replay-manager",
    title: "Replay Manager / VladTheJunior",
    url: "https://forums.ageofempires.com/t/v-0-07-replay-manager-tool-to-viewing-age-of-empires-iii-definitive-edition-records/197220",
    status: "manual",
    evidence:
      "Forum oficial describe general info, all decks, important game actions with timestamp, game summary, winners/APM; comentarios indican que parches pueden romper compatibilidad.",
    extracts: ["general info", "player decks", "important actions", "selected deck", "winner summary"],
    limitations: ["Desktop tool, patch-sensitive, posible mantenimiento incierto.", "No ideal para pipeline automatizado web."],
    academyAction: "Usar solo como comprobacion manual o comparador de output cuando haya dudas.",
  },
];

export const replayFixturePlan = [
  {
    step: "Conseguir replay seed",
    command: "Descargar .age3Yrec desde ESOC Recorded Games o guardar partida propia.",
    output: "fixtures/replays/raw/<match>.age3Yrec",
  },
  {
    step: "Parsear con horse-feed",
    command: "node scripts/replay-fixture.mjs --replay fixtures/replays/raw/<match>.age3Yrec --json",
    output: "fixtures/replays/parsed/<match>.horsefeed.json",
  },
  {
    step: "Extraer build order",
    command: "node scripts/replay-fixture.mjs --replay fixtures/replays/raw/<match>.age3Yrec --bo-player 1",
    output: "fixtures/replays/parsed/<match>.bo-p1.txt",
  },
  {
    step: "Validar contra tool web",
    command: "Abrir el mismo replay en AOE3 Explorer o FreeFoodParty y comparar mapa/jugadores/shipments.",
    output: "fixtures/replays/validation/<match>.md",
  },
  {
    step: "Publicar en academia",
    command: "Pegar JSON normalizado en /replay-import o generar adapter.",
    output: "NormalizedReplay con sourceIds y confidence.",
  },
];

export const parserSolutionSummary = {
  primary: parserSolutions.filter((item) => item.status === "primary").length,
  secondary: parserSolutions.filter((item) => item.status === "secondary").length,
  validators: parserSolutions.filter((item) => item.status === "validator").length,
  manual: parserSolutions.filter((item) => item.status === "manual").length,
};
