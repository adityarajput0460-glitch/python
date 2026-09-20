import { useState, useCallback, useEffect } from 'react';
import { LESSONS } from '../data/lessons';
import { LEARN_STEPS } from '../data/story';
import { usePyodide } from '../hooks/usePyodide';
import { usePersistentState } from '../hooks/usePersistentState';
import { CodeEditor } from '../components/CodeEditor';
import { OutputPanel } from '../components/OutputPanel';
import type { RunResult, LessonStep } from '../shared/types';

interface Props {
  onBack: () => void;
}

export function LearnMode({ onBack }: Props) {
  const [lessonIdx, setLessonIdx] = usePersistentState<number>('pylearn_learn_lesson_idx', 0);
  const [stepIdx, setStepIdx] = usePersistentState<number>('pylearn_learn_step_idx', 0);
  const [passedLessonsArr, setPassedLessonsArr] = usePersistentState<number[]>('pylearn_learn_passed', []);
  const [savedCodes, setSavedCodes] = usePersistentState<Record<string, string>>('pylearn_learn_codes', {});
  const [code, setCode] = useState('');
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const passedLessons = new Set(passedLessonsArr);
  const { runCode, status: pyStatus } = usePyodide();

  // Guard valid bounds
  const safeLessonIdx = Math.min(Math.max(0, lessonIdx), LESSONS.length - 1);
  const lesson = LESSONS[safeLessonIdx];
  const steps = LEARN_STEPS[lesson.id] ?? [];
  const safeStepIdx = Math.min(Math.max(0, stepIdx), Math.max(0, steps.length - 1));
  const step: LessonStep = steps[safeStepIdx] || steps[0];
  const isLastStep = safeStepIdx === steps.length - 1;
  const isLastLesson = safeLessonIdx === LESSONS.length - 1;

  const codeKey = `${safeLessonIdx}_${safeStepIdx}`;

  // Initialize or update code when step changes or saved code exists
  useEffect(() => {
    if (savedCodes[codeKey] !== undefined) {
      setCode(savedCodes[codeKey]);
    } else if (step?.type === 'explain') {
      setCode(step.exampleCode ?? '');
    } else {
      setCode(step?.exerciseCode ?? '');
    }
  }, [safeLessonIdx, safeStepIdx, codeKey, savedCodes, step]);

  // Handle user code edits
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setSavedCodes((prev) => ({ ...prev, [codeKey]: newCode }));
  };

  const goToStep = useCallback(
    (newLessonIdx: number, newStepIdx: number) => {
      setLessonIdx(newLessonIdx);
      setStepIdx(newStepIdx);
      setRunResult(null);
      setShowHint(false);
    },
    [setLessonIdx, setStepIdx]
  );

  const handleRun = useCallback(async () => {
    if (isRunning || !code.trim()) return;
    setIsRunning(true);
    setRunResult(null);
    try {
      const tests = step.expectedOutput
        ? [{ description: 'Output check', testCode: '', expectedOutput: step.expectedOutput }]
        : [];
      const result = await runCode(code, tests);
      setRunResult(result);
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, code, step, runCode]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      if (!isLastLesson) {
        setPassedLessonsArr((prev) => Array.from(new Set([...prev, lesson.id])));
        goToStep(safeLessonIdx + 1, 0);
      }
    } else {
      goToStep(safeLessonIdx, safeStepIdx + 1);
    }
  }, [isLastStep, isLastLesson, lesson.id, safeLessonIdx, safeStepIdx, setPassedLessonsArr, goToStep]);

  const isExplain = step?.type === 'explain';
  const canProceed = isExplain || (runResult?.allPassed === true);

  const progressPct = Math.round(
    ((safeLessonIdx * steps.length + safeStepIdx) / (LESSONS.length * 3)) * 100
  );

  return (
    <div className="learn-mode">
      {/* Top bar */}
      <header className="learn-topbar">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Home</button>
        <div className="learn-topbar-center">
          <span className="learn-topbar-label">📖 Learn Mode</span>
          <div className="learn-progress-track">
            <div className="learn-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="learn-topbar-pos">
            Lesson {safeLessonIdx + 1}/{LESSONS.length} · Step {safeStepIdx + 1}/3
          </span>
          <span className="save-status-badge">💾 Auto-Saved</span>
        </div>
        <div className="learn-steps-dots">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`step-dot ${i < safeStepIdx ? 'step-dot--done' : i === safeStepIdx ? 'step-dot--active' : ''}`}
            />
          ))}
        </div>
      </header>

      <div className="learn-body">
        {/* Left: explanation / instruction */}
        <aside className="learn-explain">
          <div className="learn-explain-header">
            <span className="learn-step-badge">
              {step?.type === 'explain'
                ? '📘 Step 1: Core Concept'
                : step?.type === 'try'
                ? '🔍 Step 2: Deep Dive & Why This Happened'
                : '🎯 Step 3: Write Code & Meet Requirement'}
            </span>
            <h2 className="learn-step-heading">{step?.heading}</h2>
          </div>

          <div
            className="learn-step-body"
            dangerouslySetInnerHTML={{
              __html: (step?.body ?? '')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/`(.*?)`/g, '<code class="il-code">$1</code>')
                .replace(/\n/g, '<br/>'),
            }}
          />

          {/* Why This Happened (Step 2 Breakdown) */}
          {step?.whyItHappened && (
            <div className="learn-why-box">
              <div className="learn-why-header">
                <span>💡 Why This Happened</span>
              </div>
              <p
                className="learn-why-body"
                dangerouslySetInnerHTML={{
                  __html: step.whyItHappened
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/`(.*?)`/g, '<code class="il-code">$1</code>')
                    .replace(/\n/g, '<br/>'),
                }}
              />
            </div>
          )}

          {/* Example Output Preview (Step 1 & Step 2) */}
          {step?.exampleOutput && (
            <div className="learn-expected learn-expected--preview">
              <span className="learn-expected-label">🖥️ Code Output Preview:</span>
              <pre className="learn-expected-pre">{step.exampleOutput}</pre>
            </div>
          )}

          {/* Target Expected Output for Step 3 Check */}
          {step?.expectedOutput && (
            <div className="learn-expected">
              <span className="learn-expected-label">🎯 Target Requirement Output:</span>
              <pre className="learn-expected-pre">{step.expectedOutput}</pre>
            </div>
          )}

          {step?.hint && (
            <div className="learn-hint-wrap">
              {!showHint ? (
                <button className="btn btn-hint" onClick={() => setShowHint(true)}>
                  💡 Show Hint
                </button>
              ) : (
                <div className="learn-hint-box">
                  <span className="learn-hint-label">💡 Hint</span>
                  <code className="learn-hint-code">{step.hint}</code>
                </div>
              )}
            </div>
          )}

          <div className="learn-actions">
            {canProceed ? (
              <button className="btn btn-run" onClick={handleNext}>
                {isLastStep && isLastLesson
                  ? '🏆 Complete!'
                  : isLastStep
                  ? 'Next Lesson →'
                  : 'Next Step →'}
              </button>
            ) : (
              <p className="learn-pass-msg">Run your code and pass the check to continue</p>
            )}
          </div>
        </aside>

        {/* Right: editor + output */}
        <div className="learn-editor-area">
          <div className="learn-editor-pane">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onRun={handleRun}
              onReset={() => {
                const defaultCode = isExplain ? (step.exampleCode ?? '') : (step.exerciseCode ?? '');
                handleCodeChange(defaultCode);
                setRunResult(null);
              }}
              isRunning={isRunning}
              isLoading={pyStatus === 'loading'}
            />
          </div>
          <div className="learn-output-pane">
            <OutputPanel result={runResult} isRunning={isRunning} />
          </div>
        </div>
      </div>

      {/* Lesson navigator */}
      <div className="learn-lesson-nav">
        {LESSONS.map((l, i) => (
          <button
            key={l.id}
            className={`learn-lesson-pill ${i === safeLessonIdx ? 'active' : ''} ${passedLessons.has(l.id) ? 'passed' : ''} ${i > safeLessonIdx && !passedLessons.has(l.id) ? 'locked' : ''}`}
            onClick={() => {
              if (i <= safeLessonIdx || passedLessons.has(l.id)) goToStep(i, 0);
            }}
            disabled={i > safeLessonIdx && !passedLessons.has(l.id)}
            title={l.title}
          >
            {passedLessons.has(l.id) ? '✅' : l.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
