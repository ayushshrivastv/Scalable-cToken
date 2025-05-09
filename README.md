# Scalable cToken Issuance via Solana Pay

A modern web application for creating and distributing compressed tokens on Solana blockchain using Solana Pay and Light Protocol's compression technology.

**[Scalable cToken Page](https://scalable-c-token-ayushshrivastvs-projects.vercel.app/)**

![Screenshot 2025-05-09 at 2 22 47 PM](https://github.com/user-attachments/assets/8b7532fd-1a86-4471-810d-b7e9b3484217)

## Overview

This project enables event organisers to mint digital proof-of-participation tokens that can be claimed by attendees through a simple scan of a QR code. These tokens are not just symbolic; they represent verifiable, compressed assets living entirely on-chain, making them ideal for airdrops, community rewards, or credentialing at scale.

Built for the ZK Compression Track of the Superteam x Solana 1000x Hackathon, this application demonstrates how real-world events can benefit from blockchain technology without compromising on speed, cost, or user experience.

## Functionality

Organisers can log in with their Solana wallet, create a new event, and instantly mint compressed tokens tied to event metadata such as name, time, and location. Upon creation, the system generates a Solana Pay-compatible QR code, which attendees can scan to securely claim their tokens via their own wallet. Each token is issued using Light Protocol's compression infrastructure, drastically reducing storage costs while maintaining full L1 composability.

The user interface is built to be intuitive across devices and accommodates both the event creator and attendee journeys—from minting to claiming—with minimal friction.

![Screenshot 2025-05-09 at 2 23 20 PM](https://github.com/user-attachments/assets/235a9be9-e4fa-46f9-989e-1b1ce8cda931)

![Screenshot 2025-05-09 at 2 23 34 PM](https://github.com/user-attachments/assets/0c9807e2-f345-4c51-b399-fb8932c9bcb1)

## Setup & Installation

To run this project locally, ensure you have Node.js 16 or later and a compatible Solana wallet (Phantom, Backpack, or Solflare). Clone the repository and install dependencies using:

```bash
git clone https://github.com/ayushshrivastv/Scalable-cToken.git
cd Scalable-cToken
npm install
```

Create a `.env.local` file in the root directory with the following environment variables:

```
NEXT_PUBLIC_CLUSTER=devnet
NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
```

Then start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000). Connect your wallet to begin creating or claiming tokens.

## Using the Application

To create tokens, connect your wallet and navigate to the "Create Event" section. Fill out the event information, confirm the transaction, and a QR code will be generated for distribution. Attendees can scan this QR code using any QR reader or camera app, which will launch Solana Pay and guide them through the token claim process in a few simple steps.

The process is secure, affordable, and designed for high-volume usage at real-world events.

## Technical Stack

This application is built with Next.js 15, React 18, and TypeScript, using Tailwind CSS and shadcn/ui for the frontend. Blockchain functionality is powered by Solana, with Light Protocol handling compression. Wallet interactions are handled via the Solana Wallet Adapter framework.

The architecture allows easy extensibility and is suitable for further enhancements such as event analytics, email confirmations, or token gating.

For more in-depth technical details, refer to the [src/README.md](./src/README.md) file.

## Development Scripts

```bash
npm run dev         # Run development server
npm run lint        # Check for code issues
npm run format      # Auto-format code
npm run build       # Build application for production
npm run start       # Start production server
```

## Deployment

The application is deployed on Vercel. To deploy your own version:

1. Push your code to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Add the required environment variables:
   - `NEXT_PUBLIC_CLUSTER` (e.g., `devnet`)
   - `NEXT_PUBLIC_RPC_ENDPOINT` (e.g., `https://api.devnet.solana.com`)

## License

This project is licensed under the MIT License and is open for extension, experimentation, and contribution.

## Special Thanks

Gratitude to the teams behind Light Protocol and Solana for their exceptional infrastructure and tools. Additional thanks to the developers of Next.js, the creators of shadcn/ui, and the broader Solana community for their ongoing support and innovation.

---

Crafted with care by Ayush Srivastava
