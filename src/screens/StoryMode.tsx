import { useState, useCallback, useEffect } from 'react';
import { STORY_SCENES } from '../data/story';
import { usePyodide } from '../hooks/usePyodide';
import { usePersistentState } from '../hooks/usePersistentState';
import { CodeEditor } from '../components/CodeEditor';
import { StoryStage } from '../components/StoryStage';
import type { RunResult } from '../shared/types';

interface Props {
  onBack: () => void;
}

type SceneState = 'idle' | 'passed' | 'failed';

const WIZARD_REACTIONS = [
  '🧙 "Hmm, that\'s not quite right..."',
  '🧙 "Your spell fizzled! Check the error."',
  '🧙 "Close, but your function didn\'t pass all cases."',
  '🧙 "Focus your mind and read the hint."',
  '🧙 "The magic resists. Double check your syntax."',
];

export function StoryMode({ onBack }: Props) {
  const [sceneIdx, setSceneIdx] = usePersistentState<number>('pylearn_story_scene_idx', 0);
  const [clearedScenesArr, setClearedScenesArr] = usePersistentState<number[]>('pylearn_story_cleared', []);
  const [savedCodes, setSavedCodes] = usePersistentState<Record<number, string>>('pylearn_story_codes', {});
  const [code, setCode] = useState('');
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [sceneState, setSceneState] = useState<SceneState>('idle');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const clearedScenes = new Set(clearedScenesArr);
  const { runCode, status: pyStatus } = usePyodide();

  const safeSceneIdx = Math.min(Math.max(0, sceneIdx), STORY_SCENES.length - 1);
  const scene = STORY_SCENES[safeSceneIdx];
  const isLastScene = safeSceneIdx === STORY_SCENES.length - 1;

  // Initialize or load code when scene changes
  useEffect(() => {
    if (savedCodes[scene.id] !== undefined) {
      setCode(savedCodes[scene.id]);
    } else {
      setCode(scene.starterCode);
    }
  }, [safeSceneIdx, scene.id, scene.starterCode, savedCodes]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setSavedCodes((prev) => ({ ...prev, [scene.id]: newCode }));
  };

  const handleRun = useCallback(async () => {
    if (isRunning || sceneState === 'passed') return;
    setIsRunning(true);
    setRunResult(null);
    try {
      const result = await runCode(code, scene.tests);
      setRunResult(result);
      if (result.allPassed) {
        setSceneState('passed');
        setClearedScenesArr((prev) => Array.from(new Set([...prev, scene.id])));
      } else {
        setSceneState('failed');
        setAttempts((a) => a + 1);
      }
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, sceneState, runCode, code, scene, setClearedScenesArr]);

  const handleNext = useCallback(() => {
    if (isLastScene) return;
    const nextIdx = safeSceneIdx + 1;
    setSceneIdx(nextIdx);
    setRunResult(null);
    setSceneState('idle');
    setAttempts(0);
    setShowHint(false);
  }, [safeSceneIdx, isLastScene, setSceneIdx]);

  const goToScene = (idx: number) => {
    if (idx <= safeSceneIdx || clearedScenes.has(STORY_SCENES[idx].id)) {
      setSceneIdx(idx);
      setRunResult(null);
      setSceneState(clearedScenes.has(STORY_SCENES[idx].id) ? 'passed' : 'idle');
      setAttempts(0);
      setShowHint(false);
    }
  };

  const wizardReaction = WIZARD_REACTIONS[Math.min(attempts, WIZARD_REACTIONS.length - 1)];
  const progressPct = Math.round((clearedScenes.size / STORY_SCENES.length) * 100);

  const stageState = isRunning ? 'running' : sceneState;

  return (
    <div className="story-mode">
      {/* Topbar */}
      <header className="story-topbar">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Home</button>
        <div className="story-topbar-center">
          <span className="story-topbar-label">🗺️ Adventure Mode</span>
          <div className="story-progress-track">
            <div className="story-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="story-topbar-pos">Scene {safeSceneIdx + 1} / {STORY_SCENES.length}</span>
          <span className="save-status-badge">💾 Auto-Saved</span>
        </div>
        <div className="story-scene-dots">
          {STORY_SCENES.map((s, i) => (
            <button
              key={s.id}
              className={`scene-dot ${i === safeSceneIdx ? 'scene-dot--active' : ''} ${clearedScenes.has(s.id) ? 'scene-dot--done' : ''}`}
              onClick={() => goToScene(i)}
              disabled={i > safeSceneIdx && !clearedScenes.has(s.id)}
              title={s.title}
            />
          ))}
        </div>
      </header>

      <div className="story-body">
        {/* Left column: 2D Stage Visualizer + Narrative */}
        <aside className="story-narrative">
          {/* Interactive 2D Graphics Stage */}
          <StoryStage stage={scene.stage} dialogue={scene.dialogue} state={stageState} />

          <div className="story-scene-header">
            <span className="story-scene-emoji">{scene.emoji}</span>
            <div>
              <p className="story-scene-location">{scene.location}</p>
              <h2 className="story-scene-title">{scene.title}</h2>
            </div>
          </div>

          <p className="story-narrative-text">{scene.narrative}</p>

          <div className="story-challenge-box">
            <p
              className="story-challenge-text"
              dangerouslySetInnerHTML={{
                __html: scene.challenge
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`(.*?)`/g, '<code class="il-code">$1</code>'),
              }}
            />
          </div>

          {/* Feedback */}
          {sceneState === 'passed' && (
            <div className="story-feedback story-feedback--pass">
              <p className="story-feedback-text">{scene.successText}</p>
              {!isLastScene && (
                <button className="btn btn-run" onClick={handleNext}>
                  Next Stage →
                </button>
              )}
              {isLastScene && (
                <div className="story-victory">
                  <p>🏆 You completed the adventure!</p>
                  <button className="btn btn-run" onClick={onBack}>Back to Home</button>
                </div>
              )}
            </div>
          )}

          {sceneState === 'failed' && (
            <div className="story-feedback story-feedback--fail">
              <p className="story-wizard-reaction">{wizardReaction}</p>
              {attempts >= 1 && !showHint && (
                <button className="btn btn-hint" onClick={() => setShowHint(true)}>
                  💡 Show Hint
                </button>
              )}
              {showHint && (
                <div className="story-hint-box">
                  <span className="story-hint-label">🧙 The wizard whispers:</span>
                  <code className="story-hint-code">{scene.hint}</code>
                </div>
              )}
            </div>
          )}
        </aside>

        {/* Right column: Editor + Multi-case Output */}
        <div className="story-editor-area">
          <div className="story-editor-pane">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onRun={handleRun}
              onReset={() => {
                handleCodeChange(scene.starterCode);
                setRunResult(null);
                setSceneState('idle');
              }}
              isRunning={isRunning}
              isLoading={pyStatus === 'loading'}
            />
          </div>

          <div className="story-output-pane">
            {runResult && (
              <div className={`story-output ${runResult.allPassed ? 'story-output--pass' : 'story-output--fail'}`}>
                {/* Multi test cases results */}
                {runResult.testResults.length > 0 && (
                  <div className="story-tests-list">
                    <span className="story-tests-label">Spell Validation ({runResult.testResults.filter(t => t.passed).length}/{runResult.testResults.length} cases passed):</span>
                    {runResult.testResults.map((t, idx) => (
                      <div key={idx} className={`story-test-item ${t.passed ? 'story-test-item--pass' : 'story-test-item--fail'}`}>
                        <span>{t.passed ? '✅' : '❌'}</span>
                        <span className="story-test-desc">{t.description}</span>
                        {!t.passed && t.actualOutput !== undefined && (
                          <span className="story-test-diff">
                            Got: <code>{t.actualOutput || '(nothing)'}</code> | Expected: <code>{t.expectedOutput}</code>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {runResult.stdout && (
                  <div className="story-output-section">
                    <span className="story-output-label">Console Output</span>
                    <pre className="story-output-pre">{runResult.stdout}</pre>
                  </div>
                )}
                {runResult.stderr && (
                  <div className="story-output-section">
                    <span className="story-output-label story-output-label--err">Spell Execution Error</span>
                    <pre className="story-output-pre story-output-pre--err">{runResult.stderr}</pre>
                  </div>
                )}
              </div>
            )}

            {isRunning && (
              <div className="story-output-running">
                <span className="spinner spinner--large" /> Casting spell & validating all test cases…
              </div>
            )}
            {!runResult && !isRunning && (
              <p className="story-output-empty">▶ Write your Python spell and click Run to advance the character!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
