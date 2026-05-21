"use client";

import { useState } from "react";
import { Search } from "@/components/icons";

type Message = { role: "user" | "assistant"; content: string };

type ChatResponse =
  | { mode: "coach"; model: string; message: string }
  | { mode: "knowledge-only"; note: string; query: string; result: unknown }
  | { error: string };

export function CoachChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("Soy french en mapa abierto. Me rushean con otomanos. ¿Qué shipment cambia mi plan?");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    if (!input.trim()) return;
    const next: Message[] = [...messages, { role: "user", content: input }];
    setMessages(next);
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
        setMessages([...next, { role: "assistant", content: data.message }]);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
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
        Endpoint cableado al Knowledge Core. Sin <code>OPENROUTER_API_KEY</code> responde con búsqueda directa en corpus
        (modo <code>knowledge-only</code>). Con clave, ejecuta tool-calls (get_plan, get_deck, get_card, etc) sobre el
        corpus canonical.
      </p>

      <label className="field">
        Pregunta
        <textarea className="small-textarea" value={input} onChange={(event) => setInput(event.target.value)} />
      </label>

      <div className="meta-row">
        <button className="button primary" onClick={send} disabled={loading}>
          {loading ? "Consultando..." : "Preguntar"}
        </button>
        <span className="pill">tools: 11</span>
        <span className="pill">guardrails on</span>
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
