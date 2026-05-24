# Handoff: Academia AoE3 — Rediseño visual (V8)

## Overview

Rediseño completo del frontend de **pilshub/academia-aoe3** (Next.js 15 / App Router). El objetivo es darle a la academia AoE3 una identidad visual fuerte inspirada en la estética de **Age of Empires III: Definitive Edition** (madera oscura + dorado bruñido + cuadros burdeos engraved), manteniendo la estructura editorial y todas las rutas/datos del repo actual.

El diseño cubre 5 pantallas clave del MVP:

1. **Landing** — home con Decision Assistant, plan destacado, 8 herramientas featured
2. **Civilizaciones** — atlas de civs (3 seed: French, British, Ottomans)
3. **Civ** — detalle individual de civilización
4. **Plan** — detalle de plan (deck + opening + ramas + benchmarks)
5. **Herramientas** — directorio completo de las 35 tools agrupadas

## About the Design Files

Los archivos `.html` en este bundle son **referencias de diseño en HTML/CSS/JS plano**, prototipos de cómo deberían verse y comportarse las pantallas en producción. **No son código para copiar tal cual**. La tarea es **recrear este diseño dentro de la app Next.js existente** (`pilshub/academia-aoe3`, App Router + TypeScript), respetando:

- Su estructura de componentes en `src/components/` (`SiteShell`, `PlanSelector`, `CoachChat`, etc.)
- Su modelo de datos en `src/data/aoe3/` (`civs.ts`, `decks.ts`, `cards.ts`, `matchups.ts`, etc.)
- Sus rutas en `src/app/` (las que ya existen como `/civs`, `/plans/[id]`, `/replay-coach`, etc.)
- Sus convenciones de tipografía: **Cinzel** para display, **Source Sans 3** para body (ya configuradas en `src/app/layout.tsx` vía `next/font/google`)
- Su paleta base ya definida en `src/app/globals.css` (`--ink`, `--gold`, `--red`, `--coal`, etc.)

El handoff propone **un repaint del CSS y un upgrade de los componentes existentes**, no una reescritura desde cero. La data ya vive en `src/data/`; lo que cambia es la presentación.

## Fidelity

**High-fidelity (hifi)**. Cada pantalla está pulida a nivel pixel-perfect con:
- Colores exactos en hex/oklch
- Tipografía con tamaños, pesos y letter-spacing concretos
- Sombras 3D engraved (text-shadow apilada estilo AoE2 DE)
- Hover states y transiciones precisas
- Texturas (rayas verticales en burdeos, vetas de madera)

El desarrollador debe reproducir la apariencia con la mayor fidelidad posible usando los tokens y patrones del codebase.

## Screens / Views

### 1. `Landing.html` → `src/app/page.tsx`

**Purpose**: Home del producto. Vende la propuesta (decisiones, no listas), permite buscar un plan, expone Decision Assistant, presenta 8 herramientas destacadas, y deja ver el estado/log del proyecto.

**Layout (de arriba abajo)**:

1. **Topbar fino** (32px de alto)
   - Brand mini izquierda (`A · Academia AoE3` en small-caps)
   - 4 stats centrados (Civs 3/22, Planes 3, Tools 35, Tests 9/9)
   - Pill rojo burdeos a la derecha (`Imperial · Patch 14.62381`)

2. **Nav compacta** (sticky, 64px)
   - Brand a la izquierda (`brand-mark` 44×44 con icono de lista)
   - Centro: 6 enlaces primarios (Civilizaciones · Planes · Decks · Analizar · Aprender · Operar)
   - Derecha: botón `Más ▾` que abre un **drawer** de 5 columnas con las 35 tools agrupadas (Base/Entrenar/Analizar/Aprender/Operar). Cierra al click fuera.

3. **Hero** (`min-height: calc(100vh - 78px)`)
   - Fondo: SVG pintura colonial al atardecer (cielo gradient + montañas + fuerte + galeón + soldado en silueta + bandera heráldica top-left) + capa `<image-slot id="hero-painting">` superpuesta para que el usuario suelte una imagen real AoE3
   - Grid 2 cols: contenido a la izquierda (eyebrow chip dorado + h1 engraved + lead + 4 stats + 2 CTAs) + MVP panel a la derecha (header burdeos con rayas + remaches dorados + 3 signal-items con borde dorado izquierdo)

