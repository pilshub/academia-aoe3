# QA Report - Academia AoE3 MVP

Fecha: 2026-05-18.

## Resultado

Estado: MVP ampliado y auditado con core AoE3 separado, herramientas didacticas, guias, analisis de partidas, analyzer manual, directorio intensivo de fuentes, provenance interno, atlas de 22 civs, replay import v1, replay upload local, submit replay local, solucion parser local, modo carrera persistente, civ mastery, opening timer con historial, replay coach, deck builder, matchup scout, biblioteca de errores, IA con citas, trust center, patch tracker, source admin, VOD pipeline, series prep BO3/BO5, landings SEO, roadmap 100 operativo, matriz de stats, replay lab, art lab y arte generado local.

Servidor validado:

- `next build`: OK.
- `next start`: OK en `http://127.0.0.1:3010`.
- `tsc --noEmit`: OK.
- Playwright: OK, 44 rutas desktop y 38 rutas mobile.
- Vercel production: OK en `https://academia-aoe3.vercel.app`.
- Produccion verificada con `curl -I` en `/career`, `/civ-mastery`, `/opening-timer`, `/replay-coach`, `/deck-builder`, `/matchup-scout`, `/errors`, `/ai-coach`, `/trust`, `/replay-upload`, `/submit-replay`, `/patch-tracker`, `/source-admin`, `/vod-pipeline`, `/series-prep`, `/learn/french-semi-ff-aoe3-de` y rutas core previas.

## Cobertura Playwright

Script:

- `scripts/qa-playwright.mjs`

Rutas desktop revisadas:

- `/`
- `/career`
- `/civ-mastery`
- `/opening-timer`
- `/replay-coach`
- `/deck-builder`
- `/matchup-scout`
- `/errors`
- `/ai-coach`
- `/trust`
- `/replay-upload`
- `/submit-replay`
- `/patch-tracker`
- `/source-admin`
- `/vod-pipeline`
- `/series-prep`
- `/learn`
- `/learn/french-semi-ff-aoe3-de`
- `/guides`
- `/guides/decks-no-son-listas`
- `/analysis`
- `/analysis/ottoman-rush-transition`
- `/analyzer`
- `/resources`
- `/source-provenance`
- `/source-queue`
- `/roadmap`
- `/stats`
- `/replay-lab`
- `/replay-import`
- `/parser-solution`
- `/art-lab`
- `/civs`
- `/decks`
- `/decks/french-semi-ff-deck`
- `/deck-checker`
- `/openings`
- `/plans/french-semi-ff`
- `/plans/spanish-fast-fortress`
- `/shipments`
- `/maps`
- `/cards`
- `/matchups`
- `/knowledge`

Rutas mobile revisadas:

- `/`
- `/career`
- `/civ-mastery`
- `/opening-timer`
- `/replay-coach`
- `/deck-builder`
- `/matchup-scout`
- `/errors`
- `/ai-coach`
- `/trust`
- `/replay-upload`
- `/submit-replay`
- `/patch-tracker`
- `/source-admin`
- `/vod-pipeline`
- `/series-prep`
- `/learn`
- `/learn/french-semi-ff-aoe3-de`
- `/guides`
- `/analysis`
- `/analyzer`
- `/resources`
- `/source-provenance`
- `/source-queue`
- `/roadmap`
- `/stats`
- `/replay-lab`
- `/replay-import`
- `/parser-solution`
- `/art-lab`
- `/plans/french-semi-ff`
- `/decks`
- `/deck-checker`
- `/shipments`
- `/maps`
- `/cards`
- `/knowledge`

Interacciones revisadas:

