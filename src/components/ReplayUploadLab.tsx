"use client";

import { useEffect, useMemo, useState } from "react";
import { FileText, ShieldCheck, Timer } from "@/components/icons";

type ReplayQueueItem = {
  id: string;
  fileName: string;
  size: number;
  extension: string;
  lastModified: string;
  player: string;
  civ: string;
  notes: string;
  status: "queued" | "parsed-local" | "needs-validation";
};

const storageKey = "academia-aoe3:replay-queue";

function readQueue(): ReplayQueueItem[] {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as ReplayQueueItem[];
  } catch {
    return [];
  }
}

function formatBytes(value: number) {
  if (value > 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`;
  if (value > 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${value} B`;
}

export function ReplayUploadLab({ mode = "analysis" }: { mode?: "analysis" | "submit" }) {
  const [queue, setQueue] = useState<ReplayQueueItem[]>([]);
  const [player, setPlayer] = useState("Mi nick");
  const [civ, setCiv] = useState("French");
  const [notes, setNotes] = useState("Perdi a rush; quiero saber si el 700 coin fue greedy.");
  const [message, setMessage] = useState("Esperando .age3Yrec");

  useEffect(() => {
    setQueue(readQueue());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(queue));
  }, [queue]);

  const latest = queue[0];
  const command = useMemo(() => {
    const name = latest?.fileName ?? "mi-partida.age3Yrec";
    return `node scripts/replay-fixture.mjs --replay fixtures/replays/raw/${name} --json`;
  }, [latest?.fileName]);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    const ok = extension === "age3yrec" || extension === "age3ysav" || extension === "json" || extension === "txt";
    if (!ok) {
      setMessage("Formato no reconocido. Sube .age3Yrec, .age3Ysav, .json o .txt.");
      return;
    }
    const item: ReplayQueueItem = {
      id: `${Date.now()}-${file.name}`,
      fileName: file.name,
      size: file.size,
      extension,
      lastModified: new Date(file.lastModified).toISOString().slice(0, 10),
      player,
      civ,
      notes,
      status: extension === "json" || extension === "txt" ? "needs-validation" : "queued",
    };
    setQueue((current) => [item, ...current].slice(0, 30));
    setMessage(`${file.name} agregado a la cola local.`);
  }

  function clearQueue() {
    setQueue([]);
    setMessage("Cola local vaciada.");
  }

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>{mode === "submit" ? "Enviar replay" : "Replay upload"}</h3>
        <label className="field">
          Nick / jugador
          <input value={player} onChange={(event) => setPlayer(event.target.value)} />
        </label>
        <label className="field">
          Civ jugada
          <input value={civ} onChange={(event) => setCiv(event.target.value)} />
        </label>
        <label className="field">
          Que quieres revisar
          <textarea className="small-textarea" value={notes} onChange={(event) => setNotes(event.target.value)} />
        </label>
        <label
          className="drop-zone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            void handleFiles(event.dataTransfer.files);
          }}
        >
          <FileText size={24} aria-hidden="true" />
          <strong>Suelta el replay aqui</strong>
          <span>.age3Yrec / .age3Ysav / JSON / texto</span>
          <input type="file" accept=".age3Yrec,.age3Ysav,.json,.txt" onChange={(event) => void handleFiles(event.target.files)} />
        </label>
        <p className="muted">{message}</p>
        <button className="button secondary" type="button" onClick={clearQueue}>
          Vaciar cola
        </button>
      </aside>

      <section className="stack">
        <article className="career-hero-card card">
          <div>
            <span className="eyebrow">
              <ShieldCheck size={15} aria-hidden="true" /> Cola local primero
            </span>
            <h2>Vercel no ejecuta el parser Python; la web prepara el fixture y el repo lo procesa.</h2>
            <p>El upload guarda metadatos y contexto en localStorage. Para analysis canonical hay que copiar el replay a fixtures y ejecutar el parser local.</p>
          </div>
          <div className="score-plate compact">
            <span>Queue</span>
            <strong>{queue.length}</strong>
            <small>items</small>
          </div>
        </article>

        <section className="grid two">
          <article className="card">
            <h3>Comando local</h3>
            <div className="source-action">
              <strong>Parser</strong>
              <p className="prompt-box">{command}</p>
            </div>
            <ul className="list">
              <li>1. Copiar replay a `fixtures/replays/raw/`.</li>
              <li>2. Ejecutar parser local.</li>
              <li>3. Validar en AOE3 Explorer o FreeFoodParty.</li>
              <li>4. Publicar analisis con fuente y patch.</li>
            </ul>
          </article>
          <article className="card">
            <h3>Estado de cola</h3>
            <div className="timeline">
              {queue.map((item) => (
                <div className="timeline-step" key={item.id}>
                  <span className="time">
                    <Timer size={14} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{item.fileName}</strong>
                    <p>{item.player} / {item.civ} / {formatBytes(item.size)} / {item.status}</p>
                    <small className="muted">{item.notes}</small>
                  </div>
                </div>
              ))}
              {!queue.length ? <p className="muted">No hay replays en cola todavia.</p> : null}
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}
