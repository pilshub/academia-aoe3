import { ExternalLink, ShieldCheck } from "@/components/icons";
import { evidenceLabel, resolveEvidenceSources } from "@/data/aoe3";
import type { EvidenceRef } from "@/data/aoe3";

export function EvidencePanel({
  evidence,
  fallbackSourceId,
  compact = false,
}: {
  evidence?: EvidenceRef;
  fallbackSourceId?: string;
  compact?: boolean;
}) {
  const sources = resolveEvidenceSources(evidence, fallbackSourceId);

  return (
    <section className={compact ? "mini-card evidence-panel" : "card evidence-panel"}>
      <div className="card-top">
        <span className="icon-tile">
          <ShieldCheck size={18} aria-hidden="true" />
        </span>
        <span className="status">{evidenceLabel(evidence)}</span>
      </div>
      <h3>Fuentes internas</h3>
      <p>{evidence?.notes ?? "Fuente pendiente de registrar en provenance."}</p>
      <div className="meta-row">
        {evidence ? (
          <>
            <span className="pill">{evidence.patch}</span>
            <span className="pill">review {evidence.lastReviewed}</span>
          </>
        ) : null}
      </div>
      <div className="source-chip-list">
        {sources.map((source) => (
          <a className="pill" href={source.url} target={source.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={source.id}>
            {source.label} <ExternalLink size={12} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
