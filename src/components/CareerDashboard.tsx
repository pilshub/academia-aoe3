"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Castle, Timer } from "@/components/icons";
import { aoe3Civilizations, careerTracks, getCareerTrack, getCivPlans, getMasteryStages, type TrainingGoalId, type TrainingLevel } from "@/data/aoe3";

type CareerProgress = {
  goalId: TrainingGoalId;
  civId: string;
  level: TrainingLevel;
  completed: Record<string, boolean>;
};

const storageKey = "academia-aoe3:career-progress";

export function CareerDashboard() {
  const [goalId, setGoalId] = useState<TrainingGoalId>("ranked-1v1");
  const [civId, setCivId] = useState("french");
  const [level, setLevel] = useState<TrainingLevel>("Intermediate");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  const track = getCareerTrack(goalId);
  const civ = aoe3Civilizations.find((item) => item.id === civId) ?? aoe3Civilizations[0];
  const plans = getCivPlans(civ.id);
  const mastery = useMemo(() => getMasteryStages(civ.id), [civ.id]);
  const completedCount = Object.values(completed).filter(Boolean).length;

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "null") as CareerProgress | null;
      if (saved) {
        setGoalId(saved.goalId);
        setCivId(saved.civId);
        setLevel(saved.level);
        setCompleted(saved.completed ?? {});
      }
    } catch {
      setCompleted({});
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(storageKey, JSON.stringify({ goalId, civId, level, completed } satisfies CareerProgress));
  }, [civId, completed, goalId, level, loaded]);

  function toggleCompleted(id: string) {
    setCompleted((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <div className="career-grid">
      <aside className="card tool-sidebar">
        <h3>Modo carrera</h3>
        <label className="field">
          Objetivo
          <select value={goalId} onChange={(event) => setGoalId(event.target.value as TrainingGoalId)}>
            {careerTracks.map((item) => (
              <option value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Civ principal
          <select value={civId} onChange={(event) => setCivId(event.target.value)}>
            {aoe3Civilizations.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Nivel
          <select value={level} onChange={(event) => setLevel(event.target.value as TrainingLevel)}>
            <option value="Start">Start</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>
        <div className="route-stack">
          {track.firstRoutes.map((href) => (
            <Link href={href} className="button secondary" key={href}>
              Abrir {href.replace("/", "") || "inicio"} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </aside>

      <section className="stack">
        <article className="career-hero-card card">
          <div>
            <span className="eyebrow">
              <Castle size={15} aria-hidden="true" /> {civ.name} / {track.label}
            </span>
            <h2>{track.promise}</h2>
            <p>{track.targetPlayer}</p>
            <div className="meta-row">
              {track.focus.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="score-plate compact">
            <span>Drills</span>
            <strong>{completedCount}</strong>
            <small>hechos</small>
          </div>
        </article>

        <section className="grid two">
          <article className="card">
            <h3>Plan semanal</h3>
            <div className="timeline">
              {track.weeklyPlan.map((item) => (
                <div className="timeline-step" key={item.day}>
                  <label className="time progress-check">
                    <input type="checkbox" checked={Boolean(completed[item.day])} onChange={() => toggleCompleted(item.day)} />
                    {item.day}
                  </label>
                  <div>
                    <strong>{item.drill}</strong>
                    <p>{item.metric}</p>
                    <Link className="pill" href={item.toolHref}>
                      Abrir herramienta
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <h3>Tu civ esta semana</h3>
            <ul className="list">
              <li>
                <BadgeCheck size={15} aria-hidden="true" /> Identidad: {civ.identity}
              </li>
              <li>
                <Timer size={15} aria-hidden="true" /> Tempo: {civ.tempo}
              </li>
              {plans.slice(0, 3).map((plan) => (
                <li key={plan.id}>
                  <Link href={`/plans/${plan.id}`}>
                    {plan.title}: {plan.promise}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <article className="card">
          <h3>Escalera de mastery</h3>
          <div className="mastery-lane">
            {mastery.map((stage) => (
              <Link className="mastery-node" href={stage.route} key={stage.level}>
                <span>{stage.level}</span>
                <strong>{stage.title}</strong>
                <p>{stage.drill}</p>
                <small>{stage.evidenceRule}</small>
              </Link>
            ))}
          </div>
        </article>
        <article className="card">
          <h3>Perfil persistente</h3>
          <p>
            Guardado local activo: objetivo {track.label}, civ {civ.name}, nivel {level} y {completedCount} drills completados.
            La siguiente capa sera sincronizarlo con cuenta de usuario.
          </p>
          <div className="progress-track" aria-label="Progreso semanal">
            <span style={{ width: `${Math.min(100, (completedCount / Math.max(1, track.weeklyPlan.length)) * 100)}%` }} />
          </div>
        </article>
      </section>
    </div>
  );
}
