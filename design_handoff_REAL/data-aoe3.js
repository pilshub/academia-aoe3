/* =========================================================
   Academia AoE3 — datos compartidos por las variantes de landing.
   Fuente: pilshub/academia-aoe3 (src/data/academy.ts, SiteShell.tsx).
   ========================================================= */

window.AoE3 = (() => {

  /* --- inline icon factory (outline 1.8) --- */
  const ICONS = {
    home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    swords:'<path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/>',
    trending:'<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
    users:'<circle cx="9" cy="8" r="4"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    crown:'<path d="M3 7l5 4 4-7 4 7 5-4-2 12H5z"/>',
    timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/>',
    cards:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>',
    crosshair:'<circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',
    badgealert:'<circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    file:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
    shield:'<path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6z"/>',
    shieldcheck:'<path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
    castle:'<path d="M3 21V8l4 2V6l3 2V4l4 4V8l3-2v4l4-2v13z"/><path d="M11 21v-5h2v5"/>',
    list:'<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>',
    map:'<polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="20"/>',
    package:'<path d="M3 7l9-4 9 4"/><path d="M3 7v10l9 4 9-4V7"/><path d="M3 7l9 4 9-4"/><path d="M12 11v10"/>',
    images:'<rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-9 9"/>',
    extlink:'<path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
    wallet:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="17" cy="14" r="1.4"/>',
    book:'<path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M4 5v14"/>',
    flame:'<path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4-2 2-2 5 0 7"/>',
    landmark:'<path d="M3 21h18"/><path d="M4 21V10"/><path d="M20 21V10"/><path d="M9 21V12"/><path d="M15 21V12"/><polygon points="12,3 20,9 4,9"/>',
    anchor:'<circle cx="12" cy="6" r="2"/><path d="M12 8v13"/><path d="M5 17a7 7 0 0 0 14 0"/><path d="M3 17h4M17 17h4"/>',
    sliders:'<path d="M4 6h16"/><path d="M7 12h10"/><path d="M10 18h4"/>',
    arrowRight:'<path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>',
    bookOpen:'<path d="M4 19V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
    crownStar:'<path d="M2 19h20"/><path d="M2 19l3-11 5 6 2-10 2 10 5-6 3 11"/>',
    star:'<path d="M12 2l3 6 6 .9-4.5 4.2 1 6.4L12 16.8 6.5 19.5l1-6.4L3 8.9 9 8z"/>',
    compass:'<circle cx="12" cy="12" r="10"/><polygon points="16,8 12,12 8,16 12,12"/>',
  };
  function icon(name, size=18, extraAttr=''){
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" '+extraAttr+'>'+(ICONS[name]||'')+'</svg>';
  }

  /* --- NAV (SiteShell.tsx) --- */
  const navGroups = [
    { label:"Base", links:[
      { href:"/", label:"Inicio", icon:"home" },
      { href:"/learn", label:"Learn", icon:"search" },
      { href:"/modes", label:"Modos", icon:"swords" },
      { href:"/roadmap", label:"100", icon:"trending" },
    ]},
    { label:"Entrenar", links:[
      { href:"/career", label:"Carrera", icon:"users" },
      { href:"/civ-mastery", label:"Mastery", icon:"crown" },
      { href:"/opening-timer", label:"Timer", icon:"timer" },
      { href:"/deck-builder", label:"Builder", icon:"wallet" },
      { href:"/matchup-scout", label:"Scout", icon:"crosshair" },
      { href:"/series-prep", label:"BO3/5", icon:"swords" },
      { href:"/errors", label:"Errores", icon:"badgealert" },
    ]},
    { label:"Analizar", links:[
      { href:"/replay-coach", label:"Coach", icon:"eye" },
      { href:"/replay-upload", label:"Upload", icon:"file" },
      { href:"/submit-replay", label:"Submit", icon:"file" },
      { href:"/replay-import", label:"Import", icon:"file" },
      { href:"/parser-solution", label:"Parser", icon:"shieldcheck" },
      { href:"/analysis", label:"Análisis", icon:"eye" },
      { href:"/analyzer", label:"Analyzer", icon:"badgealert" },
    ]},
    { label:"Aprender", links:[
      { href:"/guides", label:"Guías", icon:"file" },
      { href:"/civs", label:"Civs", icon:"castle" },
      { href:"/decks", label:"Decks", icon:"wallet" },
      { href:"/deck-checker", label:"Checker", icon:"shieldcheck" },
      { href:"/openings", label:"Openings", icon:"timer" },
      { href:"/shipments", label:"Shipments", icon:"package" },
      { href:"/maps", label:"Mapas", icon:"map" },
      { href:"/cards", label:"Cartas", icon:"book" },
      { href:"/matchups", label:"Matchups", icon:"crosshair" },
      { href:"/knowledge", label:"Search", icon:"search" },
    ]},
    { label:"Operar", links:[
      { href:"/ai-coach", label:"IA", icon:"search" },
      { href:"/trust", label:"Trust", icon:"shieldcheck" },
      { href:"/patch-tracker", label:"Patches", icon:"shieldcheck" },
      { href:"/source-admin", label:"Admin", icon:"list" },
      { href:"/vod-pipeline", label:"VOD", icon:"eye" },
      { href:"/resources", label:"Fuentes", icon:"extlink" },
      { href:"/source-provenance", label:"Citas", icon:"shieldcheck" },
      { href:"/source-queue", label:"Queue", icon:"list" },
      { href:"/stats", label:"Stats", icon:"search" },
      { href:"/replay-lab", label:"Replays", icon:"eye" },
      { href:"/art-lab", label:"Arte", icon:"images" },
    ]},
  ];

  /* --- PLANS --- */
  const civsById = {
    french:{ name:'French', short:'FR' },
    british:{ name:'British', short:'BR' },
    ottomans:{ name:'Ottomans', short:'OT' },
  };
  const plans = [
    { id:'french-semi-ff', title:'French Semi-FF flexible', civId:'french', archetype:'Semi-FF',
      mode:'Supremacy 1v1', difficulty:'Intermediate',
      promise:'Llegas a Fortress sin ceder todo el mapa y con respuesta si el rival aprieta.',
      matchupTags:['anti-rush','standard','vs boom'], reviewStatus:'needs-review' },
    { id:'british-manor-boom', title:'British Manor Boom seguro', civId:'british', archetype:'Boom',
      mode:'Supremacy 1v1', difficulty:'Start',
      promise:'Conviertes casas en ventaja económica sin olvidar que el rival también juega.',
      matchupTags:['vs standard','vs greedy','anti-rush'], reviewStatus:'needs-review' },
    { id:'ottoman-jan-rush', title:'Ottoman Janissary pressure', civId:'ottomans', archetype:'Rush',
      mode:'Supremacy 1v1', difficulty:'Start',
      promise:'Golpeas antes de que el rival ordene su partida y transicionas si la defensa aguanta.',
      matchupTags:['vs greedy','vs FF','tempo'], reviewStatus:'needs-review' },
  ];
  const archIcon = { Rush:'flame','Semi-FF':'swords', Boom:'landmark', Timing:'crosshair', Control:'shield', Water:'anchor', Treaty:'landmark' };

  /* --- FEATURES (academy.ts) --- */
  const features = [
    { title:"Modo Carrera",      body:"Dashboard personal con objetivo, civ main, nivel, plan semanal y rutas de práctica.", href:"/career",       icon:"users",       signal:"training OS" },
    { title:"Civ Mastery",       body:"Escalera de 5 niveles por civilización: identidad, opening, deck, scouting y replay.",href:"/civ-mastery",  icon:"crown",       signal:"22 rutas" },
    { title:"Opening Timer",     body:"Timer interactivo con pasos, scouting obligatorio, score y reglas de reset.",        href:"/opening-timer",icon:"timer",       signal:"practice v1" },
    { title:"Replay Coach",      body:"Formulario de review que convierte age-ups, shipments y scouting en turning point y drill.", href:"/replay-coach", icon:"eye",    signal:"coach v1" },
    { title:"Deck Builder",      body:"Constructor por plan con score, roles, cartas core, greed, alertas y swaps sugeridos.",href:"/deck-builder", icon:"wallet",    signal:"builder v1" },
    { title:"Matchup Scout",     body:"Mi civ + rival + mapa → plan, primer peligro, scouting y envíos seguros.",           href:"/matchup-scout",icon:"crosshair",  signal:"ranked prep" },
    { title:"Errores",           body:"Biblioteca de síntomas, diagnósticos, correcciones y drills conectados a herramientas.",href:"/errors",     icon:"badgealert",signal:"7 errores" },
    { title:"IA con citas",      body:"Workbench del futuro coach: tools, corpus, citations y guardrails anti-invención.",  href:"/ai-coach",     icon:"search",      signal:"guardrails" },
    { title:"Trust",             body:"Sello de confianza para separar canonical, fixture, fuente viva, seed y bloqueo.",   href:"/trust",        icon:"shieldcheck", signal:"no humo" },
    { title:"Replay upload",     body:"Drag/drop local para meter replays en cola, preparar fixture y ejecutar parser en workspace.", href:"/replay-upload", icon:"file", signal:"queue local" },
    { title:"Patch tracker",     body:"Updates oficiales/candidatos, patch-risk y targets de revisión por guía o tool.",    href:"/patch-tracker",icon:"shield",      signal:"patch-risk" },
    { title:"VOD pipeline",      body:"YouTube/Twitch pasan a metadata, tesis, deck, shipments, matchup y drill.",           href:"/vod-pipeline", icon:"eye",         signal:"ingestion" },
    { title:"Series prep",       body:"Preparador BO3/BO5 con civ pool, mapa, ban, game plan y scouting.",                   href:"/series-prep",  icon:"swords",      signal:"BO3/BO5" },
    { title:"Source admin",      body:"Panel local para capturar URLs antes de convertirlas en source queue o provenance.", href:"/source-admin", icon:"list",        signal:"admin local" },
    { title:"Learn SEO",         body:"Landings indexables para búsquedas de builds, replay analysis, deck checker y matchup scout.", href:"/learn", icon:"search", signal:"SEO" },
    { title:"Guías",             body:"Lecciones editoriales para entender decks, macro, scouting y mapa.",                  href:"/guides",       icon:"file",        signal:"8 guías base" },
    { title:"Análisis",          body:"Partidas desglosadas por timeline, error clave y práctica posterior.",                href:"/analysis",     icon:"eye",         signal:"4 análisis" },
    { title:"Analyzer",          body:"Herramienta manual para meter timings y recibir diagnóstico post-game.",              href:"/analyzer",     icon:"badgealert",  signal:"post-game v1" },
    { title:"Fuentes",           body:"Radar intensivo de webs, foros, wikis, Reddit, YouTube, Twitch, TikTok, Discord y herramientas.", href:"/resources", icon:"extlink", signal:"40+ fuentes" },
    { title:"Roadmap 100",       body:"Los 100 pasos del plan 100/100 convertidos en fases, entregables y estado.",          href:"/roadmap",      icon:"trending",    signal:"100 pasos" },
    { title:"Source queue",      body:"Cola accionable para convertir patches, foros, vídeos y tools en contenido fiable.",  href:"/source-queue", icon:"list",        signal:"P0/P1/P2" },
    { title:"Stats matrix",      body:"Contrato de datos para meta, jugadores, replays, mapas y contenido sin inventar stats.",href:"/stats",     icon:"search",      signal:"5 dominios" },
    { title:"Replay lab",        body:"Pipeline de import, timeline, deck audit e insights para análisis de partidas.",      href:"/replay-lab",   icon:"eye",         signal:"parser-ready" },
    { title:"Replay import",     body:"Pega JSON o texto de parser externo y genera timeline, warnings y campos normalizados.",href:"/replay-import",icon:"file",     signal:"tool v1" },
    { title:"Art lab",           body:"Briefs y prompts para crear arte propio inspirado por AoE3 y futuro Nano Banana 2.",  href:"/art-lab",      icon:"images",      signal:"asset queue" },
    { title:"Planes",            body:"La unidad central: civ, deck, opening, shipments, ramas y benchmarks.",               href:"/plans/french-semi-ff", icon:"crown", signal:"4 planes core" },
    { title:"Decks",             body:"Cartas core, flex y trampas, explicadas como decisiones de partida.",                 href:"/decks",        icon:"wallet",      signal:"4 decks comentados" },
    { title:"Deck checker",      body:"Comprueba si tu deck tiene core, defensa, transición y demasiado greed.",             href:"/deck-checker", icon:"shieldcheck", signal:"tool v1" },
    { title:"Shipment trainer",  body:"Escenarios de scouting para elegir el envío correcto bajo presión.",                  href:"/shipments",    icon:"package",     signal:"4 escenarios" },
    { title:"Map helper",        body:"Trade route, agua, natives, tesoros y riesgos que cambian el plan.",                  href:"/maps",         icon:"map",         signal:"5 mapas seed" },
    { title:"Knowledge core",    body:"Búsqueda interna en civs, cartas, decks, planes, mapas y escenarios.",                href:"/knowledge",    icon:"search",      signal:"pre-chat IA" },
    { title:"Openings",          body:"Timelines con pasos, scouting y puntos de decisión.",                                 href:"/openings",     icon:"timer",       signal:"4 aperturas" },
    { title:"Cartas",            body:"No solo qué hacen: cuándo enviarlas y contra qué compiten.",                          href:"/cards",        icon:"package",     signal:"20+ cartas seed" },
    { title:"Matchups",          body:"Briefs rápidos para elegir deck y primer desvío.",                                    href:"/matchups",     icon:"crosshair",   signal:"3 arquetipos" },
    { title:"Civilizaciones",    body:"Identidad, spikes, errores comunes y planes recomendados.",                           href:"/civs",         icon:"castle",      signal:"22 civs atlas" },
  ];

  const pillars = [
    { label:"Decks como decisiones",   icon:"wallet" },
    { label:"Shipments con ramas",     icon:"trending" },
    { label:"Benchmarks practicables", icon:"timer" },
    { label:"Mapas y natives importan",icon:"map" },
    { label:"Modos separados",         icon:"users" },
    { label:"Fuentes visibles",        icon:"book" },
  ];

  const sources = [
    { label:"AOE3 Explorer tools",            url:"https://aoe3explorer.com/tools",
      note:"Referencia viva para herramientas, decks, counter, replay parser y datos comunitarios." },
    { label:"AOE 3 Companion App",            url:"https://eso-community.net/viewtopic.php?t=24568",
      note:"Referencia de utilidad comunitaria: deck builder, cards, maps, natives, ELO y counters." },
    { label:"Age of Empires official media",  url:"https://www.ageofempires.com/games/aoeiiide/",
      note:"Imágenes oficiales usadas como fondos remotos, sin redistribuir archivos locales." },
  ];

  const signals = [
    { strong:"Modelo propio AoE3", note:"Plan = civ + deck + opening + ramas.", icon:"shieldcheck" },
    { strong:"Seed pack propio de civ heroes", note:"8 SVG generados (FR/BR/OT/SP/DU/GE/RU/AZ); Nano Banana 2 reemplaza cuando haya key.", icon:"images" },
    { strong:"Fuentes visibles", note:"AOE3 Explorer, Companion App y media oficial.", icon:"extlink" },
  ];

  return { icon, navGroups, civsById, plans, archIcon, features, pillars, sources, signals };
})();
