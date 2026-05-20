"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Timer } from "@/components/icons";
import { plans } from "@/data/academy";

type FormState = {
  planId: string;
  age2: string;
  age3: string;
  shipmentsAt8: number;
  floatedResources: number;
  idleTc: number;
  lostVillagers: number;
  notes: string;
};

const initialState: FormState = {
  planId: "french-semi-ff",
  age2: "4:35",
  age3: "8:20",
  shipmentsAt8: 3,
  floatedResources: 450,
  idleTc: 25,
  lostVillagers: 1,
  notes: "Vi barracks temprano pero mande eco igualmente.",
};

function parseTimeToSeconds(value: string) {
  const parts = value.split(":");
  const minutes = Number(parts[0]?.trim());
  const seconds = Number(parts[1]?.trim() ?? "0");
  if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return null;
  return minutes * 60 + seconds;
}

function grade(score: number) {
  if (score >= 86) return "A";
  if (score >= 72) return "B";
  if (score >= 58) return "C";
  if (score >= 44) return "D";
  return "E";
}

export function PostGameAnalyzer() {
  const [form, setForm] = useState<FormState>(initialState);

  const report = useMemo(() => {
    const plan = plans.find((item) => item.id === form.planId) ?? plans[0];
    const age2Seconds = parseTimeToSeconds(form.age2);
    const age3Seconds = parseTimeToSeconds(form.age3);
    const issues: string[] = [];
    const wins: string[] = [];
    let score = 100;

    if (age2Seconds === null) {
      issues.push("Age II no tiene formato valido. Usa mm:ss.");
      score -= 10;
    } else if (age2Seconds > 300) {
      issues.push("Age II parece tarde para un plan Supremacy estandar; busca si faltaron crates, food o tesoro.");
      score -= 12;
    } else {
      wins.push("Age II entra en una ventana razonable para practicar el plan.");
    }

    if (plan.archetype === "Semi-FF") {
      if (age3Seconds === null) {
        issues.push("Para Semi-FF necesitas registrar Age III o explicar por que te quedaste colonial.");
        score -= 8;
      } else if (age3Seconds > 540) {
        issues.push("Fortress llega tarde para Semi-FF; probablemente hubo presion, macro rota o 700 Coin tardio.");
        score -= 14;
      } else {
        wins.push("La transicion a Fortress no se fue demasiado tarde.");
      }
    }

    if (form.shipmentsAt8 < 3) {
      issues.push("Menos de 3 shipments al minuto 8 suele indicar XP baja, envios tardios o falta de TP/tesoros.");
      score -= 12;
    } else {
      wins.push("Shipments al minuto 8 suficientes para que el deck tenga impacto.");
    }

    if (form.floatedResources > 700) {
      issues.push("Demasiados recursos flotados: faltaron edificios, casas, edad o produccion.");
      score -= 12;
    } else if (form.floatedResources < 250) {
      wins.push("Recursos flotados bajos: buena conversion de eco en accion.");
    }

    if (form.idleTc > 45) {
      issues.push("Idle TC alto: antes de culpar al deck, arregla continuidad de aldeanos.");
      score -= 14;
    } else {
      wins.push("Idle TC controlado para una revision manual.");
    }

    if (form.lostVillagers >= 4) {
      issues.push("Perder 4+ aldeanos antes del minuto 10 cambia todo el diagnostico: prioridad anti-rush.");
      score -= 16;
    } else if (form.lostVillagers === 0) {
      wins.push("No perder aldeanos mantiene vivo el benchmark economico.");
    }

    if (/barracks|forward|rush|rax|cuartel|presion/i.test(form.notes) && /eco|greed|4 cdb|virginia/i.test(form.notes)) {
      issues.push("Tus notas sugieren el patron clasico: viste presion pero mantuviste greed. Esa es la primera correccion.");
      score -= 10;
    }

    score = Math.max(0, Math.min(100, score));
    const focus = issues[0] ?? "Mantener consistencia y buscar un benchmark mas exigente.";

    return { plan, score, grade: grade(score), issues, wins, focus };
  }, [form]);

  return (
    <div className="analyzer-grid">
      <form className="card analyzer-form">
        <h3>Datos de la partida</h3>
        <label>
          Plan
          <select value={form.planId} onChange={(event) => setForm({ ...form, planId: event.target.value })}>
            {plans.map((plan) => (
              <option value={plan.id} key={plan.id}>
                {plan.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Age II
          <input value={form.age2} onChange={(event) => setForm({ ...form, age2: event.target.value })} />
        </label>
        <label>
          Age III / transicion
          <input value={form.age3} onChange={(event) => setForm({ ...form, age3: event.target.value })} />
        </label>
        <label>
          Shipments al minuto 8
          <input
            type="number"
            min="0"
            value={form.shipmentsAt8}
            onChange={(event) => setForm({ ...form, shipmentsAt8: Number(event.target.value) })}
          />
        </label>
        <label>
          Recursos flotados al minuto 8
          <input
            type="number"
            min="0"
            value={form.floatedResources}
            onChange={(event) => setForm({ ...form, floatedResources: Number(event.target.value) })}
          />
        </label>
        <label>
          Idle TC estimado
          <input
            type="number"
            min="0"
            value={form.idleTc}
            onChange={(event) => setForm({ ...form, idleTc: Number(event.target.value) })}
          />
        </label>
        <label>
          Aldeanos perdidos antes del 10
          <input
            type="number"
            min="0"
            value={form.lostVillagers}
            onChange={(event) => setForm({ ...form, lostVillagers: Number(event.target.value) })}
          />
        </label>
        <label>
          Notas de scouting
          <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
        </label>
      </form>

      <section className="card analyzer-report" aria-live="polite">
        <div className="score-plate">
          <span>Nota</span>
          <strong>{report.grade}</strong>
          <small>{report.score}/100</small>
        </div>
        <h3>{report.plan.title}</h3>
        <p>{report.plan.promise}</p>
        <div className="meta-row">
          <span className="pill">{report.plan.archetype}</span>
          <span className="pill">{report.plan.difficulty}</span>
          <span className="pill">{report.plan.mode}</span>
        </div>
        <h3>Foco principal</h3>
        <p>
          <Timer size={15} aria-hidden="true" /> {report.focus}
        </p>
        <div className="grid two">
          <article>
            <h3>Bien</h3>
            <ul className="list">
              {(report.wins.length ? report.wins : ["No hay indicadores positivos claros; revisa benchmark basico."]).map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Corregir</h3>
            <ul className="list">
              {(report.issues.length ? report.issues : ["No aparece un fallo grave; sube exigencia del plan."]).map((item) => (
                <li key={item}>
                  <AlertTriangle size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
