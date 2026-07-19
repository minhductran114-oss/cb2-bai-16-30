import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the CB2 learning experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /CB2 · Bài 23–24/);
  assert.match(html, /学校里边儿有邮局吗/);
  assert.match(html, /Tổng quan/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test("ships required PWA assets and educational content", async () => {
  const [manifest, worker, page] = await Promise.all([
    readFile(new URL("public/manifest.webmanifest", root), "utf8"),
    readFile(new URL("public/sw.js", root), "utf8"),
    readFile(new URL("app/page.tsx", root), "utf8"),
  ]);
  const parsed = JSON.parse(manifest);
  assert.equal(parsed.display, "standalone");
  assert.equal(parsed.lang, "vi");
  assert.equal(parsed.icons.length, 2);
  assert.match(worker, /cb2-lessons-23-24-v2/);
  assert.match(page, /我想学太极拳/);
  assert.match(page, /serviceWorker/);
  await access(new URL("public/icon-192.png", root));
  await access(new URL("public/icon-512.png", root));
  await access(new URL("public/og.png", root));
});
