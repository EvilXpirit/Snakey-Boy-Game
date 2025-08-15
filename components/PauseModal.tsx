import React from 'react';

interface PauseModalProps {
  isPaused: boolean;
  onResume: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({ isPaused, onResume }) => {
  if (!isPaused) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-20"
      onClick={onResume}
      role="button"
      tabIndex={0}
      aria-label="Resume Game"
    >
      <div className="text-center p-8 rounded-lg bg-gray-800/50 border border-cyan-500 shadow-2xl shadow-cyan-500/30 pointer-events-none">
        <h2 className="text-6xl font-bold text-cyan-400 animate-pulse" style={{ textShadow: '0 0 10px #06b6d4' }}>
          PAUSED
        </h2>
        <p className="text-lg text-gray-400 mt-4">Click, press Space, or P to resume</p>
      </div>
    </div>
  );
};
