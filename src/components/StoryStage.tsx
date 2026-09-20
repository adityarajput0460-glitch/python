import { useState, useEffect } from 'react';
import type { StoryStageConfig, StoryDialogue } from '../shared/types';

interface Props {
  stage: StoryStageConfig;
  dialogue: StoryDialogue;
  state: 'idle' | 'running' | 'passed' | 'failed';
}

export function StoryStage({ stage, dialogue, state }: Props) {
  const [playerPos, setPlayerPos] = useState(stage.playerStart);
  const [activeSpeech, setActiveSpeech] = useState<{ speaker: 'npc' | 'player'; text: string }>({
    speaker: 'npc',
    text: dialogue.npcGreeting,
  });

  // Reset or update positions and dialogue when stage or state changes
  useEffect(() => {
    setPlayerPos(stage.playerStart);
    setActiveSpeech({ speaker: 'npc', text: dialogue.npcGreeting });
  }, [stage]);

  useEffect(() => {
    if (state === 'running') {
      setActiveSpeech({
        speaker: 'player',
        text: dialogue.playerSpellSpeech || '🔮 Incantating spell...',
      });
    } else if (state === 'passed') {
      setPlayerPos(stage.playerPassTarget);
      setActiveSpeech({ speaker: 'npc', text: dialogue.npcPassSpeech });
    } else if (state === 'failed') {
      setPlayerPos(stage.playerStart);
      setActiveSpeech({ speaker: 'npc', text: dialogue.npcFailSpeech });
    }
  }, [state, stage, dialogue]);

  return (
    <div className={`story-stage stage-theme--${stage.theme}`}>
      {/* Background Grid Pattern */}
      <div className="stage-grid-overlay" />

      {/* Stage Title Tag */}
      <div className="stage-header-tag">
        <span className="stage-theme-name">📍 {stage.theme.toUpperCase().replace('_', ' ')}</span>
      </div>

      {/* Objective Item (Door / Vault / Dragon) */}
      <div
        className={`stage-entity entity-objective ${state === 'passed' ? 'entity-objective--unlocked' : ''}`}
        style={{ left: `${stage.objective.x}%`, top: `${stage.objective.y}%` }}
      >
        <div className="entity-avatar entity-avatar--gold">
          {state === 'passed' ? '🔓' : stage.objective.emoji}
        </div>
        <span className="entity-label">{stage.objective.label}</span>
      </div>

      {/* Red Guard / NPC Entity */}
      <div
        className="stage-entity entity-npc"
        style={{ left: `${stage.npc.x}%`, top: `${stage.npc.y}%` }}
      >
        {activeSpeech.speaker === 'npc' && (
          <div className="speech-bubble speech-bubble--npc">
            <span className="speech-bubble-text">{activeSpeech.text}</span>
            <div className="speech-bubble-tail" />
          </div>
        )}
        <div className="entity-avatar entity-avatar--red">
          <div className="red-square-box" />
          <span className="avatar-emoji">{stage.npc.emoji}</span>
        </div>
        <span className="entity-label">{stage.npc.label}</span>
      </div>

      {/* Blue Wizard / Player Entity */}
      <div
        className={`stage-entity entity-player ${state === 'running' ? 'entity-player--casting' : ''} ${state === 'passed' ? 'entity-player--victory' : ''}`}
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
      >
        {activeSpeech.speaker === 'player' && (
          <div className="speech-bubble speech-bubble--player">
            <span className="speech-bubble-text">{activeSpeech.text}</span>
            <div className="speech-bubble-tail" />
          </div>
        )}
        {state === 'running' && <div className="spell-sparkles">⚡✨🔮</div>}
        <div className="entity-avatar entity-avatar--blue">
          <div className="blue-square-box" />
          <span className="avatar-emoji">🧙‍♂️</span>
        </div>
        <span className="entity-label">You (Wizard Apprentice)</span>
      </div>
    </div>
  );
}
