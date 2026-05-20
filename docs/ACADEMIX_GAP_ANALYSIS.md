# Gap analysis: AoE4 Academix -> Academia AoE3

Fecha: 2026-05-18.

Objetivo: analizar el proyecto de referencia `/mnt/c/Users/fermi/_active/aoe/academix` y compararlo con esta Academia AoE3 para saber que falta, que conviene adaptar y como construirlo sin copiar mal el dominio.

## Veredicto corto

Si, falta mucha informacion y faltan muchas herramientas.

La version actual de Academia AoE3 ya tiene una buena semilla editorial: rutas para civs, decks, openings, cards, guides, matchups, analysis/analyzer y resources. Pero Academix es una plataforma completa: tiene datos masivos, herramientas interactivas, APIs, analisis de jugador, replay, IA, comunidad, retos, economia, counters, videos e infografias.

La diferencia real no es solo cantidad de paginas. La diferencia es que Academix tiene motores:

- motor de conocimiento para Chat IA;
- motor de analisis de perfil/replays;
- motor de economia/build simulation;
- motor de counters/combat;
- APIs internas con cache, streaming y persistencia;
- pipelines de contenido desde videos, guias, builds e infografias.

La AoE3 Academy debe evolucionar hacia eso, pero con mecanicas AoE3: decks, shipments, Home City, politicians, crates, tesoros, trade route, natives, mercs, mapas y modos.

## Evidencia de la auditoria local

### Academix AoE4

- 57 rutas `page.tsx`.
- 46 rutas `api/route.ts`.
- 233 guias ES y 233 guias EN.
- 462 matchups estructurados.
- 223 infografias.
- 31 builds Vortix estructuradas, mas builds importadas desde Pilsen/AoE4Guides.
- Librerias clave inspeccionadas:
  - `src/lib/analysis-engine.ts`: 1068 lineas.
  - `src/lib/aoe4-summary.ts`: 402 lineas.
  - `src/lib/game-engine.ts`: 1162 lineas.
  - `src/lib/economy-simulator.ts`: 1082 lineas.
  - `src/lib/counter-civ.ts`: 263 lineas.
  - `src/lib/build-validator.ts`: 495 lineas.
  - `src/app/api/replay/route.ts`: 791 lineas.
  - `src/app/api/coach-report/route.ts`: 1043 lineas.
  - `src/app/api/chat/route.ts`: 414 lineas.
  - `src/app/api/scout-analysis/route.ts`: 259 lineas.

### Academia AoE3 actual

- 14 rutas `page.tsx`.
- 0 rutas API.
- Dataset semilla en `src/data/academy.ts`:
  - 3 civilizaciones.
  - 9 cartas.
  - 3 decks.
  - 3 openings.
  - 3 plans.
  - 3 matchups.
  - 8 guias.
  - 4 analisis de partida mock/manual.
- Directorio de fuentes en `src/data/resources.ts` con 46 entradas.
- Un solo asset principal generado: `public/assets/generated/academy-strategy-hero.png`.

## Lectura de producto

Academix no es una wiki. Es una academia con cuatro capas:

1. Contenido editorial: guias, builds, videos, infografias, mapas, meta.
2. Herramientas de decision: civs, matchups, tier list, maps, counters, army builder.
3. Analisis personal: scout, profile/stats, replay analyzer, coach report, historial.
4. Comunidad/retencion: dashboard, retos, foro, sparring, teammate, members.

Nuestra AoE3 Academy ahora mismo cubre parcialmente la capa 1. Apenas empieza la capa 2. No tiene capa 3 ni capa 4.

## Gaps principales

