'use client';

import { useEffect, useState } from 'react';
import PumpkinGame from '@/components/PumpkinGame';

export default function Home() {
  const [isReady, setIsReady] = useState(true); // Set to true immediately
  const [user, setUser] = useState<any>({
    fid: 0,
    username: 'guest',
    displayName: 'Guest Player'
  });

  useEffect(() => {
    // Try to detect if running in Farcaster context
    const checkFarcasterContext = async () => {
      try {
        // Check if we're in a Farcaster frame
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const fid = params.get('fid');
          const username = params.get('username');
          
          if (fid || username) {
            setUser({
              fid: fid ? parseInt(fid) : 0,
              username: username || 'guest',
              displayName: username || 'Guest Player'
            });
          }
        }
      } catch (error) {
        console.error('Failed to check Farcaster context:', error);
      }
    };

    checkFarcasterContext();
  }, []);

  const userFid = user?.fid ?? 0;
  const username = user?.username ?? 'guest';
  const pfpUrl = user?.pfpUrl;
  const displayName = user?.displayName ?? username;

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎃</div>
          <div className="text-white text-xl">Loading Pumpkin Collector...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 overflow-x-hidden">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-8 md:py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎃 Pumpkin Collector
          </h1>
          {user && (
            <div className="mb-4 flex items-center justify-center space-x-3">
              {pfpUrl && (
                <img 
                  src={pfpUrl} 
                  alt={displayName}
                  className="w-12 h-12 rounded-full border-2 border-white/50"
                />
              )}
              <div className="text-orange-100">
                <div className="font-semibold">Welcome, {displayName}!</div>
                <div className="text-sm opacity-75">@{username}</div>
              </div>
            </div>
          )}
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            The spookiest collection game on Base Network! Collect magical pumpkins, 
            earn rewards, and mint exclusive Halloween NFTs.
          </p>
          <div className="flex justify-center space-x-4 flex-wrap">
            <a 
              href="#game" 
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
            >
              🎮 Play Now
            </a>
            <button
              onClick={() => {
                const shareText = `🎃 Check out Pumpkin Collector - the spookiest collection game on Base Network! 🕸️\n\nCollect magical pumpkins, earn rewards, and compete for high scores! 🏆\n\nPlay now:`;
                const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(window.location.origin)}`;
                window.open(shareUrl, '_blank');
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors shadow-lg flex items-center space-x-2"
            >
              <span>🐸</span>
              <span>Share on Farcaster</span>
            </button>
          </div>
        </div>
      </header>

      {/* Interactive Game Section */}
      <section id="game" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            🎮 Play the Game Live!
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Experience the pumpkin collection game right here! Click falling pumpkins to collect them 
            and try to beat your high score. No wallet connection needed to play!
          </p>
          <PumpkinGame />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            🌟 Game Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center hover:bg-white/20 transition-colors">
              <div className="text-5xl mb-4">🎃</div>
              <h3 className="text-2xl font-bold text-orange-300 mb-4">Collect Pumpkins</h3>
              <p className="text-gray-300">
                Discover and collect magical pumpkins with unique properties and rarities.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center hover:bg-white/20 transition-colors">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-orange-300 mb-4">Earn Rewards</h3>
              <p className="text-gray-300">
                Complete challenges and earn points to unlock special rewards and NFTs.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center hover:bg-white/20 transition-colors">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-orange-300 mb-4">Mint NFTs</h3>
              <p className="text-gray-300">
                Turn your rare pumpkins into exclusive NFTs on the Base network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Base Network Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            ⚡ Powered by Base
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Built on Base, Coinbase&apos;s secure, low-cost, developer-friendly Ethereum L2. 
            Enjoy fast transactions and minimal fees while collecting your pumpkins!
          </p>
          <div className="flex justify-center space-x-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">⚡</div>
              <div className="text-white font-semibold">Fast</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">💰</div>
              <div className="text-white font-semibold">Low Cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">🔒</div>
              <div className="text-white font-semibold">Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="text-3xl mb-4">🎃</div>
          <p className="text-gray-400 mb-4">
            Pumpkin Collector - A Halloween-themed game on Base
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
              GitHub
            </a>
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
              Farcaster
            </a>
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
              Base
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
