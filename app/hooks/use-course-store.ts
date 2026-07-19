"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  CourseState,
  KnowledgeId,
  MistakeRecord,
  ReviewRating,
  StudySettings,
} from "../../content/schema";
import {
  createReviewRecord,
  emptyCourseState,
  loadCourseState,
  rateReviewRecord,
  saveCourseState,
  upsertMistake,
} from "../../learning/storage";

export function useCourseStore() {
  const [state, setState] = useState<CourseState>(emptyCourseState);
  const [hydrated, setHydrated] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setState(loadCourseState(window.localStorage));
      setCurrentTime(Date.now());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) saveCourseState(window.localStorage, state);
  }, [hydrated, state]);

  const updateSettings = useCallback((settings: StudySettings) => {
    setState((current) => ({ ...current, settings }));
  }, []);

  const toggleSection = useCallback((key: string) => {
    setState((current) => ({
      ...current,
      completedSections: current.completedSections.includes(key)
        ? current.completedSections.filter((item) => item !== key)
        : [...current.completedSections, key],
    }));
  }, []);

  const queueKnowledge = useCallback((knowledgeId: KnowledgeId, lessonId: 23 | 24, label: string) => {
    const now = new Date();
    setCurrentTime(now.getTime());
    setState((current) => current.reviews[knowledgeId] ? current : {
      ...current,
      reviews: { ...current.reviews, [knowledgeId]: createReviewRecord(knowledgeId, lessonId, label, now) },
    });
  }, []);

  const rateKnowledge = useCallback((knowledgeId: KnowledgeId, rating: ReviewRating) => {
    const now = new Date();
    setCurrentTime(now.getTime());
    setState((current) => {
      const record = current.reviews[knowledgeId];
      if (!record) return current;
      return {
        ...current,
        reviews: { ...current.reviews, [knowledgeId]: rateReviewRecord(record, rating, now) },
      };
    });
  }, []);

  const recordMistake = useCallback((input: Omit<MistakeRecord, "id" | "wrongCount" | "firstWrongAt" | "lastWrongAt">) => {
    setState((current) => ({ ...current, mistakes: upsertMistake(current.mistakes, input) }));
  }, []);

  const resolveMistake = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      mistakes: current.mistakes.map((item) => item.id === id ? { ...item, resolvedAt: new Date().toISOString() } : item),
    }));
  }, []);

  const dueReviews = useMemo(() => Object.values(state.reviews)
    .filter((item) => new Date(item.dueAt).getTime() <= currentTime)
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt)), [currentTime, state.reviews]);

  const activeMistakes = useMemo(() => state.mistakes.filter((item) => !item.resolvedAt), [state.mistakes]);

  return {
    state,
    hydrated,
    dueReviews,
    activeMistakes,
    updateSettings,
    toggleSection,
    queueKnowledge,
    rateKnowledge,
    recordMistake,
    resolveMistake,
  };
}

export type CourseStore = ReturnType<typeof useCourseStore>;