| Area | Academix tiene | AoE3 actual tiene | Gap |
| --- | --- | --- | --- |
| Rutas | 57 paginas | 14 paginas | Faltan herramientas completas |
| APIs | 46 endpoints | 0 endpoints | No hay datos dinamicos, cache, replay, IA ni comunidad |
| Guias | 466 markdown ES/EN | 8 guias inline | Falta corpus real |
| Builds | sistema de builds con referencia, practica, TTS y generacion | 3 openings estaticos | Falta sistema de deck/opening/shipments serio |
| Matchups | 462 matchups + live stats + guia por civ | 3 arquetipos | Falta matriz civ-vs-civ y mapa |
| Replay | analisis via aoe4world summary + narrativa IA | mock/manual analyzer | Falta parser/adaptador real |
| Scout/Profile | perfil, historial, debilidades, actividad, tilt | nada | Falta player intelligence |
| Meta/Mapas | stats live por civ/map/rank | nada | Falta capa de meta o criterio curado |
| Counters/Combat | datos de unidades + upgrades + sim | nada | Falta base de unidades/counter engine AoE3 |
| Economia | game engine + economy simulator/viewer | nada | Falta simulador de crates, gather, TP, shipments |
| IA | Chat con tools y Knowledge Core | nada | Falta corpus y tool layer |
| Comunidad | foro, sparring, teammate, retos | nada | Falta retencion y comunidad |
| Arte | infografias + imagenes + iconos juego | 1 hero generado | Falta identidad visual propia |

## Inventario de Academix y adaptacion AoE3

### 1. Chat IA

Academix:

- Ruta: `/chat`.
- API: `/api/chat`.
- Tools principales: `get_civ_guide`, `get_matchup`, `lookup_player`, `get_unit_info`, `get_builds`, `search_content`, `search_academix_knowledge`, `get_civ_stats`, `get_leaderboard`, `compare_units`.
- Usa Knowledge Core local con guias, builds, matchups, civ profiles, counters, economia, techs y fuentes Vortix/pro.
- Streaming SSE, tools en paralelo, guardrails contra inventar datos.

AoE3 equivalente:

- `Coach AoE3` con tools restringidas:
  - `get_civ_plan(civ, mode)`;
  - `get_deck(civ, plan, mode)`;
  - `get_shipment_advice(civ, matchup, map, currentAge)`;
  - `get_card_info(card)`;
  - `get_matchup_plan(myCiv, enemyCiv, map)`;
  - `search_sources(query)`;
  - `lookup_player(profile)` cuando AOE3 Explorer sea viable;
  - `analyze_manual_postgame(input)` mientras replay real madura.
- No debe responder de memoria sobre timings, patches o decks sin fuente.

Primera version:

- Crear `src/lib/aoe3/knowledge.ts`.
- Indexar `src/data/academy.ts`, `src/data/resources.ts` y futuras guias markdown.
- Endpoint `/api/chat`.
- Ruta `/chat` solo cuando haya corpus suficiente.

### 2. Replay Analyzer

Academix:

- Ruta: `/replay`.
- APIs: `/api/replay`, `/api/replay/narrative`, `/api/replay/history`, `/api/replay/stats`, `/api/replay/settings`.
- Usa `summary.json` de aoe4world.
- Extrae APM, idle TC, age timings, scores, build order, recursos, army snapshots, upgrades, landmarks.
- Genera evidencia, narrativa IA, milestones y fuentes.

AoE3 equivalente:

- Entrada ideal: URL o archivo procesado desde AOE3 Explorer replay parser / Free Food Party.
- Datos clave AoE3:
  - civs, mapa, modo, rating;
  - decks visibles;
  - shipments enviados y timing;
  - age-up timings y politicians;
  - tech timings;
  - unit composition;
  - trade route/natives si se puede inferir;
  - idle TC / villager count si el parser lo da;
  - momentos de pelea y curva de eco si existe.

Primera version:

- No intentar parser binario propio primero.
- Crear un adaptador: `src/lib/aoe3/replay-adapters.ts`.
- Aceptar JSON pegado/exportado desde herramientas externas.
- Crear `/replay` con formulario: URL/JSON/manual.
- Crear `/analysis/[id]` real con timeline de shipments y decisiones.

