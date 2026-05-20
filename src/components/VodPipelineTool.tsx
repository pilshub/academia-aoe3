"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, FileText } from "@/components/icons";

const stages = ["captura", "metadatos", "tesis", "deck", "shipments", "matchup", "drill", "publicar"];

export function VodPipelineTool() {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=");
  const [creator, setCreator] = useState("SamuraiRevolution / ESOCTV / creador");
  const [notes, setNotes] = useState("Civ: French. Tema: semi-FF vs rush. Minutos clave: 4:30 scout, 6:30 shipment.");
  const checklist = useMemo(
    () => [
      `Fuente: ${url.includes("youtube") ? "YouTube" : url.includes("twitch") ? "Twitch" : "URL externa"}`,
      `Creador: ${creator}`,
      notes.toLowerCase().includes("civ") ? "Civ candidata detectada en notas." : "Falta civ normalizada.",
      notes.toLowerCase().includes("shipment") ? "Tiene pista de shipments." : "Faltan shipments.",
      notes.toLowerCase().includes("min") || /\d:\d/.test(notes) ? "Tiene minutos candidatos." : "Faltan timestamps.",
    ],
    [creator, notes, url],
  );

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>VOD pipeline</h3>
        <label className="field">
          URL video/VOD
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </label>
        <label className="field">
          Creador
          <input value={creator} onChange={(event) => setCreator(event.target.value)} />
        </label>
        <label className="field">
          Notas
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
        </label>
      </aside>
      <section className="stack">
        <article className="career-hero-card card">
          <div>
            <span className="eyebrow">
              <FileText size={15} aria-hidden="true" /> Video a contenido
            </span>
            <h2>Un VOD no se publica: se convierte en deck, matchup, drill y cita.</h2>
            <p>La herramienta prepara la extraccion editorial; transcripcion y scraping automatico quedan como adapter futuro.</p>
          </div>
        </article>
        <section className="grid two">
          <article className="card">
            <h3>Checklist de ingestion</h3>
            <ul className="list">
              {checklist.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Pipeline</h3>
            <div className="timeline">
              {stages.map((stage, index) => (
                <div className="timeline-step" key={stage}>
                  <span className="time">#{index + 1}</span>
                  <div>
                    <strong>{stage}</strong>
                    <p>{stage === "publicar" ? "Solo si tiene fuente, patch-risk y reviewStatus." : "Extraer y guardar como borrador verificable."}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}
