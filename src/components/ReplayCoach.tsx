"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Eye, Timer } from "@/components/icons";
import { aoe3Plans, replayCoachTemplates } from "@/data/aoe3";

function toSeconds(value: string) {
  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match) return 99999;
  return Number(match[1]) * 60 + Number(match[2]);
}

function splitList(value: string) {
  return value
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ReplayCoach() {
  const [templateId, setTemplateId] = useState(replayCoachTemplates[0].id);
  const [planId, setPlanId] = useState("french-semi-ff");
  const [age2, setAge2] = useState("4:42");
  const [age3, setAge3] = useState("8:55");
  const [ownShipments, setOwnShipments] = useState("3 CDB, 700 Wood, 700 Coin");
  const [enemyFirst, setEnemyFirst] = useState("5 Janissaries 5:20");
  const [scouting, setScouting] = useState("Vi barracks tarde, no confirme forward antes de pedir coin.");
  const [idleTc, setIdleTc] = useState("45");

  const template = replayCoachTemplates.find((item) => item.id === templateId) ?? replayCoachTemplates[0];
  const plan = aoe3Plans.find((item) => item.id === planId) ?? aoe3Plans[0];
  const report = useMemo(() => {
    const shipments = splitList(ownShipments);
    const warnings: string[] = [];
    const corrections = [...template.output.corrections];
    const age2Seconds = toSeconds(age2);
    const age3Seconds = toSeconds(age3);
    const idle = Number(idleTc);
    const enemyMilitary = /hussar|jan|longbow|rush|musk|crossbow|cav|falconet|military/i.test(enemyFirst);
    const greedyCoin = /700 coin|coin|villager|cdb|company|eco/i.test(ownShipments);

    if (age2Seconds > 310) warnings.push("Age II llega tarde para una partida sin castigo visible.");
    if (plan.archetype === "Semi-FF" && age3Seconds > 540) warnings.push("Age III supera 9:00; el semi-FF pierde ventana o senala defensa forzada.");
    if (shipments.length < 3) warnings.push("Menos de 3 shipments propios antes del primer diagnostico.");
    if (enemyMilitary && greedyCoin) warnings.push("Patron fuerte: envio economico/coin mientras el rival ya ensena presion militar.");
    if (scouting.trim().length < 24) warnings.push("Scouting insuficiente: no hay dato accionable antes de decidir shipment.");
    if (Number.isFinite(idle) && idle > 60) warnings.push("Idle TC alto: antes de culpar al matchup hay macro que corregir.");

    const score = Math.max(0, 100 - warnings.length * 14 - (Number.isFinite(idle) ? Math.min(18, Math.floor(idle / 10)) : 0));
    const turningPoint = warnings[0] ?? "No hay turning point determinista con estos campos.";
    const drill =
      warnings.find((item) => item.includes("Scouting")) || warnings.find((item) => item.includes("envio economico"))
        ? "Repetir opening hasta escribir un dato de scouting antes del segundo shipment."
        : template.output.drill;

    return { score, warnings, corrections, shipments, turningPoint, drill };
  }, [age2, age3, enemyFirst, idleTc, ownShipments, plan.archetype, scouting, template.output.corrections, template.output.drill]);

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Replay Coach v1</h3>
        <label className="field">
          Plantilla
          <select value={templateId} onChange={(event) => setTemplateId(event.target.value)}>
            {replayCoachTemplates.map((item) => (
              <option value={item.id} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Plan
          <select value={planId} onChange={(event) => setPlanId(event.target.value)}>
            {aoe3Plans.map((item) => (
              <option value={item.id} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Age II
          <input value={age2} onChange={(event) => setAge2(event.target.value)} />
        </label>
        <label className="field">
          Age III
          <input value={age3} onChange={(event) => setAge3(event.target.value)} />
        </label>
        <label className="field">
          Shipments propios
          <textarea className="small-textarea" value={ownShipments} onChange={(event) => setOwnShipments(event.target.value)} />
        </label>
        <label className="field">
          Primer shipment rival
          <input value={enemyFirst} onChange={(event) => setEnemyFirst(event.target.value)} />
        </label>
        <label className="field">
          Scouting visto
          <textarea className="small-textarea" value={scouting} onChange={(event) => setScouting(event.target.value)} />
        </label>
        <label className="field">
          Idle TC estimado
          <input value={idleTc} onChange={(event) => setIdleTc(event.target.value)} />
        </label>
      </aside>

      <section className="stack">
        <article className="career-hero-card card">
          <div>
            <span className="eyebrow">
              <Eye size={15} aria-hidden="true" /> Coach con guardrails
            </span>
            <h2>{template.thesis}</h2>
            <p>{template.output.summary}</p>
            <div className="meta-row">
              {template.output.sourceIds.map((sourceId) => (
                <span className="pill" key={sourceId}>
                  {sourceId}
                </span>
              ))}
            </div>
          </div>
          <div className="score-plate compact">
            <span>Replay</span>
            <strong>{report.score}</strong>
            <small>/100</small>
          </div>
        </article>

        <section className="grid two">
          <article className="card">
            <h3>Turning point</h3>
            <p className="lead-small">{report.turningPoint}</p>
            <div className="result-box">
              <strong>Drill siguiente</strong>
              <p>{report.drill}</p>
            </div>
            <Link className="button secondary" href="/opening-timer">
              Practicar correccion <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </article>
          <article className="card">
            <h3>Warnings</h3>
            <ul className="list">
              {(report.warnings.length ? report.warnings : ["No hay alertas fuertes con el input actual."]).map((warning) => (
                <li key={warning}>
                  <AlertTriangle size={15} aria-hidden="true" /> {warning}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="grid two">
          <article className="card">
            <h3>Correcciones</h3>
            <ul className="list">
              {report.corrections.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Checks usados</h3>
            <div className="timeline">
              {template.checks.map((check) => (
                <div className="timeline-step" key={check.label}>
                  <span className="time">
                    <Timer size={15} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{check.label}</strong>
                    <p>{check.good} Warning: {check.warning}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}