### 3. Coach Report / Profile

Academix:

- Ruta: `/coach` y `/profile`.
- Analiza multiples partidas.
- Detecta patrones de civs, mapas, duracion, tilt, winrate, rating buckets, actividad.
- Coach Report usa partidas seleccionadas y resumen profundo.

AoE3 equivalente:

- Perfil de jugador basado en AOE3 Explorer si hay endpoints accesibles o scraping permitido.
- Si no, MVP manual:
  - importar lista de partidas/replay outputs;
  - seleccionar 5-15 partidas;
  - detectar patrones de shipments, edad, mapa, deck y matchup.

Insights AoE3 que debe detectar:

- "Mandas carta greedy cuando el rival muestra rush".
- "Tu age-up a III llega tarde cuando no tomas TP/XP".
- "Pierdes contra cavalry porque el deck no trae suficiente anti-cav temprano".
- "Ganas mas cuando tu primer envio colonial es militar en este matchup".
- "Estas usando un deck de Team/Treaty en Supremacy 1v1".

Primera version:

- `/profile` con busqueda/enlace externo a AOE3 Explorer.
- `/coach` manual con import de 5 partidas o seleccion desde historial local.
- Guardar historial en localStorage al inicio; Redis/Postgres despues.

### 4. Builds -> Plans, Openings y Shipment Trees

Academix:

- Ruta: `/builds`.
- Vista biblioteca, generador, tabla, timeline, practica y TTS.
- `docs/BUILD_ORDER_REFERENCE_SYSTEM.md` define builds como objetos de referencia: id, titulo, civ, tipo, autor, source URL, patch, benchmarks, pasos, decision points y quality state.

AoE3 equivalente:

- No copiar build orders rigidos de AoE4.
- La unidad central debe ser `Plan`.
- Un plan AoE3 agrupa:
  - deck;
  - shipment tree;
  - opening;
  - politician;
  - map assumptions;
  - matchup branch;
  - benchmarks;
  - errores frecuentes.

Herramientas necesarias:

- `/plans`: biblioteca de planes.
- `/plans/[id]`: vista canonicamente fuerte.
- `/openings/[id]`: timer/practice mode.
- `/shipments`: shipment tree viewer.
- `/decks/[id]`: deck explainer.
- `/deck-checker`: detecta core/flex/trap/missing cards.

Primera version:

- Extraer tipos de `src/data/academy.ts` a `src/data/aoe3/schema.ts`.
- Separar datos por archivo:
  - `civs.ts`;
  - `cards.ts`;
  - `decks.ts`;
  - `openings.ts`;
  - `plans.ts`;
  - `matchups.ts`.
- Ampliar de 3 a 8-10 civs antes de llamar esto beta.

### 5. Cards y Home City

Academix:

- Tiene datos de unidades, civ profiles, techs y builds.

AoE3 equivalente:

- Este es el corazon del juego. Falta casi todo.
- Necesitamos base de cartas:
  - civ;
  - edad;
  - tipo;
  - rol;
  - efecto;
  - timing;
  - compite con;
  - planTags;
  - modo;
  - patch/source;
  - reviewStatus.

Herramientas:

- `/cards`: buscador actual debe convertirse en compendium real.
- `/cards/[id]`: ficha de carta.
- `/compare-cards`: compara slot: por ejemplo `700 Wood` vs unidad militar vs eco.
- `/shipment-trainer`: escenarios y decision de envio.

### 6. Matchups

Academix:

- `/matchups` y `/matchup-guide`.
- Datos live desde aoe4world y guias pregeneradas.
- Filtros por rank, civ propia/rival, unidades clave, plan enemigo, plan propio y TTS.

AoE3 equivalente:

