import { aoe3Sources } from "./sources";
import { getProvenanceSource } from "./sourceProvenance";
import type { EvidenceRef } from "./schema";

export const seedEvidence = (notes: string, sourceIds = ["academy-seed"]): EvidenceRef => ({
  sourceIds,
  status: "seed",
  confidence: "low",
  lastReviewed: "2026-05-18",
  patch: "13.690 review pending",
  notes,
});

export const sourceBackedEvidence = (notes: string, sourceIds: string[], evidenceIds?: string[]): EvidenceRef => ({
  sourceIds,
  evidenceIds,
  status: "source-backed",
  confidence: "medium",
  lastReviewed: "2026-05-18",
  patch: "13.690 context",
  notes,
});

export const patchReviewedEvidence = (notes: string, evidenceIds?: string[]): EvidenceRef => ({
  sourceIds: ["official-update-13690"],
  evidenceIds,
  status: "patch-reviewed",
  confidence: "high",
  lastReviewed: "2026-05-18",
  patch: "13.690",
  notes,
});

export function resolveEvidenceSources(evidence?: EvidenceRef, fallbackSourceId?: string) {
  const ids = evidence?.sourceIds?.length ? evidence.sourceIds : fallbackSourceId ? [fallbackSourceId] : [];
  return ids.map((id) => {
    const provenance = getProvenanceSource(id);
    const source = aoe3Sources.find((item) => item.id === id);
    return {
      id,
      label: provenance?.title ?? source?.label ?? id,
      url: provenance?.url ?? source?.url ?? "/source-provenance",
      note: provenance?.sourceFor.join(" / ") ?? source?.note ?? "Fuente pendiente de registrar.",
    };
  });
}

export function evidenceLabel(evidence?: EvidenceRef) {
  if (!evidence) return "sin evidencia";
  return `${evidence.status} / ${evidence.confidence}`;
}
