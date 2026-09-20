interface Props {
  passed: number;
  total: number;
  onReset: () => void;
  onBack?: () => void;
}

export function ProgressBar({ passed, total, onReset, onBack }: Props) {
  const pct = Math.round((passed / total) * 100);

  return (
    <header className="topbar">
      {onBack && (
        <button className="btn btn-ghost btn-sm" onClick={onBack} title="Return to home screen">
          ← Home
        </button>
      )}
      <div className="topbar-brand">
        <span className="topbar-snake">🐍</span>
        <span className="topbar-name">PyLearn · Practice</span>
      </div>

      <div className="topbar-progress">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="progress-label">
          {passed}/{total} lessons
        </span>
      </div>

      {passed === total && (
        <span className="topbar-badge topbar-badge--complete">🏆 Complete!</span>
      )}

      <button className="btn btn-ghost btn-sm" onClick={onReset} title="Reset all progress">
        Reset
      </button>
    </header>
  );
}
