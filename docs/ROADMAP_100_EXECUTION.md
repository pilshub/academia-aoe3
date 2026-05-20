# Ejecucion del roadmap 100/100

Fecha: 2026-05-18.

## Resultado

Los 100 pasos ya no viven solo como lista editorial. Estan codificados en `src/data/aoe3/roadmap100.ts` y expuestos en `/roadmap` con fase, entregable y estado.

Estados:

- `done`: existe como producto visible, modelo o herramienta.
- `active`: existe seed, investigacion o validacion en curso.
- `queued`: tiene entregable definido, falta contenido/adaptador.
- `blocked`: depende de datos externos que no se deben inventar.

## Nuevas superficies

- `/roadmap`: tablero completo de los 100 pasos, fases, resumen y progreso operacional.
- `/source-queue`: fuentes priorizadas por P0/P1/P2/Monitor con siguiente accion.
- `/source-provenance`: registro interno info -> fuente para citas futuras.
- `/stats`: matriz de datos con fuentes vivas, adapters pendientes, seeds manuales y bloqueos.
- `/replay-lab`: pipeline de analisis de partidas desde input manual hasta parser/coach.
- `/replay-import`: normalizador funcional para JSON/texto de parser externo.
- `/art-lab`: briefs y prompts para imagenes propias inspiradas por AoE3.
- `/career`: modo carrera con objetivo, civ main, nivel y plan semanal.
- `/civ-mastery`: escalera de cinco niveles por civilizacion.
- `/opening-timer`: practice mode con timer, checklist y scoring.
- `/replay-coach`: coach v1 para convertir timings y scouting en correccion.
- `/deck-builder`: constructor por plan con score, roles, core/flex/greed y swaps.
- `/matchup-scout`: civ + rival + mapa -> plan, peligro, scouting y envios.
- `/errors`: biblioteca de errores con sintoma, diagnostico, fix y drill.
- `/ai-coach`: workbench de tool layer, corpus y citas internas.
- `/trust`: sellos de confianza para separar canonical, source, fixture, seed y blocked.
- `/replay-upload`: drag/drop local de replay y cola de fixture.
- `/submit-replay`: cola publica/local para candidatos de analisis.
- `/patch-tracker`: updates oficiales/candidatos con patch-risk y targets.
- `/source-admin`: panel local de ingestion de fuentes.
- `/vod-pipeline`: video/VOD -> metadata, tesis, deck, shipments, matchup y drill.
- `/series-prep`: preparador BO3/BO5.
- `/learn`: landings SEO indexables.

## Ficheros principales

- `src/data/aoe3/roadmap100.ts`
- `src/data/aoe3/sourceQueue.ts`
- `src/data/aoe3/sourceProvenance.ts`
- `src/data/aoe3/statsMatrix.ts`
- `src/data/aoe3/replayPipeline.ts`
- `src/data/aoe3/replaySamples.ts`
- `src/data/aoe3/artPipeline.ts`
- `src/data/aoe3/training.ts`
- `src/components/CareerDashboard.tsx`
- `src/components/OpeningTimer.tsx`
- `src/components/ReplayCoach.tsx`
- `src/components/SmartDeckBuilder.tsx`
- `src/components/MatchupScoutTool.tsx`
- `src/components/ErrorLibraryTool.tsx`
- `src/components/AiCoachWorkbench.tsx`
- `src/components/ReplayUploadLab.tsx`
- `src/components/SourceAdminPanel.tsx`
- `src/components/VodPipelineTool.tsx`
- `src/components/SeriesPrepTool.tsx`
- `src/data/aoe3/patchTracker.ts`
- `src/data/aoe3/seoPages.ts`

## Decision de producto

La academia no va a fingir que tiene todos los datos vivos de ladder o replay si aun no hay adapter validado. El sistema distingue:

- fuente oficial o viva enlazable;
- seed editorial revisable;
- adapter tecnico pendiente;
- bloqueo real por falta de dato fiable.

Esto permite avanzar rapido sin contaminar la confianza del producto.

## Siguiente ejecucion

1. Descargar 20 replays seed y generar fixtures con `scripts/replay-fixture.mjs`.
2. Convertir 5 fixtures en analisis reales para `/analysis` y `/replay-coach`.
3. Convertir el historial local de `/opening-timer` en perfil sincronizado con auth.
4. Ampliar `/deck-builder` con import/export de deck string si aparece formato fiable.
5. Generar primeras variantes de arte por civ y tool siguiendo `/art-lab`.
6. Sustituir colas locales (`/submit-replay`, `/source-admin`) por backend multiusuario.
