import type { MetadataRoute } from "next";
import {
  aoe3Civilizations,
  aoe3Decks,
  aoe3Plans,
  seoLandingPages,
} from "@/data/aoe3";
import { aoe3CivGuides } from "@/data/aoe3/civGuides";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://academia-aoe3.vercel.app";

const STATIC_ROUTES = [
  "/",
  "/learn",
  "/modes",
  "/modes/treaty",
  "/modes/team",
  "/civs",
  "/decks",
  "/openings",
  "/cards",
  "/matchups",
  "/maps",
  "/shipments",
  "/guides",
  "/civ-guide",
  "/reference",
  "/counter-matrix",
  "/crate-start",
  "/treasure-priority",
  "/hotkeys",
  "/treaty-deck-checker",
  "/knowledge",
  "/career",
  "/civ-mastery",
  "/opening-timer",
  "/replay-coach",
  "/deck-builder",
  "/matchup-scout",
  "/series-prep",
  "/errors",
  "/ai-coach",
  "/trust",
  "/replay-upload",
  "/replay-import",
  "/submit-replay",
  "/replay-lab",
  "/patch-tracker",
  "/source-admin",
  "/source-queue",
  "/source-provenance",
  "/resources",
  "/vod-pipeline",
  "/parser-solution",
  "/analysis",
  "/analyzer",
  "/art-lab",
  "/stats",
  "/roadmap",
  "/academy-os",
  "/deck-checker",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.6,
  }));

  const civEntries = aoe3Civilizations.map((civ) => ({
    url: `${BASE_URL}/civs/${civ.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const planEntries = aoe3Plans.map((plan) => ({
    url: `${BASE_URL}/plans/${plan.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const deckEntries = aoe3Decks.map((deck) => ({
    url: `${BASE_URL}/decks/${deck.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const guideEntries = aoe3CivGuides.map((g) => ({
    url: `${BASE_URL}/civ-guide/${g.civId}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const learnEntries = seoLandingPages.map((page) => ({
    url: `${BASE_URL}/learn/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...civEntries,
    ...planEntries,
    ...deckEntries,
    ...guideEntries,
    ...learnEntries,
  ];
}
