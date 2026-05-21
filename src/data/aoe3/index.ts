import { aoe3Cards } from "./cards";
import { aoe3Civilizations } from "./civs";
import { aoe3Decks, aoe3Openings, aoe3Plans } from "./decks";
import { evidenceLabel, resolveEvidenceSources } from "./evidence";
import { aoe3Maps } from "./maps";
import { aoe3Matchups, getMatchupsForCiv, getMatchupsByArchetype } from "./matchups";
import { artPipeline } from "./artPipeline";
import { replayPipeline } from "./replayPipeline";
import { replayFieldMatrix, replayImportSample, replaySeedReports } from "./replaySamples";
import { parserSolutions, parserSolutionSummary, replayFixturePlan } from "./parserSolutions";
import { patchImpacts, patchTrackerSummary } from "./patchTracker";
import { roadmap100, roadmapSummary } from "./roadmap100";
import { seoLandingPages } from "./seoPages";
import { shipmentScenarios } from "./scenarios";
import { aoe3Sources } from "./sources";
import { contentCitations, provenanceSources, provenanceSummary } from "./sourceProvenance";
import { sourceQueue } from "./sourceQueue";
import { statDomains, statSummary } from "./statsMatrix";
import { assetBriefs, careerTracks, coachTools, errorLibrary, replayCoachTemplates, trainingSummary, trustLevels } from "./training";
import type { Deck, Plan, ShipmentCard } from "./schema";

export * from "./schema";
export * from "./evidence";
export * from "./matchups";
export * from "./artPipeline";
export * from "./replayPipeline";
export * from "./replaySamples";
export * from "./parserSolutions";
export * from "./patchTracker";
export * from "./roadmap100";
export * from "./seoPages";
export * from "./sourceProvenance";
export * from "./sourceQueue";
export * from "./statsMatrix";
export * from "./training";
export {
  aoe3Cards,
  aoe3Civilizations,
  aoe3Decks,
  aoe3Maps,
  aoe3Matchups,
  aoe3Openings,
  aoe3Plans,
  aoe3Sources,
  getMatchupsForCiv,
  getMatchupsByArchetype,
  artPipeline,
  contentCitations,
  evidenceLabel,
  parserSolutions,
  parserSolutionSummary,
  patchImpacts,
  patchTrackerSummary,
  replayPipeline,
  replayFieldMatrix,
  replayImportSample,
  replaySeedReports,
  replayFixturePlan,
  roadmap100,
  roadmapSummary,
  seoLandingPages,
  shipmentScenarios,
  provenanceSources,
  provenanceSummary,
  resolveEvidenceSources,
  sourceQueue,
  statDomains,
  statSummary,
  assetBriefs,
  careerTracks,
  coachTools,
  errorLibrary,
  replayCoachTemplates,
  trainingSummary,
  trustLevels,
};

export function getCiv(id: string) {
  return aoe3Civilizations.find((civ) => civ.id === id);
}

export function getCard(id: string) {
  return aoe3Cards.find((card) => card.id === id);
}

export function getDeck(id: string) {
  return aoe3Decks.find((deck) => deck.id === id);
}

export function getPlan(id: string) {
  return aoe3Plans.find((plan) => plan.id === id);
}

export function getOpening(id: string) {
  return aoe3Openings.find((opening) => opening.id === id);
}

export function getMapProfile(id: string) {
  return aoe3Maps.find((map) => map.id === id);
}

export function getCardsForCiv(civId: string) {
  return aoe3Cards.filter((card) => card.civId === civId);
}

export function getDeckCards(deck: Deck) {
  const ids = [...deck.coreCardIds, ...deck.flexCardIds, ...deck.trapCardIds];
  return ids.map(getCard).filter((card): card is ShipmentCard => Boolean(card));
}

