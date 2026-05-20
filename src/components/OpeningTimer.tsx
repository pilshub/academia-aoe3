"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Timer } from "@/components/icons";
import { aoe3Openings, getCard, getOpeningPractice, getPlan } from "@/data/aoe3";

type StepState = "pending" | "on-time" | "late" | "blocked";
type TimerAttempt = {
  id: string;
  openingId: string;
  openingTitle: string;
  score: number;
  elapsed: number;
  createdAt: string;
};

const historyKey = "academia-aoe3:opening-history";

const labels: Record<StepState, string> = {
  pending: "Pendiente",
  "on-time": "Bien",
  late: "Tarde",
  blocked: "Bloqueado",
};

function formatClock(total: number) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = Math.floor(total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function scoreStatus(status: StepState) {
  if (status === "on-time") return 20;
  if (status === "late") return 8;
  return 0;
}

export function OpeningTimer() {
  const [openingId, setOpeningId] = useState(aoe3Openings[0].id);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [states, setStates] = useState<Record<number, StepState>>({});
  const [scouted, setScouted] = useState<Record<string, boolean>>({});
  const [history, setHistory] = useState<TimerAttempt[]>([]);

  const opening = aoe3Openings.find((item) => item.id === openingId) ?? aoe3Openings[0];
  const profile = getOpeningPractice(opening.id);
  const plan = getPlan(opening.planId);
  const score = useMemo(() => {
    const stepScore = opening.steps.reduce((sum, _step, index) => sum + scoreStatus(states[index] ?? "pending"), 0);
    const scoutScore = Object.values(scouted).filter(Boolean).length >= Math.min(2, opening.scoutChecks.length) ? 10 : 0;
    return Math.min(100, Math.round((stepScore / Math.max(1, opening.steps.length * 20)) * 90 + scoutScore));
  }, [opening.scoutChecks.length, opening.steps, states, scouted]);

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    try {
      setHistory(JSON.parse(window.localStorage.getItem(historyKey) ?? "[]") as TimerAttempt[]);
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(historyKey, JSON.stringify(history));
  }, [history]);

  function reset(nextOpeningId = openingId) {
    setOpeningId(nextOpeningId);
    setRunning(false);
    setElapsed(0);
    setStates({});
    setScouted({});
  }

  function saveAttempt() {
    setHistory((current) =>
      [
        {
          id: `${Date.now()}`,
          openingId: opening.id,
          openingTitle: opening.title,
          score,
          elapsed,
          createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        },
        ...current,
      ].slice(0, 12),
    );
    setRunning(false);
  }

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Opening Timer</h3>
        <label className="field">
          Opening
          <select value={openingId} onChange={(event) => reset(event.target.value)}>
            {aoe3Openings.map((item) => (
              <option value={item.id} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <div className="timer-face">
          <Timer size={22} aria-hidden="true" />
          <strong>{formatClock(elapsed)}</strong>
          <span>{running ? "corriendo" : "pausado"}</span>
        </div>
        <div className="actions compact-actions">
          <button className="button" type="button" onClick={() => setRunning((current) => !current)}>
            {running ? "Pausar" : "Empezar"}
          </button>
          <button className="button secondary" type="button" onClick={() => reset()}>
            Reset
          </button>
        </div>
        <button className="button secondary" type="button" onClick={saveAttempt}>
          Guardar intento
        </button>
        <div className="score-plate compact">
          <span>Score</span>
          <strong>{score}</strong>
          <small>/100</small>
        </div>
      </aside>

      <section className="stack">
        <article className="card">
          <div className="card-top">
            <span className="status">{opening.difficulty}</span>
            <span className="pill">{opening.reviewStatus}</span>
          </div>
          <h3>{opening.title}</h3>
          <p>{opening.benchmark}</p>
          <div className="grid two">
            <div className="mini-card">
              <strong>Plan</strong>
              <p>{plan?.promise ?? "Plan pendiente"}</p>
            </div>
            <div className="mini-card">
              <strong>Primeros envios</strong>
              <p>{opening.firstShipmentIds.map((id) => getCard(id)?.name ?? id).join(" -> ")}</p>
            </div>
          </div>
        </article>

        <article className="card">
          <h3>Timeline entrenable</h3>
          <div className="timeline practice-timeline">
            {opening.steps.map((step, index) => (
              <div className={`timeline-step practice-step practice-${states[index] ?? "pending"}`} key={`${step.time}-${step.action}`}>
                <span className="time">{step.time}</span>
                <div>
                  <strong>{step.action}</strong>
                  <p>{step.population} / {step.why}</p>
                  <div className="segmented">
                    {(["on-time", "late", "blocked"] as StepState[]).map((status) => (
                      <button
                        className={states[index] === status ? "active" : ""}
                        type="button"
                        onClick={() => setStates((current) => ({ ...current, [index]: status }))}
                        key={status}
                      >
                        {labels[status]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <section className="grid two">
          <article className="card">
            <h3>Scouting obligatorio</h3>
            <div className="card-check-grid">
              {opening.scoutChecks.map((item) => (
                <label className={`check-card ${scouted[item] ? "active" : ""}`} key={item}>
                  <input
                    type="checkbox"
                    checked={Boolean(scouted[item])}
                    onChange={() => setScouted((current) => ({ ...current, [item]: !current[item] }))}
                  />
                  <span>
                    <CheckCircle2 size={15} aria-hidden="true" /> {item}
                  </span>
                  <small>Debe estar visto antes de la decision principal.</small>
                </label>
              ))}
            </div>
          </article>
          <article className="card">
            <h3>Reglas de repeticion</h3>
            <ul className="list">
              <li>{profile.passRule}</li>
              <li>{profile.resetRule}</li>
              {profile.scoreWeights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
        <article className="card">
          <h3>Historial local</h3>
          <div className="timeline">
            {history.map((attempt) => (
              <div className="timeline-step" key={attempt.id}>
                <span className="time">{attempt.score}/100</span>
                <div>
                  <strong>{attempt.openingTitle}</strong>
                  <p>{attempt.createdAt} / reloj {formatClock(attempt.elapsed)}</p>
                </div>
              </div>
            ))}
            {!history.length ? <p className="muted">Guarda un intento para ver progreso por opening.</p> : null}
          </div>
        </article>
      </section>
    </div>
  );
}
