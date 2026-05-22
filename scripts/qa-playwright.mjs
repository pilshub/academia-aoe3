import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3010";
const outDir = path.resolve("qa-artifacts");

const routes = [
  "/",
  "/academy-os",
  "/career",
  "/civ-mastery",
  "/opening-timer",
  "/replay-coach",
  "/deck-builder",
  "/matchup-scout",
  "/errors",
  "/ai-coach",
  "/trust",
  "/replay-upload",
  "/submit-replay",
  "/patch-tracker",
  "/source-admin",
  "/vod-pipeline",
  "/series-prep",
  "/learn",
  "/learn/french-semi-ff-aoe3-de",
  "/guides",
  "/guides/decks-no-son-listas",
  "/analysis",
  "/analysis/ottoman-rush-transition",
  "/analyzer",
  "/resources",
  "/source-provenance",
  "/source-queue",
  "/roadmap",
  "/stats",
  "/replay-lab",
  "/replay-import",
  "/parser-solution",
  "/art-lab",
  "/civs",
  "/decks",
  "/decks/french-semi-ff-deck",
  "/deck-checker",
  "/openings",
  "/plans/french-semi-ff",
  "/plans/spanish-fast-fortress",
  "/shipments",
  "/maps",
  "/cards",
  "/matchups",
  "/knowledge",
];

async function assertNoHorizontalOverflow(page, label) {
  const result = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
  if (result.scrollWidth > result.width + 2 || result.bodyScrollWidth > result.width + 2) {
    throw new Error(`${label}: horizontal overflow ${JSON.stringify(result)}`);
  }
}

async function assertTextDoesNotClip(page, label) {
  const clipped = await page.evaluate(() => {
    const nodes = Array.from(
      document.querySelectorAll("a, button, h1, h2, h3, p, li, .pill, .status, .button"),
    );
    return nodes
      .map((node) => {
        const element = node;
        const rect = element.getBoundingClientRect();
        return {
          text: (element.textContent || "").trim().slice(0, 80),
          tag: element.tagName,
          className: element.className,
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
          scrollHeight: element.scrollHeight,
          clientHeight: element.clientHeight,
          overflowY: getComputedStyle(element).overflowY,
          visible: rect.width > 0 && rect.height > 0,
        };
      })
      .filter((item) => item.visible)
      .filter(
        (item) =>
          item.scrollWidth > item.clientWidth + 3 ||
          (item.overflowY !== "visible" && item.scrollHeight > item.clientHeight + 6),
      )
      .slice(0, 8);
  });
  if (clipped.length) {
    throw new Error(`${label}: clipped text ${JSON.stringify(clipped, null, 2)}`);
  }
}

async function visitAndCheck(page, route, viewportLabel) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });

  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  if (!response || response.status() >= 400) {
    throw new Error(`${viewportLabel} ${route}: bad status ${response?.status()}`);
  }
  await page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
  await page.locator("body").waitFor({ timeout: 30000 });
  await assertNoHorizontalOverflow(page, `${viewportLabel} ${route}`);
  await assertTextDoesNotClip(page, `${viewportLabel} ${route}`);

  const title = await page.title();
  if (!title.includes("Academia AoE3")) {
    throw new Error(`${viewportLabel} ${route}: unexpected title ${title}`);
  }

  const h1 = await page.locator("h1").first().textContent();
  if (!h1 || h1.length < 8) {
    throw new Error(`${viewportLabel} ${route}: missing h1`);
  }

  if (errors.length) {
    throw new Error(`${viewportLabel} ${route}: console/page errors ${errors.join(" | ")}`);
  }
}

