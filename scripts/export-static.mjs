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

await rm(output, { recursive: true, force: true });
await cp(path.join(root, "dist/client"), output, { recursive: true });

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://elliottwilkie.github.io${route}`, { headers: { accept: "text/html" } }),
    env,
    ctx,
  );
  if (!response.ok) throw new Error(`Could not export ${route}: ${response.status}`);

  const directory = route === "/" ? output : path.join(output, route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), await response.text());
}

await cp(path.join(output, "index.html"), path.join(output, "404.html"));
await writeFile(path.join(output, ".nojekyll"), "");
console.log(`Exported ${routes.length} routes to ${output}`);