- Matchup AoE3 no debe ser solo civ-vs-civ.
- Debe incluir:
  - mapa;
  - natives;
  - trade route;
  - deck probable;
  - first shipment;
  - first military threat;
  - age-up politician;
  - plan si el rival rushea/boomea/FF;
  - carta que no puedes mandar a ciegas.

Primera version:

- Matriz arquetipica antes que matriz completa:
  - vs rush;
  - vs semi-FF;
  - vs FF;
  - vs boom;
  - vs water/trade.
- Despues civ-vs-civ para las civs mas jugadas.

### 7. Meta, Tier List y Mapas

Academix:

- `/meta`: civ stats por rank, movimientos del meta y mapas.
- `/maps`: top/bottom civs por mapa y rank.
- `/tierlist`, `/team-tierlist`.

AoE3 equivalente:

- Si AOE3 Explorer da estadisticas fiables:
  - civ winrate/pickrate por modo;
  - mapas;
  - rank/ELO;
  - matchups.
- Si no:
  - tier list editorial con fecha, fuente y confidence.

Rutas:

- `/meta`;
- `/maps`;
- `/tierlist`;
- `/team-tierlist`;
- `/treaty-meta`.

Regla:

- Nunca publicar "meta actual" sin fecha exacta, source y sample size.

### 8. Counters, Duel, Army Builder y Combat Simulator

Academix:

- `/counters`: matrix con 67 unidades, upgrades, civ techs y simulador tick-by-tick.
- `/duel`: duelo unidad vs unidad con upgrades.
- `/army-builder`: composiciones y sugerencias.
- `/combat-simulator`: colocacion de unidades y Monte Carlo.

AoE3 equivalente:

- Necesitamos una base de unidades AoE3 completa:
  - HP, attack, ROF, range, armor, speed, multipliers;
  - tags: infantry, heavy infantry, light infantry, cavalry, heavy cavalry, artillery, siege, native, mercenary, outlaw;
  - age scaling;
  - arsenal upgrades;
  - card upgrades;
  - politician shipments;
  - native techs;
  - civ-specific modifiers.

Primera version:

- `Counter Matrix v0`: editorial, no simulador.
- `Duel v0`: 1v1 con stats base y disclaimers.
- `Army Builder v0`: comp builder que explica roles, no promete resultado exacto.

Solo despues:

- tick-by-tick real;
- upgrades/cards;
- Monte Carlo;
- formaciones y focus fire.

### 9. Economy Viewer / Calculator

Academix:

- `game-engine.ts` y `economy-simulator.ts`.
- `economy-viewer`, `economy-calculator`, `economy-visualizer`.
- Simula villagers, gather, buildings, age up y benchmarks.

AoE3 equivalente:

- Mucho mas especifico:
  - crates iniciales;
  - herdables/hunts/mines/trees;
  - treasures;
  - XP trickle;
  - shipments;
  - Trading Post;
  - market upgrades;
  - civ gather bonuses;
  - villager types especiales;
  - factories/estates/mills late.

Primera version:

- `Opening Timer`: no simula todo, muestra benchmarks.
- `Crate Start Helper`: que recoger/construir primero por civ/start.
- `TP/XP Calculator`: cuando compensa TP por shipment timing.

Despues:

- economy sim real.

### 10. Hotkey Trainer

Academix:

- `/hotkeys` con guia, trainer, cadenas building->unit, historial local y UI de teclas.

AoE3 equivalente:

- Excelente herramienta para portear.
- Ajustar a AoE3:
  - TC/villager;
  - military buildings;
  - market/church/arsenal;
  - shipment/Home City hotkeys si existen;
  - control groups;
  - explorer/scout;
  - idle villager/idle military.

Primera version:

- `/hotkeys`: guia + trainer basico.
- Guardar resultados localmente.

### 11. Quiz, Retos y Practica

Academix:

- `/quiz`, `/challenges`, dashboard widgets.
- Retos verificables via aoe4world API.

AoE3 equivalente:

