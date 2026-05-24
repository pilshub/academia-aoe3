"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavLink = { href: string; label: string; icon: string };

const navGroups: { label: string; links: NavLink[] }[] = [
  {
    label: "Base",
    links: [
      { href: "/", label: "Inicio", icon: "home" },
      { href: "/learn", label: "Learn", icon: "search" },
      { href: "/modes", label: "Modos", icon: "swords" },
      { href: "/roadmap", label: "100", icon: "trending" },
    ],
  },
  {
    label: "Entrenar",
    links: [
      { href: "/career", label: "Carrera", icon: "users" },
      { href: "/civ-mastery", label: "Mastery", icon: "crown" },
      { href: "/opening-timer", label: "Timer", icon: "timer" },
      { href: "/deck-builder", label: "Builder", icon: "wallet" },
      { href: "/matchup-scout", label: "Scout", icon: "crosshair" },
      { href: "/series-prep", label: "BO3/5", icon: "swords" },
      { href: "/errors", label: "Errores", icon: "badgealert" },
    ],
  },
  {
    label: "Analizar",
    links: [
      { href: "/replay-coach", label: "Coach", icon: "eye" },
      { href: "/replay-upload", label: "Upload", icon: "file" },
      { href: "/submit-replay", label: "Submit", icon: "file" },
      { href: "/replay-import", label: "Import", icon: "file" },
      { href: "/parser-solution", label: "Parser", icon: "shieldcheck" },
      { href: "/analysis", label: "Análisis", icon: "eye" },
      { href: "/analyzer", label: "Analyzer", icon: "badgealert" },
    ],
  },
  {
    label: "Aprender",
    links: [
      { href: "/guides", label: "Guías", icon: "file" },
      { href: "/civs", label: "Civs", icon: "castle" },
      { href: "/decks", label: "Decks", icon: "wallet" },
      { href: "/deck-checker", label: "Checker", icon: "shieldcheck" },
      { href: "/openings", label: "Openings", icon: "timer" },
      { href: "/shipments", label: "Shipments", icon: "package" },
      { href: "/maps", label: "Mapas", icon: "map" },
      { href: "/cards", label: "Cartas", icon: "book" },
      { href: "/matchups", label: "Matchups", icon: "crosshair" },
      { href: "/knowledge", label: "Search", icon: "search" },
    ],
  },
  {
    label: "Operar",
    links: [
      { href: "/ai-coach", label: "IA", icon: "search" },
      { href: "/trust", label: "Trust", icon: "shieldcheck" },
      { href: "/patch-tracker", label: "Patches", icon: "shieldcheck" },
      { href: "/source-admin", label: "Admin", icon: "list" },
      { href: "/vod-pipeline", label: "VOD", icon: "eye" },
      { href: "/resources", label: "Fuentes", icon: "extlink" },
      { href: "/source-provenance", label: "Citas", icon: "shieldcheck" },
      { href: "/source-queue", label: "Queue", icon: "list" },
      { href: "/stats", label: "Stats", icon: "search" },
      { href: "/replay-lab", label: "Replays", icon: "eye" },
      { href: "/art-lab", label: "Arte", icon: "images" },
    ],
  },
];

const ICON_PATHS: Record<string, string> = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  swords: '<path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/>',
  trending: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  crown: '<path d="M3 7l5 4 4-7 4 7 5-4-2 12H5z"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="17" cy="14" r="1.4"/>',
  crosshair: '<circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',
  badgealert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
  shieldcheck: '<path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
  castle: '<path d="M3 21V8l4 2V6l3 2V4l4 4V8l3-2v4l4-2v13z"/><path d="M11 21v-5h2v5"/>',
  list: '<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>',
  map: '<polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="20"/>',
  package: '<path d="M3 7l9-4 9 4"/><path d="M3 7v10l9 4 9-4V7"/><path d="M3 7l9 4 9-4"/><path d="M12 11v10"/>',
  images: '<rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-9 9"/>',
  extlink: '<path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
  shield: '<path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6z"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M4 5v14"/>',
};

function Icon({ name, size = 14 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] ?? "" }}
    />
  );
}

