import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameOverModal } from './components/GameOverModal';
import { PauseModal } from './components/PauseModal';
import { useGameLogic } from './hooks/useGameLogic';
import { BOARD_SIZE } from './constants';

const App: React.FC = () => {
  const { gameState, isPlaying, isPaused, startGame, restartGame, togglePause } = useGameLogic();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-mono">
      <header className="relative text-center mb-4">
        <h1 className="text-5xl md:text-7xl font-bold text-cyan-400" style={{ textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4' }}>
          NEON SNAKY BOY
        </h1>
        <p className="text-gray-400 mt-2">A retro-futuristic classic</p>
      </header>
      
      <main className="relative flex flex-col items-center">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-red-500 rounded-lg blur opacity-50"></div>
        <div className="relative bg-gray-900 p-2 rounded-lg shadow-2xl shadow-cyan-500/20">
            <div className="w-full flex justify-between items-center px-4 py-2 bg-black/30 rounded-t-md">
                <span className="text-lg">SCORE: <span className="font-bold text-cyan-300">{gameState.score}</span></span>
                 {isPlaying && !gameState.isGameOver && (
                  <button
                    onClick={togglePause}
                    className="px-4 py-1 bg-cyan-700/50 text-cyan-300 font-bold text-sm rounded-md shadow-md shadow-cyan-500/20 hover:bg-cyan-600/50 transform hover:scale-105 transition-all duration-300"
                    aria-label={isPaused ? "Resume Game" : "Pause Game"}
                  >
                    {isPaused ? 'RESUME' : 'PAUSE'}
                  </button>
                )}
            </div>
            <GameBoard
              boardSize={BOARD_SIZE}
              snake={gameState.snake}
              food={gameState.food}
              direction={gameState.direction}
              speed={gameState.speed}
            />
        </div>

        {!isPlaying && !gameState.isGameOver && (
          <div className="mt-8">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-cyan-500 text-gray-900 font-bold text-xl rounded-md shadow-lg shadow-cyan-500/50 hover:bg-cyan-400 transform hover:scale-105 transition-all duration-300"
            >
              Start Game
            </button>
          </div>
        )}

        <PauseModal isPaused={isPaused && !gameState.isGameOver} onResume={togglePause} />
        <GameOverModal
          isGameOver={gameState.isGameOver}
          score={gameState.score}
          onRestart={restartGame}
        />
      </main>

      <footer className="text-gray-500 text-sm mt-8 text-center">
        <p>Use Arrow Keys or WASD to move. Space or P to pause.</p>
        <p>EvilX.</p>
      </footer>
    </div>
  );
};

export default App;
