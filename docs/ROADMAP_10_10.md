# Roadmap Academia AoE3 10/10

Objetivo: convertir este repo en una academia premium para Age of Empires III: Definitive Edition, inspirada por Academix, pero construida alrededor de las decisiones reales de AoE3: decks, shipments, Home City, politicians, tesoros, trade route, mapa, matchup y modo.

## Vision

La academia debe responder mejor que un video, una wiki o un deck builder suelto a estas preguntas:

- Que civilizacion juego?
- Que plan intento ejecutar?
- Que deck necesito para ese plan?
- Que shipments son core y cuales son flex?
- Cuando avanzo?
- Que politician elijo?
- Que hago si me rushean, si el rival boomea o si el mapa cambia?
- Como se si mi partida va bien?

## Nivel 0 - Auditoria y Direccion

Estado: imprescindible antes de construir demasiado.

### Revisar

- El producto Academix actual en `/mnt/c/Users/fermi/_active/aoe/academix`.
- Rutas y herramientas que se pueden adaptar editorialmente.
- Que componentes visuales o patrones de UX merece la pena reutilizar.
- Diferencias de dominio entre AoE2/AoE4 y AoE3 para no copiar mal el modelo.
- Reglas de uso de contenido de Microsoft/Xbox para assets, iconos y nombres.
- Fuentes AoE3 vivas: AOE3 Explorer, ESOCommunity, foros oficiales, wikis, YouTube, Discords y creadores.

### Construir

- Documento de posicionamiento final.
- Inventario de funcionalidades candidatas.
- Mapa de gaps: que ya existe fuera y que valor anadimos nosotros.
- Criterios de calidad editorial: que hace que una guia sea publicable.

### Salida

- `docs/ACADEMIX_GAP_ANALYSIS.md` con inventario de herramientas Academix, gaps AoE3 y adaptacion por fases.
- `docs/PRODUCT.md` maduro.
- `docs/WEB_RESEARCH.md` ampliado con fuentes y permisos.
- `docs/CONTENT_STANDARD.md` con el estandar editorial.

Estado ejecutado 2026-05-18:

- Creada la capa `src/data/aoe3/*` con schema separado, civs, cartas, decks, openings, plans, maps, scenarios, sources y helpers.
- Expuestas herramientas iniciales: `/deck-checker`, `/shipments`, `/maps`, `/knowledge`.
- Actualizadas rutas de decks/plans/cards/civs/openings para leer el core AoE3 ampliado.
- Convertido el roadmap de 100 pasos en tablero operativo: `/roadmap`, `/source-queue`, `/stats`, `/replay-lab` y `/art-lab`.
- Documentada la ejecucion en `docs/ROADMAP_100_EXECUTION.md`.

## Nivel 1 - Modelo de Datos AoE3

Estado: base de todo el producto.

### Revisar

- Civilizaciones actuales de AoE3:DE.
- Cartas por civilizacion, edad, tipo, efecto, coste y prerequisitos si existen.
- Deck sizes y excepciones.
- Politicians / age-up choices por civilizacion.
- Modos: Supremacy, Treaty, Team, Empire Wars, Deathmatch si aplica.
- Mapas, natives, outlaws, trade route y tesoros relevantes.
- Unidades, tags, counters, upgrades, mercenarios, natives y artillery.

### Construir

- Schema de `CivilizationProfile`.
- Schema de `Card`.
- Schema de `Deck`.
- Schema de `Opening`.
- Schema de `Plan`.
- Schema de `MatchupGuide`.
- Schema de `MapProfile`.
- Estados de calidad: `source-backlog`, `needs-review`, `reference-ready`, `canonical`.

### Criterio 10/10

Cada dato debe tener fuente, patch o fecha, estado de revision y notas. Si falta informacion, se marca como falta; no se inventa.

## Nivel 2 - Contenido Semilla

Estado: primer corpus jugable.

### Revisar

- 3 civs iniciales: French, British, Ottoman.
- 2 planes por civ en Supremacy 1v1.
- Decks actuales recomendados por comunidad.
- Videos recientes con openings claros.
- Comentarios de jugadores/pros cuando existan.
- Cambios de patch que puedan invalidar cartas o timings.

### Construir

