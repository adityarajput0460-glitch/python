import { useState } from 'react';
import type { Lesson, LessonProgress } from '../shared/types';

interface Props {
  lesson: Lesson;
  progress: LessonProgress;
}

export function LessonPanel({ lesson, progress }: Props) {
  const [visibleHints, setVisibleHints] = useState(0);

  const showNextHint = () => {
    setVisibleHints((n) => Math.min(n + 1, lesson.hints.length));
  };

  const hasMoreHints = visibleHints < lesson.hints.length;

  return (
    <aside className="lesson-panel">
      <div className="lesson-panel-header">
        <span className="lesson-panel-emoji">{lesson.emoji}</span>
        <div>
          <p className="lesson-panel-num">Lesson {lesson.id} of 10</p>
          <h2 className="lesson-panel-title">{lesson.title}</h2>
        </div>
      </div>

      <div className="lesson-panel-desc">
        <p dangerouslySetInnerHTML={{ __html: lesson.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>') }} />
      </div>

      <div className="lesson-panel-section">
        <h3 className="lesson-panel-section-title">📋 Expected Output</h3>
        <pre className="lesson-panel-pre">
          {lesson.tests[0]?.expectedOutput ?? '(varies)'}
        </pre>
      </div>

      {progress.attempts > 0 && (
        <div className="lesson-panel-section">
          <h3 className="lesson-panel-section-title">💡 Hints</h3>
          {visibleHints === 0 ? (
            <button className="btn btn-hint" onClick={showNextHint}>
              Show first hint
            </button>
          ) : (
            <>
              <ol className="hint-list">
                {lesson.hints.slice(0, visibleHints).map((h, i) => (
                  <li key={i} className="hint-item">
                    <code dangerouslySetInnerHTML={{ __html: h.replace(/`(.*?)`/g, '<code class="hint-code">$1</code>') }} />
                  </li>
                ))}
              </ol>
              {hasMoreHints && (
                <button className="btn btn-hint" onClick={showNextHint}>
                  Next hint ({lesson.hints.length - visibleHints} left)
                </button>
              )}
            </>
          )}
        </div>
      )}

      <div className="lesson-panel-stats">
        <div className="stat">
          <span className="stat-value">{progress.attempts}</span>
          <span className="stat-label">Attempts</span>
        </div>
        <div className="stat">
          <span className={`stat-value stat-value--status ${progress.status}`}>
            {progress.status === 'passed' ? '✅ Passed' :
             progress.status === 'failed' ? '❌ Failed' :
             progress.status === 'active' ? '▶ In Progress' : '🔒 Locked'}
          </span>
          <span className="stat-label">Status</span>
        </div>
      </div>

      <div className="lesson-panel-footer">
        <p className="keyboard-tip">💻 <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to run</p>
      </div>
    </aside>
  );
}
