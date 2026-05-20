# Pipeline de arte e imagenes

Fecha: 2026-05-17.

## Estado actual

Se genero una primera pieza visual original para la academia:

- `public/assets/generated/academy-strategy-hero.png`

Prompt base usado:

```text
Premium cinematic educational illustration for an Age of Empires III-inspired academy homepage: candlelit 17th-century strategy table, parchment maps of the New World, trade-route markers, shipment cards, wooden unit tokens, brass compass, distant harbor, strategist arranging deck cards and map tokens, painterly historical realism, dark editorial atmosphere, warm gold candlelight, teal/red accents, wide hero image, empty space for headline, no text, no watermark, no game logo, no copyrighted interface.
```

## Reglas

- No redistribuir iconos/cartas/arte del juego sin comprobar permisos.
- Imagenes oficiales remotas solo como referencia visual o enlazadas, no como asset pack propio.
- Las imagenes generadas deben evitar logos, UI exacta del juego y cartas copiadas literalmente.
- Toda imagen de producto debe guardarse en `public/assets/generated/`.
- Toda imagen pendiente de revision debe quedar listada aqui.

## Direccion visual

Estilo:

- historico editorial;
- estrategia de mesa;
- cartas/decks como objetos fisicos;
- mapas, rutas, tesoros, barcos, fuertes, comercio;
- luz dorada, sombras profundas, acentos teal/rojo;
- serio, premium, didactico.

Evitar:

- fantasia magica;
- UI moderna;
- logos oficiales;
- cartas exactas;
- exceso de violeta/gradiente generico;
- escenas belicas confusas sin espacio para texto.

## Pack Nano Banana 2 futuro

Cuando usemos Nano Banana 2, generar:

1. Hero general de academia.
2. Covers por civ:
   - French semi-FF;
   - British manor boom;
   - Ottoman jan pressure;
   - Dutch eco;
   - Spain FF;
   - Germany uhlan/semi.
3. Backplates de cartas:
   - Core;
   - Flex;
   - Greed;
   - Defense;
   - Trap.
4. Infografias:
   - shipment decision tree;
   - minuto 8 checklist;
   - anti-rush flow;
   - replay review template.
5. Thumbnails:
   - guia;
   - analisis;
   - deck;
   - opening;
   - map/native helper.

## Prompts listos

### Civ cover

```text
Historical RTS academy cover illustration, no logos, no copyrighted UI. A 17th-century command table themed around <CIV>, with deck cards, shipment seals, resource tokens and a campaign map. Show strategic identity through props, not literal game screenshots. Painterly realism, premium dark editorial lighting, gold candlelight, teal/red accents, wide 16:9 composition with safe empty text area on left.
```

### Shipment decision tree

```text
Educational strategy illustration for a card shipment decision tree, parchment table, three branching routes labeled conceptually by objects only: economy, defense, transition. No readable text, no logos, no game UI. Clean composition for later overlay text in web app.
```

### Replay analysis

```text
Cinematic post-game analysis desk: parchment replay timeline, map pins, colored movement strings, small unit tokens, notes and wax seals. Serious academy mood, readable negative space, no text, no UI, no logos.
```