4. **Divisor ornamental** (espadas+escudo SVG entre líneas doradas)

5. **Plan selector** (`section`)
   - Kicker `I — Selección de plan` (numeral romano dentro de placa burdeos)
   - **Plan destacado** (fila destacada con crest + título + CTA dorado chiseled)
   - Controles de búsqueda + select de arquetipo (Rush/Semi-FF/Boom/...)
   - Grid 3-col de planes filtrados

6. **Decision Assistant** (panel burdeos featured)
   - Marco dorado + remaches en esquinas + header con stripe burdeos
   - Grid 2-col: form (Mi civ / Rival / Mapa) + output (Plan recomendado · Shipments · Age-up · Scout · Peligro · Plan B)
   - El output cambia con la civ seleccionada (lógica en JS)

7. **Herramientas base** (`section.wood-band`)
   - Kicker `II — Herramientas base`
   - Grid 3-col con 8 cards featured (Civ Mastery, Opening Timer, Deck Builder, Matchup Scout, Replay Coach, IA, Patch tracker, Series prep)
   - CTA "Ver las 35 herramientas →" centrado

8. **Criterios + Fuentes** (`section.tight`)
   - Grid 2-col: card "Criterios 10/10" + card "Fuentes y assets"

9. **Strip inferior** (3 columnas)
   - Minimapa SVG (base aliada dorada, enemigo rojo, scout dashed, treasures)
   - Asset pending (placeholder de hero con SVG silueta + CTA rojo "Ver pipeline")
   - Log de la academia (5 entries datadas + CTA "Ver changelog completo")

10. **Footer rico** (5 columnas)
    - Lead column con sello "Academia AoE3 · v0.1" + tagline
    - 4 columnas: Aprender · Entrenar · Analizar · Operar (con enlaces a las páginas del SiteShell)
    - Base con brand-mini + tagline + créditos

**Componentes clave**:
- `<topbar>` → componente reusable, mismo en todas las páginas
- `<MainNav>` con drawer animado
- `<HeroPanel>` con MVP signals
- `<PlanFeatured>` (fila destacada)
- `<DecisionAssistant>` (form + output reactivo)
- `<FeatureGrid>` (grid de tools, reutilizado en Herramientas)
- `<Strip>` (minimapa + asset + log)
- `<Footer>` con columnas reusables

### 2. `Civilizaciones.html` → `src/app/civs/page.tsx`

**Purpose**: Atlas de civilizaciones. Cubre las 3 civs seed del MVP con identidad, tempo, power spikes y errores.

**Layout**:
- Topbar + Nav (mismas)
- **Page-hero** con breadcrumb + h1 engraved + lead + 3 stats (Civs perfiladas, Atlas completo, Planes seed)
- **Divisor** con icono de escudo
- **Section** con grid 3-col de `civ-card`:
  - `civ-band` (200px de alto con gradient diagonal usando el `--accent` color de la civ + hatch overlay)
  - `crest` (62×62 con las iniciales `FR`, `BR`, `OT`)
  - Body: nombre + región + badge difficulty (burdeos engraved) + párrafo identity + tempo italic + 2 listas (Power spikes con bullets dorados, Errores con bullets rojos) + plan-pills al pie
  - Toda la card es un `<a href="Civ.html?id=...">`
- Footer rico

**Accent colors**: French `#2f7dd1`, British `#c04a2b`, Ottomans `#19a77a`

### 3. `Civ.html` → `src/app/civs/[id]/page.tsx`

**Purpose**: Detalle individual de civ. Acepta `?id=french|british|ottomans`.

**Layout**:
- Topbar + Nav
- **Civ-hero** (con accent color de fondo): breadcrumb + crest grande (120×120) + nombre engraved + región + identity copy + chips (difficulty burdeos + region ghost + Supremacy 1v1 ghost)
- **Section I — Identidad**: kicker romano + h2 "Tempo y spikes" + lead + grid 2-col (Power spikes + Errores frecuentes)
- **Section II — Planes recomendados**: kicker romano + grid 2-col `plan-card` con arquetipo, título, promesa y "Abrir plan →"
- Footer rico

