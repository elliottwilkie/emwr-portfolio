import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the portfolio homepage and navigation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Elliott Wilkie-Roşca — Product Designer<\/title>/);
  assert.match(html, /Designer with 12\+ years of experience/);
  assert.match(html, /href="\/selected-works"/);
  assert.match(html, /href="\/work\/oath"/);
  assert.match(html, /href="\/work\/selfridges"/);
  assert.match(html, /href="\/art"/);
  assert.match(html, /href="\/photos"/);
  assert.match(html, /href="\/elliott-wilkie-cv\.pdf"/);
  assert.match(html, /download="Elliott-Wilkie-Rosca-CV\.pdf"/);
  assert.doesNotMatch(html, /aria-label="Image carousel"/);
  assert.match(html, /aria-label="Recently played on Spotify"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
  await access(new URL("../public/elliott-wilkie-cv.pdf", import.meta.url));
});

test("server-renders project sharing metadata", async () => {
  const response = await render("/work/oath");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Oath — Elliott Wilkie-Roşca<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/emwr\.me\/work\/oath"/);
  assert.match(html, /property="og:title" content="Oath — Elliott Wilkie-Roşca"/);
});

test("server-renders the complete experiments collection", async () => {
  const response = await render("/selected-works");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Mori AI agent/);
  assert.match(html, /mori-ai-agent\.mp4/);
  assert.match(html, /Magnetic segmented control/);
  assert.match(html, /magnetic-segmented-control\.mp4/);
  assert.match(html, /Eki stamp generator/);
  assert.match(html, /Graveyard bloom/);
  assert.match(html, /aria-label="Water a grave"/);
  assert.match(html, /The best is yet to come…/);

  await Promise.all([
    access(new URL("../public/media/mori-ai-agent.mp4", import.meta.url)),
    access(new URL("../public/media/magnetic-segmented-control.mp4", import.meta.url)),
  ]);
});
