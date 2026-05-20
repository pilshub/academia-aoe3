"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ShieldCheck, WalletCards } from "@/components/icons";
import { aoe3Civilizations, auditSelectedDeck, getCardsForCiv, getCivPlans, getDefaultDeckCards, getStarterSelection, type CardRole } from "@/data/aoe3";

const roles: Array<CardRole | "All"> = ["All", "Core", "Defense", "Transition", "Tempo", "Greed", "Flex", "Trap"];

export function SmartDeckBuilder() {
  const [civId, setCivId] = useState("french");
  const [planId, setPlanId] = useState("french-semi-ff");
  const [role, setRole] = useState<CardRole | "All">("All");
  const [selectedIds, setSelectedIds] = useState<string[]>(getDefaultDeckCards("french"));

  const plans = useMemo(() => getCivPlans(civId), [civId]);
  const cards = useMemo(() => getCardsForCiv(civId), [civId]);
  const visibleCards = role === "All" ? cards : cards.filter((card) => card.role === role);
  const report = useMemo(() => auditSelectedDeck(civId, selectedIds, planId), [civId, planId, selectedIds]);
  const roleCounts = roles
    .filter((item): item is CardRole => item !== "All")
    .map((item) => ({ role: item, count: report.selectedCards.filter((card) => card.role === item).length }))
    .filter((item) => item.count > 0);
  const suggestedAdds = cards
    .filter((card) => !selectedIds.includes(card.id))
    .filter((card) => report.missingCore.includes(card.id) || card.role === "Defense" || card.role === "Transition")
    .slice(0, 5);

  function toggle(cardId: string) {
    setSelectedIds((current) => (current.includes(cardId) ? current.filter((id) => id !== cardId) : [...current, cardId]));
  }

  function changeCiv(nextCivId: string) {
    const nextPlan = getCivPlans(nextCivId)[0];
    setCivId(nextCivId);
    setPlanId(nextPlan?.id ?? "");
    setSelectedIds(getDefaultDeckCards(nextCivId));
  }

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Deck Builder</h3>
        <label className="field">
          Civilizacion
          <select value={civId} onChange={(event) => changeCiv(event.target.value)}>
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
              setSelectedIds(getStarterSelection(civId, event.target.value));
            }}
          >
            {plans.map((plan) => (
              <option value={plan.id} key={plan.id}>
                {plan.title}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Rol
          <select value={role} onChange={(event) => setRole(event.target.value as CardRole | "All")}>
            {roles.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button className="button secondary" type="button" onClick={() => setSelectedIds(getStarterSelection(civId, planId))}>
          Cargar deck recomendado
        </button>
      </aside>

      <section className="stack">
        <article className="deck-builder-head card">
          <div className="score-plate compact">
            <span>Deck</span>
            <strong>{report.grade}</strong>
            <small>{report.score}/100</small>
          </div>
          <div>
            <span className="eyebrow">
              <WalletCards size={15} aria-hidden="true" /> {report.plan?.title ?? "Plan pendiente"}
            </span>
            <h2>{report.referenceDeck?.goal ?? report.plan?.promise}</h2>
            <div className="meta-row">
              <span className="pill">{selectedIds.length} cartas</span>
              {roleCounts.map((item) => (
                <span className="pill" key={item.role}>
                  {item.role}: {item.count}
                </span>
              ))}
            </div>
          </div>
        </article>

        <section className="grid two">
          <article className="card">
            <h3>Swaps recomendados</h3>
            <ul className="list">
              {suggestedAdds.length ? (
                suggestedAdds.map((card) => (
                  <li key={card.id}>
                    <button className="inline-action" type="button" onClick={() => toggle(card.id)}>
                      + {card.name}
                    </button>
                    <span> {card.role} / {card.timing}</span>
                  </li>
                ))
              ) : (
                <li>
                  <CheckCircle2 size={15} aria-hidden="true" /> No hay add obvio con los datos actuales.
                </li>
              )}
            </ul>
          </article>
          <article className="card">
            <h3>Alertas</h3>
            <ul className="list">
              {report.warnings.map((item) => (
                <li key={item}>
                  <ShieldCheck size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <article className="card">
          <h3>Cartas</h3>
          <div className="card-check-grid">
            {visibleCards.map((card) => (
              <label className={`check-card ${selectedIds.includes(card.id) ? "active" : ""}`} key={card.id}>
                <input type="checkbox" checked={selectedIds.includes(card.id)} onChange={() => toggle(card.id)} />
                <span>{card.name}</span>
                <small>{card.age} / {card.role} / {card.reviewStatus}</small>
              </label>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
