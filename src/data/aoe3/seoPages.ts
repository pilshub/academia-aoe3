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
];

export function getSeoLanding(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
