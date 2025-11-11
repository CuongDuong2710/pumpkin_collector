import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./components/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Pumpkin Collector - Halloween Mini App",
  description: "Halloween collection game on Base Network - collect magical pumpkins and unlock rewards!",
  keywords: ["Halloween", "Pumpkins", "Base", "Mini App", "Collection", "Game"],
  authors: [{ name: "Pumpkin Collector Team" }],
  creator: "Base Community",
  publisher: "Vercel",
  robots: "index, follow",
  openGraph: {
    title: "Pumpkin Collector - Halloween Mini App",
    description: "Collect magical pumpkins in this spooky Halloween game on Base Network!",
    url: process.env.NEXT_PUBLIC_URL || 'https://your-domain.com',
    siteName: "Pumpkin Collector",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL || 'https://your-domain.com'}/pumpkin-og.png`,
        width: 1200,
        height: 630,
        alt: "Pumpkin Collector Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pumpkin Collector - Halloween Mini App",
    description: "Collect magical pumpkins in this spooky Halloween game!",
    images: [`${process.env.NEXT_PUBLIC_URL || 'https://your-domain.com'}/pumpkin-og.png`],
  },
  icons: {
    icon: "/pumpkin-icon.png",
    shortcut: "/pumpkin-icon.png",
    apple: "/pumpkin-icon.png",
  },
  other: {
    // Farcaster Frame metadata
    "fc:frame": "vNext",
    "fc:frame:image": `${process.env.NEXT_PUBLIC_URL || 'https://your-domain.com'}/pumpkin-og.png`,
    "fc:frame:button:1": "🎃 Collect Pumpkins",
    "fc:frame:post_url": process.env.NEXT_PUBLIC_URL || 'https://your-domain.com',
    "fc:frame:image:aspect_ratio": "1.91:1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased h-full`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
