import type { RunResult } from '../shared/types';

interface Props {
  result: RunResult | null;
  isRunning: boolean;
}

export function OutputPanel({ result, isRunning }: Props) {
  if (isRunning) {
    return (
      <div className="output-panel output-panel--running">
        <div className="output-loading">
          <span className="spinner spinner--large" />
          <span>Executing Python…</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="output-panel output-panel--empty">
        <p className="output-empty-msg">▶ Run your code to see output here</p>
      </div>
    );
  }

  return (
    <div className={`output-panel ${result.allPassed ? 'output-panel--passed' : 'output-panel--failed'}`}>
      {/* Primary Printed Console Output */}
      <div className="output-section">
        <div className="output-section-header">
          <span className="output-section-label">💻 Program Output (stdout)</span>
        </div>
        <pre className="output-pre">
          {result.stdout ? result.stdout : '(No text printed to console)'}
        </pre>
      </div>

      {/* Test results */}
      {result.testResults.length > 0 && (
        <div className="output-tests">
          <span className="output-section-label">Validation Requirements</span>
          {result.testResults.map((tr, i) => (
            <div key={i} className={`test-result ${tr.passed ? 'test-result--pass' : 'test-result--fail'}`}>
              <div className="test-result-header">
                <span className="test-result-icon">{tr.passed ? '✅' : '❌'}</span>
                <span className="test-result-desc">{tr.description}</span>
              </div>
              <div className="test-result-diff">
                <div className="diff-item">
                  <span className="diff-label">Output:</span>
                  <code className={`diff-value ${tr.passed ? 'diff-value--pass' : 'diff-value--actual'}`}>
                    {tr.actualOutput || '(empty)'}
                  </code>
                </div>
                {!tr.passed && (
                  <div className="diff-item">
                    <span className="diff-label">Expected:</span>
                    <code className="diff-value diff-value--expected">{tr.expectedOutput}</code>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stderr */}
      {result.stderr && (
        <div className="output-section">
          <span className="output-section-label output-section-label--error">⚠️ Execution Error / Stderr</span>
          <pre className="output-pre output-pre--error">{result.stderr}</pre>
        </div>
      )}

      {/* Footer */}
      <div className="output-footer">
        <span className={`output-badge ${result.allPassed ? 'output-badge--pass' : 'output-badge--fail'}`}>
          {result.allPassed ? '🎉 All requirement checks passed!' : '💡 Output mismatch — check expected output above'}
        </span>
        <span className="output-time">{result.durationMs}ms</span>
      </div>
    </div>
  );
}
