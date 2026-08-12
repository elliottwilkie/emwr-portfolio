import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = path.join(root, "out");
const routes = [
  "/",
  "/art",
  "/photos",
  "/selected-works",
  "/work/oath",
  "/work/claimbee",
  "/work/simple-online-healthcare",
  "/work/badger-post",
  "/work/exchange-art",
  "/work/biorelate",
  "/work/selfridges",
];

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

function moveStreamedMetadataToHead(html) {
  const metadataBlock = /<div hidden=""><!--\$--><div hidden="">(<title[\s\S]*?<link rel="canonical"[^>]*>)<\/div><!--\/\$--><\/div>/;
  const match = html.match(metadataBlock);
  if (!match) return html;
  return html.replace(metadataBlock, "").replace("</head>", `${match[1]}</head>`);
}

await rm(output, { recursive: true, force: true });
await cp(path.join(root, "dist/client"), output, { recursive: true });

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://elliottwilkie.github.io${route}`, {
      headers: { accept: "text/html", "user-agent": "Googlebot" },
    }),
    env,
    ctx,
  );
  if (!response.ok) throw new Error(`Could not export ${route}: ${response.status}`);

  const directory = route === "/" ? output : path.join(output, route.slice(1));
  await mkdir(directory, { recursive: true });
  const html = moveStreamedMetadataToHead(await response.text());
  await writeFile(path.join(directory, "index.html"), html);
}

await cp(path.join(output, "index.html"), path.join(output, "404.html"));
await writeFile(path.join(output, ".nojekyll"), "");
const origin = "https://emwr.me";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((route) => `  <url><loc>${origin}${route === "/" ? "" : route}</loc></url>`)
  .join("\n")}\n</urlset>\n`;
await writeFile(path.join(output, "sitemap.xml"), sitemap);
await writeFile(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Exported ${routes.length} routes to ${output}`);
