# 🎃 Pumpkin Collector - Farcaster Frame Mini App

A Halloween-themed collection game built as a Farcaster Frame on Base Network. Collect magical pumpkins, earn points, and mint exclusive NFTs in this spooky blockchain game!

![Pumpkin Collector](https://img.shields.io/badge/Frame-Farcaster-purple?style=for-the-badge&logo=farcaster)
![Base Network](https://img.shields.io/badge/Blockchain-Base-blue?style=for-the-badge&logo=ethereum)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🎮 About the Game

Pumpkin Collector is an interactive Farcaster Frame that brings the Halloween spirit to the decentralized social web. Players collect magical pumpkins through simple button interactions, with each collection session generating beautiful, dynamic images showcasing their progress.

### ✨ Key Features

- **🎃 Interactive Pumpkin Collection**: Click to collect magical pumpkins
- **🖼️ Dynamic Image Generation**: Beautiful, auto-generated game state images
- **⚡ Base Network Integration**: Fast, low-cost blockchain interactions
- **🎨 Modern UI/UX**: Responsive design with Tailwind CSS
- **🚀 Farcaster Frame**: Native integration with Farcaster ecosystem
- **🎁 NFT Rewards**: Future support for minting collectible pumpkin NFTs

## 🛠 Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### Blockchain & Web3
- **Base Network** - Ethereum L2 for fast, cheap transactions
- **Viem & Wagmi** - Ethereum interaction libraries
- **RainbowKit** - Beautiful wallet connection UI

### Frame Development
- **Farcaster Frames** - Native social media integration
- **@vercel/og** - Dynamic Open Graph image generation
- **Next.js API Routes** - Frame endpoint handling

## 🚀 Quick Start

### Prerequisites

- Node.js 20.17+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CuongDuong2710/pumpkin_collector.git
   cd pumpkin_collector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Farcaster Frame Configuration
   NEYNAR_API_KEY=your_neynar_api_key_here
   
   # Base Network Configuration
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   NEXT_PUBLIC_BASE_CHAIN_ID=8453
   
   # Application URLs
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   VERCEL_URL=
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Game Mechanics

### How to Play

1. **Cast the Frame**: Share the frame URL in a Farcaster cast
2. **Start Collecting**: Click "🎃 Start Collecting" to begin your pumpkin hunt
3. **Collect More**: Continue clicking to gather more magical pumpkins
4. **Check Progress**: View your collection count and score
5. **Claim Rewards**: Unlock NFT minting opportunities (coming soon)

### Scoring System

- **1 Pumpkin** = 10 points base score
- **Random Bonus**: Each collection gives 1-5 additional pumpkins
- **Progressive Difficulty**: More collections unlock rarer pumpkins
- **Leaderboard**: Compete with other players globally

## 🏗 Project Structure

```
pumpkin_collector/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── frame/          # Farcaster Frame endpoints
│   │   │   └── images/         # Dynamic image generation
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   └── components/             # Reusable React components
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🔧 API Endpoints

### `/api/frame`
- **GET**: Returns the initial frame HTML
- **POST**: Handles frame interactions and state management

### `/api/images`
- **GET**: Generates dynamic game state images
- **Query Parameters**:
  - `page`: Game page (0 = welcome, 1 = game)
  - `pumpkins`: Number of collected pumpkins
  - `score`: Current player score

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#ff6b35` - Pumpkin theme
- **Secondary Purple**: `#6366f1` - Mystical elements
- **Background Dark**: `#1a1a2e` - Halloween atmosphere
- **Accent Gold**: `#ffa500` - Rewards and highlights

### Typography
- **Headers**: Bold, large sizes for impact
- **Body Text**: Clean, readable fonts
- **UI Elements**: Consistent spacing and padding

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Configure Environment Variables**
   - Add all `.env.local` variables to Vercel dashboard
   - Update `VERCEL_URL` after deployment

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `.next` folder to Netlify
   - Or connect your GitHub repository

## 🔮 Future Features

### Phase 1 - Enhanced Gameplay
- [ ] Multiple pumpkin types with different rarities
- [ ] Achievement system with badges
- [ ] Daily challenges and quests
- [ ] Player profiles and statistics

### Phase 2 - NFT Integration
- [ ] Pumpkin NFT minting on Base
- [ ] Marketplace for trading pumpkins
- [ ] Special edition Halloween NFTs
- [ ] Staking mechanics for rewards

### Phase 3 - Social Features
- [ ] Guild system for team play
- [ ] Leaderboards and competitions
- [ ] Social sharing of collections
- [ ] Referral system with rewards

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all builds pass before submitting

## 🐛 Troubleshooting

### Common Issues

**Frame not loading**
- Check environment variables are set correctly
- Verify Vercel URL is configured properly
- Ensure all dependencies are installed

**Images not generating**
- Check the `/api/images` endpoint
- Verify query parameters are being passed
- Test image generation locally

**Build failures**
- Run `npm install` to update dependencies
- Check TypeScript errors with `npm run type-check`
- Ensure all environment variables are defined

### Getting Help

- Create an [Issue](https://github.com/CuongDuong2710/pumpkin_collector/issues)
- Join our Discord community
- Check the [Farcaster Frames documentation](https://docs.farcaster.xyz/learn/what-is-farcaster/frames)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- **Farcaster Team** - For the amazing Frames protocol
- **Base Network** - For the fast, affordable blockchain infrastructure
- **Vercel** - For excellent hosting and development tools
- **Halloween Spirit** - For the spooky inspiration! 🎃

## 📊 Stats

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel/Netlify ready
- **Blockchain**: Base Network compatible
- **Performance**: Optimized for fast loading

---

**Happy Halloween! 🎃 Start collecting your magical pumpkins today!**

*Built with ❤️ for the Farcaster and Base communities*
