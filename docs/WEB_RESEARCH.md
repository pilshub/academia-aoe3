# Investigacion web y referencias

Fecha: 2026-05-17.

## Lectura rapida

AoE2 tiene un ecosistema fuerte de herramientas de practica, estadisticas y referencia. AoE3 esta recuperando movimiento con herramientas como AOE3 Explorer, deck builders y companion apps, pero todavia falta una capa editorial que una deck, opening, shipment order, matchup y explicacion.

## Referencias AoE2 utiles como inspiracion

### AoE2 Insights

URL: https://www.aoe2insights.com/

Que aporta:

- Perfiles de jugador, historiales, leaderboards y analisis de partidas.
- Buen ejemplo de "player intelligence" antes/despues de jugar.
- Inspiracion para una futura capa de perfil AoE3, no para el MVP inicial.

### AoE2.ai

URL: https://aoe2.ai/en

Que aporta:

- Scout de oponentes, analisis de replays, tech tree y agente IA.
- La promesa es potente: convertir datos en recomendaciones tacticas.
- Inspiracion para una futura herramienta "Deck Scout" o "Matchup Coach".

### AOEDB

URL: https://aoedb.net/

Que aporta:

- Base de civilizaciones, unidades, tech trees, counters y build orders.
- Buena estructura de referencia multi-juego.
- Inspiracion para fichas limpias, pero Academia AoE3 debe explicar decisiones, no quedarse en base de datos.

### AoEStats

URL: https://aoestats.io/preview/

Que aporta:

- Estadisticas de civilizaciones y meta por modo/rank.
- Inspiracion para mapas de poder: civ, winrate, pickrate, rango y patch.

### AoE Authority

URL: https://aoeauthority.com/maps

Que aporta:

- Stats por mapas, leaderboards y biblioteca de builds.
- Inspiracion para que las guias no sean genericas: el mapa cambia la decision.

### Siege Engineers

URL: https://siegeengineers.org/projects/

Que aporta:

- Ecosistema de proyectos AoE2, incluyendo tech tree y herramientas comunitarias.
- Inspiracion para pensar Academia AoE3 como plataforma viva, no solo web cerrada.

### AoE Hippo

URL: https://www.aoe-hippo.com/

Que aporta:

- Entrenador de hotkeys para AoE2.
- Inspiracion para futuras rutinas de practica: shipments, macro starts, counters y "elige el envio correcto".

## Referencias AoE3 directas

### AOE3 Explorer

URL: https://aoe3explorer.com/tools

Que aporta:

- Leaderboards, lobbies, grid, decks, wiki, esport y herramientas.
- Herramientas actuales: batch calculator, counter, deck builder y replay parser.
- Es la referencia principal para no duplicar sin valor: si hacemos decks, debemos aportar contexto estrategico y aprendizaje.

### AOE III DEck builder online

URL: https://forums.ageofempires.com/t/aoe-iii-deck-builder-on-line/199390

Que aporta:

- Deck builder open source orientado a compartir decks.
- El autor explica que la app esta aislada del juego y sirve para compartir cuando no puedes abrir el juego.
- Hueco para nosotros: no solo construir deck, sino explicar por que ese deck gana un plan.

### AOE 3 Companion App

URL: https://eso-community.net/viewtopic.php?t=24568

Que aporta:

- App con deck builder, decks compartidos, unidades, edificios, mapas, natives/outlaws, cartas, noticias, ELO y counters.
- Senala que la comunidad si usa herramientas AoE3 cuando resuelven tareas concretas.
- Hueco para nosotros: capa formativa en espanol, con rutas de aprendizaje y planes jugables.

### Age of Empires Wiki: Home City

URL: https://ageofempires.fandom.com/wiki/Home_City

Que aporta:

- Base conceptual de Home City, cards, decks, experiencia y personalizacion.
- Buena fuente para explicar conceptos base, aunque habra que validar datos con patch actual.

## Huecos claros

- Texto practico para openings AoE3: la gente sigue recurriendo a videos y foros.
- Decks explicados por plan, no solo por cartas.
- Shipments con ramas: "si ves X, envia Y".
- Benchmarks visibles: age-up, primer timing, eco target, transicion.
- Comparador de cartas por slot: core, flex, greed, anti-rush, mapa, team.
- Contenido hispano estructurado.

## Propuesta de enfoque

MVP editorial primero:

- 3 civs
- 6 planes
- 6 decks
- 6 openings
- 12 matchups/arquetipos
- 1 explorador de cartas con tags

Herramientas despues:

- Deck builder con explicacion
- Quiz de shipments
- Scout de matchup
- Importador/manual de deck
- Replay parser o integracion externa solo si hay datos fiables

## Riesgos

- AoE3 cambia mucho por civ y modo: no mezclar Supremacy, Treaty y Team.
- Los decks viejos caducan con patches: cada plan necesita patch/source.
- Scraping o uso de assets debe respetar reglas de contenido de Microsoft/Xbox.
- No debemos prometer sincronizacion con el juego si no existe.
