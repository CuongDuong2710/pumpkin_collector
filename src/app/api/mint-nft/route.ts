import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, createWalletClient, http, parseEther, encodeFunctionData } from 'viem';
import { base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// NFT Contract ABI (minimal for minting)
const NFT_CONTRACT_ABI = [
  {
    inputs: [
      { name: 'sessionId', type: 'bytes32' },
      { name: 'score', type: 'uint256' },
      { name: 'level', type: 'uint256' },
      { name: 'pumpkinsCollected', type: 'uint256' }
    ],
    name: 'mintPumpkinNFT',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ name: 'score', type: 'uint256' }],
    name: 'getTierForScore',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mintPrice',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

// Contract configuration
const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;
const BASE_RPC_URL = process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org';

// Create clients
const publicClient = createPublicClient({
  chain: base,
  transport: http(BASE_RPC_URL)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      playerAddress,
      gameSessionId,
      score,
      level,
      pumpkinsCollected,
      signature 
    } = body;

    // Validate required fields
    if (!playerAddress || !gameSessionId || score === undefined || level === undefined || pumpkinsCollected === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate contract address is configured
    if (!NFT_CONTRACT_ADDRESS) {
      return NextResponse.json(
        { success: false, error: 'NFT contract not configured' },
        { status: 500 }
      );
    }

    // Verify minimum score threshold (100 points for Bronze)
    if (score < 100) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Score too low for NFT minting',
          minimumScore: 100,
          currentScore: score
        },
        { status: 400 }
      );
    }

    // Get tier for the score
    const tier = await publicClient.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: NFT_CONTRACT_ABI,
      functionName: 'getTierForScore',
      args: [BigInt(score)]
    });

    // Get current mint price
    const mintPrice = await publicClient.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: NFT_CONTRACT_ABI,
      functionName: 'mintPrice'
    });

    // Create session ID hash (deterministic based on game data)
    const sessionHash = `0x${Buffer.from(gameSessionId).toString('hex').padStart(64, '0')}` as `0x${string}`;

    // Prepare mint transaction data
    const mintData = encodeFunctionData({
      abi: NFT_CONTRACT_ABI,
      functionName: 'mintPumpkinNFT',
      args: [
        sessionHash,
        BigInt(score),
        BigInt(level),
        BigInt(pumpkinsCollected)
      ]
    });

    // Return minting information for frontend to execute
    return NextResponse.json({
      success: true,
      data: {
        contractAddress: NFT_CONTRACT_ADDRESS,
        mintPrice: mintPrice.toString(),
        mintPriceEth: parseEther('0.001').toString(), // 0.001 ETH
        tier,
        score,
        level,
        pumpkinsCollected,
        sessionId: sessionHash,
        mintData,
        estimatedGas: '200000' // Estimated gas limit
      }
    });

  } catch (error) {
    console.error('NFT minting error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to prepare NFT mint',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const score = searchParams.get('score');

    if (!score) {
      return NextResponse.json(
        { success: false, error: 'Score parameter required' },
        { status: 400 }
      );
    }

    if (!NFT_CONTRACT_ADDRESS) {
      return NextResponse.json(
        { success: false, error: 'NFT contract not configured' },
        { status: 500 }
      );
    }

    // Get tier for the score
    const tier = await publicClient.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: NFT_CONTRACT_ABI,
      functionName: 'getTierForScore',
      args: [BigInt(score)]
    });

    // Get current mint price
    const mintPrice = await publicClient.readContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: NFT_CONTRACT_ABI,
      functionName: 'mintPrice'
    });

    return NextResponse.json({
      success: true,
      data: {
        score: parseInt(score),
        tier,
        mintPrice: mintPrice.toString(),
        mintPriceEth: '0.001',
        contractAddress: NFT_CONTRACT_ADDRESS,
        eligible: tier !== 'Ineligible',
        requirements: {
          bronze: 100,
          silver: 500,
          gold: 1000,
          legendary: 2000
        }
      }
    });

  } catch (error) {
    console.error('NFT info error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get NFT info',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}