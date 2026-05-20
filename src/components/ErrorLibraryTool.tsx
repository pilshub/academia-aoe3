"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "@/components/icons";
import { errorLibrary, getTrustLevel, type ErrorLibraryItem } from "@/data/aoe3";

const categories: Array<ErrorLibraryItem["category"] | "Todos"> = ["Todos", "Eco", "Scouting", "Deck", "Shipments", "Army", "Map", "Mindset"];

export function ErrorLibraryTool() {
  const [category, setCategory] = useState<ErrorLibraryItem["category"] | "Todos">("Todos");
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    const term = query.toLowerCase().trim();
    return errorLibrary.filter((item) => {
      const categoryMatch = category === "Todos" || item.category === category;
      const queryMatch = !term || `${item.symptom} ${item.diagnosis} ${item.fix}`.toLowerCase().includes(term);
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Biblioteca de errores</h3>
        <label className="field">
          Buscar
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="rush, housed, deck, scout..." />
        </label>
        <label className="field">
          Categoria
          <select value={category} onChange={(event) => setCategory(event.target.value as ErrorLibraryItem["category"] | "Todos")}>
            {categories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </aside>

      <section className="stack">
        <article className="career-hero-card card">
          <div>
            <span className="eyebrow">
              <AlertTriangle size={15} aria-hidden="true" /> Diagnostico accionable
            </span>
            <h2>Una derrota no vale nada hasta convertirse en un error nombrado.</h2>
            <p>La biblioteca agrupa sintomas comunes y los manda a herramientas concretas, no a consejos vagos.</p>
          </div>
          <div className="score-plate compact">
            <span>Errores</span>
            <strong>{items.length}</strong>
            <small>filtrados</small>
          </div>
        </article>

        <div className="error-grid">
          {items.map((item) => {
            const trust = getTrustLevel(item.confidence);
            return (
              <article className="card error-card" key={item.id}>
                <div className="card-top">
                  <span className="status">{item.category}</span>
                  <span className={`pill ${trust.badgeClass}`}>{trust.label}</span>
                </div>
                <h3>{item.symptom}</h3>
                <p>{item.diagnosis}</p>
                <div className="result-box">
                  <strong>Correccion</strong>
                  <p>{item.fix}</p>
                </div>
                <ul className="list">
                  <li>
                    <CheckCircle2 size={15} aria-hidden="true" /> Drill: {item.drill}
                  </li>
                </ul>
                <div className="meta-row">
                  {item.routes.map((href) => (
                    <Link className="pill" href={href} key={href}>
                      {href} <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
