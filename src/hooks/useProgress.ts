import { useState, useEffect, useCallback } from 'react';
import type { LessonProgress, LessonStatus } from '../shared/types';
import { LESSONS } from '../data/lessons';

const STORAGE_KEY = 'pylearn_progress';

function loadProgress(): LessonProgress[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as LessonProgress[];
  } catch {
    // ignore
  }
  // Default: lesson 1 active, rest locked
  return LESSONS.map((l, idx) => ({
    lessonId: l.id,
    status: idx === 0 ? 'active' : 'locked',
    attempts: 0,
    hintsUsed: 0,
  }));
}

function saveProgress(progress: LessonProgress[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<LessonProgress[]>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const getProgress = useCallback(
    (lessonId: number): LessonProgress => {
      return progress.find((p) => p.lessonId === lessonId)!;
    },
    [progress]
  );

  const updateProgress = useCallback(
    (lessonId: number, updates: Partial<LessonProgress>) => {
      setProgress((prev) =>
        prev.map((p) => (p.lessonId === lessonId ? { ...p, ...updates } : p))
      );
    },
    []
  );

  const markPassed = useCallback(
    (lessonId: number) => {
      setProgress((prev) => {
        const updated = prev.map((p) => {
          if (p.lessonId === lessonId) return { ...p, status: 'passed' as LessonStatus };
          // Unlock next lesson
          if (p.lessonId === lessonId + 1 && p.status === 'locked') {
            return { ...p, status: 'active' as LessonStatus };
          }
          return p;
        });
        saveProgress(updated);
        return updated;
      });
    },
    []
  );

  const markFailed = useCallback(
    (lessonId: number) => {
      setProgress((prev) =>
        prev.map((p) =>
          p.lessonId === lessonId
            ? { ...p, status: 'failed' as LessonStatus, attempts: p.attempts + 1 }
            : p
        )
      );
    },
    []
  );

  const saveCode = useCallback(
    (lessonId: number, code: string) => {
      updateProgress(lessonId, { savedCode: code });
    },
    [updateProgress]
  );

  const resetProgress = useCallback(() => {
    const fresh = LESSONS.map((l, idx) => ({
      lessonId: l.id,
      status: idx === 0 ? ('active' as LessonStatus) : ('locked' as LessonStatus),
      attempts: 0,
      hintsUsed: 0,
    }));
    setProgress(fresh);
    saveProgress(fresh);
  }, []);

  const passedCount = progress.filter((p) => p.status === 'passed').length;

  return { progress, getProgress, markPassed, markFailed, saveCode, resetProgress, passedCount };
}