const FOOTER_COLS = [
  { title: "Aprender", hrefs: ["/guides", "/civs", "/decks", "/openings", "/cards", "/matchups"] },
  { title: "Entrenar", hrefs: ["/career", "/civ-mastery", "/opening-timer", "/deck-builder", "/matchup-scout", "/series-prep", "/errors"] },
  { title: "Analizar", hrefs: ["/replay-coach", "/replay-upload", "/replay-lab", "/analyzer", "/analysis", "/parser-solution"] },
  { title: "Operar", hrefs: ["/ai-coach", "/trust", "/patch-tracker", "/resources", "/source-provenance", "/roadmap"] },
];

function labelFor(href: string): string {
  for (const g of navGroups) {
    const l = g.links.find((x) => x.href === href);
    if (l) return l.label;
  }
  return href.replace("/", "");
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (drawerRef.current?.contains(t)) return;
      if (buttonRef.current?.contains(t)) return;
      setDrawerOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="site-shell" data-screen-label="Academia AoE3">
      {/* ============ TOPBAR ============ */}
      <div className="topbar">
        <div className="topbar-inner">
          <Link className="brand-mini" href="/">
            <span className="brand-mini-mark">A</span>
            <span className="brand-mini-text">Academia AoE3</span>
          </Link>
          <dl className="topbar-stats" aria-label="Estado">
            <div>
              <dt>Civs</dt>
              <dd>
                22<span>/22</span>
              </dd>
            </div>
            <div>
              <dt>Planes</dt>
              <dd>10</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>35</dd>
            </div>
            <div>
              <dt>Tests</dt>
              <dd>
                13<span>/13</span>
              </dd>
            </div>
          </dl>
          <a className="patch-pill" href="https://www.ageofempires.com/news/age_of_empires_iii_de_update_13_690/" target="_blank" rel="noreferrer">
            <span className="dot" />
            Imperial · Patch 13.690
          </a>
        </div>
      </div>

      {/* ============ NAV ============ */}
      <header className="nav">
        <div className="nav-inner">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5h6" />
                <path d="M3 12h12" />
                <path d="M3 19h18" />
                <circle cx={20} cy={5} r={1.5} />
                <circle cx={18} cy={12} r={1.5} />
              </svg>
            </span>
            <span>
              <span className="brand-title">Academia AoE3</span>
              <span className="brand-subtitle">Decks · Shipments · Timings</span>
            </span>
          </Link>
          <nav className="nav-primary" aria-label="Principal">
            <Link href="/civs">Civilizaciones</Link>
            <Link href="/decks">Planes</Link>
            <Link href="/decks">Decks</Link>
            <Link href="/replay-coach">Analizar</Link>
            <Link href="/guides">Aprender</Link>
            <Link href="/trust">Operar</Link>
            <button
              ref={buttonRef}
              className="nav-more"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              Más{" "}
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </nav>
          {drawerOpen ? (
            <div ref={drawerRef} className="nav-drawer">
              <div className="nav-drawer-inner">
                {navGroups.map((g) => (
                  <div className="nav-drawer-group" key={g.label}>
                    <div className="label">{g.label}</div>
                    {g.links.map((l) => (
                      <Link key={l.href} href={l.href}>
                        <Icon name={l.icon} size={14} />
                        <span>{l.label}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </header>

      {children}

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="footer-col lead-col">
            <span className="seal">
              <span className="dot" /> Academia AoE3 · v0.1
            </span>
            <h4 style={{ fontSize: "1.04rem", letterSpacing: ".08em", borderBottom: 0, paddingBottom: 0, color: "var(--ink)", fontVariantCaps: "normal" }}>
              Decisión primero, lista después.
            </h4>
            <p>
              Para Age of Empires III. Civilización + plan + opening + matchup + transición conectados. Toda fuente está
              visible y cada timing es practicable.
            </p>
          </div>
          {FOOTER_COLS.map((c) => (
            <div className="footer-col" key={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.hrefs.map((href) => (
                  <li key={href}>
                    <Link href={href}>{labelFor(href)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-base">
          <div className="brand-mini">
            <span className="brand-mini-mark">A</span>
            <span className="brand-mini-text">Academia AoE3</span>
          </div>
          <span className="footer-tagline">MVP editorial auditado — todas las citas con fuente visible.</span>
          <span className="footer-credit">
            Iconos oficiales © Microsoft/Xbox hospedados por{" "}
            <a href="https://aoe3explorer.com" target="_blank" rel="noreferrer">
              aoe3explorer.com
            </a>
            .
          </span>
        </div>
      </footer>
    </div>
  );
}
