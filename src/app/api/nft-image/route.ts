import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const tier = searchParams.get('tier') || 'bronze';

    const tiers: Record<string, any> = {
      bronze: { name: 'Bronze Pumpkin', color: '#CD7F32', bg: '#8B4513' },
      silver: { name: 'Silver Pumpkin', color: '#C0C0C0', bg: '#708090' },
      gold: { name: 'Gold Pumpkin', color: '#FFD700', bg: '#B8860B' },
      legendary: { name: 'Legendary Pumpkin', color: '#9932CC', bg: '#4B0082' },
    };

    const tierData = tiers[tier] || tiers.bronze;

    const svg = `
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${tierData.bg};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <rect width="400" height="400" fill="url(#bg)" />
        
        <text x="30" y="40" font-size="20" fill="white" opacity="0.6">✨</text>
        <text x="350" y="80" font-size="16" fill="white" opacity="0.6">⭐</text>
        <text x="50" y="350" font-size="18" fill="white" opacity="0.6">🌟</text>
        
        <text x="200" y="220" font-size="100" text-anchor="middle" fill="${tierData.color}">🎃</text>
        
        <text x="200" y="270" font-size="24" font-weight="bold" text-anchor="middle" fill="${tierData.color}">${tierData.name}</text>
        
        <rect x="120" y="300" width="160" height="30" rx="15" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)"/>
        <text x="200" y="320" font-size="14" font-weight="bold" text-anchor="middle" fill="#0052FF">Base Network NFT</text>
        
        <text x="370" y="25" font-size="12" font-weight="bold" text-anchor="middle" fill="${tierData.color}" opacity="0.8">#${tier.toUpperCase()}</text>
      </svg>
    `;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error generating NFT image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
