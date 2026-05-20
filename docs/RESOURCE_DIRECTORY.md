# Directorio intensivo de fuentes AoE3

Fecha de investigacion: 2026-05-17.

Este documento convierte la busqueda web en un radar operativo para la academia. No todas las fuentes tienen el mismo valor: algunas son autoridad oficial, otras sirven para detectar necesidades de jugadores, otras son historicas y otras solo sirven para descubrir creadores.

La version navegable vive en `/resources`.

## Principio

La academia no debe copiar contenido sin criterio. Debe transformar fuentes dispersas en:

- guias verificadas;
- decks explicados;
- openings practicables;
- analisis de partidas;
- prompts/infografias;
- herramientas de entrenamiento;
- cola de revision por patch.

## Prioridades

- `P0`: fuente central para producto o contenido.
- `P1`: fuente importante, pero requiere curacion.
- `P2`: fuente secundaria o historica.
- `Monitor`: senal de descubrimiento, no autoridad.

## Hallazgos clave

- AoE3 tiene una necesidad clara de build/opening guidance comparable a AoE2, pero el propio publico reconoce que los mapas, tesoros y shipments hacen dificil copiar build orders rigidos.
- AOE3 Explorer y Free Food Party muestran que la comunidad ya esta construyendo herramientas modernas de replay/decks.
- ESOC sigue siendo el nucleo comunitario historico y competitivo.
- Reddit confirma gaps concretos: dificultad para encontrar build orders, necesidad de sitios de tacticas, recomendacion recurrente de canales de YouTube.
- Twitch/YouTube son utiles sobre todo para VODs, torneos y extraccion editorial, no como fuente final sin revision.
- TikTok tiene bajo valor como fuente de verdad; sirve para descubrir formatos, memes y preguntas de nuevos jugadores.

## Fuentes P0

### Oficial

- Age of Empires official site: https://www.ageofempires.com/
- AoE III: DE official game page: https://www.ageofempires.com/games/aoeiiide/
- AoE III: DE official update notes: https://www.ageofempires.com/news/aoeiii-definitive-edition-update-54545/

Uso:

- patch tracking;
- noticias oficiales;
- media policy;
- eventos;
- validacion de cambios de cartas/civs/modos.

### Herramientas

- AOE3 Explorer: https://aoe3explorer.com/tools
- AOE3 Explorer replay parser: https://aoe3explorer.com/tools/replayparser
- Free Food Party replay parser: https://freefoodparty.com/replayparser
- AOE 3 Companion App: https://eso-community.net/viewtopic.php?t=24568

Uso:

- no duplicar sin valor;
- enlazar perfiles/replays externos;
- disenar nuestro analyzer alrededor de outputs reales;
- investigar deck import/export;
- mapear campos de replay: shipments, techs, decks, map, win time, ELO, profile.

### ESOC

- ESOC AoE3 DE forum: https://eso-community.net/viewforum.php?f=981
- ESOC Strategy forum: https://eso-community.net/viewforum.php?f=983
- ESOC Recorded Games: https://eso-community.net/viewforum.php?f=984
- ESOC Wiki: https://wiki.eso-community.net/Main_Page
- ESOC Community Links: https://eso-community.net/community-links.php

Uso:

- fuente comunitaria central;
- estrategia y recorded games;
- torneo/VOD/backlog de analisis;
- historia competitiva;
- creadores y enlaces secundarios.

### Reddit

- r/aoe3: https://www.reddit.com/r/aoe3/
- r/ageofempires: https://www.reddit.com/r/ageofempires/
- AOE3 Explorer replay parser thread: https://www.reddit.com/r/aoe3/comments/1s3z9wu/aoe3explorer_site_updated_with_replay_parser_with/
- Build orders gap: https://www.reddit.com/r/aoe3/comments/1b52dbf/where_can_i_find_build_orders_for_age_of_empires/
- Tips/resources thread: https://www.reddit.com/r/aoe3/comments/1kteljz/tips_age_of_empires_3/

Uso:

- detectar frustraciones reales;
- crear guias desde preguntas repetidas;
- validar si una herramienta importa a la comunidad;
- descubrir creadores.

