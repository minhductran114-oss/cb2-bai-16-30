"use client";

import { useEffect, useState } from "react";
import "lxgw-wenkai-lite-webfont/lxgwwenkailite-regular.css";
import { CourseHeader } from "./components/course-header";
import { CourseHub } from "./components/course-hub";
import { KnowledgeHub } from "./components/knowledge-hub";
import { LessonExperience } from "./components/lesson-experience";
import { MistakeNotebook } from "./components/mistake-notebook";
import { ReviewHub } from "./components/review-hub";
import { useCourseStore } from "./hooks/use-course-store";
import type { SectionId } from "./lesson-types";
import { isAvailableLessonId, loadAvailableLessons, loadLesson } from "../content/lesson-loaders";
import type { AvailableLessonId, CourseSurface, LessonModule } from "../content/schema";

type Route =
  | { kind: CourseSurface }
  | { kind: "lesson"; lessonId: AvailableLessonId; section: SectionId };

const validSections: SectionId[] = ["overview", "dialogue", "vocab", "grammar", "extension", "practice", "writing"];
const staleBuildPattern = /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk [^ ]+ failed/i;
const staleBuildAttemptKey = "cb2-stale-build-recovery";
const serviceWorkerReloadKey = "cb2-service-worker-reload";

function isStaleBuildError(error: unknown) {
  return error instanceof Error && staleBuildPattern.test(error.message);
}

function reloadWithFreshBuild(force = false) {
  if (!force && sessionStorage.getItem(staleBuildAttemptKey)) return false;
  sessionStorage.setItem(staleBuildAttemptKey, String(Date.now()));
  const replaceLocation = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("app-refresh", String(Date.now()));
    window.location.replace(url);
  };
  if (!("serviceWorker" in navigator)) {
    replaceLocation();
    return true;
  }
  navigator.serviceWorker.getRegistration(new URL("./", document.baseURI))
    .then(async (registration) => {
      await registration?.update().catch(() => undefined);
      registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
    })
    .finally(replaceLocation);
  return true;
}

function parseRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, "");
  if (path === "kho-kien-thuc") return { kind: "knowledge" };
  if (path === "on-tap") return { kind: "review" };
  if (path === "so-loi") return { kind: "mistakes" };
  const match = path.match(/^bai\/(\d+)\/?([^/]*)/);
  if (match) {
    const lessonId = Number(match[1]);
    const requestedSection = match[2] as SectionId;
    if (isAvailableLessonId(lessonId)) return { kind: "lesson", lessonId, section: validSections.includes(requestedSection) ? requestedSection : "overview" };
  }
  return { kind: "course" };
}

export default function Home() {
  const store = useCourseStore();
  const [route, setRoute] = useState<Route>({ kind: "course" });
  const [lesson, setLesson] = useState<LessonModule | null>(null);
  const [availableLessons, setAvailableLessons] = useState<LessonModule[]>([]);
  const [loadError, setLoadError] = useState<{ lessonId?: AvailableLessonId; message: string } | null>(null);

  const navigate = (hash: string) => {
    if (window.location.hash === hash) setRoute(parseRoute(hash));
    else window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const syncRoute = () => setRoute(parseRoute(window.location.hash));
    let updateFoundHandler: (() => void) | undefined;
    let activeRegistration: ServiceWorkerRegistration | undefined;
    let reloadGuardTimer: number | undefined;
    const onControllerChange = () => {
      if (sessionStorage.getItem(serviceWorkerReloadKey)) return;
      sessionStorage.setItem(serviceWorkerReloadKey, String(Date.now()));
      const url = new URL(window.location.href);
      url.searchParams.set("app-update", String(Date.now()));
      window.location.replace(url);
    };
    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    if (!window.location.hash) window.history.replaceState(null, "", "#/lo-trinh");
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
      navigator.serviceWorker.register(new URL("sw.js", document.baseURI), { updateViaCache: "none" })
        .then((registration) => {
          activeRegistration = registration;
          const promoteInstalledWorker = () => {
            const installing = registration.installing;
            if (!installing) return;
            installing.addEventListener("statechange", () => {
              if (installing.state === "installed" && navigator.serviceWorker.controller) installing.postMessage({ type: "SKIP_WAITING" });
            });
          };
          updateFoundHandler = promoteInstalledWorker;
          registration.addEventListener("updatefound", promoteInstalledWorker);
          registration.waiting?.postMessage({ type: "SKIP_WAITING" });
          registration.update().catch(() => undefined);
          reloadGuardTimer = window.setTimeout(() => sessionStorage.removeItem(serviceWorkerReloadKey), 8000);
        })
        .catch(() => undefined);
    }
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      navigator.serviceWorker?.removeEventListener("controllerchange", onControllerChange);
      if (activeRegistration && updateFoundHandler) activeRegistration.removeEventListener("updatefound", updateFoundHandler);
      if (reloadGuardTimer) window.clearTimeout(reloadGuardTimer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (route.kind === "lesson") {
      loadLesson(route.lessonId).then((value) => {
        if (!cancelled) {
          sessionStorage.removeItem(staleBuildAttemptKey);
          setLoadError(null);
          setLesson(value);
        }
      }).catch((error: unknown) => {
        if (!cancelled && isStaleBuildError(error) && reloadWithFreshBuild()) return;
        if (!cancelled) setLoadError({ lessonId: route.lessonId, message: error instanceof Error ? error.message : "Không thể tải bài học." });
      });
    }
    return () => { cancelled = true; };
  }, [route]);

  useEffect(() => {
    if (route.kind !== "knowledge" || availableLessons.length) return;
    let cancelled = false;
    loadAvailableLessons().then((value) => { if (!cancelled) setAvailableLessons(value); }).catch((error: unknown) => { if (!cancelled) setLoadError({ message: error instanceof Error ? error.message : "Không thể tải kho kiến thức." }); });
    return () => { cancelled = true; };
  }, [availableLessons.length, route.kind]);

  if (route.kind === "lesson") {
    if (loadError?.lessonId === route.lessonId) return <main className="loading-screen"><span className="hanzi-font">错</span><h1>Không tải được Bài {route.lessonId}</h1><p>{loadError.message}</p><div className="loading-actions"><button onClick={() => { sessionStorage.removeItem(staleBuildAttemptKey); reloadWithFreshBuild(true); }}>Cập nhật và tải lại</button><button onClick={() => navigate("#/lo-trinh")}>Về lộ trình</button></div></main>;
    if (!lesson || lesson.id !== route.lessonId) return <main className="loading-screen"><span className="hanzi-font">学</span><h1>Đang mở Bài {route.lessonId}…</h1></main>;
    return <LessonExperience lesson={lesson} section={route.section} store={store} navigate={navigate} />;
  }

  const active = route.kind;
  return <div className="course-app">
    <CourseHeader active={active} navigate={navigate} />
    {route.kind === "course" && <CourseHub state={store.state} navigate={navigate} />}
    {route.kind === "knowledge" && (availableLessons.length ? <KnowledgeHub lessons={availableLessons} store={store} navigate={navigate} /> : <main className="loading-screen"><span className="hanzi-font">知</span><h1>Đang nối kho kiến thức…</h1></main>)}
    {route.kind === "review" && <ReviewHub store={store} navigate={navigate} />}
    {route.kind === "mistakes" && <MistakeNotebook store={store} navigate={navigate} />}
  </div>;
}
