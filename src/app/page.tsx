import Image from "next/image";
import PumpkinGame from "@/components/PumpkinGame";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎃 Pumpkin Collector
          </h1>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            The spookiest collection game on Base Network! Collect magical pumpkins, 
            earn rewards, and mint exclusive Halloween NFTs.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="#game" 
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
            >
              🎮 Play Now
            </a>
            <a 
              href="#features" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              📖 Learn More
            </a>
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

      {/* How to Play Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            � How to Play
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">1️⃣</span>
                  <h3 className="text-xl font-bold text-orange-300">Start Playing</h3>
                </div>
                <p className="text-gray-300">
                  Click the "Start Game" button in the game section above. Watch as pumpkins fall from the sky!
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">2️⃣</span>
                  <h3 className="text-xl font-bold text-orange-300">Collect Pumpkins</h3>
                </div>
                <p className="text-gray-300">
                  Click on falling pumpkins to collect them. Each pumpkin gives you points!
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">3️⃣</span>
                  <h3 className="text-xl font-bold text-orange-300">Level Up</h3>
                </div>
                <p className="text-gray-300">
                  Reach score milestones to advance levels. Higher levels bring faster pumpkins and more points!
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">4️⃣</span>
                  <h3 className="text-xl font-bold text-orange-300">Beat the Clock</h3>
                </div>
                <p className="text-gray-300">
                  You have 60 seconds per game. Try to collect as many pumpkins as possible!
                </p>
              </div>
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
