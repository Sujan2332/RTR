import { useGameStore } from '../store/gameStore'; 
import { Play, RotateCcw, Pause } from 'lucide-react';
import { useState } from 'react';
import "./GameCss.css"

export function GameUI() {
  const { score, gameOver, isPlaying, highScore, speed, resetGame, setIsPlaying, lane } = useGameStore();
  const [isPaused, setIsPaused] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const getLaneName = (lane) => {
    switch (lane) {
      case 0: return 'Left';
      case 1: return 'Middle';
      case 2: return 'Right';
      default: return '';
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      setIsPlaying(true); // Resume the game
      setIsPaused(false);
    } else {
      setIsPlaying(false); // Pause the game
      setIsPaused(true);
    }
  };

  const handlePlayAgain = () => {
    setIsResetting(true);
    resetGame();
    setTimeout(() => {
      setIsResetting(false);
    }, 50); // Short delay to allow the reset to take effect smoothly
  };

  // If game hasn't started and is not resetting, show the initial screen
  if (!isPlaying && !gameOver && !isPaused && !isResetting) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div className="bg-white/90 p-8 rounded-lg text-center main">
          <h1 className="text-4xl font-bold mb-4">Reverse Traffic Runner</h1>
          <p className="mb-6">Dodge the traffic and survive as long as you can while driving reverse!</p>
          <p className="mb-4 text-gray-600">Use ← → to switch between three lanes</p>
          <button
            onClick={() => setIsPlaying(true)}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Play size={24} /> Start Game
          </button>
        </div>
      </div>
    );
  }

  // Show Game Over or Paused screen
  if (gameOver || isPaused) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">{gameOver ? 'Game Over!' : 'Game Paused'}</h2>
          <p className="text-xl mb-2">Score: {score}</p>
          <p className="text-lg mb-2">High Score: {highScore}</p>
          <p className="text-md mb-6">Top Speed: {speed.toFixed(1)}</p>
          <button
            onClick={gameOver ? handlePlayAgain : handlePauseResume}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            {gameOver ? <RotateCcw size={24} /> : <Play size={24} />} {gameOver ? 'Play Again' : 'Resume Game'}
          </button>
        </div>
      </div>
    );
  }

  // Show game UI
  return (
    <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-lg" style={{textAlign:"center"}}>
      <button
      style={{marginLeft:"8px"}}
        onClick={handlePauseResume}
        className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        {isPaused ? <Play size={24} /> : <Pause size={44} />}
      </button>
      <p className="text-xl font-bold">Score: {score}</p>
      <p className="text-sm">Speed: {speed.toFixed(1)}</p>
      <p className="text-sm">Lane: {getLaneName(lane)}</p>
    </div>
  );
}
