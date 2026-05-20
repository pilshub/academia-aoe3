"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Shield, WalletCards } from "@/components/icons";
import { aoe3Civilizations, auditSelectedDeck, getCardsForCiv, getCivPlans, getStarterSelection } from "@/data/aoe3";

export function DeckChecker() {
  const [civId, setCivId] = useState("french");
  const [planId, setPlanId] = useState("french-semi-ff");
  const [selectedIds, setSelectedIds] = useState<string[]>(getStarterSelection("french", "french-semi-ff"));

  const plans = useMemo(() => getCivPlans(civId), [civId]);
  const cards = useMemo(() => getCardsForCiv(civId), [civId]);
  const report = useMemo(() => auditSelectedDeck(civId, selectedIds, planId), [civId, selectedIds, planId]);

  function toggleCard(cardId: string) {
    setSelectedIds((current) => (current.includes(cardId) ? current.filter((id) => id !== cardId) : [...current, cardId]));
  }

  function loadReference(nextCivId = civId, nextPlanId = planId) {
    setSelectedIds(getStarterSelection(nextCivId, nextPlanId));
  }

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Deck checker</h3>
        <label className="field">
          Civilizacion
          <select
            value={civId}
            onChange={(event) => {
              const nextCivId = event.target.value;
              const nextPlan = getCivPlans(nextCivId)[0];
              setCivId(nextCivId);
              setPlanId(nextPlan?.id ?? "");
              setSelectedIds(getStarterSelection(nextCivId, nextPlan?.id));
            }}
          >
            {aoe3Civilizations.map((civ) => (
              <option value={civ.id} key={civ.id}>
                {civ.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Plan
          <select
            value={planId}
            onChange={(event) => {
              setPlanId(event.target.value);
              loadReference(civId, event.target.value);
            }}
          >
            {plans.map((plan) => (
              <option value={plan.id} key={plan.id}>
                {plan.title}
              </option>
            ))}
          </select>
        </label>
        <button className="button secondary" type="button" onClick={() => loadReference()}>
          Cargar referencia
        </button>
      </aside>

      <section className="card">
        <div className="score-plate compact">
          <span>Deck</span>
          <strong>{report.grade}</strong>
          <small>{report.score}/100</small>
        </div>
        <h3>{report.plan?.title ?? "Plan pendiente"}</h3>
        <p>{report.plan?.promise ?? "Selecciona un plan para medir core, defensa, greed y transicion."}</p>
        <div className="meta-row">
          <span className="pill">{selectedIds.length} cartas seleccionadas</span>
          <span className="pill">{report.referenceDeck?.reviewStatus ?? "source-backlog"}</span>
        </div>

        <div className="grid two">
          <article>
            <h3>Fortalezas</h3>
            <ul className="list">
              {report.strengths.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Alertas</h3>
            <ul className="list">
              {report.warnings.map((item) => (
                <li key={item}>
                  <Shield size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <h3>Cartas disponibles para esta civ</h3>
        <div className="card-check-grid">
          {cards.map((card) => (
            <label className={`check-card ${selectedIds.includes(card.id) ? "active" : ""}`} key={card.id}>
              <input type="checkbox" checked={selectedIds.includes(card.id)} onChange={() => toggleCard(card.id)} />
              <span>
                <WalletCards size={16} aria-hidden="true" /> {card.name}
              </span>
              <small>{card.age} / {card.role}</small>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