### 4. `Plan.html` → `src/app/plans/[id]/page.tsx`

**Purpose**: Detalle de plan jugable. Acepta `?id=french-semi-ff|british-manor-boom|ottoman-jan-rush`.

**Layout**:
- Topbar + Nav
- **Page-hero** con accent color de la civ: breadcrumb + crest 96×96 + h1 (italic em en arquetipo) + promesa + tag-row (archetype + civ + mode + difficulty burdeos engraved + maptags y matchuptags ghost)
- **Grid layout 2-col** (main 1fr, sidebar 360px sticky):
  - **Block I — Deck**: kicker romano + título + goal + grid 3-col (Core / Flex / Cartas trampa — esta última con bullets rojos)
  - **Block II — Opening**: kicker + título + benchmark + timeline vertical (cada step: time dorado + pop mono + action Cinzel + why italic)
  - **Block III — Lógica de shipments**: lista numerada con dots dorados
  - **Block IV — Ramas**: cada branch es `[SI: condición] → [THEN: acción]`
  - **Sidebar** (sticky): Block V Benchmarks + Block VI Checklist + Block VII Fuente
- Footer rico

### 5. `Herramientas.html` → `src/app/tools/page.tsx` (ruta nueva) o reorganizar la actual

**Purpose**: Directorio completo de las 35 herramientas, agrupadas en 4 secciones.

**Layout**:
- Topbar + Nav
- **Page-hero** con breadcrumb + h1 "35 herramientas operativas." + lead
- **4 secciones** (Aprender · Entrenar · Analizar · Operar) con:
  - Kicker romano (I/II/III/IV) + número de tools de la sección
  - Grid 3-col con las cards (icon-tile + status pill + h3 + description)
- Footer rico

## Interactions & Behavior

### Navegación
- **Más ▾** drawer: click toggle, click fuera cierra. `aria-expanded` actualiza.
- **Nav-primary `.active`**: la página actual destaca el link correspondiente.
- **Hover de cards**: `translateY(-2px)` + border dorada + sombra ampliada (transition 180ms ease).
- **Hover de botones dorados**: brightness 1.06 + translateY(-1px); el drop sombra inferior (`0 4px 0 #5a3a0e`) se mueve a `0 5px 0`.

### Decision Assistant
- Form: 3 selects (Mi civ / Rival / Mapa).
- Al cambiar cualquier select se recalcula el output con un mapping de recipes (`french → french-semi-ff plan`, `british → manor-boom`, `ottomans → jan-rush`).
- El output muestra: Plan (bold) · Shipments · Age-up · Scout · Peligro (mapeado por rival) · Plan B (constante) + CTA "Abrir plan completo" → `Plan.html?id=...`

### Plan selector
- Input + select reactivos. Filtran `plans` por substring match en (título + civ + arquetipo + promesa + matchupTags) y por archetype exacto.
- Si no hay resultados: "Sin resultados para esos filtros."

### Image slot del hero
- Es un `<image-slot id="hero-painting">` (web component custom). Drag-and-drop persiste el archivo soltado.
- Mientras esté vacío se muestra placeholder + el SVG painting de fondo asoma a través del overlay.
- En Next.js esto se sustituye por un `<Image>` real (`next/image`) apuntando a `public/hero/landing.jpg` (o equivalente).

### Animaciones de entrada
- `.hero-content > *` fade-up 700ms ease (segundo hijo con delay 150ms).
- Respetar `prefers-reduced-motion: reduce` → todas las animaciones/transiciones a none.

## State Management

El diseño es prácticamente stateless excepto:

1. **Plan selector** (`query` + `archetype`) → `useState` en `<PlanSelector>` (ya existe en `src/components/PlanSelector.tsx`)
2. **Decision Assistant** (civ + rival + map) → `useState` en `<DecisionAssistant>` (nuevo componente). El mapping de recipes puede vivir en `src/lib/aoe3/recipes.ts` (nuevo) o calcularse desde `src/data/aoe3/matchups.ts` + `plans.ts`.
3. **Más drawer** (open/close) → `useState` en `<MainNav>`
4. **Tab activa de la nav** → derivar de `usePathname()` de `next/navigation`.

