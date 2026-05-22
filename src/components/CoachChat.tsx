"use client";

import { useEffect, useState } from "react";
import { Search } from "@/components/icons";

type Message = { role: "user" | "assistant"; content: string };

type ChatResponse =
  | { mode: "coach"; model: string; message: string }
  | { mode: "knowledge-only"; note: string; query: string; result: unknown }
  | { error: string };

const HISTORY_KEY = "academia-aoe3-coach-history-v1";

function loadHistory(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (m): m is Message =>
          Boolean(m) && typeof m === "object" && "role" in m && "content" in m,
      );
    }
  } catch {
    // ignore corrupted history
  }
  return [];
}

function saveHistory(messages: Message[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-20)));
  } catch {
    // localStorage may be full or disabled
  }
}

export function CoachChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(
    "Soy french en mapa abierto. Me rushean con otomanos. ¿Qué shipment cambia mi plan?",
  );
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMessages(loadHistory());
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const next: Message[] = [...messages, { role: "user", content: input }];
    setMessages(next);
    saveHistory(next);
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as ChatResponse;
      setResponse(data);
      if ("message" in data && data.message) {
        const updated: Message[] = [...next, { role: "assistant", content: data.message }];
        setMessages(updated);
        saveHistory(updated);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    saveHistory([]);
    setResponse(null);
  };

  return (
    <article className="card">
      <div className="card-top">
        <span className="icon-tile">
          <Search size={20} aria-hidden="true" />
        </span>
        <span className="status">POST /api/chat</span>
      </div>
      <h3>Coach AoE3 con tools</h3>
      <p className="lead-small">
        Endpoint cableado al Knowledge Core con <strong>20 tools</strong>. Sin <code>OPENROUTER_API_KEY</code> responde con
        búsqueda directa en corpus (modo <code>knowledge-only</code>). Con clave, ejecuta tool-calling sobre civs, planes,
        decks, cards, openings, mapas, politicians, units, techs, civ-guides, crate-starts, treasures, counters, hotkeys
        y replay-summary.
      </p>

      {messages.length > 0 ? (
        <article className="card" style={{ background: "rgba(255,255,255,0.03)", marginBottom: "1rem" }}>
          <div className="card-top">
            <h3 style={{ margin: 0 }}>Historial ({messages.length})</h3>
            <button className="button secondary" onClick={clearHistory}>
              Limpiar
            </button>
          </div>
          <div className="stack" style={{ maxHeight: 240, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <div key={i} className="mini-card">
                <strong>{m.role === "user" ? "Tú" : "Coach"}:</strong>
                <p style={{ fontSize: "0.85rem", margin: "0.25rem 0 0" }}>{m.content}</p>
              </div>
            ))}
          </div>
        </article>
      ) : null}

      <label className="field">
        Pregunta
        <textarea
          className="small-textarea"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </label>

      <div className="meta-row">
        <button className="button primary" onClick={send} disabled={loading}>
          {loading ? "Consultando..." : "Preguntar"}
        </button>
        <span className="pill">tools: 20</span>
        <span className="pill">guardrails on</span>
        <span className="pill">history local</span>
      </div>

      {error ? (
        <p className="muted" style={{ color: "var(--accent, currentColor)" }}>
          Error: {error}
        </p>
      ) : null}

      {response && "mode" in response && response.mode === "knowledge-only" ? (
        <div className="stack">
          <p className="muted">{response.note}</p>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem" }}>
            {JSON.stringify(response.result, null, 2)}
          </pre>
        </div>
      ) : null}

      {response && "mode" in response && response.mode === "coach" ? (
        <div className="stack">
          <span className="pill">model: {response.model}</span>
          <p>{response.message}</p>
        </div>
      ) : null}

      {response && "error" in response ? (
        <p className="muted">Respuesta del endpoint: {response.error}</p>
      ) : null}
    </article>
  );
}
