export type StatDomainStatus = "live-source" | "adapter-needed" | "manual-seed" | "blocked";

export type StatField = {
  key: string;
  label: string;
  source: string;
  use: string;
  status: StatDomainStatus;
};

export type StatDomain = {
  id: string;
  title: string;
  goal: string;
  fields: StatField[];
};

export const statDomains: StatDomain[] = [
  {
    id: "meta",
    title: "Meta y civilizaciones",
    goal: "Medir winrate/pickrate por civ, modo, rank y patch sin inventar sample size.",
    fields: [
      { key: "civ_winrate", label: "Winrate por civ", source: "AOE3 Explorer / stats source", use: "/meta, /civs", status: "adapter-needed" },
      { key: "pickrate", label: "Pickrate", source: "AOE3 Explorer / ladder", use: "/meta", status: "adapter-needed" },
      { key: "sample", label: "Sample size", source: "Stats provider", use: "Trust badges", status: "adapter-needed" },
      { key: "patch", label: "Patch/date", source: "Official updates", use: "Freshness", status: "live-source" },
    ],
  },
  {
    id: "players",
    title: "Perfil y scout",
    goal: "Preparar un rival o diagnosticar al usuario por historial real.",
    fields: [
      { key: "profile_id", label: "Profile ID", source: "AOE3 Explorer", use: "/profile, /scout", status: "adapter-needed" },
      { key: "elo", label: "ELO/rank", source: "Leaderboards", use: "Briefing", status: "adapter-needed" },
      { key: "recent_games", label: "Partidas recientes", source: "Player history", use: "Coach report", status: "adapter-needed" },
      { key: "civ_pool", label: "Civilizaciones usadas", source: "Recent games", use: "Scout", status: "adapter-needed" },
    ],
  },
  {
    id: "replays",
    title: "Replays",
    goal: "Convertir recorded games en timeline de decisiones y errores.",
    fields: [
      { key: "shipments", label: "Shipments enviados", source: "Replay parser", use: "/replay, /analysis", status: "adapter-needed" },
      { key: "ageups", label: "Age-up timings", source: "Replay parser", use: "Benchmarks", status: "adapter-needed" },
      { key: "politicians", label: "Politicians", source: "Replay parser", use: "Plan validation", status: "adapter-needed" },
      { key: "tech_timings", label: "Tech timings", source: "Replay parser", use: "Postgame insight", status: "adapter-needed" },
      { key: "deck", label: "Deck usado", source: "Replay/parser/home city", use: "Deck checker", status: "adapter-needed" },
      { key: "idle_tc", label: "Idle TC", source: "Unknown", use: "Coach report", status: "blocked" },
    ],
  },
  {
    id: "maps",
    title: "Mapas",
    goal: "Explicar trade route, agua, natives y riesgos de scouting.",
    fields: [
      { key: "map_list", label: "Lista de mapas", source: "AOE3 Explorer maps", use: "/maps", status: "live-source" },
      { key: "natives", label: "Natives/outlaws", source: "Compendium/wiki", use: "Map helper", status: "manual-seed" },
      { key: "trade_route", label: "Trade route", source: "Map data/manual", use: "Shipment/TP decisions", status: "manual-seed" },
      { key: "water", label: "Agua", source: "Map data/manual", use: "Water helper", status: "manual-seed" },
    ],
  },
  {
    id: "content",
    title: "Contenido y fuentes",
    goal: "Transformar videos, foros y replays en datos publicables.",
    fields: [
      { key: "video_url", label: "Video URL", source: "YouTube/Twitch", use: "Source queue", status: "live-source" },
      { key: "transcript", label: "Transcripcion", source: "YouTube/local", use: "Knowledge Core", status: "adapter-needed" },
      { key: "source_patch", label: "Patch-risk", source: "Video date + official patch", use: "Review status", status: "adapter-needed" },
      { key: "derived_plan", label: "Plan derivado", source: "Editorial extraction", use: "/plans", status: "manual-seed" },
    ],
  },
];

export const statSummary = statDomains.flatMap((domain) => domain.fields).reduce(
  (acc, field) => {
    acc[field.status] += 1;
    return acc;
  },
  { "live-source": 0, "adapter-needed": 0, "manual-seed": 0, blocked: 0 } satisfies Record<StatDomainStatus, number>,
);

