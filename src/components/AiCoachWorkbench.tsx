"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, ShieldCheck } from "@/components/icons";
import { coachTools, contentCitations, provenanceSummary, searchAcademyKnowledge } from "@/data/aoe3";

export function AiCoachWorkbench() {
  const [query, setQuery] = useState("muero a rush con french semi ff");
  const [toolId, setToolId] = useState(coachTools[0].id);
  const tool = coachTools.find((item) => item.id === toolId) ?? coachTools[0];
  const results = useMemo(() => searchAcademyKnowledge(query), [query]);
  const citations = contentCitations.slice(0, 6);

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>IA con citas internas</h3>
        <label className="field">
          Pregunta
          <textarea className="small-textarea" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <label className="field">
          Tool
          <select value={toolId} onChange={(event) => setToolId(event.target.value)}>
            {coachTools.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <div className="mini-stats">
          <div className="mini-card">
            <strong>{provenanceSummary.sources}</strong>
            <p>fuentes</p>
          </div>
          <div className="mini-card">
            <strong>{provenanceSummary.citations}</strong>
            <p>citas</p>
          </div>
        </div>
      </aside>

      <section className="stack">
        <article className="career-hero-card card">
          <div>
            <span className="eyebrow">
              <ShieldCheck size={15} aria-hidden="true" /> Guardrail anti-invencion
            </span>
            <h2>El coach solo puede responder desde corpus, tools y provenance.</h2>
            <p>{tool.guardrail}</p>
            <div className="meta-row">
              {tool.allowedSources.map((source) => (
                <span className="pill" key={source}>
                  {source}
                </span>
              ))}
            </div>
          </div>
          <Link className="button secondary" href={tool.href}>
            Abrir tool <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </article>

        <section className="grid two">
          <article className="card">
            <h3>Respuesta simulada</h3>
            <p className="lead-small">
              Con el corpus actual, empezaria por buscar una decision de shipment y un dato de scouting. Si no hay fuente
              canonical, la respuesta debe declararse como seed o fixture pendiente.
            </p>
            <ul className="list">
              <li>Tool activa: {tool.label}</li>
              <li>Input esperado: {tool.input}</li>
              <li>Output permitido: {tool.output}</li>
            </ul>
          </article>
          <article className="card">
            <h3>Resultados del Knowledge Core</h3>
            <div className="stack">
              {results.slice(0, 5).map((result) => (
                <Link className="mini-card" href={result.href} key={`${result.type}-${result.title}`}>
                  <strong>
                    <Search size={14} aria-hidden="true" /> {result.title}
                  </strong>
                  <p>{result.type}: {result.body}</p>
                </Link>
              ))}
              {!results.length ? <p className="muted">Sin resultados: el coach debe decir que falta corpus.</p> : null}
            </div>
          </article>
        </section>

        <article className="card">
          <h3>Citas disponibles</h3>
          <div className="citation-grid">
            {citations.map((citation) => (
              <div className="mini-card" key={citation.id}>
                <strong>{citation.contentType} / {citation.field}</strong>
                <p>{citation.statement}</p>
                <span className="pill">{citation.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
