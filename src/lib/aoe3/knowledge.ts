import {
  aoe3Cards,
  aoe3Civilizations,
  aoe3Decks,
  aoe3Maps,
  aoe3Openings,
  aoe3Plans,
  aoe3Sources,
  getCard,
  getCiv,
  getCivPlans,
  getDeck,
  getDeckCards,
  getOpening,
  getPlan,
  getPlanBundle,
  searchAcademyKnowledge,
  shipmentScenarios,
} from "@/data/aoe3";
import type {
  CivilizationProfile,
  Deck,
  Opening,
  Plan,
  ReviewStatus,
  ShipmentCard,
  SourceLink,
} from "@/data/aoe3/schema";

const PUBLISHED: ReviewStatus[] = ["canonical", "reference-ready"];

export const isPublished = (status: ReviewStatus): boolean => PUBLISHED.includes(status);

export const reviewBadge = (status: ReviewStatus): string => {
  switch (status) {
    case "canonical":
      return "canonical";
    case "reference-ready":
      return "reference-ready";
    case "needs-review":
      return "needs-review (no canonical, validar contra fuente)";
    case "source-backlog":
      return "source-backlog (seed editorial, sin verificar)";
  }
};

const sourceById = (id: string): SourceLink | undefined => aoe3Sources.find((s) => s.id === id);

export const resolveSources = (ids: string[] | undefined) =>
  (ids ?? []).map((id) => sourceById(id)).filter((s): s is SourceLink => Boolean(s));

const formatCiv = (civ: CivilizationProfile) => ({
  id: civ.id,
  name: civ.name,
  region: civ.region,
  difficulty: civ.difficulty,
  identity: civ.identity,
  tempo: civ.tempo,
  powerSpikes: civ.powerSpikes,
  mistakes: civ.mistakes,
  recommendedPlanIds: civ.recommendedPlanIds,
  reviewStatus: civ.reviewStatus,
  reviewBadge: reviewBadge(civ.reviewStatus),
  sources: resolveSources(civ.evidence?.sourceIds),
});

const formatCard = (card: ShipmentCard) => ({
  id: card.id,
  name: card.name,
  civId: card.civId,
  age: card.age,
  role: card.role,
  timing: card.timing,
  explanation: card.explanation,
  competesWith: card.competesWith,
  planTags: card.planTags,
  modeTags: card.modeTags,
  reviewStatus: card.reviewStatus,
  reviewBadge: reviewBadge(card.reviewStatus),
  sources: resolveSources([card.sourceId]),
});

const formatDeck = (deck: Deck) => ({
  id: deck.id,
  title: deck.title,
  civId: deck.civId,
  mode: deck.mode,
  planTags: deck.planTags,
  patch: deck.patch,
  goal: deck.goal,
  coreCardIds: deck.coreCardIds,
  flexCardIds: deck.flexCardIds,
  trapCardIds: deck.trapCardIds,
  shipmentOrder: deck.shipmentOrder,
  reviewStatus: deck.reviewStatus,
  reviewBadge: reviewBadge(deck.reviewStatus),
  sources: resolveSources([deck.sourceId]),
});

const formatOpening = (opening: Opening) => ({
  id: opening.id,
  title: opening.title,
  civId: opening.civId,
  mode: opening.mode,
  difficulty: opening.difficulty,
  planId: opening.planId,
  benchmark: opening.benchmark,
  crates: opening.crates,
  ageUp: opening.ageUp,
  firstShipmentIds: opening.firstShipmentIds,
  steps: opening.steps,
  scoutChecks: opening.scoutChecks,
  transition: opening.transition,
  reviewStatus: opening.reviewStatus,
  reviewBadge: reviewBadge(opening.reviewStatus),
  sources: resolveSources([opening.sourceId]),
});

const formatPlan = (plan: Plan) => ({
  id: plan.id,
  title: plan.title,
  civId: plan.civId,
  mode: plan.mode,
  archetype: plan.archetype,
  difficulty: plan.difficulty,
  mapTags: plan.mapTags,
  matchupTags: plan.matchupTags,
  promise: plan.promise,
  deckId: plan.deckId,
  openingId: plan.openingId,
  shipmentLogic: plan.shipmentLogic,
  branches: plan.branches,
  benchmarks: plan.benchmarks,
  practiceChecklist: plan.practiceChecklist,
  reviewStatus: plan.reviewStatus,
  reviewBadge: reviewBadge(plan.reviewStatus),
  sources: resolveSources([plan.sourceId]),
});

