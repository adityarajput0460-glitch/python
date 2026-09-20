import Editor from '@monaco-editor/react';

interface Props {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
  isLoading: boolean;
}

export function CodeEditor({ code, onChange, onRun, onReset, isRunning, isLoading }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isRunning && !isLoading) onRun();
    }
  };

  return (
    <div className="editor-container" onKeyDown={handleKeyDown}>
      <div className="editor-topbar">
        <div className="editor-tabs">
          <span className="editor-tab editor-tab--active">
            <span className="editor-tab-dot" />
            main.py
          </span>
        </div>
        <div className="editor-actions">
          <button className="btn btn-ghost" onClick={onReset} title="Reset to starter code">
            ↺ Reset
          </button>
          <button
            className="btn btn-run"
            onClick={onRun}
            disabled={isRunning || isLoading}
            title="Run code (Ctrl+Enter)"
          >
            {isLoading ? (
              <><span className="spinner" /> Loading Python…</>
            ) : isRunning ? (
              <><span className="spinner" /> Running…</>
            ) : (
              <>▶ Run</>
            )}
          </button>
        </div>
      </div>

      <div className="editor-body">
        <Editor
          height="100%"
          defaultLanguage="python"
          language="python"
          value={code}
          onChange={(val) => onChange(val ?? '')}
          theme="vs-dark"
          options={{
            fontSize: 15,
            fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            padding: { top: 16, bottom: 16 },
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
