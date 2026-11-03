import fs from "node:fs"

import path from "node:path"

const captions = JSON.parse(fs.readFileSync('src/data/proof-captions.json', 'utf8'))

const root = "public/proof",
  manifest = {}

for (const slug of ["aeronode", "jocky", "safetrack", "causalbench"]) {
  manifest[slug] = []

  const walk = (dir) => {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(file)
        continue
      }

      if (fs.statSync(file).size > 10 * 1024 * 1024)
        console.warn("Proof exceeds 10 MB:", file)

      if (!/\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(file)) continue

      manifest[slug].push({
        url:
          "/" +
          path.relative("public", file)
            .replaceAll("\\", "/")
            .split("/")
            .map(encodeURIComponent)
            .join("/"),
        caption: captions[path.relative("public", file).replaceAll("\\", "/")] || path.parse(file).name.replaceAll("_", " "),
        video: /\.(mp4|webm)$/i.test(file),
      })
    }
  }
  walk(path.join(root, slug))
}

fs.mkdirSync("src/data", { recursive: true })
fs.writeFileSync(
  "src/data/proof-manifest.json",
  JSON.stringify(manifest, null, 2),
)


