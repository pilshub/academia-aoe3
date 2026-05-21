# Academia AoE3

Estado: seed repo independiente con direccion de producto definida.

Objetivo: academia para Age of Empires III con civilizaciones, decks, shipments, treasures, timings y modos. No comparte schema de build orders con AoE2 salvo componentes editoriales.

Inspiracion: `/mnt/c/Users/fermi/_active/aoe/academix`, pero adaptado al dominio real de AoE3. AoE2 sirve como referencia de ecosistema: stats, build orders, counters, perfiles y entrenadores. AoE3 necesita una capa propia centrada en Home City, decks, shipments y decisiones.

## Primer MVP

- `/civs`: perfiles de civilizacion y curva de aprendizaje.
- `/guides`: guias editoriales con drills de practica.
- `/analysis`: analisis de partidas con timeline, error clave y correcciones.
- `/analyzer`: analizador manual post-game para timings y scouting.
- `/resources`: radar intensivo de fuentes, webs, foros, wikis, Reddit, YouTube, Twitch, TikTok, Discord y herramientas.
- `/source-provenance`: registro interno info -> fuente para citar cada claim importante.
- `/source-queue`: cola accionable para convertir fuentes en contenido, stats, replays o arte.
- `/roadmap`: tablero de los 100 pasos hacia una academia 100/100.
- `/stats`: matriz de datos para meta, perfiles, replays, mapas y contenido.
- `/replay-lab`: pipeline de analisis de partidas y parsers externos.
- `/replay-import`: importador v1 por pegado de JSON/texto de parser externo.
- `/parser-solution`: solucion tecnica para generar fixtures reales con parser local.
- `/art-lab`: briefs y prompts para arte propio y futuro Nano Banana 2.
- `/career`: modo carrera con objetivo, civ main, nivel, plan semanal y rutas.
- `/civ-mastery`: progresion de 5 niveles por civilizacion.
- `/opening-timer`: practice timer con checklist, scouting y scoring.
- `/replay-coach`: coach v1 para convertir timings y scouting en correccion.
- `/deck-builder`: constructor inteligente por plan, rol y score.
- `/matchup-scout`: civ + rival + mapa -> plan, peligro y scouting.
- `/errors`: biblioteca de errores con diagnostico, fix y drill.
- `/ai-coach`: workbench de IA con tools, citations y guardrails.
- `/trust`: sellos de confianza para canonical, fixture, source, seed y bloqueos.
- `/replay-upload`: drag/drop local para preparar fixtures de replay.
- `/submit-replay`: cola publica/local de replays candidatos.
- `/patch-tracker`: updates, patch-risk y tareas de revision.
- `/source-admin`: panel local para capturar URLs antes de provenance.
- `/vod-pipeline`: VOD/video -> metadata, deck, matchup y drill.
- `/series-prep`: preparador BO3/BO5 por civ pool, rival y mapa.
- `/learn`: landings SEO indexables por intencion de busqueda.
- `/decks`: decks por plan, mapa y matchup.
- `/deck-checker`: auditor de deck contra plan, core, defensa, transicion y greed.
- `/openings`: age-up choices, shipment order y benchmarks.
- `/shipments`: trainer de escenarios para elegir shipment segun scouting.
- `/maps`: helper de mapa, trade route, agua, natives, tesoros y riesgos.
- `/cards`: cartas explicadas por uso, timing y competencia por slot.
- `/matchups`: plan rapido civ vs civ o civ vs arquetipo.
- `/knowledge`: busqueda interna previa al Chat IA.
- `/modes`, `/modes/treaty`, `/modes/team`: landing diferida para modos no MVP. Treaty y Team requieren corpus propio antes de publicar guías.

## Dominio propio

- home city, shipments y decks
- age-up politicians
- treasures y trade route
- supremacy/treaty/team games como contextos separados
- unidades, mercenarios, natives y artillery logic

## API

- `GET /api/chat` — descripción del endpoint y lista de tools del Knowledge Core.
- `POST /api/chat` — coach con tool-calling. Body: `{ messages: ChatMessage[], model?: string }`. Sin `OPENROUTER_API_KEY`, responde en modo `knowledge-only` (búsqueda directa). Con clave, usa OpenRouter (default: `moonshotai/kimi-k2`).
- `GET /api/replay` — devuelve `seedReports` y un `sampleInput` válido.
- `POST /api/replay` — body: `{ source?, payload }`. Normaliza JSON/texto del parser → `NormalizedReplay` + `mistakes` deterministas.

Tools del coach (`src/lib/aoe3/knowledge.ts`): `list_civs`, `get_civ`, `list_plans_for_civ`, `get_plan`, `get_deck`, `get_card`, `get_opening`, `get_matchup_brief`, `search_knowledge`, `list_sources`, `list_maps`.

Guardrails del coach (`src/lib/aoe3/knowledge.ts:SYSTEM_PROMPT`): cita siempre `sourceIds`, advierte cuando `reviewStatus` no sea canonical/reference-ready, no inventa timings, separa Supremacy/Team/Treaty.

## Estado (verificado local 2026-05-21)

- `npm run typecheck` → OK, sin errores TS.
- `npm test -- --run` → **9/9 tests verdes** (integridad de datos: ids únicos, refs cruzadas, sources publicados).
- `npm run lint` → sin warnings ni errores.
- `npm run build` → **82 rutas estáticas** prerenderizadas (era 32). Incluye 10 planes, 3 modes y los 2 endpoints API dinámicos.

## Testing y CI

- `npm run typecheck` — `tsc --noEmit`.
- `npm run lint` — `next lint` (config en `.eslintrc.json`).
- `npm test` — Vitest. Tests de integridad de datos en `src/data/aoe3/__tests__/schema.test.ts`: ids únicos, referencias civ/deck/opening/plan/card válidas, items publicados (canonical/reference-ready) con `sourceIds` no vacíos.
- CI: `.github/workflows/ci.yml` corre install → typecheck → lint → test → build en Node 20.

## Docs

- `docs/PRODUCT.md`: tesis, posicionamiento, MVP y modelo de contenido.
- `docs/ACADEMIX_GAP_ANALYSIS.md`: auditoria detallada de AoE4 Academix vs Academia AoE3, gaps y plan de adaptacion.
- `docs/WEB_RESEARCH.md`: referencias web AoE2/AoE3 y huecos detectados.
- `docs/ROADMAP_10_10.md`: roadmap completo para llevar la academia a nivel 10/10.
- `docs/CONTENT_STANDARD.md`: estandar editorial para planes, decks, openings, analisis e IA.
- `docs/QA_REPORT.md`: auditoria tecnica y visual del MVP con Playwright.
- `docs/RESOURCE_DIRECTORY.md`: directorio intensivo de fuentes y pipeline de conversion a contenido.
- `docs/SOURCE_PROVENANCE.md`: reglas de provenance interno y fuentes verificadas.
- `docs/REPLAY_PARSER_SOLUTION.md`: solucion concreta al bloqueo de samples de replay.
- `docs/ASSET_PIPELINE.md`: sistema de arte, imagenes generadas y futuro pack Nano Banana 2.
- `docs/ROADMAP_100_EXECUTION.md`: ejecucion del roadmap de 100 pasos como paginas, datos y estados.

## Arrancar

```bash
npm run dev
# o produccion tras build:
npm run build && npm run start
```

URL local usada en QA: `http://127.0.0.1:3010`.
