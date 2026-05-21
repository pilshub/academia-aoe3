"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, Timer, WalletCards } from "@/components/icons";
import { replayImportSample } from "@/data/aoe3/replaySamples";
import { detectDeterministicMistakes, parseReplay } from "@/lib/aoe3/replay-normalizer";

export function ReplayImportLab() {
  const [input, setInput] = useState(replayImportSample);
  const report = useMemo(() => parseReplay(input), [input]);
  const likelyMistakes = useMemo(() => detectDeterministicMistakes(report), [report]);

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Import</h3>
        <label className="field">
          JSON o texto del parser
          <textarea className="replay-input" value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
        <div className="meta-row">
          <span className="pill">{report.header.source}</span>
          <span className="pill">{report.evidence.confidence}</span>
          <span className="pill">{report.evidence.status}</span>
        </div>
      </aside>

      <section className="stack">
        <article className="card">
          <div className="card-top">
            <span className="icon-tile">
              <FileText size={20} aria-hidden="true" />
            </span>
            <span className="status">{report.header.map ?? "mapa pendiente"}</span>
          </div>
          <h3>Replay normalizado</h3>
          <p>
            {report.header.duration ?? "Duracion pendiente"} / {report.header.mode ?? "modo pendiente"} / patch {report.header.patch ?? "unknown"}
          </p>
          <div className="grid two">
            {report.header.players.map((player) => (
              <div className="mini-card" key={player.name}>
                <strong>{player.name}</strong>
                <p>{player.civ ?? "civ pendiente"} / {player.result ?? "Unknown"}</p>
                <span className="muted">{player.deck?.length ? `${player.deck.length} cartas detectadas` : "deck no detectado"}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <h3>Timeline</h3>
          <div className="timeline">
            {report.timeline.map((event, index) => (
              <div className="timeline-step" key={`${event.time}-${event.label}-${index}`}>
                <span className="time">{event.time}</span>
                <div>
                  <strong>{event.player ?? "?"}: {event.label}</strong>
                  <p>{event.type} / confianza {event.confidence}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <section className="grid two">
          <article className="card">
            <h3>Detecciones</h3>
            <ul className="list">
              {likelyMistakes.map((item) => (
                <li key={item}>
                  <AlertTriangle size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Campos extraidos</h3>
            <ul className="list">
              <li><CheckCircle2 size={15} aria-hidden="true" /> {report.shipments.length} shipments</li>
              <li><Timer size={15} aria-hidden="true" /> {report.ageUps.length} age-ups</li>
              <li><WalletCards size={15} aria-hidden="true" /> {report.header.players.reduce((sum, player) => sum + (player.deck?.length ?? 0), 0)} cartas de deck</li>
            </ul>
          </article>
        </section>

        {report.warnings.length ? (
          <article className="card">
            <h3>Warnings</h3>
            <ul className="list">
              {report.warnings.map((warning) => (
                <li key={warning}>
                  <AlertTriangle size={15} aria-hidden="true" /> {warning}
                </li>
              ))}
            </ul>
          </article>
        ) : null}
      </section>
    </div>
  );
}
