import type { LessonProgress } from '../shared/types';
import { LESSONS } from '../data/lessons';

interface Props {
  progress: LessonProgress[];
  activeLessonId: number;
  onSelect: (id: number) => void;
}

export function LessonSidebar({ progress, activeLessonId, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">🐍</span>
        <span className="sidebar-title">PyLearn</span>
      </div>
      <nav className="lesson-list">
        {LESSONS.map((lesson) => {
          const prog = progress.find((p) => p.lessonId === lesson.id);
          const status = prog?.status ?? 'locked';
          const isActive = lesson.id === activeLessonId;
          const isLocked = status === 'locked';

          return (
            <button
              key={lesson.id}
              className={`lesson-item ${isActive ? 'lesson-item--active' : ''} ${status === 'passed' ? 'lesson-item--passed' : ''} ${isLocked ? 'lesson-item--locked' : ''}`}
              onClick={() => !isLocked && onSelect(lesson.id)}
              disabled={isLocked}
              title={isLocked ? 'Complete previous lessons to unlock' : lesson.title}
            >
              <span className="lesson-item-emoji">{lesson.emoji}</span>
              <span className="lesson-item-text">
                <span className="lesson-item-num">Lesson {lesson.id}</span>
                <span className="lesson-item-title">{lesson.title}</span>
              </span>
              <span className="lesson-item-status">
                {status === 'passed' && '✅'}
                {status === 'active' && '▶'}
                {status === 'failed' && '❌'}
                {status === 'locked' && '🔒'}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
