"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Castle, CheckCircle2 } from "@/components/icons";
import { aoe3Civilizations, getCivPlans, getMasteryStages } from "@/data/aoe3";

export function CivMasteryBoard() {
  const [civId, setCivId] = useState("french");
  const civ = aoe3Civilizations.find((item) => item.id === civId) ?? aoe3Civilizations[0];
  const stages = useMemo(() => getMasteryStages(civ.id), [civ.id]);
  const plans = getCivPlans(civ.id);

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Civ mastery</h3>
        <label className="field">
          Civilizacion
          <select value={civId} onChange={(event) => setCivId(event.target.value)}>
            {aoe3Civilizations.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <div className="civ-master-badge" style={{ "--accent": civ.accent } as React.CSSProperties}>
          <span>{civ.shortName}</span>
          <strong>{civ.name}</strong>
          <small>{civ.difficulty}</small>
        </div>
      </aside>

      <section className="stack">
        <article className="career-hero-card card">
          <div>
            <span className="eyebrow">
              <Castle size={15} aria-hidden="true" /> Ruta por civilizacion
            </span>
            <h2>{civ.identity}</h2>
            <p>{civ.tempo}</p>
            <div className="meta-row">
              {civ.powerSpikes.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className="card">
          <h3>5 niveles</h3>
          <div className="mastery-lane vertical">
            {stages.map((stage) => (
              <Link className="mastery-node" href={stage.route} key={stage.level}>
                <span>{stage.level}</span>
                <strong>{stage.title}</strong>
                <p>{stage.unlock}</p>
                <small>{stage.drill}</small>
              </Link>
            ))}
          </div>
        </article>

        <section className="grid two">
          <article className="card">
            <h3>Errores tipicos</h3>
            <ul className="list">
              {civ.mistakes.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Planes disponibles</h3>
            <ul className="list">
              {plans.length ? (
                plans.map((plan) => (
                  <li key={plan.id}>
                    <Link href={`/plans/${plan.id}`}>
                      {plan.title} <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </li>
                ))
              ) : (
                <li>Plan pendiente: esta civ queda en source-backlog.</li>
              )}
            </ul>
          </article>
        </section>
      </section>
    </div>
  );
}
