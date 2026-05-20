"use client";

import { useMemo, useState } from "react";
import { Crosshair, ShieldCheck } from "@/components/icons";
import { aoe3Civilizations, aoe3Maps } from "@/data/aoe3";

export function SeriesPrepTool() {
  const [format, setFormat] = useState<"BO3" | "BO5">("BO3");
  const [mainCiv, setMainCiv] = useState("french");
  const [secondCiv, setSecondCiv] = useState("british");
  const [enemy, setEnemy] = useState("ottomans");
  const [mapOne, setMapOne] = useState(aoe3Maps[0].id);
  const plan = useMemo(() => {
    const main = aoe3Civilizations.find((civ) => civ.id === mainCiv) ?? aoe3Civilizations[0];
    const second = aoe3Civilizations.find((civ) => civ.id === secondCiv) ?? aoe3Civilizations[1];
    const rival = aoe3Civilizations.find((civ) => civ.id === enemy) ?? aoe3Civilizations[2];
    const map = aoe3Maps.find((item) => item.id === mapOne) ?? aoe3Maps[0];
    return {
      opener: `${main.name} en game 1 si ${map.name} permite plan estable.`,
      hide: `No mostrar ${second.name} si sospechas counterpick directo.`,
      ban: map.water !== "none" ? "Considera ban de agua si tu pool no la practica." : "Ban candidato: mapa abierto si el rival presiona mejor.",
      scout: `Primer scout contra ${rival.name}: produccion militar, TP y forward antes de segundo envio.`,
      games: format === "BO3" ? ["G1 plan seguro", "G2 counterpick", "G3 comfort civ"] : ["G1 seguro", "G2 mapa favorable", "G3 sorpresa", "G4 comfort", "G5 plan mas entrenado"],
    };
  }, [enemy, format, mainCiv, mapOne, secondCiv]);

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Series prep</h3>
        <label className="field">
          Formato
          <select value={format} onChange={(event) => setFormat(event.target.value as "BO3" | "BO5")}>
            <option value="BO3">BO3</option>
            <option value="BO5">BO5</option>
          </select>
        </label>
        <label className="field">
          Civ main
          <select value={mainCiv} onChange={(event) => setMainCiv(event.target.value)}>
            {aoe3Civilizations.map((civ) => (
              <option value={civ.id} key={civ.id}>
                {civ.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Civ secundaria
          <select value={secondCiv} onChange={(event) => setSecondCiv(event.target.value)}>
            {aoe3Civilizations.map((civ) => (
              <option value={civ.id} key={civ.id}>
                {civ.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Rival probable
          <select value={enemy} onChange={(event) => setEnemy(event.target.value)}>
            {aoe3Civilizations.map((civ) => (
              <option value={civ.id} key={civ.id}>
                {civ.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Mapa 1
          <select value={mapOne} onChange={(event) => setMapOne(event.target.value)}>
            {aoe3Maps.map((map) => (
              <option value={map.id} key={map.id}>
                {map.name}
              </option>
            ))}
          </select>
        </label>
      </aside>

      <section className="stack">
        <article className="career-hero-card card">
          <div>
            <span className="eyebrow">
              <Crosshair size={15} aria-hidden="true" /> Preparador {format}
            </span>
            <h2>{plan.opener}</h2>
            <p>{plan.scout}</p>
          </div>
          <div className="score-plate compact">
            <span>Games</span>
            <strong>{format === "BO3" ? 3 : 5}</strong>
            <small>serie</small>
          </div>
        </article>
        <section className="grid two">
          <article className="card">
            <h3>Plan de games</h3>
            <ul className="list">
              {plan.games.map((game) => (
                <li key={game}>
                  <ShieldCheck size={15} aria-hidden="true" /> {game}
                </li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Notas tacticas</h3>
            <ul className="list">
              <li>{plan.hide}</li>
              <li>{plan.ban}</li>
              <li>Despues de cada game, cambiar una sola variable: civ, mapa o primer shipment.</li>
            </ul>
          </article>
        </section>
      </section>
    </div>
  );
}