- Quiz de eleccion de civ.
- Quiz de shipments.
- Quiz de cartas trampa.
- Retos semanales:
  - "juega 5 partidas con British manor boom";
  - "minuto 6: no estar housed";
  - "scoutea produccion antes del segundo envio";
  - "no mandar greedy card sin ver base rival".

Primera version:

- Retos manuales con checklist local.
- Verificacion por replay/parser despues.

### 12. Videos, Guias e Infografias

Academix:

- `/videos` con clases.
- `/guides` con markdown ES/EN.
- `/infographics` con organizador, filtros, lightbox y seleccion persistente.
- Scripts de transcripcion, traduccion, contenido Vortix e infografias.

AoE3 equivalente:

- Crear pipeline:
  - source URL;
  - transcripcion/resumen local si permitido;
  - extraccion de tesis, deck, shipments, matchup, mapa, timestamps;
  - estado de revision;
  - publicacion como guia/deck/opening/replay analysis.

Rutas:

- `/videos`;
- `/guides`;
- `/infographics`;
- `/source-queue`;
- `/changelog`.

Arte:

- Usar iconos/imagenes del juego cuando la politica lo permita.
- Generar ilustraciones propias con Nano Banana 2/Runware para heroes, cards visuales e infografias.
- Separar arte generado de iconos funcionales. Las herramientas necesitan claridad mas que decoracion.

### 13. Comunidad

Academix:

- `/forum`, `/king-forum`, `/find-sparring`, `/find-teammate`, `/members`.
- APIs con Redis, rate limit, sanitizacion y expiracion.

AoE3 equivalente:

- Muy util para comunidad hispana, pero no debe ir antes del core.
- Rutas:
  - `/forum`;
  - `/find-sparring`;
  - `/find-teammate`;
  - `/submit-deck`;
  - `/submit-replay`.

Primera version:

- Formulario de contribucion revisable.
- Sparring simple con Discord, horario, nivel, civs y modo.

## Que podemos reutilizar de Academix

Reutilizable como patron:

- Estructura de app shell y navegacion por herramientas.
- `ReviewStatus` y estados de calidad.
- Knowledge Core: index local, retrieval, sources y versionado.
- API de Chat con tools y SSE.
- Patron Replay: analisis estructurado primero, narrativa despues.
- Patron Coach: determinista antes de IA.
- Build Reference System: source, patch, benchmarks, decision points.
- Infographics organizer.
- SparringBoard concept.
- QA con Playwright por rutas criticas.

No reutilizable tal cual:

- `analysis-engine.ts`: depende de aoe4world y shape AoE4.
- `aoe4-summary.ts`: especifico de summary.json AoE4.
- `game-engine.ts`: Age IV economy/landmarks.
- `counter-data.ts`: unidades y upgrades AoE4.
- `maps/meta`: endpoints y civ names AoE4.
- Build orders rigidos AoE4 como modelo principal.

## Arquitectura recomendada para AoE3

Crear una capa nueva, separada del dato inline actual:

- `src/data/aoe3/schema.ts`
- `src/data/aoe3/civs.ts`
- `src/data/aoe3/cards.ts`
- `src/data/aoe3/decks.ts`
- `src/data/aoe3/openings.ts`
- `src/data/aoe3/plans.ts`
- `src/data/aoe3/matchups.ts`
- `src/data/aoe3/maps.ts`
- `src/data/aoe3/units.ts`
- `src/data/aoe3/sources.ts`

Librerias:

- `src/lib/aoe3/reference.ts`: selectores y normalizadores.
- `src/lib/aoe3/knowledge.ts`: indice para IA y busqueda.
- `src/lib/aoe3/replay-adapters.ts`: AOE3 Explorer / Free Food Party / manual JSON.
- `src/lib/aoe3/postgame.ts`: analisis determinista.
- `src/lib/aoe3/deck-checker.ts`: core/flex/trap/missing.
- `src/lib/aoe3/shipment-engine.ts`: ramas de envio.
- `src/lib/aoe3/counter-engine.ts`: counters v0/v1.
- `src/lib/aoe3/economy.ts`: crates, TP, XP y benchmarks.

