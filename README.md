# Scalable cToken Issuance via Solana Pay

A modern web application for creating and distributing compressed tokens on Solana blockchain using Solana Pay and Light Protocol's compression technology.

![cToken Banner](./banner.png)


**[Scalable cToken App](https://scalable-c-token-ayushshrivastvs-projects.vercel.app/)**

## Project Overview

This application enables event organizers to create digital proof-of-participation tokens that can be distributed to attendees via QR codes. These tokens serve as digital mementos and can be claimed through Solana Pay integration.

### Key Features

- Compressed tokens using Light Protocol (significantly cheaper than traditional NFTs)
- Solana Pay integration for QR code-based token distribution
- Rich metadata support for event details
- Modern, responsive UI for both desktop and mobile

## Development Setup

### Prerequisites

- Node.js 16+
- npm
- A Solana wallet (Phantom, Backpack, or Solflare)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayushshrivastv/Scalable-cToken.git
   cd Scalable-cToken
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_CLUSTER=devnet
   NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Connect your Solana wallet to interact with the application

## Application Usage

### Creating Event Tokens

1. Connect your Solana wallet
2. Navigate to the "Create Event" page
3. Fill out the event details form
4. Click "Create Token"
5. Share the generated QR code with your attendees

### Claiming Tokens

1. Scan the QR code provided by the event organizer
2. Connect your Solana wallet
3. Click "Claim Token"

## Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI**: Tailwind CSS with shadcn/ui components
- **Blockchain**: Solana, Light Protocol for token compression
- **Wallets**: Solana Wallet Adapter

For detailed technical documentation, please see the [src/README.md](./src/README.md) file.

## Available Scripts

```bash
# Development server
npm run dev

# Lint and type check
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Start production server
npm run start
```

## Deployment

The application is currently deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/)
3. Set these environment variables:
   - `NEXT_PUBLIC_CLUSTER`: `devnet` or `mainnet-beta`
   - `NEXT_PUBLIC_RPC_ENDPOINT`: `https://api.devnet.solana.com`

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Light Protocol](https://lightprotocol.com/) for compression technology
- [Solana](https://solana.com/) for blockchain infrastructure
- [Next.js](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/)

---

Built by Ayush Srivastava
