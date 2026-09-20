import type { AppMode } from '../shared/types';
import { usePersistentState } from '../hooks/usePersistentState';

interface ModeCard {
  mode: AppMode;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  tagColor: string;
  gradient: string;
}

const CARDS: ModeCard[] = [
  {
    mode: 'learn',
    emoji: '📖',
    title: 'Learn',
    subtitle: 'Start from zero',
    description:
      'Never coded before? Start here. We explain every concept with clear examples, then guide you through writing your first lines of Python step by step.',
    tag: 'Beginner Friendly',
    tagColor: 'tag--blue',
    gradient: 'card--learn',
  },
  {
    mode: 'practice',
    emoji: '⚡',
    title: 'Practice',
    subtitle: 'Test your skills',
    description:
      'Already know the basics? Jump into 10 coding challenges. Write Python in a real editor, run it instantly, and see if your code passes the tests.',
    tag: 'Intermediate',
    tagColor: 'tag--purple',
    gradient: 'card--practice',
  },
  {
    mode: 'story',
    emoji: '🗺️',
    title: 'Adventure',
    subtitle: 'Learn through play',
    description:
      "You're a wizard's apprentice on a quest. Cast Python spells to escape dungeons, unlock doors, and defeat a dragon. Practical skills through storytelling.",
    tag: 'Story Mode',
    tagColor: 'tag--gold',
    gradient: 'card--story',
  },
];

interface Props {
  onSelect: (mode: AppMode) => void;
}

export function HomeScreen({ onSelect }: Props) {
  const [learnIdx] = usePersistentState<number>('pylearn_learn_lesson_idx', 0);
  const [learnPassed] = usePersistentState<number[]>('pylearn_learn_passed', []);
  const [storyIdx] = usePersistentState<number>('pylearn_story_scene_idx', 0);
  const [storyCleared] = usePersistentState<number[]>('pylearn_story_cleared', []);
  const [practiceProgress] = usePersistentState<Array<{ status: string }>>('pylearn_progress', []);

  const practicePassed = practiceProgress.filter(p => p.status === 'passed').length;

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all your progress in Learn, Practice, and Adventure modes?')) {
      localStorage.removeItem('pylearn_learn_lesson_idx');
      localStorage.removeItem('pylearn_learn_step_idx');
      localStorage.removeItem('pylearn_learn_passed');
      localStorage.removeItem('pylearn_learn_codes');
      localStorage.removeItem('pylearn_story_scene_idx');
      localStorage.removeItem('pylearn_story_cleared');
      localStorage.removeItem('pylearn_story_codes');
      localStorage.removeItem('pylearn_progress');
      window.location.reload();
    }
  };

  const getProgressBadge = (mode: AppMode) => {
    if (mode === 'learn') {
      return learnPassed.length > 0
        ? `Passed ${learnPassed.length}/10 Lessons (At Lesson ${learnIdx + 1})`
        : `Lesson ${learnIdx + 1} / 10`;
    }
    if (mode === 'story') {
      return storyCleared.length > 0
        ? `Cleared ${storyCleared.length}/10 Scenes (At Scene ${storyIdx + 1})`
        : `Scene ${storyIdx + 1} / 10`;
    }
    if (mode === 'practice') {
      return practicePassed > 0 ? `Completed ${practicePassed}/10 Challenges` : `10 Challenges`;
    }
    return '';
  };

  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-snake-wrap">
          <span className="home-snake-big">🐍</span>
          <div className="home-snake-glow" />
        </div>
        <h1 className="home-title">PyLearn</h1>
        <p className="home-tagline">Learn Python your way.</p>
        <p className="home-sub">Choose how you want to get started:</p>
      </div>

      <div className="home-cards">
        {CARDS.map((card) => (
          <button
            key={card.mode}
            className={`mode-card ${card.gradient}`}
            onClick={() => onSelect(card.mode)}
            id={`mode-btn-${card.mode}`}
          >
            <div className="mode-card-inner">
              <span className="mode-card-emoji">{card.emoji}</span>
              <span className={`mode-card-tag ${card.tagColor}`}>{card.tag}</span>
              <h2 className="mode-card-title">{card.title}</h2>
              <p className="mode-card-subtitle">{card.subtitle}</p>
              <p className="mode-card-desc">{card.description}</p>
              <div className="mode-card-progress-pill">
                💾 {getProgressBadge(card.mode)}
              </div>
              <span className="mode-card-cta">Resume / Start →</span>
            </div>
          </button>
        ))}
      </div>

      <div className="home-footer-wrap">
        <p className="home-footer">
          Progress in each mode is saved automatically to your browser. You can switch anytime.
        </p>
        <button className="btn btn-ghost btn-sm reset-progress-btn" onClick={handleResetAll}>
          🗑️ Reset All Progress
        </button>
      </div>
    </div>
  );
}