APIs:

- `/api/search`
- `/api/chat`
- `/api/replay`
- `/api/replay/history`
- `/api/player`
- `/api/deck-check`
- `/api/source-queue`
- `/api/sparring`

## Roadmap recomendado

### Fase 0: cerrar la base del producto

Entregables:

- Mantener el producto actual deployable.
- Crear `CONTENT_STANDARD.md`.
- Convertir este gap analysis en backlog.
- Separar data por dominio AoE3.

Criterio:

- Ninguna pagina debe prometer datos que no existen.

### Fase 1: Reference Core AoE3

Entregables:

- 8-10 civs iniciales.
- 80-120 cartas con role/timing/source.
- 12-20 decks.
- 12-20 openings.
- 20-40 plans/arquetipos.
- 40-60 matchup briefs.

Criterio:

- Todo con `source`, `patch/date`, `reviewStatus`.

### Fase 2: Herramientas de aprendizaje

Entregables:

- Deck Explainer.
- Shipment Trainer.
- Opening Timer / Practice Mode.
- Card Slot Comparator.
- Matchup Scout.
- Map/Natives Helper.

Criterio:

- Cada herramienta reduce una decision real de partida.

### Fase 3: Analisis de partidas

Entregables:

- Postgame Analyzer v1 manual.
- Replay adapter v1 para outputs externos.
- Timeline de shipments/age-up/techs.
- Biblioteca local de analisis.

Criterio:

- El jugador puede analizar una partida real sin que la web invente datos.

### Fase 4: Player Intelligence

Entregables:

- Profile/Scout con datos externos si son viables.
- Coach Report multi-partida.
- Debilidades recurrentes: deck, shipments, age-up, mapa, matchup.

Criterio:

- Primero determinista, IA solo para convertir datos en plan de practica.

### Fase 5: Meta y Stats

Entregables:

- Meta page.
- Maps page.
- Tier lists por Supremacy/Team/Treaty.
- Patch tracker.

Criterio:

- Cada cifra con source, fecha y sample size.

### Fase 6: Simuladores

Entregables:

- Counter Matrix v0.
- Unit Duel v0.
- Army Builder v0.
- Economy/TP calculator.

Criterio:

- No vender precision si los datos de upgrades/cards todavia son parciales.

### Fase 7: IA y Comunidad

Entregables:

- Chat IA con tools.
- Foro/contribuciones.
- Sparring/teammate.
- Retos semanales.
- Infografias y video library.

Criterio:

- La comunidad ayuda a curar, no a llenar la academia de ruido.

## Prioridad inmediata

El orden que mas valor da ahora:

1. Rehacer modelo de datos AoE3 en archivos separados.
2. Ampliar civs/cards/decks/openings/plans con fuentes.
3. Crear Deck Explainer y Shipment Trainer.
4. Crear Postgame Analyzer real basado en input manual/JSON externo.
5. Crear Map/Natives Helper.
6. Crear Knowledge Core y busqueda interna.
7. Solo entonces Chat IA.

## Definicion de "10/10"

La academia estara cerca de 10/10 cuando:

- Un jugador pueda elegir civ + matchup + mapa y recibir plan, deck, shipments, opening y ramas.
- Una partida pueda revisarse con timeline de decisiones reales.
- Cada dato importante tenga fuente, fecha y estado de revision.
- La IA, si existe, cite herramientas/datos internos y diga "no tengo datos" cuando toque.
- La UI funcione en movil y desktop con Playwright auditado.
- Las herramientas no sean decoracion: ayuden a tomar decisiones concretas.
- Supremacy, Team y Treaty esten separados.
- El arte e iconos ayuden a reconocer cartas/unidades/civs sin tapar la utilidad.