- Selector de planes en home.
- Busqueda `otto`.
- Filtro de tipo `Rush`.
- Navegacion al plan `Ottoman Janissary pressure`.
- Analyzer manual: cambio de plan, modificacion de timings, shipments, idle TC y notas de scouting.
- Shipment trainer: seleccion de respuesta y validacion de decision correcta.
- Deck checker: cambio de civilizacion y render de informe de deck.
- Map helper: cambio de mapa y render de recomendaciones.
- Resources: carga de directorio intensivo sin recursos externos bloqueantes.
- Source provenance: carga de fuentes verificadas, facts y mapa info a fuente.
- Roadmap 100: carga del tablero completo y captura desktop.
- Source queue: carga de backlog accionable y captura desktop.
- Stats matrix: carga de dominios/campos y captura desktop.
- Replay import: normalizacion de sample JSON, timeline, detecciones y contrato parser.
- Parser solution: solucion horse-feed + fallback npm + validadores web + pipeline de fixtures.
- Modo carrera: cambio de objetivo y render de plan semanal.
- Opening timer: arranque de timer, marcado de paso correcto y scoring.
- Replay coach: render de turning point, warnings, correcciones y checks.
- Deck builder: cambio de civilizacion y swaps recomendados.
- Matchup scout: cambio de rival y render de scouting exacto.
- Biblioteca de errores: busqueda `rush` y render de correcciones.
- IA con citas: workbench de tool layer, knowledge core y citations.
- Trust center: render de estados de publicacion y dominios de stats.
- Career: guardado local de objetivo/civ/nivel y completado de drills.
- Opening timer: guardado de intento e historial local.
- Replay upload/submit: cola local, comandos de parser y estado vacio.
- Patch tracker: render de updates, trust y targets de revision.
- Source admin: creacion local de fuente borrador.
- VOD pipeline: extraccion editorial desde URL/notas.
- Series prep: cambio a BO5 y render de game plan.
- SEO learn: landing estatica con ruta principal y links internos.

Checks automaticos:

- HTTP sin estados >= 400.
- Sin errores de consola.
- Titulo correcto.
- H1 presente.
- Sin overflow horizontal.
- Sin clipping real en texto con overflow oculto.
- Screenshots desktop y mobile.

Artefactos:

- `qa-artifacts/desktop-home.png`
- `qa-artifacts/desktop-career.png`
- `qa-artifacts/desktop-opening-timer.png`
- `qa-artifacts/desktop-replay-coach.png`
- `qa-artifacts/desktop-deck-builder.png`
- `qa-artifacts/desktop-matchup-scout.png`
- `qa-artifacts/desktop-errors.png`
- `qa-artifacts/desktop-ai-coach.png`
- `qa-artifacts/desktop-trust.png`
- `qa-artifacts/desktop-replay-upload.png`
- `qa-artifacts/desktop-patch-tracker.png`
- `qa-artifacts/desktop-source-admin.png`
- `qa-artifacts/desktop-vod-pipeline.png`
- `qa-artifacts/desktop-series-prep.png`
- `qa-artifacts/desktop-learn-french.png`
- `qa-artifacts/desktop-plan-ottoman.png`
- `qa-artifacts/desktop-analyzer.png`
- `qa-artifacts/desktop-shipments.png`
- `qa-artifacts/desktop-deck-checker.png`
- `qa-artifacts/desktop-maps.png`
- `qa-artifacts/desktop-source-provenance.png`
- `qa-artifacts/desktop-roadmap.png`
- `qa-artifacts/desktop-source-queue.png`
- `qa-artifacts/desktop-stats.png`
- `qa-artifacts/desktop-replay-import.png`
- `qa-artifacts/desktop-parser-solution.png`
- `qa-artifacts/mobile-home.png`
- `qa-artifacts/mobile-plan-french.png`

## Incidencias encontradas y corregidas

