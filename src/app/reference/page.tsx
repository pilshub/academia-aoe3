import { BookOpen, Crown, PackageOpen, ShieldCheck } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { aoe3Politicians, aoe3Techs, aoe3Units } from "@/data/aoe3";

export const metadata = {
  title: "Reference - Academia AoE3",
  description: "Compendio de politicians, units y techs. Datos editoriales sin stats inventados.",
};

export default function ReferencePage() {
  const politiciansBycivCount = aoe3Politicians.length;
  const unitsCount = aoe3Units.length;
  const techsCount = aoe3Techs.length;

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Reference"
          title="Compendio editorial."
          body="Politicians, units y techs como base canónica. Sin stats numéricos: roles, tags y descripciones cualitativas."
        />

        <section className="section">
          <div className="wrap">
            <div className="grid two">
              <article className="card">
                <h3>Politicians</h3>
                <p className="muted">{politiciansBycivCount} políticos registrados.</p>
              </article>
              <article className="card">
                <h3>Units</h3>
                <p className="muted">{unitsCount} unidades con tags y counters.</p>
              </article>
              <article className="card">
                <h3>Techs</h3>
                <p className="muted">{techsCount} upgrades de Arsenal, Market, Church y específicos.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>
                <Crown size={18} aria-hidden="true" /> Politicians
              </h2>
            </div>
            <div className="grid">
              {aoe3Politicians.map((p) => (
                <article className="card" key={p.id}>
                  <div className="card-top">
                    <span className="status">{p.ageUpTo}</span>
                    <span className="pill">{p.civId}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.notes}</p>
                  <ul className="list">
                    {p.bonuses.slice(0, 3).map((b, i) => (
                      <li key={i}>
                        <strong>{b.type}:</strong> {b.description}
                      </li>
                    ))}
                  </ul>
                  <div className="meta-row">
                    {p.bestFor.slice(0, 3).map((tag) => (
                      <span className="pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>
                <PackageOpen size={18} aria-hidden="true" /> Units
              </h2>
            </div>
            <div className="grid">
              {aoe3Units.map((u) => (
                <article className="card" key={u.id}>
                  <div className="card-top">
                    <span className="status">{u.ageAvailable}</span>
                    <span className="pill">{u.civId}</span>
                  </div>
                  <h3>{u.name}</h3>
                  <p>
                    <strong>Rol:</strong> {u.primaryRole}
                  </p>
                  <p className="muted">Entrenado en: {u.trainedAt}</p>
                  <div className="meta-row">
                    {u.tags.slice(0, 4).map((tag) => (
                      <span className="pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {u.countersWell.length ? (
                    <p className="muted" style={{ fontSize: "0.85rem" }}>
                      <ShieldCheck size={14} aria-hidden="true" /> Counters: {u.countersWell.join(", ")}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-heading">
              <h2>
                <BookOpen size={18} aria-hidden="true" /> Techs
              </h2>
            </div>
            <div className="grid">
              {aoe3Techs.map((t) => (
                <article className="card" key={t.id}>
                  <div className="card-top">
                    <span className="status">{t.ageRequired}</span>
                    <span className="pill">{t.category}</span>
                  </div>
                  <h3>{t.name}</h3>
                  <p>{t.description}</p>
                  <div className="meta-row">
                    <span className="pill">{t.civId}</span>
                    {t.affects.slice(0, 3).map((a) => (
                      <span className="pill" key={a}>
                        {a}
                      </span>
                    ))}
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
