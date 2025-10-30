# Pumpkin Collector - Farcaster Frame Mini App

This is a Halloween-themed collection game built as a Farcaster Frame on Base Network. Players collect magical pumpkins through interactive button clicks, with beautiful dynamic image generation and future NFT integration.

## Project Overview

- **Framework**: Next.js 16 with App Router and TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Blockchain**: Base Network integration with Web3 libraries
- **Frame**: Farcaster Frame protocol implementation
- **Deployment**: Optimized for Vercel/Netlify deployment

## Key Features

- Interactive pumpkin collection game
- Dynamic Open Graph image generation
- Farcaster Frame native integration
- Base Network blockchain connectivity
- Modern responsive UI with Halloween theme
- Future NFT minting capabilities

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Run TypeScript checks

## Architecture

- `/src/app/api/frame/` - Farcaster Frame endpoints
- `/src/app/api/images/` - Dynamic image generation
- `/src/app/page.tsx` - Landing page component
- `/src/components/` - Reusable React components (future)

## Environment Setup

Required environment variables:
- `NEYNAR_API_KEY` - Farcaster API integration
- `NEXT_PUBLIC_BASE_RPC_URL` - Base network RPC
- `NEXT_PUBLIC_BASE_CHAIN_ID` - Base network chain ID
- `VERCEL_URL` - Deployment URL for frames

## Deployment

The project is configured for easy deployment to:
- Vercel (recommended for Next.js projects)
- Netlify (alternative hosting option)

Both platforms support automatic deployments from GitHub with proper environment variable configuration.