- 3 perfiles de civ completos.
- 6 planes completos.
- 6 decks explicados carta por carta.
- 6 openings paso a paso.
- 12 ramas condicionales: anti-rush, greedy, water/trade, FF, semi-FF, timing colonial.
- 12 matchup briefs contra arquetipos.

### Criterio 10/10

Un jugador intermedio debe poder abrir una pagina, jugar una partida siguiendo el plan y entender por que se desvia si el rival hace otra cosa.

## Nivel 3 - MVP Web

Estado: primera app usable.

### Revisar

- Stack final: probablemente Next.js como Academix.
- Si conviene clonar estructura base de Academix o crear app limpia.
- Navegacion principal.
- Look and feel: premium, historico, legible, sin parecer wiki antigua.
- Responsive movil: muchos jugadores consultaran la guia entre partidas.

### Construir

- Home funcional, no landing vacia.
- `/civs`: listado y perfil de civilizacion.
- `/decks`: biblioteca filtrable.
- `/decks/[id]`: deck viewer con cartas core/flex/trampa.
- `/openings`: biblioteca filtrable.
- `/openings/[id]`: timeline de apertura con benchmarks.
- `/plans/[id]`: vista central que une civ + deck + opening + matchup + transicion.
- `/cards`: buscador y fichas de cartas.
- `/matchups`: guias rapidas.
- Layout app shell con busqueda, filtros y favoritos locales.

### Criterio 10/10

La primera pantalla ya debe servir para aprender o elegir plan. Nada de portada decorativa sin utilidad.

## Nivel 4 - Herramientas Didacticas

Estado: diferencia entre web buena y academia memorable.

### Revisar

- Que herramientas AoE2 funcionan porque son entrenables: hotkeys, counters, build orders, stats.
- Que equivalente real tiene en AoE3.
- Que se puede hacer sin integracion con el juego.

### Construir

- Deck Explainer: seleccionas deck y te explica plan, riesgos y flex slots.
- Shipment Trainer: quiz de "que envio toca ahora?" segun escenario.
- Opening Timer: pasos con ritmo, benchmarks y avisos.
- Card Slot Comparator: comparador de cartas que compiten por el mismo hueco.
- Matchup Scout: civ propia + civ rival + mapa => plan recomendado.
- Treasure Priority Guide: que tesoros importan segun opening.
- Map/Natives Helper: mapa => natives, trade route, plan recomendado.
- Treaty Deck Checker: modo Treaty separado, sin contaminar Supremacy.

### Criterio 10/10

Cada herramienta debe reducir una decision real de partida, no ser una tabla bonita.

## Nivel 5 - Datos, Stats e Integraciones

Estado: despues del MVP editorial, no antes.

### Revisar

- Posibilidades reales de AOE3 Explorer.
- APIs disponibles o scraping permitido.
- Replays AoE3: formato, parsers existentes, fiabilidad y limitaciones.
- Perfiles, leaderboards, match history y lobbies.
- Riesgos legales y de mantenimiento.

### Construir

- Integracion de enlaces externos a perfiles.
- Import manual de deck.
- Export/copy deck si es viable.
- Comparador de civs por datos externos si hay fuente fiable.
- Replay parser experimental o adaptador a parser existente.
- Player Scout v1 si hay datos suficientes.

### Criterio 10/10

No lanzar features de stats si no son confiables. Mejor un buen enlace contextual que una integracion frágil.

## Nivel 6 - IA y Coach

Estado: solo cuando el corpus sea bueno.

### Revisar

- Que puede responder IA sin inventar.
- Corpus local disponible.
- Guardrails de fuentes.
- Coste de tokens y cache.
- Idioma ES/EN.

### Construir

- Chat IA con herramientas restringidas al corpus.
- Respuestas con citas internas: deck, plan, card, matchup.
- Coach de plan: "quiero jugar franceses en Arabia contra otomanos".
- Generador de checklist de practica.
- Analisis post-partida manual: el jugador mete timings y resultado; la IA compara con benchmarks.

### Criterio 10/10

La IA debe decir "no tengo datos" cuando falten fuentes. La confianza del producto vale mas que una respuesta espectacular.

## Nivel 7 - Comunidad y Contenido Vivo

Estado: cuando ya haya utilidad diaria.

### Revisar

