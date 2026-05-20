# Content standard Academia AoE3

Fecha: 2026-05-18.

Este estandar evita que la academia se convierta en una wiki bonita pero poco fiable. Cada pieza de contenido debe ayudar a tomar una decision real de partida.

## Estados

- `source-backlog`: existe una idea o fuente, pero aun no esta curada.
- `needs-review`: contenido util como seed, pendiente de validacion por patch/fuente.
- `reference-ready`: contenido suficientemente revisado para enlazar desde herramientas.
- `canonical`: contenido validado, con fuente, fecha y criterio de actualizacion.

## Requisitos por Plan

Un `Plan` publicable debe incluir:

- civ y modo;
- arquetipo;
- deck recomendado;
- opening;
- shipment logic;
- age-up/politician si aplica;
- benchmarks;
- ramas por scouting;
- errores frecuentes;
- source, patch o fecha;
- review status.

## Requisitos por Deck

Un deck no se publica como lista suelta. Debe separar:

- cartas core;
- cartas flex;
- cartas trampa o greed;
- shipment order esperado;
- objetivo estrategico;
- matchups/mapas donde cambia;
- fuente y estado.

## Requisitos por Opening

Un opening debe tener:

- crates/start assumptions;
- pasos por tiempo aproximado;
- primer y segundo shipment;
- scout checks;
- punto de decision;
- transicion;
- benchmarks no inventados.

## Requisitos por Replay/Analisis

Hasta tener parser real, el analisis debe declarar si viene de:

- input manual;
- output de AOE3 Explorer;
- output de Free Food Party;
- replay parser propio futuro.

Nunca debe inventar:

- idle TC;
- shipments;
- tech timings;
- composicion;
- ELO;
- mapa;
- resultado.

## Regla para IA

Chat IA solo debe responder con datos del Knowledge Core o de tools. Si no hay datos, debe decir que falta corpus o fuente.

