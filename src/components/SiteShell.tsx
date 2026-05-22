import Link from "next/link";
import { BadgeAlert, BookOpen, Castle, Crosshair, Crown, Eye, ExternalLink, FileText, Home, Images, ListTree, Map, PackageOpen, Search, ShieldCheck, Swords, Timer, TrendingUp, Users, WalletCards } from "@/components/icons";

const navGroups = [
  {
    label: "Base",
    links: [
      { href: "/", label: "Inicio", icon: Home },
      { href: "/learn", label: "Learn", icon: Search },
      { href: "/modes", label: "Modos", icon: Swords },
      { href: "/academy-os", label: "OS", icon: ListTree },
      { href: "/roadmap", label: "100", icon: TrendingUp },
    ],
  },
  {
    label: "Entrenar",
    links: [
      { href: "/career", label: "Carrera", icon: Users },
      { href: "/civ-mastery", label: "Mastery", icon: Crown },
      { href: "/opening-timer", label: "Timer", icon: Timer },
      { href: "/deck-builder", label: "Builder", icon: WalletCards },
      { href: "/matchup-scout", label: "Scout", icon: Crosshair },
      { href: "/series-prep", label: "BO3/5", icon: Swords },
      { href: "/errors", label: "Errores", icon: BadgeAlert },
    ],
  },
  {
    label: "Analizar",
    links: [
      { href: "/replay-coach", label: "Coach", icon: Eye },
      { href: "/replay-upload", label: "Upload", icon: FileText },
      { href: "/submit-replay", label: "Submit", icon: FileText },
      { href: "/replay-import", label: "Import", icon: FileText },
      { href: "/parser-solution", label: "Parser", icon: ShieldCheck },
      { href: "/analysis", label: "Analisis", icon: Eye },
      { href: "/analyzer", label: "Analyzer", icon: BadgeAlert },
    ],
  },
  {
    label: "Aprender",
    links: [
      { href: "/guides", label: "Guias", icon: FileText },
      { href: "/civ-guide", label: "Civ Guides", icon: Crown },
      { href: "/civs", label: "Civs", icon: Castle },
      { href: "/decks", label: "Decks", icon: WalletCards },
      { href: "/deck-checker", label: "Checker", icon: ShieldCheck },
      { href: "/openings", label: "Openings", icon: Timer },
      { href: "/shipments", label: "Shipments", icon: PackageOpen },
      { href: "/maps", label: "Mapas", icon: Map },
      { href: "/cards", label: "Cartas", icon: BookOpen },
      { href: "/matchups", label: "Matchups", icon: Crosshair },
      { href: "/reference", label: "Reference", icon: BookOpen },
      { href: "/knowledge", label: "Search", icon: Search },
    ],
  },
  {
    label: "Sim/Tools",
    links: [
      { href: "/counter-matrix", label: "Counters", icon: Crosshair },
      { href: "/crate-start", label: "Crates", icon: PackageOpen },
      { href: "/treasure-priority", label: "Treasures", icon: ShieldCheck },
      { href: "/hotkeys", label: "Hotkeys", icon: Timer },
      { href: "/treaty-deck-checker", label: "Treaty", icon: ShieldCheck },
    ],
  },
  {
    label: "Operar",
    links: [
      { href: "/ai-coach", label: "IA", icon: Search },
      { href: "/trust", label: "Trust", icon: ShieldCheck },
      { href: "/patch-tracker", label: "Patches", icon: ShieldCheck },
      { href: "/source-admin", label: "Admin", icon: ListTree },
      { href: "/vod-pipeline", label: "VOD", icon: Eye },
      { href: "/resources", label: "Fuentes", icon: ExternalLink },
      { href: "/source-provenance", label: "Citas", icon: ShieldCheck },
      { href: "/source-queue", label: "Queue", icon: ListTree },
      { href: "/stats", label: "Stats", icon: Search },
      { href: "/replay-lab", label: "Replays", icon: Eye },
      { href: "/art-lab", label: "Arte", icon: Images },
    ],
  },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="nav">
        <div className="nav-inner">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              <ListTree size={21} />
            </span>
            <span>
              <span className="brand-title">Academia AoE3</span>
              <span className="brand-subtitle">Decks / Shipments / Timings</span>
            </span>
          </Link>
          <nav className="nav-links" aria-label="Principal">
            {navGroups.map((group) => (
              <div className="nav-group" key={group.label}>
                <span className="nav-group-label">{group.label}</span>
                <div className="nav-group-links">
                  {group.links.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        <Icon size={17} aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="wrap">
          <span>Academia AoE3 - MVP editorial auditado.</span>
          <span>Imagenes remotas oficiales solo como referencia visual; asset pack propio pendiente.</span>
        </div>
      </footer>
    </div>
  );
}
