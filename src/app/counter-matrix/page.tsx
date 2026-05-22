import { Crosshair } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3CounterMatrix } from "@/data/aoe3/counterMatrix";

export const metadata = {
  title: "Counter Matrix v0 - Academia AoE3",
  description: "Tabla editorial de counters por tipo de unidad. Sin stats numéricos: relaciones cualitativas.",
};

const COLUMNS: Array<{ key: keyof (typeof aoe3CounterMatrix)[number]; label: string }> = [
  { key: "vsInfantry", label: "vs Infantry" },
  { key: "vsHeavyInfantry", label: "vs Heavy Inf" },
  { key: "vsLightInfantry", label: "vs Light Inf" },
  { key: "vsCavalry", label: "vs Cavalry" },
  { key: "vsHeavyCavalry", label: "vs Heavy Cav" },
  { key: "vsArtillery", label: "vs Artillery" },
  { key: "vsBuilding", label: "vs Building" },
];

const COLOR: Record<string, string> = {
  "hard-counter": "var(--good, #2a9d8f)",
  "soft-counter": "rgba(42, 157, 143, 0.55)",
  even: "rgba(180, 180, 180, 0.35)",
  "soft-loss": "rgba(220, 130, 90, 0.55)",
  "hard-loss": "#c04a2b",
};

export default function CounterMatrixPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Counter Matrix v0"
          title="Relaciones cualitativas, no stats inventados."
          body="Cada fila es un tipo de unidad. Cada columna, un enemigo. La matriz NO incluye HP/attack: solo si gana/pierde/empata frente al tipo enemigo, con notas editoriales."
        />
        <section className="section">
          <div className="wrap">
            <article className="card" style={{ overflowX: "auto" }}>
              <h3>
                <Crosshair size={18} aria-hidden="true" /> Matriz editorial
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem", fontSize: "0.9rem" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                      Unit type
                    </th>
                    {COLUMNS.map((col) => (
                      <th
                        key={col.key as string}
                        style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aoe3CounterMatrix.map((row) => (
                    <tr key={row.unitTag}>
                      <td style={{ padding: "0.5rem", fontWeight: 600 }}>{row.unitTag}</td>
                      {COLUMNS.map((col) => {
                        const value = row[col.key] as string;
                        return (
                          <td key={col.key as string} style={{ padding: "0.5rem" }}>
                            <span
                              style={{
                                background: COLOR[value] ?? "rgba(255,255,255,0.1)",
                                padding: "0.15rem 0.5rem",
                                borderRadius: 4,
                                fontSize: "0.78rem",
                              }}
                            >
                              {value}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="grid">
              {aoe3CounterMatrix.map((row) => (
                <article className="card" key={`note-${row.unitTag}`}>
                  <h3>{row.unitTag}</h3>
                  <p>{row.notes}</p>
                  <div className="meta-row">
                    <span className="pill">{row.reviewStatus}</span>
                    <span className="pill">fuente: {row.sourceId}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