- Que necesita la comunidad hispana.
- Donde hay creadores activos.
- Que formato editorial funciona: guias cortas, clases, infografias, retos.
- Como moderar aportes sin ensuciar calidad.

### Construir

- Sistema de contribuciones/revision.
- Changelog de patches.
- Guias destacadas por temporada.
- Retos semanales: "practica este opening 5 partidas".
- Favoritos y notas personales.
- Colecciones: "empezar AoE3 desde AoE2", "primer ranked", "anti-rush".
- Infografias descargables.

### Criterio 10/10

Contenido vivo, pero curado. No convertir la academia en un foro caotico.

## Nivel 8 - UX Premium

Estado: transversal.

### Revisar

- Academix actual: navegacion, herramientas, cards, filtros, visual tone.
- Sitios AoE2/AoE3 de referencia para evitar friccion.
- Mobile first para consulta rapida.
- Accesibilidad: contraste, teclado, estados vacios, loading, error.

### Construir

- App shell denso y claro.
- Busqueda global.
- Filtros por civ, modo, mapa, dificultad, plan, patch.
- Comparadores sin ruido.
- Timelines visuales.
- Tooltips de cartas y terminos.
- Estados de "fuente pendiente" y "review needed".
- Modo lectura para seguir opening.

### Criterio 10/10

La web debe sentirse como una herramienta de jugador, no como una landing de marketing.

## Nivel 9 - Calidad, Testing y Produccion

Estado: antes de beta publica.

### Revisar

- Consistencia de datos.
- Links rotos.
- Navegacion movil.
- Rendimiento.
- SEO basico.
- Legal/disclaimers.
- Seguridad si hay auth, forum o inputs de usuario.
- Persistencia local y migraciones.

### Construir

- Tests de schemas.
- Tests de rutas principales.
- Validadores de contenido.
- Scripts de auditoria de fuentes y patches.
- QA checklist por release.
- Sitemap, robots, metadata y OG images.
- Deploy en Vercel.
- Analytics ligeras.

### Criterio 10/10

Ninguna guia canonical sin fuente, ningun deck sin patch, ninguna ruta principal rota.

## Roadmap por Fases

### Fase A - Fundacion

Duracion estimada: 1 semana.

- Cerrar docs de producto.
- Crear schemas.
- Elegir stack.
- Crear app base.
- Crear dataset semilla manual.
- Crear estandar editorial.

### Fase B - MVP Jugable

Duracion estimada: 2-3 semanas.

- Implementar `/civs`, `/decks`, `/openings`, `/plans`, `/cards`.
- Cargar 3 civs y 6 planes.
- Crear filtros y busqueda.
- Crear vistas responsive.
- QA manual con partidas reales o VODs.

### Fase C - Academia Real

Duracion estimada: 3-5 semanas.

- Ampliar a 8-10 civs.
- Crear Shipment Trainer.
- Crear Matchup Scout.
- Crear Card Comparator.
- Crear Map/Natives Helper.
- Publicar beta privada.

### Fase D - Plataforma 10/10

Duracion estimada: continua.

- Corpus completo de civs.
- Herramientas avanzadas.
- IA con corpus local.
- Integraciones externas si son fiables.
- Comunidad, retos y actualizaciones de patch.

## Backlog Prioritario

P0:

- Schema AoE3 correcto.
- Dataset semilla.
- App base.
- Plan viewer.
- Deck viewer.
- Opening viewer.

P1:

- Cards explorer.
- Matchups.
- Shipment Trainer.
- Fuentes y patch tracking.
- Busqueda global.

P2:

- Stats externas.
- Replay parser.
- Chat IA.
- Perfil de jugador.
- Comunidad y contribuciones.

## Definicion de "Academia 10/10"

La academia esta en nivel 10/10 cuando:

- Un principiante entiende AoE3 sin tener que ver 20 videos.
- Un jugador intermedio puede practicar un plan completo.
- Un jugador competitivo encuentra benchmarks y decisiones utiles.
- Los decks no son listas: son argumentos estrategicos.
- Cada contenido tiene fuente, patch y estado de revision.
- La web es rapida, clara y agradable en movil.
- Las herramientas ensenan decisiones reales de partida.
- El producto se actualiza con el meta sin romper confianza.
