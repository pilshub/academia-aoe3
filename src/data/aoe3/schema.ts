export type ReviewStatus = "source-backlog" | "needs-review" | "reference-ready" | "canonical";
export type EvidenceStatus = "seed" | "source-backed" | "replay-backed" | "patch-reviewed" | "canonical" | "stale";
export type Confidence = "low" | "medium" | "high";
export type Mode = "Supremacy 1v1" | "Team" | "Treaty";
export type Difficulty = "Start" | "Intermediate" | "Advanced";
export type CardAge = "Age I" | "Age II" | "Age III" | "Age IV";
export type PlanArchetype = "Rush" | "Semi-FF" | "Boom" | "Timing" | "Control" | "Water" | "Treaty";
export type CardRole = "Core" | "Flex" | "Greed" | "Defense" | "Tempo" | "Trap" | "Transition";

export type SourceLink = {
  id: string;
  label: string;
  url: string;
  note: string;
  priority: "P0" | "P1" | "P2" | "Monitor";
};

export type EvidenceRef = {
  sourceIds: string[];
  evidenceIds?: string[];
  status: EvidenceStatus;
  confidence: Confidence;
  lastReviewed: string;
  patch: string;
  notes: string;
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
  recommendedPlanIds: string[];
  accent: string;
  evidence?: EvidenceRef;
  reviewStatus: ReviewStatus;
};

export type ShipmentCard = {
  id: string;
  name: string;
  civId: string;
  age: CardAge;
  role: CardRole;
  timing: string;
  explanation: string;
  competesWith: string[];
  planTags: PlanArchetype[];
  modeTags: Mode[];
  sourceId: string;
  evidence?: EvidenceRef;
  reviewStatus: ReviewStatus;
};

export type Deck = {
  id: string;
  title: string;
  civId: string;
  mode: Mode;
  planTags: PlanArchetype[];
  patch: string;
  goal: string;
  coreCardIds: string[];
  flexCardIds: string[];
  trapCardIds: string[];
  shipmentOrder: string[];
  sourceId: string;
  evidence?: EvidenceRef;
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
  civId: string;
  mode: Mode;
  difficulty: Difficulty;
  planId: string;
  benchmark: string;
  crates: string;
  ageUp: string;
  firstShipmentIds: string[];
  steps: OpeningStep[];
  scoutChecks: string[];
  transition: string;
  sourceId: string;
  evidence?: EvidenceRef;
  reviewStatus: ReviewStatus;
};

export type Plan = {
  id: string;
  title: string;
  civId: string;
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
  sourceId: string;
  evidence?: EvidenceRef;
  reviewStatus: ReviewStatus;
};

export type MapProfile = {
  id: string;
  name: string;
  type: "land" | "hybrid" | "water" | "trade" | "defensive";
  tradeRoute: "none" | "low" | "medium" | "high";
  water: "none" | "pond" | "contestable" | "full";
  natives: string[];
  treasureFocus: string[];
  goodPlanTags: PlanArchetype[];
  risks: string[];
  recommendedCivIds: string[];
  sourceIds?: string[];
  evidence?: EvidenceRef;
  reviewStatus: ReviewStatus;
};

export type ShipmentOption = {
  cardId: string;
  label: string;
  verdict: "best" | "playable" | "risky" | "wrong";
  explanation: string;
};

export type ShipmentScenario = {
  id: string;
  title: string;
  civId: string;
  planId: string;
  age: CardAge;
  minute: string;
  mapState: string;
  enemySignal: string;
  question: string;
  correctCardId: string;
  options: ShipmentOption[];
  lesson: string;
  sourceIds?: string[];
  evidence?: EvidenceRef;
};

export type ReplayParserSource = "manual-json" | "manual-text" | "aoe3explorer" | "freefoodparty" | "future-parser";

export type ReplayShipment = {
  player: string;
  civ?: string;
  time: string;
  card: string;
};

export type ReplayAgeUp = {
  player: string;
  age: CardAge | "Age V";
  time: string;
  politician?: string;
};

export type ReplayTimelineEvent = {
  time: string;
  player?: string;
  type: "shipment" | "age-up" | "tech" | "battle" | "note";
  label: string;
  confidence: Confidence;
};

export type ReplayPlayer = {
  name: string;
  civ?: string;
  result?: "Win" | "Loss" | "Unknown";
  deck?: string[];
};

export type ReplayHeader = {
  source: ReplayParserSource;
  map?: string;
  mode?: Mode;
  duration?: string;
  patch?: string;
  players: ReplayPlayer[];
};

export type NormalizedReplay = {
  header: ReplayHeader;
  shipments: ReplayShipment[];
  ageUps: ReplayAgeUp[];
  timeline: ReplayTimelineEvent[];
  warnings: string[];
  evidence: EvidenceRef;
};