type ToolError = { error: string; hint?: string; suggestions?: string[] };

export type ToolResult =
  | { ok: true; type: string; data: unknown }
  | ({ ok: false } & ToolError);

const ok = (type: string, data: unknown): ToolResult => ({ ok: true, type, data });
const fail = (error: string, extras: Omit<ToolError, "error"> = {}): ToolResult => ({ ok: false, error, ...extras });

export const tools = {
  list_civs(): ToolResult {
    return ok(
      "civ_index",
      aoe3Civilizations.map((c) => ({
        id: c.id,
        name: c.name,
        region: c.region,
        difficulty: c.difficulty,
        reviewStatus: c.reviewStatus,
      })),
    );
  },

  get_civ(args: { id: string }): ToolResult {
    const civ = getCiv(args.id);
    if (!civ) {
      return fail(`No existe civ con id "${args.id}".`, {
        suggestions: aoe3Civilizations.slice(0, 6).map((c) => c.id),
      });
    }
    return ok("civ", formatCiv(civ));
  },

  list_plans_for_civ(args: { civId: string }): ToolResult {
    const civ = getCiv(args.civId);
    if (!civ) return fail(`No existe civ "${args.civId}".`);
    const plans = getCivPlans(args.civId);
    if (plans.length === 0) {
      return fail(`La civ "${args.civId}" aun no tiene planes canonical. Resultado limitado a placeholder.`, {
        suggestions: civ.recommendedPlanIds,
      });
    }
    return ok(
      "plan_index",
      plans.map((p) => ({
        id: p.id,
        title: p.title,
        archetype: p.archetype,
        difficulty: p.difficulty,
        mode: p.mode,
        reviewStatus: p.reviewStatus,
      })),
    );
  },

  get_plan(args: { id: string }): ToolResult {
    const bundle = getPlanBundle(args.id);
    if (!bundle?.plan) {
      return fail(`No existe plan con id "${args.id}".`, {
        suggestions: aoe3Plans.slice(0, 6).map((p) => p.id),
      });
    }
    return ok("plan_bundle", {
      plan: formatPlan(bundle.plan),
      civ: bundle.civ ? formatCiv(bundle.civ) : null,
      deck: bundle.deck ? formatDeck(bundle.deck) : null,
      opening: bundle.opening ? formatOpening(bundle.opening) : null,
    });
  },

  get_deck(args: { id: string }): ToolResult {
    const deck = getDeck(args.id);
    if (!deck) return fail(`No existe deck con id "${args.id}".`);
    const cards = getDeckCards(deck);
    return ok("deck", {
      ...formatDeck(deck),
      cards: cards.map(formatCard),
    });
  },

  get_card(args: { id: string }): ToolResult {
    const card = getCard(args.id);
    if (!card) return fail(`No existe carta con id "${args.id}".`);
    return ok("card", formatCard(card));
  },

  get_opening(args: { id: string }): ToolResult {
    const opening = getOpening(args.id);
    if (!opening) return fail(`No existe opening con id "${args.id}".`);
    return ok("opening", formatOpening(opening));
  },

  get_matchup_brief(args: { ownCivId: string; enemyCivId: string }): ToolResult {
    const own = getCiv(args.ownCivId);
    const enemy = getCiv(args.enemyCivId);
    if (!own) return fail(`No existe civ propia "${args.ownCivId}".`);
    if (!enemy) return fail(`No existe civ rival "${args.enemyCivId}".`);

    const ownPlans = getCivPlans(args.ownCivId).map(formatPlan);
    if (ownPlans.length === 0) {
      return fail(
        `Sin plan canonical para ${own.name}. La academia aun no tiene corpus de matchup ${own.name} vs ${enemy.name}.`,
        { hint: "Consulta /matchups para arquetipos editoriales y /source-queue para fuentes priorizadas." },
      );
    }
    const scenarios = shipmentScenarios
      .filter((s) => s.civId === args.ownCivId)
      .slice(0, 4)
      .map((s) => ({ id: s.id, title: s.title, enemySignal: s.enemySignal, lesson: s.lesson }));

    return ok("matchup_brief", {
      ownCiv: formatCiv(own),
      enemyCiv: formatCiv(enemy),
      ownPlans,
      scenarios,
      note:
        "Brief editorial. La academia carga arquetipos vs civ-vs-civ exacto; el campo `matchupTags` del plan indica contra que arquetipo encaja.",
    });
  },

  search_knowledge(args: { query: string }): ToolResult {
    const results = searchAcademyKnowledge(args.query);
    if (results.length === 0) {
      return fail(`Sin resultados para "${args.query}".`, {
        hint: "Reformula con civ, plan o termino del juego (shipment, age-up, deck, mapa).",
      });
    }
    return ok("knowledge_results", results);
  },

  list_sources(): ToolResult {
    return ok("source_index", aoe3Sources.map((s) => ({ id: s.id, label: s.label, url: s.url, priority: s.priority })));
  },

  list_maps(): ToolResult {
    return ok(
      "map_index",
      aoe3Maps.map((m) => ({
        id: m.id,
        name: m.name,
        type: m.type,
        tradeRoute: m.tradeRoute,
        water: m.water,
        natives: m.natives,
        goodPlanTags: m.goodPlanTags,
        reviewStatus: m.reviewStatus,
      })),
    );
  },
} as const;

