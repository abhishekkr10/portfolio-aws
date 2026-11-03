import { chromium } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import fs from "node:fs"
const browser = await chromium.launch({ headless: true, channel: "msedge" })
const context = await browser.newContext()
const page = await context.newPage()
const results = { widths: [], errors: [] }
page.on("pageerror", (e) => results.errors.push(e.message))
for (const width of [360, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto("http://127.0.0.1:4173")
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.evaluate(() =>
    document
      .querySelectorAll(".scroll-reveal")
      .forEach((e) => e.classList.add("is-visible")),
  )
  results.widths.push(
    await page.evaluate(() => ({
      width: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflow: [...document.querySelectorAll("body *")]
        .filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1)
        .slice(0, 12)
        .map((e) => e.className),
    })),
  )
  await page.screenshot({ path: `qa-${width}.png`, fullPage: true })
}
await page.getByRole("button", { name: "Proof / Case study" }).first().click()
results.dialog = await page.getByRole("dialog").isVisible()
await page.keyboard.press("Escape")
results.returnFocus = await page.evaluate(
  () => document.activeElement?.textContent,
)
await page.locator("#command").fill("aero")
await page.locator("#command").press("Tab")
results.completion = await page.locator("#command").inputValue()
await page.locator("#command").press("Enter")
results.replay = await page.locator(".terminal-output").textContent()
await page.locator("#command").press("ArrowUp")
results.history = await page.locator("#command").inputValue()
results.axe = (await new AxeBuilder({ page }).analyze()).violations.map(
  (v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.map((n) => n.target),
  }),
)
fs.writeFileSync("qa-results.json", JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
await browser.close()
