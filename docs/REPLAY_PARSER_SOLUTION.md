# Solucion al bloqueo `needs-sample`

Fecha: 2026-05-18.

## Diagnostico

AOE3 Explorer y FreeFoodParty son herramientas vivas, pero no hay contrato API publico confirmado para sacar un JSON estable directamente desde la academia. La solucion no debe depender de scrape frágil.

## Solucion

Usar un parser local para generar fixtures propios:

1. Descargar replays reales desde ESOC Recorded Games o partidas propias.
2. Parsear localmente con `horse-feed/aoe3replay.py`.
3. Guardar JSON/build-order en `fixtures/replays/parsed/`.
4. Validar el mismo replay en AOE3 Explorer o FreeFoodParty.
5. Alimentar `/replay-import` con el JSON normalizado.

## Fuente principal

ESOC thread: `https://eso-community.net/viewtopic.php?t=27153`

El autor publica `aoe3replay.py`, activo el 11 de marzo de 2026, con soporte para:

- `.age3Yrec` y `.age3Ysav`;
- game settings;
- player info;
- civs/decks/ratings/home city;
- chat;
- full action stream;
- build orders;
- age-up timings;
- HC shipments;
- market trades;
- winner detection via resign;
- `--json`;
- `--bo`;
- `--bo-player`.

Gist: `https://gist.github.com/horse-feed/519f63d016ddd5a794fb89438afc30bf`

## Script local

El repo incluye:

```bash
node scripts/replay-fixture.mjs --replay fixtures/replays/raw/<match>.age3Yrec --json
node scripts/replay-fixture.mjs --replay fixtures/replays/raw/<match>.age3Yrec --bo-player 1
```

El script descarga el parser a `.cache/aoe3replay/aoe3replay.py`, no lo vendorea en el repo, porque el gist no declara licencia clara.

Outputs:

- `fixtures/replays/parsed/<match>.horsefeed.json`
- `fixtures/replays/parsed/<match>.bo-p1.txt`

## Fallbacks

`@canyougiant/aoe3de-replay-parser`:

- version npm comprobada: `1.6.0`;
- repo: `https://github.com/h3902340/aoe3de-replay-parser`;
- extrae version/settings/player info/initial decks/chat;
- README marca shipments/techs/buildings/units/winners como pendientes.

Replay Manager:

- util como herramienta desktop de inspeccion;
- patch-sensitive;
- no ideal para pipeline automatizado.

## Regla de calidad

Un fixture pasa a usable cuando:

- el JSON local tiene mapa, jugadores, civs y timeline;
- las shipments/age-ups coinciden con al menos una herramienta web o inspeccion manual;
- el archivo de validacion existe en `fixtures/replays/validation/<match>.md`;
- se registra source/evidence en `sourceProvenance.ts`.
