'use client';

import { useState, useEffect, useCallback } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

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

interface NFTMintData {
  tier: string;
  mintPrice: string;
  mintPriceEth: string;
  eligible: boolean;
  contractAddress: string;
  sessionId: string;
  mintData: string;
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
  const [gameArea, setGameArea] = useState({ width: 320, height: 280 });
  const [lastSpawn, setLastSpawn] = useState(0);
  const [nftMintData, setNftMintData] = useState<NFTMintData | null>(null);
  const [isCheckingNFT, setIsCheckingNFT] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [gameSessionId, setGameSessionId] = useState<string>('');

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
    // Generate unique session ID for this game
    const sessionId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setGameSessionId(sessionId);
    setNftMintData(null);
    setMintSuccess(false);
    
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

  const endGame = async () => {
    setGameState(prev => ({ ...prev, isPlaying: false }));
    setFallingPumpkins([]);
    
    // Check NFT eligibility after game ends
    if (gameState.score >= 100 && gameSessionId) {
      setIsCheckingNFT(true);
      try {
        const response = await fetch(`/api/mint-nft?score=${gameState.score}`);
        const result = await response.json();
        
        if (result.success && result.data.eligible) {
          setNftMintData(result.data);
        }
      } catch (error) {
        console.error('Error checking NFT eligibility:', error);
      } finally {
        setIsCheckingNFT(false);
      }
    }
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
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-xl p-4 max-w-sm mx-auto">
      {/* Game Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-orange-400 mb-3">
          🎃 Live Pumpkin Collector 🎃
        </h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-orange-500/20 px-2 py-1 rounded">
            <span className="text-orange-300">Pumpkins: </span>
            <span className="text-white font-bold">{gameState.pumpkins}</span>
          </div>
          <div className="bg-blue-500/20 px-2 py-1 rounded">
            <span className="text-blue-300">Time: </span>
            <span className="text-white font-bold">{gameState.timeLeft}s</span>
          </div>
          <div className="bg-green-500/20 px-2 py-1 rounded">
            <span className="text-green-300">Level: </span>
            <span className="text-white font-bold">{gameState.level}</span>
          </div>
          <div className="bg-purple-500/20 px-2 py-1 rounded">
            <span className="text-purple-300">Score: </span>
            <span className="text-white font-bold">{gameState.score}</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative mx-auto mb-4" style={{ width: gameArea.width, height: gameArea.height }}>
        <div 
          className="relative bg-gradient-to-b from-indigo-900 to-purple-900 border-4 border-orange-500 rounded-lg overflow-hidden cursor-crosshair"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-2 text-2xl">🌙</div>
            <div className="absolute top-2 right-2 text-xl">⭐</div>
            <div className="absolute bottom-2 left-2 text-2xl">🦇</div>
            <div className="absolute bottom-2 right-2 text-xl">👻</div>
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
              <div className="text-center p-4">
                {gameState.timeLeft === 0 ? (
                  <div>
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="text-xl font-bold text-white mb-2">Game Over!</h3>
                    <p className="text-sm text-orange-300 mb-2">
                      Final Score: {gameState.score}
                    </p>
                    <p className="text-xs text-white mb-3">
                      {gameState.pumpkins} pumpkins collected!
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-2">🎃</div>
                    <h3 className="text-xl font-bold text-white mb-2">Ready?</h3>
                    <p className="text-xs text-orange-300 mb-3">
                      Click falling pumpkins!<br/>
                      30 seconds to collect!
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
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-2 px-6 rounded-full text-lg shadow-lg transform transition-all hover:scale-105 active:scale-95"
          >
            {gameState.timeLeft === 0 ? '🔄 Play Again' : '🎮 Start Game'}
          </button>
        ) : (
          <button
            onClick={endGame}
            className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-bold py-2 px-4 rounded-full text-sm shadow-lg"
          >
            ⏹️ Stop Game
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-gray-300">
        <p className="text-xs">
          💡 Click falling pumpkins before they disappear! Higher levels = faster pumpkins!
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

      {/* NFT Minting Section */}
      {gameState.timeLeft === 0 && gameState.score >= 100 && (
        <div className="mt-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          {isCheckingNFT ? (
            <div className="text-green-400">
              <div className="animate-spin text-2xl mb-2">🎃</div>
              <p className="text-sm">Checking NFT eligibility...</p>
            </div>
          ) : nftMintData ? (
            <div>
              <div className="text-2xl text-green-400 mb-2">🎨 NFT Available!</div>
              <p className="text-white mb-2">
                Mint your <span className="font-bold text-yellow-400">{nftMintData.tier}</span> Pumpkin NFT!
              </p>
              <p className="text-xs text-gray-300 mb-3">
                Cost: {nftMintData.mintPriceEth} ETH on Base Network
              </p>
              {mintSuccess ? (
                <div className="text-green-400">
                  <div className="text-xl mb-1">✅ NFT Minted!</div>
                  <p className="text-xs">Check your wallet for your new Pumpkin NFT!</p>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    if (!nftMintData) return;
                    
                    setIsMinting(true);
                    try {
                      // Use Farcaster SDK's Ethereum provider
                      const provider = await sdk.wallet.getEthereumProvider();
                      
                      if (!provider) {
                        alert('Wallet provider not available');
                        setIsMinting(false);
                        return;
                      }
                      
                      // Request accounts (wallet connection)
                      const accounts = await provider.request({ 
                        method: 'eth_requestAccounts' 
                      }) as string[];
                      
                      if (accounts.length > 0) {
                        // Switch to Base network if needed
                        try {
                          await provider.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x2105' }], // Base chain ID (8453 in hex)
                          });
                        } catch (switchError: any) {
                          // Chain might not be added, ignore and continue
                          console.log('Network switch:', switchError);
                        }
                        
                        // Prepare transaction
                        const txParams = {
                          to: nftMintData.contractAddress as `0x${string}`,
                          from: accounts[0] as `0x${string}`,
                          value: `0x${BigInt(nftMintData.mintPrice).toString(16)}` as `0x${string}`,
                          data: nftMintData.mintData as `0x${string}`,
                          gas: '0x30D40' as `0x${string}`, // 200000 in hex
                        };
                        
                        // Send transaction
                        const txHash = await provider.request({
                          method: 'eth_sendTransaction',
                          params: [txParams],
                        });
                        
                        if (txHash) {
                          setMintSuccess(true);
                        }
                      }
                    } catch (error: any) {
                      console.error('Minting error:', error);
                      if (error.message?.includes('User rejected')) {
                        alert('Transaction cancelled');
                      } else {
                        alert('Failed to mint NFT. Please try again.');
                      }
                    } finally {
                      setIsMinting(false);
                    }
                  }}
                  disabled={isMinting}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-2 px-4 rounded-full text-sm shadow-lg transform transition-all hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isMinting ? '🔄 Minting...' : '🎨 Mint NFT'}
                </button>
              )}
            </div>
          ) : gameState.score >= 100 ? (
            <div className="text-yellow-400">
              <div className="text-xl mb-2">🎯 NFT Eligible!</div>
              <p className="text-xs text-gray-300">
                You scored {gameState.score} points - enough for an NFT! 
                Check back after deployment.
              </p>
            </div>
          ) : null}
        </div>
      )}

      {/* Share on Farcaster Button */}
      {gameState.timeLeft === 0 && gameState.score > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              const shareText = `🎃 Just scored ${gameState.score} points in Pumpkin Collector! I collected ${gameState.pumpkins} pumpkins and reached level ${gameState.level}! 🏆\n\nCan you beat my score? Play the game here:`;
              const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(window.location.origin)}`;
              window.open(shareUrl, '_blank');
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm shadow-lg transform transition-all hover:scale-105 active:scale-95 flex items-center justify-center mx-auto space-x-1"
          >
            <span>🐸</span>
            <span>Share on Farcaster</span>
            <span>📢</span>
          </button>
          <p className="text-xs text-gray-400 mt-1">
            Share your achievement and challenge your friends!
          </p>
        </div>
      )}
    </div>
  );
}