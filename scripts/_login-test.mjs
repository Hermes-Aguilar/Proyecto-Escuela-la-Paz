import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const USER = process.env.U ?? "admin_lapaz";
const PASS = process.env.P ?? "23lapaz";

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("response", (r) => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`); });

try {
  console.log("→ Abriendo", BASE + "/login");
  const resp = await page.goto(BASE + "/login", { waitUntil: "networkidle", timeout: 30000 });
  console.log("  status:", resp?.status());

  await page.fill("#username", USER);
  await page.fill("#password", PASS);
  console.log("→ Enviando formulario con", USER);
  await Promise.all([
    page.waitForLoadState("networkidle", { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
  console.log("  URL final:", page.url());
  const alert = await page.$('[role="alert"]');
  if (alert) console.log("  ALERTA visible:", (await alert.innerText()).trim());
  if (page.url().includes("/dashboard")) console.log("✅ LOGIN OK → dashboard");
  else if (page.url().includes("error=1")) console.log("❌ Credenciales rechazadas");
  else console.log("⚠️  Quedó en:", page.url());
} catch (e) {
  console.log("EXCEPCIÓN:", e.message);
} finally {
  if (errors.length) { console.log("--- errores capturados ---"); errors.forEach((e) => console.log("  " + e)); }
  await browser.close();
}
