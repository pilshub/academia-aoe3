"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Crosshair, Map } from "@/components/icons";
import { aoe3Civilizations, aoe3Maps, buildMatchupScout } from "@/data/aoe3";

export function MatchupScoutTool() {
  const [ownCivId, setOwnCivId] = useState("french");
  const [enemyCivId, setEnemyCivId] = useState("ottomans");
  const [mapId, setMapId] = useState(aoe3Maps[0].id);
  const report = useMemo(() => buildMatchupScout(ownCivId, enemyCivId, mapId), [enemyCivId, mapId, ownCivId]);

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Matchup Scout</h3>
        <label className="field">
          Yo
          <select value={ownCivId} onChange={(event) => setOwnCivId(event.target.value)}>
            {aoe3Civilizations.map((civ) => (
              <option value={civ.id} key={civ.id}>
                {civ.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Rival
          <select value={enemyCivId} onChange={(event) => setEnemyCivId(event.target.value)}>
            {aoe3Civilizations.map((civ) => (
              <option value={civ.id} key={civ.id}>
                {civ.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Mapa
          <select value={mapId} onChange={(event) => setMapId(event.target.value)}>
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
              <Crosshair size={15} aria-hidden="true" /> {report.ownCiv.name} vs {report.enemyCiv.name}
            </span>
            <h2>{report.primaryDanger}</h2>
            <p>
              Mapa: {report.map.name}. Plan recomendado: {report.plan.title}.
            </p>
            <div className="meta-row">
              <span className="pill">{report.confidence}</span>
              <span className="pill">{report.map.type}</span>
              <span className="pill">trade {report.map.tradeRoute}</span>
              <span className="pill">water {report.map.water}</span>
            </div>
          </div>
          <Link className="button secondary" href={`/plans/${report.plan.id}`}>
            Abrir plan <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </article>

        <section className="grid two">
          <article className="card">
            <h3>Scouting exacto</h3>
            <ul className="list">
              {report.scoutChecklist.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Primeros envios seguros</h3>
            <ul className="list">
              {report.shipmentAdvice.map((item) => (
                <li key={item}>
                  <Crosshair size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="grid two">
          <article className="card">
            <h3>Que no hacer</h3>
            <ul className="list">
              {report.dont.map((item) => (
                <li key={item}>
                  <AlertTriangle size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Mapa</h3>
            <p>{report.map.risks.join(" / ")}</p>
            <div className="meta-row">
              {report.map.natives.map((native) => (
                <span className="pill" key={native}>
                  <Map size={13} aria-hidden="true" /> {native}
                </span>
              ))}
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}
