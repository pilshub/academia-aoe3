"use client";

import { Search, SlidersHorizontal } from "@/components/icons";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, Crosshair, Flame, Landmark, Shield, Swords } from "@/components/icons";
import { aoe3Plans, getCiv, type PlanArchetype } from "@/data/aoe3";

const iconMap: Record<PlanArchetype, typeof Swords> = {
  Rush: Flame,
  "Semi-FF": Swords,
  Boom: Landmark,
  Timing: Crosshair,
  Control: Shield,
  Water: BookOpen,
  Treaty: Landmark,
};

export function PlanSelector() {
  const [query, setQuery] = useState("");
  const [archetype, setArchetype] = useState("all");

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return aoe3Plans.filter((plan) => {
      const civ = getCiv(plan.civId);
      const haystack = `${plan.title} ${civ?.name ?? plan.civId} ${plan.archetype} ${plan.promise} ${plan.matchupTags.join(" ")}`.toLowerCase();
      const matchesQuery = !clean || haystack.includes(clean);
      const matchesType = archetype === "all" || plan.archetype === archetype;
      return civ && matchesQuery && matchesType;
    });
  }, [query, archetype]);

  return (
    <div className="plan-selector">
      <div className="selector-controls">
        <label>
          <span className="pill">
            <Search size={15} aria-hidden="true" /> Buscar plan
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="French, rush, boom, anti-rush..."
            aria-label="Buscar plan"
          />
        </label>
        <label>
          <span className="pill">
            <SlidersHorizontal size={15} aria-hidden="true" /> Tipo
          </span>
          <select value={archetype} onChange={(event) => setArchetype(event.target.value)} aria-label="Filtrar por tipo">
            <option value="all">Todos</option>
            <option value="Rush">Rush</option>
            <option value="Semi-FF">Semi-FF</option>
            <option value="Boom">Boom</option>
            <option value="Timing">Timing</option>
            <option value="Control">Control</option>
            <option value="Water">Water</option>
            <option value="Treaty">Treaty</option>
          </select>
        </label>
      </div>

      <div className="grid">
        {filtered.map((plan) => {
          const civ = getCiv(plan.civId);
          const Icon = iconMap[plan.archetype];
          return (
            <Link className="card" href={`/plans/${plan.id}`} key={plan.id}>
              <div className="card-top">
                <span className="icon-tile">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="status">{plan.reviewStatus}</span>
              </div>
              <h3>{plan.title}</h3>
              <p>{plan.promise}</p>
              <div className="meta-row">
                <span className="pill">{civ?.name}</span>
                <span className="pill">{plan.mode}</span>
                <span className="pill">{plan.difficulty}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
