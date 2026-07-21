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

test("server-renders the CB2 course hub", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Tài liệu học tiếng Trung/);
  assert.match(html, /Lộ trình tiếng Trung CB2/);
  assert.match(html, /Mỗi bài là một chặng/);
  assert.match(html, /Bài 16/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test("ships required PWA assets and educational content", async () => {
  const [manifest, worker, page, lessonData, lesson25Data, schema, lesson23, lesson24, lesson25] = await Promise.all([
    readFile(new URL("public/manifest.webmanifest", root), "utf8"),
    readFile(new URL("public/sw.js", root), "utf8"),
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/lesson-data.ts", root), "utf8"),
    readFile(new URL("app/lesson25-data.ts", root), "utf8"),
    readFile(new URL("content/schema.ts", root), "utf8"),
    readFile(new URL("content/lessons/lesson-23.ts", root), "utf8"),
    readFile(new URL("content/lessons/lesson-24.ts", root), "utf8"),
    readFile(new URL("content/lessons/lesson-25.ts", root), "utf8"),
  ]);
  const parsed = JSON.parse(manifest);
  assert.equal(parsed.display, "standalone");
  assert.equal(parsed.lang, "vi");
  assert.equal(parsed.icons.length, 2);
  assert.match(worker, /cb2-course-16-30-v2-pilot-23-25/);
  assert.match(lessonData, /我想学太极拳/);
  assert.match(lesson25Data, /她学得很好/);
  assert.match(lesson25Data, /lesson25Vocabulary/);
  assert.match(page, /serviceWorker/);
  assert.match(schema, /LessonModule/);
  assert.match(lesson23, /createLessonModule/);
  assert.match(lesson24, /createLessonModule/);
  assert.match(lesson25, /createLessonModule/);
  await access(new URL("public/icon-192.png", root));
  await access(new URL("public/icon-512.png", root));
  await access(new URL("public/og.png", root));
  await access(new URL("public/og-pilot-23-25.png", root));
});