## Design Tokens

Pega esto a `src/app/globals.css`:

```css
:root {
  /* Wood + brown surfaces */
  --coal:       #140c06;
  --bark:       #1d1208;
  --bark-2:     #261810;
  --panel:      #2b1d11;
  --panel-2:    #34251a;
  --plank:      #3b2918;
  --plank-hi:   #4a3320;
  --ember:      #6b3a14;

  /* Parchment ink */
  --ink:        #f5e9cf;
  --ink-soft:   #ead8b3;
  --muted:      #c7b48a;
  --dim:        #95805c;
  --faint:      #6e5c40;

  /* Accents */
  --gold:       #d8ad57;
  --gold-hi:    #f1cf88;
  --gold-deep:  #8d6212;
  --brass:      #b88a36;
  --red:        #bc4b34;
  --burgundy:   #7a2515;
  --teal:       #2a9d8f;
  --green:      #7a9f54;
  --blue:       #477db3;

  --line:       rgba(245, 233, 207, 0.12);
  --line-2:     rgba(245, 233, 207, 0.22);
  --line-gold:  rgba(216, 173, 87, 0.36);

  --shadow:     0 24px 80px rgba(0, 0, 0, 0.45);
  --shadow-sm:  0 8px 24px rgba(0, 0, 0, 0.4);
}
```

### Typography scale

| Use | Family | Weight | Size | Letter-spacing |
|---|---|---|---|---|
| Display h1 | Cinzel | 700-800 | clamp(2.4rem, 5vw, 4.6rem) | -0.005em |
| h2 | Cinzel | 700 | clamp(1.6rem, 3.4vw, 2.8rem) | 0 |
| h3 | Cinzel | 700 | 1.1–1.5rem | 0 |
| Body | Source Sans 3 | 400 | 16px | 0 |
| Lead | Source Sans 3 | 400 | clamp(1.04rem, 1.4vw, 1.22rem) | 0 |
| Caps eyebrow | Cinzel small-caps | 600 | .78rem | .18em |
| Roman numeral | Cinzel | 700 | .78rem | .10em |
| Mono (log/time) | JetBrains Mono | 400-700 | .7rem | .06em |

**Engraved h1 text-shadow** (clave del look):
```css
text-shadow:
  0 1px 0 #5a3a0e,
  0 2px 0 #3a2305,
  0 3px 0 #1a0f06,
  0 6px 14px rgba(0,0,0,.6);
```

### Burgundy "engraved" surfaces (badges, kicker numerals, patch pill, etc.)

```css
border: 1px solid var(--gold-deep);
background-image:
  repeating-linear-gradient(90deg, rgba(0,0,0,.10) 0 1px, transparent 1px 6px),
  linear-gradient(180deg, rgba(255,210,140,.18) 0%, rgba(255,210,140,.02) 30%, rgba(0,0,0,.30) 100%),
  linear-gradient(180deg, #6e1818 0%, #4a0d0d 60%, #2a0606 100%);
box-shadow:
  inset 0 1px 0 rgba(255,230,180,.30),
  inset 0 -1px 0 rgba(0,0,0,.42),
  0 2px 4px rgba(0,0,0,.4);
text-shadow: 0 1px 0 rgba(0,0,0,.5);
color: var(--gold-hi);
font-variant-caps: all-small-caps;
```

### Gold chiseled CTA

```css
background: var(--gold);
color: #1b1408;
border: 1px solid var(--gold);
box-shadow:
  inset 0 1px 0 rgba(255,239,196,.55),
  inset 0 -2px 0 rgba(0,0,0,.20),
  0 4px 0 #5a3a0e,      /* dark "drop" — el efecto cincelado */
  0 8px 16px rgba(0,0,0,.55);
```

### Spacing

- Container: `width: min(1240px, calc(100% - 40px))` (1320px para topbar+nav)
- Section padding: `padding: 84px 0` (`tight`: 56px)
- Card padding: `18-24px`
- Grid gap: `14-18px`