export type ToolName = keyof typeof tools;

export const TOOL_SCHEMAS = [
  {
    name: "list_civs",
    description: "Lista las civilizaciones de la academia con id, nombre y estado de revisión.",
    parameters: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_civ",
    description: "Devuelve el perfil completo de una civilización por id (ej: french, british, ottomans).",
    parameters: {
      type: "object",
      properties: { id: { type: "string", description: "id de la civilización" } },
      required: ["id"],
    },
  },
  {
    name: "list_plans_for_civ",
    description: "Lista los planes (build/decisión estratégica) para una civilización.",
    parameters: {
      type: "object",
      properties: { civId: { type: "string" } },
      required: ["civId"],
    },
  },
  {
    name: "get_plan",
    description:
      "Devuelve un plan completo: civ + deck + opening + shipmentLogic + branches + benchmarks. Cita sourceIds.",
    parameters: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
  },
  {
    name: "get_deck",
    description: "Devuelve el deck por id con sus cartas core/flex/trap resueltas.",
    parameters: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
  },
  {
    name: "get_card",
    description: "Devuelve una carta de envío por id: timing, rol, planTags, modeTags, competidores.",
    parameters: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
  },
  {
    name: "get_opening",
    description: "Devuelve un opening con pasos temporalizados, scoutChecks y transición.",
    parameters: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
  },
  {
    name: "get_matchup_brief",
    description:
      "Brief editorial de matchup: civ propia vs civ rival. Si no hay corpus específico, devuelve arquetipos.",
    parameters: {
      type: "object",
      properties: {
        ownCivId: { type: "string" },
        enemyCivId: { type: "string" },
      },
      required: ["ownCivId", "enemyCivId"],
    },
  },
  {
    name: "search_knowledge",
    description:
      "Búsqueda full-text en civs, cartas, decks, planes, mapas y escenarios. Devuelve top 12 con href.",
    parameters: {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"],
    },
  },
  {
    name: "list_sources",
    description: "Lista las fuentes registradas en la academia con priority (P0/P1/P2/Monitor).",
    parameters: { type: "object", properties: {}, required: [] },
  },
  {
    name: "list_maps",
    description: "Lista los mapas con tradeRoute, water, natives y goodPlanTags.",
    parameters: { type: "object", properties: {}, required: [] },
  },
] as const;

export const SYSTEM_PROMPT = `Eres Coach AoE3, un asistente táctico de Academia AoE3.

Reglas inquebrantables:
- Solo respondes usando las tools disponibles. Si una afirmación no se puede sostener con una tool, di "no tengo datos verificados" y sugiere consultar /source-queue.
- Cita siempre los sourceIds devueltos por las tools (ej: "fuente: aoe3-explorer").
- Si la tool devuelve un item con reviewStatus distinto de "canonical" o "reference-ready", advierte explícitamente: "(needs-review: validar antes de jugar ranked)".
- No inventes timings, decks ni cartas. No completes información que la tool no haya devuelto.
- Separa SIEMPRE Supremacy 1v1 de Treaty y Team Games; si la pregunta no especifica modo, asume Supremacy 1v1 y dilo.
- AoE3 ≠ AoE2 ≠ AoE4: no traduzcas concepts de otros juegos sin advertir.

Formato de respuesta:
1. Resumen en 1-2 frases (qué recomiendas hacer).
2. Tools usadas y sourceIds.
3. Si aplica, advertencias de reviewStatus.
4. Siguiente paso accionable (ej: "abre /plans/<id>", "practica con /opening-timer").`;
