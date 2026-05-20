export type PatchImpact = {
  id: string;
  patch: string;
  title: string;
  url: string;
  lastChecked: string;
  trust: "official" | "candidate" | "watch";
  areas: Array<"cards" | "civs" | "maps" | "hotkeys" | "ui" | "treaty" | "replays" | "tools">;
  academyRisk: string;
  reviewTargets: string[];
  nextAction: string;
};

export const patchImpacts: PatchImpact[] = [
  {
    id: "official-13-690",
    patch: "13.690",
    title: "Age of Empires III: Definitive Edition - Update 13.690",
    url: "https://www.ageofempires.com/news/age_of_empires_iii_de_update_13_690/",
    lastChecked: "2026-05-18",
    trust: "official",
    areas: ["cards", "maps", "hotkeys", "ui", "tools"],
    academyRisk: "Cualquier guia que mencione cartas, hotkeys, photo mode, mapas o QoL debe revisar si hereda informacion antigua.",
    reviewTargets: ["/cards", "/maps", "/guides", "/source-provenance"],
    nextAction: "Crear diff interno por seccion y enlazar cada cambio concreto a la guia afectada.",
  },
  {
    id: "official-13-58326",
    patch: "13.58326",
    title: "Age of Empires III: Definitive Edition - Update 13.58326",
    url: "https://www.ageofempires.com/news/age-of-empires-iii-de-update-13-58326/",
    lastChecked: "2026-05-18",
    trust: "candidate",
    areas: ["civs", "cards", "treaty"],
    academyRisk: "La busqueda oficial muestra cambios de civilizaciones/cartas; hay que extraerlos antes de marcar decks como actuales.",
    reviewTargets: ["/deck-builder", "/deck-checker", "/civ-mastery", "/trust"],
    nextAction: "Raspar manualmente la nota oficial y generar tareas por civ/card afectada.",
  },
  {
    id: "official-13-12327",
    patch: "13.12327",
    title: "Age of Empires III: Definitive Edition - Update 13.12327",
    url: "https://www.ageofempires.com/news/age-of-empires-iii-definitive-edition-update-13-12327/",
    lastChecked: "2026-05-18",
    trust: "candidate",
    areas: ["civs", "cards", "treaty"],
    academyRisk: "Cambios antiguos pueden seguir vivos en guias comunitarias; todo contenido heredado debe llevar patch-risk.",
    reviewTargets: ["/resources", "/source-queue", "/guides"],
    nextAction: "Etiquetar fuentes viejas como patch-risk si no citan version posterior.",
  },
  {
    id: "steamdb-watch",
    patch: "SteamDB watch",
    title: "Age of Empires III: Definitive Edition SteamDB patchnotes",
    url: "https://steamdb.info/app/933110/patchnotes/",
    lastChecked: "2026-05-18",
    trust: "watch",
    areas: ["tools", "replays"],
    academyRisk: "SteamDB detecta actividad de builds, pero no sustituye patch notes oficiales para balance.",
    reviewTargets: ["/patch-tracker", "/source-admin"],
    nextAction: "Usarlo como alerta temprana; confirmar siempre en ageofempires.com antes de cambiar guias.",
  },
];

export const patchTrackerSummary = {
  total: patchImpacts.length,
  official: patchImpacts.filter((item) => item.trust === "official").length,
  candidates: patchImpacts.filter((item) => item.trust === "candidate").length,
  watch: patchImpacts.filter((item) => item.trust === "watch").length,
};