## Canales y video

### YouTube

Lista de vigilancia:

- Samurai Revolution: recomendado recurrentemente por la comunidad para AoE3 strategy guides.
- ESOCTV / ESOC YouTube: torneos y VODs competitivos.
- LionHeart: build orders, micro y gameplay, recomendado por Reddit.
- Aussie Drongo: contenido historico AoE3, tier lists y builds antiguas; alto patch-risk.
- SoldieR: recomendado por comunidad para builds/micro.
- Official Age of Empires YouTube: trailers/eventos oficiales, no estrategia profunda.

Accion:

- crear un `video ingestion backlog`;
- extraer tesis, deck, shipments, timestamp y patch;
- no publicar como canonical sin validacion actual;
- separar VODs de partidas completas de videos explicativos.

### Twitch

- Official Age of Empires Twitch: https://www.twitch.tv/ageofempires
- ESOCTV Twitch: https://www.twitch.tv/esoctv
- Twitch AoE3 category: https://www.twitch.tv/directory/category/age-of-empires-iii
- TwitchStats AoE3: https://twitchstats.net/game/7830-Age%20of%20Empires%20III
- TwitchMetrics AoE3: https://www.twitchmetrics.net/channels/viewership?game=Age+of+Empires+III&lang=en
- SullyGnome AoE3: https://sullygnome.com/game/age_of_empires_iii
- StreamsCharts AoE3: https://streamscharts.com/channels?game=age-of-empires-iii

Accion:

- usar estadisticas solo para descubrir creadores activos;
- usar ESOCTV/oficial para eventos;
- crear lista semanal de VODs candidatos para analisis.

### TikTok

- Busqueda manual: https://www.tiktok.com/search?q=age%20of%20empires%203

Accion:

- monitor-only;
- descubrir formatos cortos;
- detectar preguntas de onboarding;
- no usar como fuente de balance o builds.

## Wikis y referencias

- Age of Empires Series Wiki/Fandom: https://ageofempires.fandom.com/wiki/Age_of_Empires_III
- ESOC Wiki: https://wiki.eso-community.net/Main_Page
- Liquipedia Age of Empires: https://liquipedia.net/ageofempires/Main_Page
- StrategyWiki AoE3: https://strategywiki.org/wiki/Age_of_Empires_III

Accion:

- usar wikis para breadth;
- verificar datos de balance contra patch actual;
- usar Liquipedia para torneo/player context.

## Steam y legacy

- Steam Community Guides: https://steamcommunity.com/app/933110/guides/
- Steam Discussions: https://steamcommunity.com/app/933110/discussions/
- Voobly AoE3 legacy forum: https://www.voobly.com/forum/view/605
- Reseau JS AoE3 forum: https://forum.reseau-js.com/forum/118-age-of-empires-iii/
- N3O Clan: https://www.n3oclan.com/

Accion:

- Steam sirve para FAQ y necesidades de jugadores casuales;
- legacy sirve para historia, no para DE canonical;
- no importar decks legacy sin conversion.

## Pipeline de conversion a contenido

1. Fuente entra en `/resources`.
2. Se etiqueta: P0/P1/P2/Monitor.
3. Se crea una ficha de extraccion:
   - civ;
   - modo;
   - mapa;
   - matchup;
   - deck;
   - shipment order;
   - benchmark;
   - source URL;
   - patch/date;
   - confidence.
4. Si es VOD/replay:
   - timestamps;
   - turning point;
   - error clave;
   - practica derivada.
5. Si es guia:
   - tesis;
   - bullets verificables;
   - drills;
   - enlaces a plans/decks.
6. Se publica como:
   - `source-backlog`;
   - `needs-review`;
   - `reference-ready`;
   - `canonical`.

## Proximos trabajos

- Crear `data/source-ingestion.json`.
- Crear pagina `/source-queue`.
- Crear extractor de YouTube transcript cuando haya URLs concretas.
- Crear plantillas para analisis de replay AOE3 Explorer / Free Food Party.
- Crear calendario semanal de ESOC/Twitch/VOD review.
