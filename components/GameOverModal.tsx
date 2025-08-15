
import React from 'react';

interface GameOverModalProps {
  isGameOver: boolean;
  score: number;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ isGameOver, score, onRestart }) => {
  if (!isGameOver) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
      <div className="text-center p-8 rounded-lg bg-gray-800/50 border border-cyan-500 shadow-2xl shadow-cyan-500/30">
        <h2 className="text-6xl font-bold text-red-500" style={{ textShadow: '0 0 10px #ef4444' }}>
          GAME OVER
        </h2>
        <p className="text-2xl mt-4">Your Score: <span className="font-bold text-cyan-300">{score}</span></p>
        <button
          onClick={onRestart}
          className="mt-8 px-6 py-3 bg-cyan-500 text-gray-900 font-bold text-lg rounded-md shadow-lg shadow-cyan-500/50 hover:bg-cyan-400 transform hover:scale-105 transition-all duration-300"
        >
          Restart
        </button>
      </div>
    </div>
  );
};
