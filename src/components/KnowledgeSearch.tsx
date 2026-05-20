"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "@/components/icons";
import { searchAcademyKnowledge } from "@/data/aoe3";

export function KnowledgeSearch() {
  const [query, setQuery] = useState("700 wood rush");
  const results = useMemo(() => searchAcademyKnowledge(query), [query]);

  return (
    <div className="card">
      <label className="field search-field">
        Buscar en el core AoE3
        <span>
          <Search size={17} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej: 700 wood, forward rax, TP, Falconets" />
        </span>
      </label>
      <div className="stack">
        {results.map((result) => (
          <Link className="search-result card compact-card" href={result.href} key={`${result.type}-${result.title}`}>
            <div className="card-top">
              <span className="status">{result.type}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </div>
            <h3>{result.title}</h3>
            <p>{result.body}</p>
          </Link>
        ))}
        {results.length === 0 ? <p className="muted">No hay resultados. Eso tambien es informacion: falta corpus para esa busqueda.</p> : null}
      </div>
    </div>
  );
}
