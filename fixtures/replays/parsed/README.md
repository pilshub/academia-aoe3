# Replay fixtures — seed sintéticos

Estos JSON son **fixtures sintéticos generados editorialmente**, NO replays reales.

- `fixtureKind`: `synthetic-seed`
- `purpose`: probar el pipeline (`/api/replay`, `/replay-coach`, `/replay-lab`) con escenarios plausibles.
- `linkedPlanId`: referencia a un plan del corpus para que las "lessons" sean coherentes.

## Cuándo sustituirlos

Cuando descarguemos 20 replays AoE3:DE reales y corramos `scripts/replay-fixture.mjs` con el parser local, estos seeds quedarán obsoletos y los reales irán a `fixtures/replays/raw/` (binarios) + `fixtures/replays/parsed/` (export JSON parser) + `fixtures/replays/validation/` (audit).

## Por qué fixtures sintéticos en vez de mocks

- Permiten probar UI/timeline/mistakes deterministas con `evidence.status = "seed"` claro.
- Cada fixture cita su `linkedPlanId` y un par de `lessons` que el coach puede referenciar.
- No mienten: `fixtureKind: "synthetic-seed"` aparece explícito en `academyMeta`; la UI lo puede mostrar como pill amarillo.

## Lista actual

| Archivo | Plan | Resultado | Lección clave |
|---|---|---|---|
| seed-french-semi-ff-vs-ottoman-rush.json | french-semi-ff | Loss | Greed en segundo envío con rush visible |
| seed-british-manor-boom-contained.json | british-manor-boom | Loss | Virginia Company sin scout + masa militar tardía |
| seed-ottoman-rush-transitioned.json | ottoman-jan-rush | Win | Transición a 700 Coin cuando rush no cierra |
| seed-spanish-ff-into-falconets.json | spanish-fast-fortress | Win | Falconets sin Pikemen mueren a Hussar |
| seed-french-mirror-tempo.json | french-semi-ff | Win | Mirror French: Cavalry Combat antes de Cuirassiers |
