# 🎃 NFT Smart Contract Deployment Guide

Your Pumpkin Collector now has a complete NFT reward system! Follow these steps to deploy and integrate the smart contract.

## ✅ What's Already Complete

- ✅ **Smart Contract**: PumpkinCollectorNFT.sol with 4 tiers (Bronze/Silver/Gold/Legendary)
- ✅ **Game Integration**: NFT minting UI in PumpkinGame.tsx
- ✅ **API Endpoints**: /api/mint-nft for contract interaction
- ✅ **Dependencies**: All packages installed and compiled successfully
- ✅ **Build Test**: Next.js app builds without conflicts

## 🚀 Next Steps to Deploy

### Step 1: Get Your Private Key & API Keys

1. **Export Private Key from MetaMask**:
   - Open MetaMask → Account Details → Export Private Key
   - **⚠️ IMPORTANT**: Never share this key or commit to Git!

2. **Get BaseScan API Key** (for verification):
   - Visit: https://basescan.org/apis
   - Sign up and get your free API key

### Step 2: Update Environment Variables

Add to your `.env.local` file:

```bash
# Your existing variables...
NEXT_PUBLIC_APP_URL=https://pumpkin-collector.vercel.app/
NEXT_PUBLIC_CDP_API_KEY=ae51339e-6fbc-4238-80ce-686984b198f2

# Base Network Configuration  
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_CHAIN_ID=8453

# Smart Contract Deployment (ADD THESE)
PRIVATE_KEY=your_private_key_here_without_0x_prefix
BASESCAN_API_KEY=your_basescan_api_key_here
```

### Step 3: Deploy to Base Sepolia (Testnet) First

1. **Get Testnet ETH**:
   - Visit: https://www.alchemy.com/faucets/base-sepolia
   - Get free Base Sepolia ETH for testing

2. **Deploy to Testnet**:
   ```bash
   npm run deploy:base-sepolia
   ```

3. **Expected Output**:
   ```
   🎃 Deploying PumpkinCollectorNFT to Base network...
   ✅ PumpkinCollectorNFT deployed to: 0x1234567890123456789012345678901234567890
   🔗 View on BaseScan: https://sepolia.basescan.org/address/0x1234...
   
   📋 Contract Details:
   Name: Pumpkin Collector NFT
   Symbol: PUMPKIN
   Mint Price: 0.001 ETH
   
   💾 Save this contract address to your environment variables:
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
   ```

### Step 4: Test the Complete Flow

1. **Add Contract Address to .env**:
   ```bash
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x_your_deployed_contract_address
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Test Game → NFT Flow**:
   - Play the game and score 100+ points
   - See NFT eligibility notification
   - Connect MetaMask to Base Sepolia
   - Mint your test NFT!

### Step 5: Deploy to Base Mainnet (Production)

⚠️ **Only after testing works perfectly!**

1. **Get Real ETH on Base**:
   - Bridge ETH from Ethereum mainnet to Base
   - Or buy ETH directly on Base via Coinbase

2. **Deploy to Mainnet**:
   ```bash
   npm run deploy:base
   ```

3. **Update Production Environment**:
   ```bash
   # Update your Vercel environment variables
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x_your_mainnet_contract_address
   ```

## 🎯 How the NFT System Works

### **Game Scoring → NFT Tiers**:
- 🥉 **Bronze**: 100-499 points (0.001 ETH)
- 🥈 **Silver**: 500-999 points (0.001 ETH)  
- 🥇 **Gold**: 1000-1999 points (0.001 ETH)
- 🏆 **Legendary**: 2000+ points (0.001 ETH)

### **Player Flow**:
1. Player finishes game with score ≥ 100
2. Game automatically checks NFT eligibility via API
3. Player sees their earned tier (Bronze/Silver/Gold/Legendary) 
4. One-click minting with MetaMask
5. NFT appears in player's wallet

### **Anti-Cheat Features**:
- Unique session IDs prevent duplicate minting
- Server-side score verification
- Rate limiting (max 10 NFTs per wallet)
- Session validation

## 📊 Expected Costs

### **Base Sepolia (Testnet)**:
- Deployment: Free (testnet ETH)
- NFT Minting: Free (testnet ETH)

### **Base Mainnet**:
- Deployment: ~$15-20 USD
- Per NFT Mint: ~$0.001 ETH + gas (~$1-2 total)

## 🛠 Commands Reference

```bash
# Smart contract commands
npm run compile           # Compile contracts
npm run deploy:base-sepolia  # Deploy to testnet  
npm run deploy:base      # Deploy to mainnet

# App commands
npm run dev              # Start development
npm run build            # Build production
npm start                # Start production server
```

## 🔧 Troubleshooting

### **Contract won't deploy**:
- Check private key is set correctly (no 0x prefix)
- Ensure sufficient ETH balance for gas
- Verify RPC URL is working

### **Minting fails in game**:
- Check contract address is set in environment
- Verify Base network selected in MetaMask
- Ensure sufficient ETH for gas + mint price

### **Build errors**:
- Smart contract files are excluded from Next.js build
- Use `npm run compile` for contract-only compilation

## 🎉 Ready to Launch!

Your NFT system is ready! After testing on Base Sepolia:

1. ✅ Deploy to Base mainnet
2. ✅ Update production environment variables  
3. ✅ Deploy to Vercel with new contract address
4. ✅ Announce NFT rewards to your community!

Players can now earn exclusive Halloween pumpkin NFTs based on their game performance. The better they play, the rarer their NFT! 🎃✨

---

**Need help?** Create an issue in the repository or check the contracts/README.md for detailed technical documentation.