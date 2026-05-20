# Producto AoE3

Prioridad: alta si lo enfocamos como "Academix para AoE3" y no como otra wiki.

## Tesis

AoE2 ya tiene muchas herramientas maduras para aprender: build orders, stats, counters, tech trees, perfiles, replays y entrenadores. AoE3 tiene datos y algunas herramientas nuevas, pero el aprendizaje practico sigue fragmentado entre videos, foros, decks sueltos y wikis.

El producto debe ocupar ese hueco: explicar decks, shipments y openings como decisiones de partida, no como listas estaticas.

## Inspiracion desde Academix

- Mantener el enfoque editorial: convertir conocimiento disperso en rutas claras.
- Reusar la idea de herramientas utiles antes que paginas decorativas.
- Priorizar civs, matchups, builds/openings, stats y entrenamiento.
- Evitar copiar el schema de build orders AoE2/AoE4 de forma literal: AoE3 depende de deck, shipment tempo, politician, tesoros, trade route, natives y modo de juego.

## Posicionamiento

Nombre funcional: Academia AoE3.

Promesa: "elige una civ, un plan y un matchup; entiende que deck jugar, que enviar, cuando avanzar y que transicion perseguir".

Publico inicial:

- Jugadores de AoE2/AoE4 que entran a AoE3 y se pierden con los decks.
- Jugadores casuales de AoE3 que quieren ranked sin pausar videos de 30 minutos.
- Comunidad hispana que necesita guias en texto claro, no solo VODs.

## Primer MVP

- `/civs`: perfiles de civilizacion con curva de aprendizaje, identidad, power spikes, errores comunes y planes recomendados.
- `/decks`: biblioteca de decks por civ, plan, mapa, matchup y modo.
- `/openings`: apertura paso a paso con age-up, shipment order, crates, tesoros deseables, benchmarks y transiciones.
- `/cards`: explorador editorial de cartas: que hace, cuando se envia, con que plan encaja y que cartas compiten por el mismo slot.
- `/matchups`: guia rapida civ vs civ con deck recomendado, primer envio, condicion de victoria y peligro principal.

## Diferenciador

La unidad de contenido no debe ser solo "build order". Debe ser un Plan:

- Civ
- Modo: Supremacy, Treaty, Team, Empire Wars
- Mapa o familia de mapas
- Matchup o arquetipo enemigo
- Deck recomendado
- Shipment order esperado
- Age-up politician
- Benchmarks de tiempo
- Decisiones condicionales
- Transiciones
- Errores frecuentes

## Datos iniciales

Campos minimos para un Plan:

- `id`, `title`, `civ`, `mode`, `mapTags`, `matchupTags`
- `difficulty`, `eloRange`, `patch`, `source`
- `deck`: cartas por edad, cartas core, flex slots y cartas trampa
- `opening`: pasos con tiempo aproximado, poblacion, aldeanos, recursos y accion
- `shipments`: orden ideal y ramas
- `ageUps`: politician recomendado y alternativas
- `benchmarks`: age II, age III, primer timing militar, eco target
- `gameplan`: objetivo, scouting, transicion, como cerrar
- `reviewStatus`: `canonical`, `reference-ready`, `needs-review`, `source-backlog`

## Principios de producto

- Explicar el por que antes que llenar tablas.
- No inventar timings: si faltan datos, marcar como pendiente.
- Separar Supremacy, Treaty y Team Games; en AoE3 cambian demasiado.
- Cada deck debe responder a una pregunta: "que intento ganar con esto?"
- Cada opening debe tener benchmarks verificables.
- La app debe ser util sin cuenta, y mejor con cuenta/perfil si mas adelante integramos stats.

## Siguiente corte

1. Crear dataset semilla de 3 civilizaciones: French, British y Ottoman.
2. Crear 6 planes: 2 por civ, centrados en Supremacy 1v1.
3. Crear un Deck/Opening viewer estatico y editorial.
4. Anadir una pagina de investigacion de fuentes y gaps.
5. Despues conectar stats externas o replay parsing solo si el MVP editorial ya funciona.
