"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, PackageOpen, Timer } from "@/components/icons";
import { getCard, getCiv, getPlan, shipmentScenarios } from "@/data/aoe3";

export function ShipmentTrainer() {
  const [scenarioId, setScenarioId] = useState(shipmentScenarios[0]?.id ?? "");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const scenario = shipmentScenarios.find((item) => item.id === scenarioId) ?? shipmentScenarios[0];
  const selected = scenario?.options.find((option) => option.cardId === selectedCardId) ?? null;
  const civ = scenario ? getCiv(scenario.civId) : null;
  const plan = scenario ? getPlan(scenario.planId) : null;

  const nextScenario = useMemo(() => {
    if (!scenario) return null;
    const index = shipmentScenarios.findIndex((item) => item.id === scenario.id);
    return shipmentScenarios[(index + 1) % shipmentScenarios.length] ?? null;
  }, [scenario]);

  if (!scenario) return null;

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Escenarios</h3>
        <div className="stack">
          {shipmentScenarios.map((item) => {
            const itemCiv = getCiv(item.civId);
            return (
              <button
                className={`choice-row ${item.id === scenario.id ? "active" : ""}`}
                type="button"
                key={item.id}
                onClick={() => {
                  setScenarioId(item.id);
                  setSelectedCardId(null);
                  setAnswered(false);
                }}
              >
                <span className="choice-mark" style={{ background: itemCiv?.accent }} aria-hidden="true" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="card">
        <div className="card-top">
          <span className="icon-tile">
            <PackageOpen size={22} aria-hidden="true" />
          </span>
          <span className="status">{scenario.age} / {scenario.minute}</span>
        </div>
        <h3>{scenario.title}</h3>
        <p>{scenario.question}</p>
        <div className="meta-row">
          <span className="pill">{civ?.name ?? scenario.civId}</span>
          <span className="pill">{plan?.archetype ?? "Plan"}</span>
          <span className="pill">{plan?.mode ?? "Supremacy"}</span>
        </div>

        <div className="decision-panel">
          <div>
            <strong>Mapa</strong>
            <p>{scenario.mapState}</p>
          </div>
          <div>
            <strong>Senal rival</strong>
            <p>{scenario.enemySignal}</p>
          </div>
        </div>

        <div className="option-grid" role="list">
          {scenario.options.map((option) => {
            const card = getCard(option.cardId);
            const isSelected = selectedCardId === option.cardId;
            return (
              <button
                type="button"
                className={`option-card ${isSelected ? "active" : ""} ${answered ? option.verdict : ""}`}
                key={option.cardId}
                onClick={() => {
                  setSelectedCardId(option.cardId);
                  setAnswered(true);
                }}
              >
                <span>{option.label}</span>
                <small>{card?.role ?? "Shipment"}</small>
              </button>
            );
          })}
        </div>

        <div className="result-box" aria-live="polite">
          {answered && selected ? (
            <>
              <div className="card-top">
                <strong>{selected.verdict === "best" ? "Decision correcta" : "Decision revisable"}</strong>
                <span className="status">{selected.verdict}</span>
              </div>
              <p>{selected.explanation}</p>
              <p>
                <CheckCircle2 size={15} aria-hidden="true" /> {scenario.lesson}
              </p>
            </>
          ) : (
            <p>
              <Timer size={15} aria-hidden="true" /> Elige un shipment. El entrenador evalua la decision, no solo si la carta
              es fuerte en abstracto.
            </p>
          )}
        </div>

        {nextScenario ? (
          <button
            className="button secondary"
            type="button"
            onClick={() => {
              setScenarioId(nextScenario.id);
              setSelectedCardId(null);
              setAnswered(false);
            }}
          >
            Siguiente escenario
          </button>
        ) : null}
      </section>
    </div>
  );
}