async function run() {
  await fs.mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 });
  const page = await desktop.newPage();

  for (const route of routes) {
    await visitAndCheck(page, route, "desktop");
  }

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.getByLabel("Buscar plan").fill("otto");
  await page.getByLabel("Filtrar por tipo").selectOption("Rush");
  await page.getByRole("link", { name: /Ottoman Janissary pressure/i }).first().click();
  await page.waitForURL("**/plans/ottoman-jan-rush", { timeout: 30000 });
  await assertNoHorizontalOverflow(page, "desktop filtered plan");
  await page.screenshot({ path: path.join(outDir, "desktop-plan-ottoman.png"), fullPage: true });

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, "desktop-home.png"), fullPage: true });

  await page.goto(`${baseUrl}/career`, { waitUntil: "networkidle" });
  await page.getByLabel("Objetivo").selectOption("aoe2-returner");
  await page.getByText("Plan semanal").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop career");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outDir, "desktop-career.png"), fullPage: true });

  await page.goto(`${baseUrl}/opening-timer`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Empezar" }).click();
  await page.getByRole("button", { name: "Bien" }).first().click();
  await page.getByRole("button", { name: "Guardar intento" }).click();
  await page.getByText("Scouting obligatorio").waitFor({ timeout: 5000 });
  await page.getByText("Historial local").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop opening timer");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outDir, "desktop-opening-timer.png"), fullPage: true });

  await page.goto(`${baseUrl}/replay-coach`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Turning point" }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop replay coach");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outDir, "desktop-replay-coach.png"), fullPage: true });

  await page.goto(`${baseUrl}/deck-builder`, { waitUntil: "networkidle" });
  await page.getByLabel("Civilizacion").selectOption("british");
  await page.getByText("Swaps recomendados").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop deck builder");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outDir, "desktop-deck-builder.png"), fullPage: true });

  await page.goto(`${baseUrl}/matchup-scout`, { waitUntil: "networkidle" });
  await page.getByLabel("Rival").selectOption("british");
  await page.getByRole("heading", { name: "Scouting exacto" }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop matchup scout");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outDir, "desktop-matchup-scout.png"), fullPage: true });

  await page.goto(`${baseUrl}/errors`, { waitUntil: "networkidle" });
  await page.getByLabel("Buscar").fill("rush");
  await page.getByText("Correccion").first().waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop errors");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outDir, "desktop-errors.png"), fullPage: true });

  await page.goto(`${baseUrl}/ai-coach`, { waitUntil: "networkidle" });
  await page.getByText("Respuesta simulada").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop ai coach");
  await page.screenshot({ path: path.join(outDir, "desktop-ai-coach.png"), fullPage: true });

  await page.goto(`${baseUrl}/trust`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Estados de publicacion" }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop trust");
  await page.screenshot({ path: path.join(outDir, "desktop-trust.png"), fullPage: true });

  await page.goto(`${baseUrl}/replay-upload`, { waitUntil: "networkidle" });
  await page.getByText("Cola local primero").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop replay upload");
  await page.screenshot({ path: path.join(outDir, "desktop-replay-upload.png"), fullPage: true });

  await page.goto(`${baseUrl}/patch-tracker`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Impactos" }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop patch tracker");
  await page.screenshot({ path: path.join(outDir, "desktop-patch-tracker.png"), fullPage: true });

  await page.goto(`${baseUrl}/source-admin`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Agregar fuente" }).click();
  await page.getByRole("heading", { name: /URL entra como borrador, no como verdad/i }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop source admin");
  await page.screenshot({ path: path.join(outDir, "desktop-source-admin.png"), fullPage: true });

  await page.goto(`${baseUrl}/vod-pipeline`, { waitUntil: "networkidle" });
  await page.getByText("Checklist de ingestion").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop vod pipeline");
  await page.screenshot({ path: path.join(outDir, "desktop-vod-pipeline.png"), fullPage: true });

  await page.goto(`${baseUrl}/series-prep`, { waitUntil: "networkidle" });
  await page.getByLabel("Formato").selectOption("BO5");
  await page.getByText("Plan de games").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop series prep");
  await page.screenshot({ path: path.join(outDir, "desktop-series-prep.png"), fullPage: true });

  await page.goto(`${baseUrl}/learn/french-semi-ff-aoe3-de`, { waitUntil: "networkidle" });
  await page.getByText("Abrir ruta principal").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop learn seo");
  await page.screenshot({ path: path.join(outDir, "desktop-learn-french.png"), fullPage: true });

  await page.goto(`${baseUrl}/analyzer`, { waitUntil: "networkidle" });
  await page.getByLabel("Plan").selectOption("british-manor-boom");
  await page.getByRole("textbox", { name: "Age II", exact: true }).fill("5:20");
  await page.getByLabel("Shipments al minuto 8").fill("2");
  await page.getByLabel("Idle TC estimado").fill("70");
  await page.getByLabel("Notas de scouting").fill("Vi forward barracks y aun asi hice Virginia Company greedy.");
  await page.getByText("Nota", { exact: true }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop analyzer interaction");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outDir, "desktop-analyzer.png"), fullPage: true });

  await page.goto(`${baseUrl}/shipments`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /8 Crossbowmen/i }).click();
  await page.getByText("Decision correcta").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop shipment trainer");
  await page.screenshot({ path: path.join(outDir, "desktop-shipments.png"), fullPage: true });

  await page.goto(`${baseUrl}/deck-checker`, { waitUntil: "networkidle" });
  await page.getByLabel("Civilizacion").selectOption("british");
  await page.getByRole("heading", { name: "British Manor Boom seguro" }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop deck checker");
  await page.screenshot({ path: path.join(outDir, "desktop-deck-checker.png"), fullPage: true });

  await page.goto(`${baseUrl}/maps`, { waitUntil: "networkidle" });
  await page.getByLabel("Mapa").selectOption("carolina");
  await page.getByRole("heading", { name: "Carolina" }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop map helper");
  await page.screenshot({ path: path.join(outDir, "desktop-maps.png"), fullPage: true });

  await page.goto(`${baseUrl}/roadmap`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Los 100 pasos", exact: true }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop roadmap");
  await page.screenshot({ path: path.join(outDir, "desktop-roadmap.png"), fullPage: true });

  await page.goto(`${baseUrl}/source-provenance`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Info > fuente" }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop source provenance");
  await page.screenshot({ path: path.join(outDir, "desktop-source-provenance.png"), fullPage: true });

  await page.goto(`${baseUrl}/source-queue`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Backlog accionable" }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop source queue");
  await page.screenshot({ path: path.join(outDir, "desktop-source-queue.png"), fullPage: true });

  await page.goto(`${baseUrl}/stats`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Dominios de datos" }).waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop stats");
  await page.screenshot({ path: path.join(outDir, "desktop-stats.png"), fullPage: true });

  await page.goto(`${baseUrl}/replay-import`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Replay normalizado" }).waitFor({ timeout: 5000 });
  await page.getByText("Patron detectado").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop replay import");
  await page.screenshot({ path: path.join(outDir, "desktop-replay-import.png"), fullPage: true });

  await page.goto(`${baseUrl}/parser-solution`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Pipeline de fixtures" }).waitFor({ timeout: 5000 });
  await page.getByText("horse-feed aoe3replay.py").waitFor({ timeout: 5000 });
  await assertNoHorizontalOverflow(page, "desktop parser solution");
  await page.screenshot({ path: path.join(outDir, "desktop-parser-solution.png"), fullPage: true });

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobile.newPage();
  for (const route of ["/", "/academy-os", "/career", "/civ-mastery", "/opening-timer", "/replay-coach", "/deck-builder", "/matchup-scout", "/errors", "/ai-coach", "/trust", "/replay-upload", "/submit-replay", "/patch-tracker", "/source-admin", "/vod-pipeline", "/series-prep", "/learn", "/learn/french-semi-ff-aoe3-de", "/guides", "/analysis", "/analyzer", "/resources", "/source-provenance", "/source-queue", "/roadmap", "/stats", "/replay-lab", "/replay-import", "/parser-solution", "/art-lab", "/plans/french-semi-ff", "/decks", "/deck-checker", "/shipments", "/maps", "/cards", "/knowledge"]) {
    await visitAndCheck(mobilePage, route, "mobile");
  }
  await mobilePage.goto(`${baseUrl}/plans/french-semi-ff`, { waitUntil: "networkidle" });
  await mobilePage.screenshot({ path: path.join(outDir, "mobile-plan-french.png"), fullPage: true });
  await mobilePage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await mobilePage.screenshot({ path: path.join(outDir, "mobile-home.png"), fullPage: true });

  await browser.close();
  console.log(
    JSON.stringify(
      {
        ok: true,
        baseUrl,
        routesChecked: routes.length,
        screenshots: [
          "qa-artifacts/desktop-home.png",
          "qa-artifacts/desktop-career.png",
          "qa-artifacts/desktop-opening-timer.png",
          "qa-artifacts/desktop-replay-coach.png",
          "qa-artifacts/desktop-deck-builder.png",
          "qa-artifacts/desktop-matchup-scout.png",
          "qa-artifacts/desktop-errors.png",
          "qa-artifacts/desktop-ai-coach.png",
          "qa-artifacts/desktop-trust.png",
          "qa-artifacts/desktop-replay-upload.png",
          "qa-artifacts/desktop-patch-tracker.png",
          "qa-artifacts/desktop-source-admin.png",
          "qa-artifacts/desktop-vod-pipeline.png",
          "qa-artifacts/desktop-series-prep.png",
          "qa-artifacts/desktop-learn-french.png",
          "qa-artifacts/desktop-plan-ottoman.png",
          "qa-artifacts/desktop-analyzer.png",
          "qa-artifacts/desktop-shipments.png",
          "qa-artifacts/desktop-deck-checker.png",
          "qa-artifacts/desktop-maps.png",
          "qa-artifacts/desktop-source-provenance.png",
          "qa-artifacts/desktop-roadmap.png",
          "qa-artifacts/desktop-source-queue.png",
          "qa-artifacts/desktop-stats.png",
          "qa-artifacts/desktop-replay-import.png",
          "qa-artifacts/desktop-parser-solution.png",
          "qa-artifacts/mobile-home.png",
          "qa-artifacts/mobile-plan-french.png",
        ],
      },
      null,
      2,
    ),
  );
}

run().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
