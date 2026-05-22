export type SeoLandingPage = {
  slug: string;
  title: string;
  description: string;
  intent: string;
  primaryHref: string;
  sections: Array<{
    title: string;
    body: string;
    links: string[];
  }>;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "french-semi-ff-aoe3-de",
    title: "French Semi-FF AoE3 DE",
    description: "Ruta indexable para aprender French Semi-FF con deck, opening, scouting y replay coach.",
    intent: "Jugador que busca una build segura de French para ranked 1v1.",
    primaryHref: "/plans/french-semi-ff",
    sections: [
      {
        title: "Que practica esta ruta",
        body: "French Semi-FF no es solo llegar a Fortress: es scoutar antes de pedir coin y no regalar mapa.",
        links: ["/opening-timer", "/deck-builder", "/matchup-scout"],
      },
      {
        title: "Primer error a evitar",
        body: "Mandar greed economica si el rival ya enseno presion. El timer y replay coach lo convierten en drill.",
        links: ["/errors", "/replay-coach"],
      },
    ],
  },
  {
    slug: "ottoman-rush-guide-aoe3-de",
    title: "Ottoman Rush Guide AoE3 DE",
    description: "Guia indexable para presion Ottoman con Janissaries, shipments tempranos y transicion.",
    intent: "Jugador que quiere ejecutar presion colonial sin suicidar unidades.",
    primaryHref: "/plans/ottoman-jan-rush",
    sections: [
      {
        title: "Promesa",
        body: "Forzar defensa rival desde minuto 5 y transicionar si el dano no aparece.",
        links: ["/plans/ottoman-jan-rush", "/shipments"],
      },
      {
        title: "Coach",
        body: "La academia mide si hubo dano real antes de pedir mas refuerzos.",
        links: ["/replay-coach", "/errors"],
      },
    ],
  },
  {
    slug: "aoe3-deck-checker",
    title: "AoE3 Deck Checker",
    description: "Herramienta para revisar core, flex, greed, defensa y transicion de un deck AoE3.",
    intent: "Usuario que quiere saber si su deck de ranked tiene cartas trampa o le falta defensa.",
    primaryHref: "/deck-builder",
    sections: [
      {
        title: "Como se audita",
        body: "El deck se compara contra un plan: core obligatorio, defensa minima, transicion y exceso de greed.",
        links: ["/deck-builder", "/deck-checker", "/cards"],
      },
      {
        title: "Confianza",
        body: "Los decks seed no se venden como meta actual hasta validar fuentes y patch.",
        links: ["/trust", "/source-provenance"],
      },
    ],
  },
  {
    slug: "aoe3-replay-analysis",
    title: "AoE3 Replay Analysis",
    description: "Pipeline para subir, parsear y convertir replays AoE3 en timeline, errores y drills.",
    intent: "Jugador que busca analizar una partida grabada de AoE3 DE.",
    primaryHref: "/submit-replay",
    sections: [
      {
        title: "Workflow",
        body: "Sube el replay, genera fixture local con parser, valida campos y transforma el turning point en drill.",
        links: ["/submit-replay", "/parser-solution", "/replay-import"],
      },
      {
        title: "Coach",
        body: "El coach usa age-ups, shipments, scouting e idle TC manual hasta tener fixture real.",
        links: ["/replay-coach", "/analysis"],
      },
    ],
  },
  {
    slug: "aoe3-matchup-scout",
    title: "AoE3 Matchup Scout",
    description: "Preparador de matchup AoE3: mi civ, rival y mapa para plan, peligro y scouting.",
    intent: "Jugador que quiere una respuesta rapida antes de ranked.",
    primaryHref: "/matchup-scout",
    sections: [
      {
        title: "Antes de cola",
        body: "La herramienta fuerza a nombrar el primer peligro antes de seguir una build order.",
        links: ["/matchup-scout", "/career"],
      },
      {
        title: "Despues de la partida",
        body: "Si el peligro se cumplio, el replay coach lo convierte en correccion.",
        links: ["/replay-coach", "/errors"],
      },
    ],
  },
  {
    slug: "british-manor-boom-aoe3-de",
    title: "British Manor Boom AoE3 DE",
    description: "Ruta indexable para British: boom de manors + timing Longbow/Musketeer.",
    intent: "Jugador casual buscando primer plan British seguro.",
    primaryHref: "/plans/british-manor-boom",
    sections: [
      { title: "Qué hace este plan", body: "Convertir casas en economía y llegar a primer timing militar sin morir a rush.", links: ["/plans/british-manor-boom", "/civ-guide/british"] },
      { title: "Drill", body: "Practica el opening con timer y verifica idle de barracks entre 5:00-9:00.", links: ["/opening-timer", "/replay-coach"] },
    ],
  },
  {
    slug: "spanish-fast-fortress-aoe3-de",
    title: "Spanish Fast Fortress AoE3 DE",
    description: "Spanish FF con XP de tesoros y Falconets protegidas.",
    intent: "Jugador que quiere ejecutar un FF agresivo sin morir colonial.",
    primaryHref: "/plans/spanish-fast-fortress",
    sections: [
      { title: "Promesa", body: "Llegar a Fortress antes que el rival escale y golpear con composición mixta.", links: ["/plans/spanish-fast-fortress", "/civ-guide/spanish"] },
      { title: "Trampa típica", body: "Falconets sin Pikemen mueren a Hussar. Anti-cav obligatorio.", links: ["/errors", "/cards"] },
    ],
  },
  {
    slug: "dutch-bank-defense-aoe3-de",
    title: "Dutch Bank Defense AoE3 DE",
    description: "Dutch banks protegidos + Skirmisher timing.",
    intent: "Jugador avanzado buscando estrategia económica con Dutch.",
    primaryHref: "/plans/dutch-bank-defense",
    sections: [
      { title: "Cuándo manda el bank", body: "Solo si scout confirma que no viene all-in inmediato.", links: ["/plans/dutch-bank-defense", "/civ-guide/dutch"] },
      { title: "Defensa", body: "4 Skirmishers antes que un segundo Bank.", links: ["/cards", "/matchup-scout"] },
    ],
  },
  {
    slug: "german-uhlan-raid-aoe3-de",
    title: "German Semi-FF Uhlan raid AoE3 DE",
    description: "Settler Wagons + Uhlan raid para Germans.",
    intent: "Jugador buscando estilo de juego basado en raid.",
    primaryHref: "/plans/german-semi-ff-raid",
    sections: [
      { title: "El raid", body: "Uhlans pegan recursos externos, no TC. Sin daño no merece la inversión.", links: ["/plans/german-semi-ff-raid", "/civ-guide/germans"] },
      { title: "Transición", body: "Si raid no cierra, Doppelsoldner + Falconets en Fortress.", links: ["/cards", "/counter-matrix"] },
    ],
  },
  {
    slug: "russian-colonial-mass-aoe3-de",
    title: "Russian Colonial Mass AoE3 DE",
    description: "Strelet/Cossack masa con Blockhouse forward.",
    intent: "Jugador buscando presión sostenida con volumen.",
    primaryHref: "/plans/russian-colonial-mass",
    sections: [
      { title: "Volumen vs calidad", body: "Russian gana porque pone más unidades por minuto. No greedees techs antes de masa.", links: ["/plans/russian-colonial-mass", "/civ-guide/russians"] },
      { title: "Cossacks", body: "Para mapa, no para TC. Atacan recursos externos.", links: ["/matchup-scout", "/counter-matrix"] },
    ],
  },
  {
    slug: "aztec-native-pressure-aoe3-de",
    title: "Aztec Native Pressure AoE3 DE",
    description: "Macehualtin + Puma + War Chief activo.",
    intent: "Jugador avanzado buscando civ nativa con presión.",
    primaryHref: "/plans/aztec-native-pressure",
    sections: [
      { title: "War Chief vivo", body: "El War Chief es eco (XP) y combate (aura). Sin él, Aztec pierde tempo.", links: ["/plans/aztec-native-pressure", "/civ-guide/aztecs"] },
      { title: "Composición", body: "Macehualtin vs infantería; Puma vs cavalry. No mezclar mal.", links: ["/counter-matrix", "/units"] },
    ],
  },
  {
    slug: "haudenosaunee-timing-aoe3-de",
    title: "Haudenosaunee Tomahawk timing AoE3 DE",
    description: "Tomahawk + Aenna con aura del War Chief.",
    intent: "Jugador buscando timing flexible y unidades de impacto.",
    primaryHref: "/plans/haudenosaunee-timing",
    sections: [
      { title: "Aura siempre activa", body: "Pelea con War Chief adyacente al ejército. La aura es lo que hace fuerte el timing.", links: ["/plans/haudenosaunee-timing", "/civ-guide/haudenosaunee"] },
      { title: "Travois", body: "Acelera infraestructura sin gastar madera. Úsalo forward.", links: ["/cards", "/reference"] },
    ],
  },
  {
    slug: "portuguese-tc-boom-aoe3-de",
    title: "Portuguese TC Boom AoE3 DE",
    description: "TC extra por edad + defensa estática con Cassadores.",
    intent: "Jugador buscando economía amplia con defensa fuerte.",
    primaryHref: "/plans/portuguese-tc-boom",
    sections: [
      { title: "TC posicionado", body: "Cada age-up te da un TC. Planea dónde colocarlo: cerca de recursos, no en chokes.", links: ["/plans/portuguese-tc-boom", "/civ-guide/portuguese"] },
      { title: "Cassadores", body: "Defensa de mapa rango largo. Cubren rutas de raid.", links: ["/counter-matrix", "/matchup-scout"] },
    ],
  },
  {
    slug: "aoe3-hotkey-trainer",
    title: "AoE3 Hotkey Trainer",
    description: "Atajos esenciales AoE3 con drill por categoría.",
    intent: "Jugador que quiere subir APM y micro.",
    primaryHref: "/hotkeys",
    sections: [
      { title: "TC sin idle", body: "Pulsa H + Shift+C cada 30s al inicio para producir aldeanos sin parar.", links: ["/hotkeys", "/opening-timer"] },
      { title: "Grupos de control", body: "Ctrl+1 al ejército, Ctrl+0 al TC. Sin grupos no hay micro.", links: ["/hotkeys", "/career"] },
    ],
  },
  {
    slug: "aoe3-counter-matrix",
    title: "AoE3 Counter Matrix",
    description: "Counters cualitativos por tipo de unidad: qué gana, qué pierde, qué empata.",
    intent: "Jugador que quiere entender composiciones sin memorizar stats.",
    primaryHref: "/counter-matrix",
    sections: [
      { title: "Tabla editorial", body: "Sin HP/attack inventados: solo relaciones (hard-counter, soft-counter, even...). Use para componer ejército.", links: ["/counter-matrix", "/reference"] },
      { title: "Aplicación", body: "Lo que ves en tu deck builder debe matchear la matriz: anti-cav si rival tiene Hussars.", links: ["/deck-builder", "/cards"] },
    ],
  },
  {
    slug: "aoe3-treasure-priority",
    title: "AoE3 Treasure Priority por civ",
    description: "Qué tesoros pelear primero y qué saltar.",
    intent: "Jugador que pierde tempo peleando tesoros mal evaluados.",
    primaryHref: "/treasure-priority",
    sections: [
      { title: "Regla universal", body: "Bajo rush, NO se pelean tesoros lejanos. El explorer vale más que el tesoro.", links: ["/treasure-priority", "/civ-guide"] },
      { title: "Por civ", body: "Cada civ tiene priority distinto: XP para FF/rush, wood para boom.", links: ["/civ-guide", "/crate-start"] },
    ],
  },
  {
    slug: "aoe3-crate-start-helper",
    title: "AoE3 Crate Start por civ",
    description: "Primeros 30 segundos y split de aldeanos.",
    intent: "Jugador que se confunde con los crates iniciales.",
    primaryHref: "/crate-start",
    sections: [
      { title: "Por civ", body: "All food + 2-3 wood casa única funciona para la mayoría. Excepciones documentadas.", links: ["/crate-start", "/civ-guide"] },
      { title: "Explorer activo", body: "El explorer SIEMPRE buscando tesoros XP/food en los primeros 90s.", links: ["/hotkeys", "/treasure-priority"] },
    ],
  },
  {
    slug: "aoe3-civ-guide",
    title: "Guías por civilización AoE3 DE",
    description: "Índice de civ guides: tesis, start-here, errores y drills.",
    intent: "Jugador que quiere aprender una civ desde cero.",
    primaryHref: "/civ-guide",
    sections: [
      { title: "Cómo usar", body: "Lee la tesis primero. Si no te encaja la promesa, prueba otra civ.", links: ["/civ-guide", "/civs"] },
      { title: "Drills", body: "Cada guía termina en drill verificable, no en teoría.", links: ["/opening-timer", "/replay-coach"] },
    ],
  },
];

export function getSeoLanding(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
