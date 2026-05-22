import { sourceBackedEvidence } from "./evidence";
import type { EvidenceRef, ReviewStatus } from "./schema";

export type AgeUpTarget = "Age II" | "Age III" | "Age IV" | "Age V";

export type PoliticianBonus = {
  type: "villagers" | "wood" | "food" | "coin" | "military" | "explorer" | "wagon" | "tech" | "other";
  description: string;
};

export type Politician = {
  id: string;
  name: string;
  civId: string; // o "shared" para los genéricos europeos
  ageUpTo: AgeUpTarget;
  bonuses: PoliticianBonus[];
  bestFor: string[]; // ej ["Boom", "Rush", "Semi-FF"]
  cost?: string;
  notes: string;
  sourceId: string;
  evidence?: EvidenceRef;
  reviewStatus: ReviewStatus;
};

export const aoe3Politicians: Politician[] = [
  // ── Age II – Shared European ──────────────────────────────────────────────
  {
    id: "politician-governor",
    name: "The Governor",
    civId: "shared",
    ageUpTo: "Age II",
    bonuses: [{ type: "food", description: "Grants a food crate shipment on age-up" }],
    bestFor: ["Boom", "Rush"],
    notes: "Default Age II choice for many European civs when food is the bottleneck.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Generic European Age II politician – confirmed present DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  {
    id: "politician-quartermaster",
    name: "The Quartermaster",
    civId: "shared",
    ageUpTo: "Age II",
    bonuses: [{ type: "military", description: "Grants a military unit shipment on age-up" }],
    bestFor: ["Rush", "Timing"],
    notes: "Picked when a free military unit matters more than resources at Age II.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Generic European Age II politician – confirmed present DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  {
    id: "politician-naturalist",
    name: "The Naturalist",
    civId: "shared",
    ageUpTo: "Age II",
    bonuses: [{ type: "other", description: "Grants herd animals (livestock) on age-up" }],
    bestFor: ["Boom", "Semi-FF"],
    notes: "Synergizes with livestock-heavy or Treaty openings that need sustained food income.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Generic European Age II politician", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  // ── Age III – Shared European ─────────────────────────────────────────────
  {
    id: "politician-engineer",
    name: "The Engineer",
    civId: "shared",
    ageUpTo: "Age III",
    bonuses: [{ type: "wagon", description: "Grants a covered wagon (builds a building) on age-up" }],
    bestFor: ["Boom", "Semi-FF"],
    notes: "Extra wagon at Age III accelerates infrastructure without spending pop.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Generic European Age III politician", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  {
    id: "politician-exiled-prince",
    name: "The Exiled Prince",
    civId: "shared",
    ageUpTo: "Age III",
    bonuses: [{ type: "coin", description: "Grants a coin crate shipment on age-up" }],
    bestFor: ["Boom", "Treaty"],
    notes: "Preferred when coin is the bottleneck transitioning into Age III.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Generic European Age III politician", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  {
    id: "politician-statesman",
    name: "The Statesman",
    civId: "shared",
    ageUpTo: "Age III",
    bonuses: [{ type: "tech", description: "Grants a free technology research on age-up" }],
    bestFor: ["Semi-FF", "Control"],
    notes: "Free tech can save shipment XP for unit cards; useful when a specific upgrade is planned.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Generic European Age III politician", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  // ── British ───────────────────────────────────────────────────────────────
  {
    id: "politician-vicar",
    name: "The Vicar",
    civId: "british",
    ageUpTo: "Age III",
    bonuses: [{ type: "villagers", description: "Ships villagers on age-up" }],
    bestFor: ["Boom", "Semi-FF"],
    notes: "British Manor Boom variant; extra villagers pair with the Manor house pop mechanic.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("British-specific politician confirmed in DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  {
    id: "politician-bishop",
    name: "The Bishop",
    civId: "british",
    ageUpTo: "Age IV",
    bonuses: [{ type: "food", description: "Ships a large food crate on age-up" }],
    bestFor: ["Boom", "Treaty"],
    notes: "Late-game boom option when transitioning to Fortress for British.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("British-specific politician in DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  // ── Ottomans ─────────────────────────────────────────────────────────────
  {
    id: "politician-mufti",
    name: "The Mufti",
    civId: "ottomans",
    ageUpTo: "Age III",
    bonuses: [{ type: "military", description: "Ships Janissaries on age-up" }],
    bestFor: ["Rush", "Timing"],
    notes: "Ottoman rush/timing variant; free Janissaries accelerate pressure from the transition.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Ottoman-specific politician in DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  {
    id: "politician-grand-vizier",
    name: "The Grand Vizier",
    civId: "ottomans",
    ageUpTo: "Age IV",
    bonuses: [{ type: "military", description: "Ships Imperial troops on age-up" }],
    bestFor: ["Semi-FF", "Control"],
    notes: "Ottoman Fortress age-up; strong military shipment for establishing a power spike.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Ottoman-specific politician in DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  // ── French ────────────────────────────────────────────────────────────────
  {
    id: "politician-native-lover",
    name: "The Native Lover",
    civId: "french",
    ageUpTo: "Age III",
    bonuses: [{ type: "other", description: "Grants a native warrior shipment on age-up" }],
    bestFor: ["Rush", "Control"],
    notes: "French native synergy; works well on maps with accessible native settlements.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("French-specific politician in DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  // ── Spanish ───────────────────────────────────────────────────────────────
  {
    id: "politician-reformer",
    name: "The Reformer",
    civId: "spanish",
    ageUpTo: "Age III",
    bonuses: [{ type: "tech", description: "Grants a free church technology on age-up" }],
    bestFor: ["Semi-FF", "Boom"],
    notes: "Spanish church upgrade synergy; skips the coin cost of an early church tech.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Spanish-specific politician in DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  // ── Germans ───────────────────────────────────────────────────────────────
  {
    id: "politician-noble-woman",
    name: "The Noblewoman",
    civId: "germans",
    ageUpTo: "Age II",
    bonuses: [{ type: "villagers", description: "Ships settler wagons on age-up" }],
    bestFor: ["Boom", "Semi-FF"],
    notes: "German settler wagon bonus at Age II accelerates early economic expansion.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("German-specific politician in DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  // ── Dutch ─────────────────────────────────────────────────────────────────
  {
    id: "politician-merchant",
    name: "The Merchant",
    civId: "dutch",
    ageUpTo: "Age III",
    bonuses: [{ type: "coin", description: "Ships coin crates on age-up" }],
    bestFor: ["Boom", "Semi-FF"],
    notes: "Dutch rely on bank coin income; extra coin at Age III supports bank build order.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Dutch-specific politician in DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
  // ── Portuguese ────────────────────────────────────────────────────────────
  {
    id: "politician-bishop-portuguese",
    name: "The Archbishop",
    civId: "portuguese",
    ageUpTo: "Age IV",
    bonuses: [{ type: "military", description: "Ships Cassadors and dragoons on age-up" }],
    bestFor: ["Semi-FF", "Rush"],
    notes: "Portuguese Fortress transition; strong military shipment for aggressive play.",
    sourceId: "samurai-strategy-school",
    evidence: sourceBackedEvidence("Portuguese-specific politician in DE", ["samurai-strategy-school"]),
    reviewStatus: "needs-review",
  },
];

export function getPoliticiansForCiv(civId: string): Politician[] {
  return aoe3Politicians.filter((p) => p.civId === civId || p.civId === "shared");
}
