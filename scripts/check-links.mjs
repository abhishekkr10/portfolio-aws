import { chromium } from "@playwright/test"
import fs from "node:fs"
const browser = await chromium.launch({ headless: true, channel: "msedge" }),
  context = await browser.newContext(),
  page = await context.newPage()
await page.goto("http://127.0.0.1:4173")
const links = await page
  .locator("a[href]")
  .evaluateAll((nodes) => nodes.map((a) => a.getAttribute("href")))
const manifest = JSON.parse(fs.readFileSync("src/data/proof-manifest.json"))
const urls = [
  ...new Set([
    ...links,
    ...Object.values(manifest)
      .flat()
      .map((m) => m.url),
    "/favicon.svg",
    "/og.png",
  ]),
]
const results = []
for (const url of urls) {
  if (url.startsWith("#")) {
    results.push({ url, ok: (await page.locator(url).count()) > 0 })
    continue
  }
  if (url.startsWith("mailto:")) {
    results.push({ url, ok: true, kind: "email syntax" })
    continue
  }
  try {
    const response = await context.request.get(
      new globalThis.URL(url, "http://127.0.0.1:4173").href,
      { timeout: 20000 },
    )
    results.push({ url, status: response.status(), ok: response.ok() })
  } catch (e) {
    results.push({ url, ok: false, error: String(e) })
  }
}
fs.writeFileSync("link-results.json", JSON.stringify(results, null, 2))
console.log(
  JSON.stringify(
    results.filter((r) => !r.ok),
    null,
    2,
  ),
)
console.log("Checked", results.length)
await browser.close()