### Border radius

Mayormente **0** (todo cuadrado, estilo AoE3). Excepciones:
- `.patch-pill`, `.section-kicker .num`, `.diff`, `.status` → `border-radius: 2px`
- `.plaque` y `.button.button-bronze` → `border-radius: 3px`

## Assets

### Pendientes (image slots)
- **Hero painting** (Landing): pintura AoE3 colonial al atardecer, 1920×1080. Mientras tanto, el SVG inline sirve como fallback.
- **Civ heroes** (8 SVG mencionados en el repo seed pack): se cargarán como retrato en `Civ.html` cuando estén.

### Iconografía
- Todos los SVG están inline (helper `icon(name, size)` en `data-aoe3.js`). En el codebase ya existe `src/components/icons.tsx` con los mismos nombres (Crown, BookOpen, Castle, ListTree, etc.) y deben usarse esos en su lugar.

### Fuentes
- Cargadas en `<head>` con Google Fonts: Cinzel (500/600/700/800/900), Source Sans 3 (400/500/600/700/800), JetBrains Mono (400/500/700).
- En Next.js: ya configuradas en `src/app/layout.tsx` (`Cinzel`, `Source_Sans_3` desde `next/font/google`). Añadir `JetBrains_Mono` para el log/timeline.

## Files in this bundle

| Archivo | Mapea a |
|---|---|
| `Landing.html` | `src/app/page.tsx` |
| `Civilizaciones.html` | `src/app/civs/page.tsx` |
| `Civ.html` | `src/app/civs/[id]/page.tsx` (ruta a crear o adaptar) |
| `Plan.html` | `src/app/plans/[id]/page.tsx` |
| `Herramientas.html` | `src/app/tools/page.tsx` (ruta a crear) |
| `data-aoe3.js` | Espejo del modelo de `src/data/aoe3/index.ts` — los nombres de civs, planes, features y navGroups corresponden 1:1. **No copiar este archivo**: usar los exports reales del data layer del repo. |
| `image-slot.js` | Web component custom para placeholders de imagen. En Next.js sustituir por `<Image>` con `public/` y un fallback. **No copiar.** |

## Implementation notes

1. **Empezar por el design system**: pega los CSS tokens y la tipografía al `globals.css` existente, sustituyendo el bloque `:root` actual (que ya usa una paleta muy similar).
2. **`SiteShell` se parte en dos**: hoy una sola barra navega los 5 grupos × ~7 links. El nuevo diseño separa **Topbar** (stats + patch) y **Nav-primary** (6 links + drawer). El drawer debería reusar el array `navGroups` actual.
3. **`PlanSelector` se mantiene** pero gana una fila `<PlanFeatured>` arriba. Pasar como prop el plan destacado.
4. **`Decision Assistant`** es nuevo. La lógica de recipes puede partir de `getMatchupBrief` en `src/lib/aoe3/knowledge.ts`.
5. **Hero image-slot**: usar `<Image src="/hero/landing.jpg" fill priority>` con un `placeholder="blur"`. La pintura SVG queda como overlay decorativo opcional.
6. **Roman numeral kickers**: extraer en `<Kicker num="I" label="Selección de plan" />` reusable.
7. **Burgundy chips** (status, diff, num, patch-pill): extraer en `<BronzePill variant="burgundy|gold|ghost">` con las 3 variantes.
8. **Footer**: server component, leer del mismo `navGroups` con `groupBy` de los keys especificados.
9. **Accent CSS variable por civ**: pasar `style={{ "--accent": civ.accent }}` igual que ya hace el código actual con `--hero-image`.

## Recomendado para el dev

1. Lee primero `globals.css` actual del repo + `SiteShell.tsx` + `page.tsx` actual.
2. Abre los 5 HTML del bundle en paralelo.
3. Empieza por `globals.css` (tokens + utilities como `.patch-pill`, `.bronze-pill`, `.engraved`, `.button-gold`).
4. Refactoriza `SiteShell` en `<Topbar>` + `<MainNav>` + `<Drawer>`.
5. Itera el resto pantalla por pantalla.
