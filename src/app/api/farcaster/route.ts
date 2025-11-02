// app/api/farcaster/route.ts
function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return !!value;
    })
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;
  return Response.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: withValidProperties({
      version: "1",
      name: "Pumpkin Collector",
      subtitle: "Halloween collection game",
      description: "Collect magical pumpkins in this spooky Halloween-themed mini game built on Base Network. Click to gather pumpkins and unlock rewards!",
      screenshotUrls: [],
      iconUrl: `${URL}/pumpkin-icon.png`,
      splashImageUrl: `${URL}/pumpkin-splash.png`,
      splashBackgroundColor: "#1a1a1a",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: "games",
      tags: ["halloween", "collection", "game", "pumpkins", "base"],
      heroImageUrl: `${URL}/pumpkin-hero.png`,
      tagline: "Collect spooky pumpkins!",
      ogTitle: "Pumpkin Collector",
      ogDescription: "Halloween collection game on Base Network - collect magical pumpkins and unlock rewards!",
      ogImageUrl: `${URL}/pumpkin-og.png`,
    }),
  });
}