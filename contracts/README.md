# 🎃 Pumpkin Collector NFT Smart Contract

This directory contains the smart contract implementation for minting NFTs after completing the Pumpkin Collector game.

## Contract Features

### 🎯 **NFT Tiers Based on Score**
- **Bronze** (100+ points): Basic pumpkin NFT
- **Silver** (500+ points): Rare silver pumpkin NFT  
- **Gold** (1000+ points): Epic gold pumpkin NFT
- **Legendary** (2000+ points): Ultra-rare legendary pumpkin NFT

### ⚡ **Game Integration**
- Players can mint NFTs after finishing games with qualifying scores
- Each game session generates a unique session ID to prevent duplicate minting
- Anti-cheat protection with server-side score verification
- Maximum 10 NFTs per wallet address

### 💎 **Contract Specifications**
- **Standard**: ERC-721 (NFT)
- **Network**: Base (Chain ID: 8453)
- **Mint Price**: 0.001 ETH
- **Gas Optimized**: ~200,000 gas per mint
- **Metadata**: Dynamic JSON metadata for each tier

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.contract.example .env.local
```

Edit `.env.local` and add:
- `PRIVATE_KEY`: Your wallet private key for deployment
- `BASESCAN_API_KEY`: For contract verification
- `NEXT_PUBLIC_BASE_RPC_URL`: Base network RPC URL

### 3. Compile Contract
```bash
npm run compile
```

### 4. Deploy to Base Sepolia (Testnet)
```bash
npm run deploy:base-sepolia
```

### 5. Deploy to Base Mainnet
```bash
npm run deploy:base
```

### 6. Update Environment Variables
After deployment, add the contract address to your `.env.local`:
```bash
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
```

## Contract Interaction

### Minting NFTs

Players can mint NFTs through the game interface after achieving qualifying scores. The minting process:

1. **Game Completion**: Player finishes game with score ≥ 100
2. **Eligibility Check**: Frontend calls `/api/mint-nft?score={score}`
3. **Wallet Connection**: Player connects MetaMask or compatible wallet
4. **Network Switch**: Automatically switch to Base network
5. **Transaction**: Execute mint transaction with game data
6. **Confirmation**: NFT appears in player's wallet

### API Endpoints

#### `GET /api/mint-nft?score={score}`
Check NFT eligibility and get tier information.

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 1500,
    "tier": "Gold",
    "mintPrice": "1000000000000000",
    "mintPriceEth": "0.001",
    "eligible": true,
    "contractAddress": "0x...",
    "requirements": {
      "bronze": 100,
      "silver": 500,
      "gold": 1000,
      "legendary": 2000
    }
  }
}
```

#### `POST /api/mint-nft`
Prepare minting transaction data.

**Request:**
```json
{
  "playerAddress": "0x...",
  "gameSessionId": "game_1699123456789_abc123",
  "score": 1500,
  "level": 5,
  "pumpkinsCollected": 45
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "contractAddress": "0x...",
    "mintPrice": "1000000000000000",
    "tier": "Gold",
    "sessionId": "0x...",
    "mintData": "0x...",
    "estimatedGas": "200000"
  }
}
```

## Contract Functions

### Public Functions

#### `mintPumpkinNFT(sessionId, score, level, pumpkinsCollected)`
Main minting function for players.
- **Cost**: 0.001 ETH
- **Requirements**: Score ≥ 100, unique session ID
- **Emits**: `PumpkinMinted` event

#### `getTierForScore(score)`
Returns NFT tier name for a given score.

#### `getTierRequirements()`
Returns score thresholds for all tiers.

### Owner Functions

#### `batchMint(recipients, tiers)`
Mint multiple NFTs for special events (owner only).

#### `updateMetadataURI(tier, newURI)`
Update metadata URI for specific tier (owner only).

#### `updateMintPrice(newPrice)`
Update minting cost (owner only).

#### `withdraw()`
Withdraw contract balance (owner only).

## Metadata Structure

Each NFT tier has dedicated metadata with unique artwork:

```json
{
  "name": "Gold Pumpkin Collector #123",
  "description": "A magical golden pumpkin earned by scoring 1000+ points in Pumpkin Collector game. This NFT represents exceptional skill in the Halloween harvest!",
  "image": "https://your-domain.com/images/gold-pumpkin.png",
  "attributes": [
    {
      "trait_type": "Tier",
      "value": "Gold"
    },
    {
      "trait_type": "Score Range",
      "value": "1000-1999"
    },
    {
      "trait_type": "Game",
      "value": "Pumpkin Collector"
    },
    {
      "trait_type": "Network",
      "value": "Base"
    }
  ]
}
```

## Security Features

### Anti-Cheat Protection
- **Session Verification**: Each game generates unique session ID
- **Score Validation**: Server-side score verification before minting
- **Rate Limiting**: Maximum 10 NFTs per wallet address
- **Reentrancy Protection**: OpenZeppelin ReentrancyGuard

### Access Control
- **Owner-only Functions**: Critical functions restricted to contract owner
- **Signature Verification**: Future implementation for enhanced security
- **Emergency Pause**: Contract can be paused if needed

## Gas Optimization

The contract is optimized for low gas usage:
- **Efficient Storage**: Minimal state variables
- **Batch Operations**: Support for batch minting
- **OpenZeppelin Libraries**: Battle-tested, gas-optimized code
- **Counter Library**: Efficient token ID management

## Deployment Costs

### Base Network (Mainnet)
- **Deployment**: ~$10-15 USD
- **Per Mint**: ~$0.50-1.00 USD
- **Verification**: Free on BaseScan

### Base Sepolia (Testnet)
- **Deployment**: Free (testnet ETH)
- **Per Mint**: Free (testnet ETH)
- **Testing**: Unlimited

## Verification

After deployment, verify your contract on BaseScan:

```bash
npx hardhat verify --network base DEPLOYED_CONTRACT_ADDRESS "INITIAL_OWNER_ADDRESS"
```

## Troubleshooting

### Common Issues

**Contract not deploying**
- Check private key is set correctly
- Ensure sufficient ETH balance for gas
- Verify RPC URL is working

**Minting fails**
- Check contract address is set in environment
- Verify Base network is selected in wallet
- Ensure sufficient ETH for gas + mint price

**Metadata not loading**
- Update metadata URIs in contract
- Check image URLs are accessible
- Verify JSON structure is valid

## Future Enhancements

### Phase 1
- [ ] Dynamic metadata based on score
- [ ] Special edition seasonal NFTs
- [ ] Staking mechanics for rewards

### Phase 2  
- [ ] NFT marketplace integration
- [ ] Cross-chain bridge to other networks
- [ ] Governance token for holders

### Phase 3
- [ ] 3D animated NFTs
- [ ] Augmented reality features
- [ ] Integration with other games

## Support

For contract-related issues:
1. Check the troubleshooting section
2. Review BaseScan transaction details
3. Create an issue in the repository
4. Join our Discord for live support

---

**Built with ❤️ for the Farcaster and Base communities**