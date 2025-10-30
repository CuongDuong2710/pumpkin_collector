'use client';

import { useState, useEffect, useCallback } from 'react';

interface PumpkinGameState {
  score: number;
  pumpkins: number;
  timeLeft: number;
  isPlaying: boolean;
  level: number;
}

interface FallingPumpkin {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  emoji: string;
}

export default function PumpkinGame() {
  const [gameState, setGameState] = useState<PumpkinGameState>({
    score: 0,
    pumpkins: 0,
    timeLeft: 30,
    isPlaying: false,
    level: 1,
  });

  const [fallingPumpkins, setFallingPumpkins] = useState<FallingPumpkin[]>([]);
  const [gameArea, setGameArea] = useState({ width: 600, height: 400 });
  const [lastSpawn, setLastSpawn] = useState(0);

  const pumpkinEmojis = ['🎃', '🟠', '🧡', '🟤'];

  const spawnPumpkin = useCallback(() => {
    const now = Date.now();
    if (now - lastSpawn > 1000 - (gameState.level * 100)) { // Faster spawning at higher levels
      const newPumpkin: FallingPumpkin = {
        id: Math.random(),
        x: Math.random() * (gameArea.width - 60) + 30,
        y: -50,
        speed: 2 + Math.random() * 2 + (gameState.level * 0.5),
        size: 40 + Math.random() * 20,
        emoji: pumpkinEmojis[Math.floor(Math.random() * pumpkinEmojis.length)],
      };
      
      setFallingPumpkins(prev => [...prev, newPumpkin]);
      setLastSpawn(now);
    }
  }, [gameState.level, gameArea.width, lastSpawn, pumpkinEmojis]);

  const updatePumpkins = useCallback(() => {
    setFallingPumpkins(prev => 
      prev
        .map(pumpkin => ({ ...pumpkin, y: pumpkin.y + pumpkin.speed }))
        .filter(pumpkin => pumpkin.y < gameArea.height + 100)
    );
  }, [gameArea.height]);

  const clickPumpkin = (pumpkinId: number) => {
    setFallingPumpkins(prev => prev.filter(p => p.id !== pumpkinId));
    setGameState(prev => ({
      ...prev,
      score: prev.score + 10,
      pumpkins: prev.pumpkins + 1,
      level: Math.floor((prev.pumpkins + 1) / 10) + 1,
    }));
  };

  const startGame = () => {
    setGameState({
      score: 0,
      pumpkins: 0,
      timeLeft: 30,
      isPlaying: true,
      level: 1,
    });
    setFallingPumpkins([]);
    setLastSpawn(0);
  };

  const endGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: false }));
    setFallingPumpkins([]);
  };

  // Game timer
  useEffect(() => {
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState.timeLeft === 0) {
      endGame();
    }
  }, [gameState.isPlaying, gameState.timeLeft]);

  // Game loop
  useEffect(() => {
    if (gameState.isPlaying) {
      const gameLoop = setInterval(() => {
        spawnPumpkin();
        updatePumpkins();
      }, 50);
      return () => clearInterval(gameLoop);
    }
  }, [gameState.isPlaying, spawnPumpkin, updatePumpkins]);

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-xl p-8 max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-orange-400 mb-4">
          🎃 Live Pumpkin Collector 🎃
        </h2>
        <div className="flex justify-center space-x-8 text-xl">
          <div className="bg-orange-500/20 px-4 py-2 rounded-lg">
            <span className="text-orange-300">Score: </span>
            <span className="text-white font-bold">{gameState.score}</span>
          </div>
          <div className="bg-purple-500/20 px-4 py-2 rounded-lg">
            <span className="text-purple-300">Pumpkins: </span>
            <span className="text-white font-bold">{gameState.pumpkins}</span>
          </div>
          <div className="bg-blue-500/20 px-4 py-2 rounded-lg">
            <span className="text-blue-300">Time: </span>
            <span className="text-white font-bold">{gameState.timeLeft}s</span>
          </div>
          <div className="bg-green-500/20 px-4 py-2 rounded-lg">
            <span className="text-green-300">Level: </span>
            <span className="text-white font-bold">{gameState.level}</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative mx-auto mb-6" style={{ width: gameArea.width, height: gameArea.height }}>
        <div 
          className="relative bg-gradient-to-b from-indigo-900 to-purple-900 border-4 border-orange-500 rounded-lg overflow-hidden cursor-crosshair"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-6xl">🌙</div>
            <div className="absolute top-8 right-8 text-4xl">⭐</div>
            <div className="absolute bottom-4 left-8 text-5xl">🦇</div>
            <div className="absolute bottom-8 right-4 text-4xl">👻</div>
          </div>

          {/* Falling Pumpkins */}
          {fallingPumpkins.map(pumpkin => (
            <button
              key={pumpkin.id}
              className="absolute transition-transform hover:scale-110 active:scale-95"
              style={{
                left: pumpkin.x,
                top: pumpkin.y,
                fontSize: pumpkin.size,
                lineHeight: 1,
              }}
              onClick={() => clickPumpkin(pumpkin.id)}
            >
              {pumpkin.emoji}
            </button>
          ))}

          {/* Game Status Overlay */}
          {!gameState.isPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                {gameState.timeLeft === 0 ? (
                  <div>
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold text-white mb-2">Game Over!</h3>
                    <p className="text-xl text-orange-300 mb-4">
                      Final Score: {gameState.score} points
                    </p>
                    <p className="text-lg text-white mb-6">
                      You collected {gameState.pumpkins} pumpkins!
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🎃</div>
                    <h3 className="text-3xl font-bold text-white mb-4">Ready to Play?</h3>
                    <p className="text-lg text-orange-300 mb-6">
                      Click falling pumpkins to collect them!<br/>
                      You have 30 seconds to get the highest score!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Game Controls */}
      <div className="text-center">
        {!gameState.isPlaying ? (
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
          >
            {gameState.timeLeft === 0 ? '🔄 Play Again' : '🎮 Start Game'}
          </button>
        ) : (
          <button
            onClick={endGame}
            className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg"
          >
            ⏹️ Stop Game
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-gray-300">
        <p className="text-sm">
          💡 <strong>How to Play:</strong> Click the falling pumpkins before they disappear! 
          Higher levels spawn pumpkins faster. Try to beat your high score!
        </p>
      </div>

      {/* High Score Display */}
      {gameState.timeLeft === 0 && gameState.score > 0 && (
        <div className="mt-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl text-yellow-400 mb-2">🏆 Achievement Unlocked!</div>
          <p className="text-white">
            {gameState.score >= 500 ? "Pumpkin Master! 🎃👑" :
             gameState.score >= 200 ? "Pumpkin Hunter! 🎃🏹" :
             gameState.score >= 100 ? "Pumpkin Collector! 🎃📦" :
             "Pumpkin Beginner! 🎃🌱"}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Share your score on Farcaster and challenge your friends!
          </p>
        </div>
      )}
    </div>
  );
}