import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "0";
  const pumpkins = searchParams.get("pumpkins") || "0";
  const score = searchParams.get("score") || "0";

  // Simple HTML-based image generation for now
  // In a real implementation, you'd use @vercel/og or canvas
  
  const html = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 40px;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: white;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .pumpkin { font-size: 72px; margin: 20px 0; }
          .title { font-size: 48px; color: #ff6b35; font-weight: bold; margin: 20px 0; }
          .description { font-size: 24px; max-width: 600px; line-height: 1.4; }
          .stats { font-size: 32px; margin: 30px 0; }
          .score { color: #ffa500; }
        </style>
      </head>
      <body>
        ${page === "0" ? `
          <div class="pumpkin">🎃</div>
          <div class="title">Pumpkin Collector</div>
          <div class="description">
            Welcome to the spookiest collection game on Base!<br>
            Start collecting magical pumpkins and earn rewards.
          </div>
          <div style="font-size: 20px; color: #ffa500; margin-top: 30px;">
            🌟 Powered by Base Network 🌟
          </div>
        ` : `
          <div class="title">🎃 Pumpkin Collection Game 🎃</div>
          <div style="display: flex; gap: 20px; margin: 40px 0;">
            ${Array.from({ length: Math.min(parseInt(pumpkins), 8) }, () => 
              '<span style="font-size: 60px;">🎃</span>'
            ).join('')}
          </div>
          <div class="stats">Pumpkins Collected: ${pumpkins}</div>
          <div class="stats score">Score: ${score} points</div>
          <div style="font-size: 20px; color: #888; margin-top: 40px;">
            Keep collecting to unlock special NFT rewards! 🏆
          </div>
        `}
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export const dynamic = "force-dynamic";