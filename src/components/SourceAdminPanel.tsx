"use client";

import { useEffect, useState } from "react";
import { ExternalLink, ListTree } from "@/components/icons";

type SourceDraft = {
  id: string;
  url: string;
  title: string;
  kind: "patch" | "video" | "forum" | "reddit" | "tool" | "wiki";
  priority: "P0" | "P1" | "P2" | "Monitor";
  notes: string;
  createdAt: string;
};

const storageKey = "academia-aoe3:source-drafts";

export function SourceAdminPanel() {
  const [items, setItems] = useState<SourceDraft[]>([]);
  const [url, setUrl] = useState("https://www.ageofempires.com/news/");
  const [title, setTitle] = useState("Patch candidate");
  const [kind, setKind] = useState<SourceDraft["kind"]>("patch");
  const [priority, setPriority] = useState<SourceDraft["priority"]>("P1");
  const [notes, setNotes] = useState("Extraer cambios por civ, carta y mapa; no publicar sin patch/date.");

  useEffect(() => {
    try {
      setItems(JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as SourceDraft[]);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  function addItem() {
    if (!url.trim()) return;
    setItems((current) => [
      {
        id: `${Date.now()}`,
        url: url.trim(),
        title: title.trim() || url.trim(),
        kind,
        priority,
        notes,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ]);
  }

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Source admin</h3>
        <label className="field">
          URL
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </label>
        <label className="field">
          Titulo
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label className="field">
          Tipo
          <select value={kind} onChange={(event) => setKind(event.target.value as SourceDraft["kind"])}>
            <option value="patch">patch</option>
            <option value="video">video</option>
            <option value="forum">forum</option>
            <option value="reddit">reddit</option>
            <option value="tool">tool</option>
            <option value="wiki">wiki</option>
          </select>
        </label>
        <label className="field">
          Prioridad
          <select value={priority} onChange={(event) => setPriority(event.target.value as SourceDraft["priority"])}>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="Monitor">Monitor</option>
          </select>
        </label>
        <label className="field">
          Notas de ingestion
          <textarea className="small-textarea" value={notes} onChange={(event) => setNotes(event.target.value)} />
        </label>
        <button className="button" type="button" onClick={addItem}>
          Agregar fuente
        </button>
      </aside>

      <section className="stack">
        <article className="career-hero-card card">
          <div>
            <span className="eyebrow">
              <ListTree size={15} aria-hidden="true" /> Backlog interno
            </span>
            <h2>URL entra como borrador, no como verdad.</h2>
            <p>Este panel crea cola local para convertir fuentes en provenance, source queue, patch risk o contenido candidato.</p>
          </div>
          <div className="score-plate compact">
            <span>Drafts</span>
            <strong>{items.length}</strong>
            <small>local</small>
          </div>
        </article>
        <div className="resource-list">
          {items.map((item) => (
            <article className="card resource-card" key={item.id}>
              <div className="card-top">
                <span className="status">{item.priority}</span>
                <span className="pill">{item.kind}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.notes}</p>
              <div className="meta-row">
                <span className="pill">{item.createdAt}</span>
                <span className="pill">needs-review</span>
              </div>
              <a className="button secondary" href={item.url} target="_blank" rel="noreferrer">
                Abrir <ExternalLink size={15} aria-hidden="true" />
              </a>
            </article>
          ))}
          {!items.length ? <p className="muted">Aun no hay fuentes locales.</p> : null}
        </div>
      </section>
    </div>
  );
}