- Build de produccion inicialmente atascado por rutas dinamicas con `params` sin await en Next 15.
- Corregido `params` como `Promise<{ id: string }>` en `/decks/[id]` y `/plans/[id]`.
- Playwright detecto clipping vertical falso en headings; se ajusto line-height y el test para distinguir overflow visible de clipping real.
- Playwright detecto 404 en una URL oficial inferida; se sustituyo por una URL oficial comprobada.
- Se anadio `src/app/icon.svg` para evitar recurso de app ausente.
- Se desactivo el indicador visual de Next Dev en `next.config.ts`.
- Se amplio QA a 13 rutas y a la interaccion del analyzer manual.
- Se amplio QA a 14 rutas al incorporar `/resources`.
- Se elimino dependencia critica de imagenes remotas en render: el hero generado local alimenta la UI.
- Se amplio QA a 19 rutas al incorporar `/deck-checker`, `/shipments`, `/maps`, `/knowledge` y el plan Spanish FF.
- Playwright detecto clipping real en resultados de `/knowledge` mobile; se elimino el recorte de texto.
- Se amplio QA a 24 rutas al incorporar `/roadmap`, `/source-queue`, `/stats`, `/replay-lab` y `/art-lab`.
- Playwright detecto selector ambiguo en `/roadmap`; se hizo exacto para evitar falsos fallos entre H1 y H2.
- Se amplio QA a 25 rutas al incorporar `/source-provenance`.
- Playwright detecto selector desactualizado tras escapar `>` en JSX; se actualizo a `Info > fuente`.
- Se amplio QA a 26 rutas al incorporar `/replay-import`.
- Playwright detecto que el detector de greed no leia `Coureurs des Bois`; se amplio la regla.
- Se amplio QA a 27 rutas al incorporar `/parser-solution`.
- Se amplio QA a 36 rutas al incorporar `/career`, `/civ-mastery`, `/opening-timer`, `/replay-coach`, `/deck-builder`, `/matchup-scout`, `/errors`, `/ai-coach` y `/trust`.
- Playwright detecto selectores ambiguos en `/replay-coach` y `/matchup-scout`; se cambiaron a headings exactos.
- Se amplio QA a 44 rutas al incorporar replay upload, submit replay, patch tracker, source admin, VOD pipeline, series prep y learn SEO.
- Playwright detecto selector ambiguo en `/source-admin`; se cambio a heading exacto.

## Contenido construido

- 8 guias editoriales en `/guides`.
- 4 analisis de partidas/checkpoints en `/analysis`.
- Analyzer manual post-game en `/analyzer`.
- Directorio intensivo de fuentes en `/resources`.
- Registro interno de provenance y citas futuras en `/source-provenance`.
- Atlas base de 22 civilizaciones AoE3 DE con evidencia de roster.
- Replay import v1 en `/replay-import` para JSON/texto pegado de parser.
- Solucion parser local en `/parser-solution` y `scripts/replay-fixture.mjs`.
- Core de datos separado en `src/data/aoe3/*`.
- Herramientas nuevas: `/deck-checker`, `/shipments`, `/maps`, `/knowledge`.
- Training OS nuevo: `/career`, `/civ-mastery`, `/opening-timer`, `/replay-coach`, `/deck-builder`, `/matchup-scout`, `/errors`, `/ai-coach` y `/trust`.
- Sprint de retencion/producto: progreso persistente local, historial de timer, replay upload local, submit replay local, patch tracker, source admin, VOD pipeline, preparador BO3/BO5 y landings SEO.
- Operativa 100/100: `/roadmap`, `/source-queue`, `/stats`, `/replay-lab`, `/art-lab`.
- Arte generado original en `public/assets/generated/academy-strategy-hero.png`.
- 4 planes completos enlazados con decks, openings, cartas y analisis.

## Assets e imagenes

Estado actual:

- Se usa arte generado local en `public/assets/generated/academy-strategy-hero.png`.
- Las fuentes oficiales y comunitarias se enlazan, no se redistribuyen como pack local.
- Las cartas usan iconografia local temporal, no iconos oficiales de cartas.
- `/art-lab` contiene briefs y prompts para civ heroes, deck covers, card backplates, map plates e infografias.
- `/art-lab` ahora incluye cola de pack propio: retratos de civ, paneles de tool, placas de mapa, backplates de cartas y sellos de confianza.

Siguiente paso 10/10:

- Definir carpeta `public/assets/game/` solo para assets permitidos.
- Generar primeras variantes Nano Banana 2 por civ/tool.
- Sustituir iconografia temporal por iconos oficiales permitidos o por assets generados propios.

## Limitaciones conscientes

- El contenido de timings esta marcado como `needs-review`.
- El corpus inicial cubre 8 civs seed, 4 planes core, 20+ cartas seed, 8 guias y 4 analisis, no toda la ladder.
- Falta importar o verificar decks actuales con fuentes comunitarias/pro.
- Falta separar Treaty/Team con contenido propio.
- Falta asset pack definitivo.
- Falta ejecutar fixtures reales con replays descargados, pero la solucion tecnica y el script ya estan listos.
- Falta convertir la source queue en ingestion automatica.
- Falta adapter real para stats, ladder y replay parser; `/stats` lo marca explicitamente.
- La navegacion ya esta agrupada por hubs, pero aun puede convertirse en menu desplegable dedicado cuando haya auth/perfil.
- Replay upload y source admin son locales; requieren backend/auth para ser multiusuario.