export function getPlanBundle(planId: string) {
  const plan = getPlan(planId);
  if (!plan) return null;
  const civ = getCiv(plan.civId);
  const deck = getDeck(plan.deckId);
  const opening = getOpening(plan.openingId);
  return { plan, civ, deck, opening };
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function auditSelectedDeck(civId: string, selectedCardIds: string[], planId?: string) {
  const selectedCards = selectedCardIds.map(getCard).filter((card): card is ShipmentCard => Boolean(card));
  const plan = planId ? getPlan(planId) : aoe3Plans.find((item) => item.civId === civId);
  const referenceDeck = plan ? getDeck(plan.deckId) : aoe3Decks.find((deck) => deck.civId === civId);
  const requiredIds = referenceDeck?.coreCardIds ?? [];
  const missingCore = requiredIds.filter((id) => !selectedCardIds.includes(id));
  const trapIds = selectedCardIds.filter((id) => referenceDeck?.trapCardIds.includes(id));
  const hasDefense = selectedCards.some((card) => card.role === "Defense");
  const hasTransition = selectedCards.some((card) => card.role === "Transition");
  const greedCount = selectedCards.filter((card) => card.role === "Greed").length;
  const score = Math.max(0, Math.min(100, 100 - missingCore.length * 18 - trapIds.length * 8 - Math.max(0, greedCount - 1) * 10 - (hasDefense ? 0 : 12) - (hasTransition ? 0 : 8)));

  const strengths = [
    missingCore.length === 0 ? "Incluye las cartas core del plan de referencia." : "",
    hasDefense ? "Tiene al menos una respuesta defensiva marcada." : "",
    hasTransition ? "Tiene una carta de transicion para no quedar atrapado en Age II." : "",
  ].filter(Boolean);

  const warnings = [
    ...missingCore.map((id) => `Falta core: ${getCard(id)?.name ?? id}.`),
    ...trapIds.map((id) => `Carta trampa si se manda a ciegas: ${getCard(id)?.name ?? id}.`),
    !hasDefense ? "No hay carta defensiva clara; mal contra rush o forward." : "",
    !hasTransition ? "No hay carta de transicion clara; cuidado si el plan inicial no cierra." : "",
    greedCount > 1 ? "Demasiadas cartas greedy para un deck de Supremacy sin scouting perfecto." : "",
  ].filter(Boolean);

  return {
    score,
    grade: score >= 86 ? "A" : score >= 72 ? "B" : score >= 58 ? "C" : score >= 44 ? "D" : "E",
    plan,
    referenceDeck,
    selectedCards,
    missingCore,
    trapIds,
    strengths: strengths.length ? strengths : ["El deck aun necesita mas datos antes de considerarlo solido."],
    warnings: warnings.length ? warnings : ["No hay alertas fuertes para el plan seleccionado."],
  };
}

export function recommendPlansForMap(mapId: string, civId?: string) {
  const map = getMapProfile(mapId);
  if (!map) return [];
  return aoe3Plans
    .filter((plan) => (!civId || plan.civId === civId) && map.goodPlanTags.includes(plan.archetype))
    .slice(0, 4);
}

export function searchAcademyKnowledge(query: string) {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 2);

  if (terms.length === 0) return [];

  const records = [
    ...aoe3Civilizations.map((item) => ({ type: "Civ", title: item.name, href: "/civs", body: `${item.identity} ${item.tempo} ${item.powerSpikes.join(" ")}` })),
    ...aoe3Cards.map((item) => ({ type: "Card", title: item.name, href: "/cards", body: `${item.explanation} ${item.timing} ${item.role} ${item.planTags.join(" ")}` })),
    ...aoe3Decks.map((item) => ({ type: "Deck", title: item.title, href: `/decks/${item.id}`, body: `${item.goal} ${item.planTags.join(" ")} ${item.shipmentOrder.join(" ")}` })),
    ...aoe3Plans.map((item) => ({ type: "Plan", title: item.title, href: `/plans/${item.id}`, body: `${item.promise} ${item.shipmentLogic.join(" ")} ${item.branches.join(" ")}` })),
    ...aoe3Maps.map((item) => ({ type: "Map", title: item.name, href: "/maps", body: `${item.type} ${item.natives.join(" ")} ${item.risks.join(" ")} ${item.goodPlanTags.join(" ")}` })),
    ...shipmentScenarios.map((item) => ({ type: "Scenario", title: item.title, href: "/shipments", body: `${item.enemySignal} ${item.lesson} ${item.options.map((option) => option.label).join(" ")}` })),
  ];

  return records
    .map((record) => {
      const haystack = `${record.title} ${record.body}`.toLowerCase();
      const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
      return { ...record, score };
    })
    .filter((record) => record.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 12);
}

export function getCivPlans(civId: string): Plan[] {
  return aoe3Plans.filter((plan) => plan.civId === civId);
}

export function getStarterSelection(civId: string, planId?: string) {
  const plan = planId ? getPlan(planId) : aoe3Plans.find((item) => item.civId === civId);
  const deck = plan ? getDeck(plan.deckId) : aoe3Decks.find((item) => item.civId === civId);
  return unique([...(deck?.coreCardIds ?? []), ...(deck?.flexCardIds ?? [])]);
}
