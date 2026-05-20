export type ReplayInputMode = "manual" | "aoe3explorer" | "freefoodparty" | "future-parser";

export type ReplayPipelineStep = {
  id: string;
  title: string;
  input: ReplayInputMode[];
  output: string;
  confidence: "high" | "medium" | "low" | "unknown";
};

export const replayPipeline: ReplayPipelineStep[] = [
  {
    id: "collect",
    title: "Recoger replay o output externo",
    input: ["manual", "aoe3explorer", "freefoodparty"],
    output: "Replay source record con URL/file/source notes",
    confidence: "high",
  },
  {
    id: "normalize",
    title: "Normalizar jugadores, civs, mapa y modo",
    input: ["aoe3explorer", "freefoodparty", "manual"],
    output: "ReplayHeader",
    confidence: "medium",
  },
  {
    id: "timeline",
    title: "Construir timeline de shipments/ages/techs",
    input: ["aoe3explorer", "freefoodparty"],
    output: "ReplayTimelineEvent[]",
    confidence: "medium",
  },
  {
    id: "deck",
    title: "Comparar deck usado contra plan",
    input: ["aoe3explorer", "freefoodparty", "manual"],
    output: "DeckAuditResult",
    confidence: "medium",
  },
  {
    id: "insights",
    title: "Detectar errores deterministas",
    input: ["manual", "aoe3explorer", "freefoodparty"],
    output: "Postgame insights sin IA",
    confidence: "high",
  },
  {
    id: "coach",
    title: "Narrativa IA con citas internas",
    input: ["future-parser", "aoe3explorer", "freefoodparty"],
    output: "Coach report con fuentes",
    confidence: "unknown",
  },
];

