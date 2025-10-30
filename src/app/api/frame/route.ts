import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Pumpkin Collector</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/api/images?page=0&pumpkins=0&score=0" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="🎃 Start Collecting" />
        <meta property="fc:frame:button:2" content="🔗 View Code" />
        <meta property="fc:frame:button:2:action" content="link" />
        <meta property="fc:frame:button:2:target" content="https://github.com/CuongDuong2710/pumpkin_collector" />
      </head>
      <body>
        <div>Pumpkin Collector Frame</div>
      </body>
    </html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Handle frame interactions
  const body = await req.json();
  
  let state = {
    page: 0,
    pumpkins: 0,
    score: 0,
  };

  // Simple game logic without complex frame validation for now
  if (body.untrustedData?.buttonIndex === 1) {
    // Start collecting pumpkins
    state.page = 1;
    state.pumpkins = Math.floor(Math.random() * 5) + 1;
    state.score += 10;
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const imageUrl = `${baseUrl}/api/images?page=${state.page}&pumpkins=${state.pumpkins}&score=${state.score}`;

  if (state.page === 0) {
    // Welcome page
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Pumpkin Collector</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${imageUrl}" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="🎃 Start Collecting" />
          <meta property="fc:frame:button:2" content="🔗 View Code" />
          <meta property="fc:frame:button:2:action" content="link" />
          <meta property="fc:frame:button:2:target" content="https://github.com/CuongDuong2710/pumpkin_collector" />
        </head>
        <body>
          <div>Pumpkin Collector Frame</div>
        </body>
      </html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } else {
    // Game page
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Pumpkin Collector</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${imageUrl}" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="🎃 Collect More" />
          <meta property="fc:frame:button:2" content="🏆 Check Score" />
          <meta property="fc:frame:button:3" content="🔄 Reset Game" />
          <meta property="fc:frame:button:4" content="🎁 Claim NFT" />
        </head>
        <body>
          <div>Pumpkin Collector Game</div>
        </body>
      </html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  }
}

export const dynamic = "force-dynamic";