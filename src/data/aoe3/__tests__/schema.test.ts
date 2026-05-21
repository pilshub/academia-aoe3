import { describe, expect, it } from "vitest";
import {
  aoe3Cards,
  aoe3Civilizations,
  aoe3Decks,
  aoe3Openings,
  aoe3Plans,
  aoe3Sources,
} from "../index";
import type { ReviewStatus } from "../schema";

const PUBLISHED: ReviewStatus[] = ["canonical", "reference-ready"];

const isPublished = (status: ReviewStatus) => PUBLISHED.includes(status);

describe("data integrity", () => {
  it("every civilization has a stable id, accent and review status", () => {
    for (const civ of aoe3Civilizations) {
      expect(civ.id).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(civ.accent).toMatch(/^#[0-9a-f]{6}$/i);
      expect(civ.reviewStatus).toBeDefined();
    }
  });

  it("ids are unique across civs, cards, decks, openings, plans, sources", () => {
    const groups = {
      civs: aoe3Civilizations.map((c) => c.id),
      cards: aoe3Cards.map((c) => c.id),
      decks: aoe3Decks.map((d) => d.id),
      openings: aoe3Openings.map((o) => o.id),
      plans: aoe3Plans.map((p) => p.id),
      sources: aoe3Sources.map((s) => s.id),
    };
    for (const [name, ids] of Object.entries(groups)) {
      expect(new Set(ids).size, `${name} has duplicate ids`).toBe(ids.length);
    }
  });

  it("every deck references a civ that exists", () => {
    const civIds = new Set(aoe3Civilizations.map((c) => c.id));
    for (const deck of aoe3Decks) {
      expect(civIds.has(deck.civId), `deck ${deck.id} -> unknown civ ${deck.civId}`).toBe(true);
    }
  });

  it("every plan references existing civ, deck and opening", () => {
    const civIds = new Set(aoe3Civilizations.map((c) => c.id));
    const deckIds = new Set(aoe3Decks.map((d) => d.id));
    const openingIds = new Set(aoe3Openings.map((o) => o.id));
    for (const plan of aoe3Plans) {
      expect(civIds.has(plan.civId), `plan ${plan.id} -> unknown civ`).toBe(true);
      expect(deckIds.has(plan.deckId), `plan ${plan.id} -> unknown deck`).toBe(true);
      expect(openingIds.has(plan.openingId), `plan ${plan.id} -> unknown opening`).toBe(true);
    }
  });

  it("every opening references an existing plan", () => {
    const planIds = new Set(aoe3Plans.map((p) => p.id));
    for (const opening of aoe3Openings) {
      expect(planIds.has(opening.planId), `opening ${opening.id} -> unknown plan`).toBe(true);
    }
  });

  it("deck card ids resolve to real shipment cards", () => {
    const cardIds = new Set(aoe3Cards.map((c) => c.id));
    for (const deck of aoe3Decks) {
      const refs = [...deck.coreCardIds, ...deck.flexCardIds, ...deck.trapCardIds];
      for (const cardId of refs) {
        expect(cardIds.has(cardId), `deck ${deck.id} -> unknown card ${cardId}`).toBe(true);
      }
    }
  });

  it("published items (canonical | reference-ready) cite at least one source", () => {
    const sourceIds = new Set(aoe3Sources.map((s) => s.id));

    const itemsWithSources = [
      ...aoe3Cards.map((c) => ({ kind: "card", id: c.id, status: c.reviewStatus, ids: [c.sourceId] })),
      ...aoe3Decks.map((d) => ({ kind: "deck", id: d.id, status: d.reviewStatus, ids: [d.sourceId] })),
      ...aoe3Openings.map((o) => ({ kind: "opening", id: o.id, status: o.reviewStatus, ids: [o.sourceId] })),
      ...aoe3Plans.map((p) => ({ kind: "plan", id: p.id, status: p.reviewStatus, ids: [p.sourceId] })),
    ];

    for (const item of itemsWithSources) {
      if (!isPublished(item.status)) continue;
      expect(item.ids.length, `${item.kind} ${item.id} published without sources`).toBeGreaterThan(0);
      for (const sid of item.ids) {
        expect(sourceIds.has(sid), `${item.kind} ${item.id} -> unknown source ${sid}`).toBe(true);
      }
    }
  });

  it("civilization reviewStatus distribution is documented", () => {
    const counts = aoe3Civilizations.reduce<Record<string, number>>((acc, civ) => {
      acc[civ.reviewStatus] = (acc[civ.reviewStatus] ?? 0) + 1;
      return acc;
    }, {});
    // Snapshot-style: at least one civ must be in needs-review or above; nothing forbidden, but the
    // map must exist so we notice if all civs accidentally drop to source-backlog.
    const published = (counts["canonical"] ?? 0) + (counts["reference-ready"] ?? 0) + (counts["needs-review"] ?? 0);
    expect(published).toBeGreaterThan(0);
  });
});
