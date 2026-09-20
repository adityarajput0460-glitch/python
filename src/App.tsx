import { useState, useCallback } from 'react';
import { LESSONS } from './data/lessons';
import { usePyodide } from './hooks/usePyodide';
import { useProgress } from './hooks/useProgress';
import { LessonSidebar } from './components/LessonSidebar';
import { CodeEditor } from './components/CodeEditor';
import { OutputPanel } from './components/OutputPanel';
import { LessonPanel } from './components/LessonPanel';
import { ProgressBar } from './components/ProgressBar';
import { HomeScreen } from './screens/HomeScreen';
import { LearnMode } from './screens/LearnMode';
import { StoryMode } from './screens/StoryMode';
import type { RunResult, AppMode } from './shared/types';
import './App.css';

function App() {
  const [mode, setMode] = useState<AppMode>('home');
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const { runCode, status: pyStatus } = usePyodide();
  const { progress, getProgress, markPassed, markFailed, saveCode, resetProgress, passedCount } = useProgress();

  const activeLesson = LESSONS.find((l) => l.id === activeLessonId)!;
  const activeProgress = getProgress(activeLessonId);

  // Code state per lesson — derived from saved code or starter
  const [codeMap, setCodeMap] = useState<Record<number, string>>(() => {
    const map: Record<number, string> = {};
    LESSONS.forEach((l) => {
      const prog = progress.find((p) => p.lessonId === l.id);
      map[l.id] = prog?.savedCode ?? l.starterCode;
    });
    return map;
  });

  const currentCode = codeMap[activeLessonId] ?? activeLesson.starterCode;

  const handleCodeChange = useCallback(
    (code: string) => {
      setCodeMap((prev) => ({ ...prev, [activeLessonId]: code }));
      saveCode(activeLessonId, code);
    },
    [activeLessonId, saveCode]
  );

  const handleReset = useCallback(() => {
    setCodeMap((prev) => ({ ...prev, [activeLessonId]: activeLesson.starterCode }));
    saveCode(activeLessonId, activeLesson.starterCode);
    setRunResult(null);
  }, [activeLessonId, activeLesson.starterCode, saveCode]);

  const handleRun = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setRunResult(null);
    try {
      const result = await runCode(currentCode, activeLesson.tests);
      setRunResult(result);
      if (result.allPassed) {
        markPassed(activeLessonId);
      } else {
        markFailed(activeLessonId);
      }
    } catch (e) {
      setRunResult({
        stdout: '',
        stderr: String(e),
        durationMs: 0,
        testResults: [],
        allPassed: false,
        error: String(e),
      });
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, runCode, currentCode, activeLesson.tests, activeLessonId, markPassed, markFailed]);

  const handleSelectLesson = useCallback(
    (id: number) => {
      setActiveLessonId(id);
      setRunResult(null);
    },
    []
  );

  const handleResetProgress = useCallback(() => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      resetProgress();
      setActiveLessonId(1);
      setCodeMap(() => {
        const map: Record<number, string> = {};
        LESSONS.forEach((l) => { map[l.id] = l.starterCode; });
        return map;
      });
      setRunResult(null);
    }
  }, [resetProgress]);

  const isLoading = pyStatus === 'loading';

  if (mode === 'home') {
    return <HomeScreen onSelect={(selectedMode) => setMode(selectedMode)} />;
  }

  if (mode === 'learn') {
    return <LearnMode onBack={() => setMode('home')} />;
  }

  if (mode === 'story') {
    return <StoryMode onBack={() => setMode('home')} />;
  }

  // Practice Mode
  return (
    <div className="app">
      <ProgressBar
        passed={passedCount}
        total={LESSONS.length}
        onReset={handleResetProgress}
        onBack={() => setMode('home')}
      />

      <div className="app-body">
        <LessonSidebar
          progress={progress}
          activeLessonId={activeLessonId}
          onSelect={handleSelectLesson}
        />

        <main className="main-area">
          <div className="editor-pane">
            <CodeEditor
              code={currentCode}
              onChange={handleCodeChange}
              onRun={handleRun}
              onReset={handleReset}
              isRunning={isRunning}
              isLoading={isLoading}
            />
          </div>
          <div className="output-pane">
            <OutputPanel result={runResult} isRunning={isRunning} />
          </div>
        </main>

        <LessonPanel lesson={activeLesson} progress={activeProgress} />
      </div>
    </div>
  );
}

export default App;
