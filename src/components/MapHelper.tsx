"use client";

import { useMemo, useState } from "react";
import { Map, Shield, Timer } from "@/components/icons";
import { aoe3Civilizations, aoe3Maps, getCiv, recommendPlansForMap } from "@/data/aoe3";

export function MapHelper() {
  const [mapId, setMapId] = useState(aoe3Maps[0]?.id ?? "");
  const [civId, setCivId] = useState("french");
  const map = aoe3Maps.find((item) => item.id === mapId) ?? aoe3Maps[0];
  const civ = getCiv(civId);
  const plans = useMemo(() => recommendPlansForMap(mapId, civId), [mapId, civId]);

  if (!map) return null;

  return (
    <div className="tool-grid">
      <aside className="card tool-sidebar">
        <h3>Mapa y civ</h3>
        <label className="field">
          Mapa
          <select value={mapId} onChange={(event) => setMapId(event.target.value)}>
            {aoe3Maps.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
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
      </aside>

      <section className="card">
        <div className="card-top">
          <span className="icon-tile">
            <Map size={22} aria-hidden="true" />
          </span>
          <span className="status">{map.reviewStatus}</span>
        </div>
        <h3>{map.name}</h3>
        <p>
          {civ?.name ?? civId} en {map.name}: primero decide si la partida gira alrededor de trade, agua, mapa abierto o
          defensa. Esa decision cambia deck y shipments antes que el micro.
        </p>
        <div className="meta-row">
          <span className="pill">{map.type}</span>
          <span className="pill">Trade: {map.tradeRoute}</span>
          <span className="pill">Water: {map.water}</span>
        </div>

        <div className="grid two">
          <article>
            <h3>Natives / mapa</h3>
            <ul className="list">
              {map.natives.map((item) => (
                <li key={item}>
                  <Map size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Prioridad de tesoros</h3>
            <ul className="list">
              {map.treasureFocus.map((item) => (
                <li key={item}>
                  <Timer size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <h3>Riesgos que cambian el plan</h3>
        <ul className="list">
          {map.risks.map((item) => (
            <li key={item}>
              <Shield size={15} aria-hidden="true" /> {item}
            </li>
          ))}
        </ul>

        <h3>Planes recomendados</h3>
        <div className="grid two">
          {(plans.length ? plans : recommendPlansForMap(mapId)).map((plan) => (
            <article className="mini-card" key={plan.id}>
              <strong>{plan.title}</strong>
              <p>{plan.promise}</p>
              <span className="pill">{plan.archetype}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

