// ─── App Mode ───────────────────────────────────────────────────────────────
export type AppMode = 'home' | 'learn' | 'practice' | 'story';

// ─── Learn Step ──────────────────────────────────────────────────────────────
export interface LessonStep {
  type: 'explain' | 'try' | 'check';
  heading: string;
  body: string;
  exampleCode?: string;
  exampleOutput?: string;
  whyItHappened?: string;
  exerciseCode?: string;
  expectedOutput?: string;
  hint?: string;
}

// ─── Test Case ───────────────────────────────────────────────────────────────
export interface TestCase {
  description: string;
  /** Code appended after the user's code to exercise it */
  testCode: string;
  /** Expected stdout (trimmed) for this test */
  expectedOutput: string;
}

// ─── Lesson ──────────────────────────────────────────────────────────────────
export interface Lesson {
  id: number;
  title: string;
  emoji: string;
  description: string;
  /** Code placed in the editor when lesson is first opened */
  starterCode: string;
  tests: TestCase[];
  hints: string[];
  steps?: LessonStep[];
}

// ─── Story Stage & Dialogue ──────────────────────────────────────────────────
export type EntityType = 'player' | 'npc' | 'door' | 'treasure' | 'dragon' | 'obstacle';

export interface StageEntity {
  id: string;
  type: EntityType;
  label: string;
  emoji: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  color: 'blue' | 'red' | 'gold' | 'purple' | 'green';
}

export interface StoryDialogue {
  npcGreeting: string;
  npcPassSpeech: string;
  npcFailSpeech: string;
  playerSpellSpeech?: string;
}

export interface StoryStageConfig {
  theme: 'dungeon' | 'vault' | 'mirror_hall' | 'garden' | 'tower' | 'library' | 'river' | 'sanctum' | 'lair';
  playerStart: { x: number; y: number };
  playerPassTarget: { x: number; y: number };
  npc: StageEntity;
  objective: StageEntity;
}

// ─── Run Result ──────────────────────────────────────────────────────────────
export interface TestResult {
  description: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  durationMs: number;
  testResults: TestResult[];
  allPassed: boolean;
  error?: string;
}

// ─── Progress ─────────────────────────────────────────────────────────────────
export type LessonStatus = 'locked' | 'active' | 'passed' | 'failed';

export interface LessonProgress {
  lessonId: number;
  status: LessonStatus;
  attempts: number;
  hintsUsed: number;
  savedCode?: string;
}
