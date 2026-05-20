# Source provenance

Fecha: 2026-05-18.

## Objetivo

Cada pieza importante de informacion debe poder responder:

- de que fuente viene;
- si la fuente es oficial, herramienta, comunidad o seed interna;
- que dato exacto justifica;
- que falta para poder citarlo publicamente.

El registro vivo esta en:

- `src/data/aoe3/sourceProvenance.ts`
- `/source-provenance`

## Fuentes verificadas en esta ronda

- Age of Empires III: Definitive Edition - Update 13.690: fuente oficial de build, patch, nuevas cartas britanicas, Arabia/Congo Basin y cambios de gameplay.
- AOE3 Explorer Tools: fuente P0 para leaderboards, lobbies, decks, counter, deck builder, replay parser, wiki/compendium, mapas y natives.
- Free Food Party Replay Parser: ruta viva y candidata P0 para stats/replay; necesita sample manual porque la app es client-side.
- horse-feed `aoe3replay.py`: parser local principal para generar fixtures JSON/BO desde `.age3Yrec`.
- `@canyougiant/aoe3de-replay-parser`: parser npm secundario para header/player/deck/chat y referencia de formato.
- ESOC Strategy: foro vivo para builds, matchups y debate competitivo.
- ESOC Recorded Games: fuente de replays seed y analisis de partidas.
- ESOC Wiki: contexto comunitario y mapa del ecosistema ESOC.
- SamuraiRevolution Strategy School: guias por civilizacion con video/PDF, sujetas a patch-risk.
- Forgotten Empires civilizations: roster base/DE launch del atlas de civilizaciones.
- Steam Complete History / paginas oficiales de DLC: soporte para United States, Mexico, Ethiopians, Hausa, Italy y Malta.

## Politica

- `verified`: la fuente sostiene el claim general.
- `needs-sample`: hace falta fixture, replay, endpoint o muestra concreta antes de publicar dato automatico.
- `context-only`: sirve para contexto o politica, no para un claim de balance.
- `blocked`: no se puede usar todavia.

Los decks, openings, timings y benchmarks seed no se citan como verdad externa. Siguen marcados como contenido editorial interno hasta validarlos con thread, video, replay o patch concreto.

## Regla de publicacion

Para subir un contenido a `reference-ready` o `canonical`, sustituir `academy-seed` por una fuente externa concreta:

- patch oficial para cambios de juego;
- thread ESOC para strategy/build;
- replay ESOC o parser fixture para analisis;
- video/PDF exacto para creator guide;
- captura/export de herramienta para stats.

## Ejecutado tras esta fase

- Atlas base de 22 civilizaciones con `EvidenceRef`.
- Helper `resolveEvidenceSources` para mostrar fuentes internas desde paginas.
- `/replay-import` como normalizador v1 de JSON/texto de parser.
- Tipos `ReplayHeader`, `ReplayPlayer`, `ReplayShipment`, `ReplayAgeUp`, `ReplayTimelineEvent` y `NormalizedReplay`.
