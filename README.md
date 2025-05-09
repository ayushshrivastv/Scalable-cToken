# Scalable cToken Issuance via Solana Pay

A modern web application demonstrating scalable cToken (compressed token) issuance and distribution on the Solana blockchain using Solana Pay, powered by Light Protocol's state compression technology.

![cToken Banner](./banner.png)

## 🌟 Overview

cToken lets event organizers create digital proof-of-participation tokens that can be easily distributed to attendees via QR codes. These tokens serve as digital mementos and can be claimed through Solana Pay integration.

### Key Features

- **ZK Compression**: Mint compressed tokens that are orders of magnitude cheaper than traditional NFTs
- **Solana Pay QR Codes**: Easily distribute tokens to attendees with scannable QR codes  
- **Event Metadata**: Attach rich metadata including event details, date, location, and custom attributes
- **Apple-Inspired Design**: Clean, minimalist UI with smooth animations and transitions

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- Solana CLI tools (optional but recommended)
- A Solana wallet (like Phantom, Backpack, or Solflare)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cToken-POP.git
   cd cToken-POP/ctoken-pop
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the project root with the following:
   ```
   NEXT_PUBLIC_CLUSTER=devnet
   NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Usage

### Creating Event Tokens

1. Connect your Solana wallet
2. Navigate to the "Create Event Token" page
3. Fill out the event details form:
   - Event name
   - Token symbol
   - Description
   - Location
   - Date
   - Image URL
   - Token supply
4. Click "Create Token"
5. Wait for the token to be created and minted
6. Use the generated QR code to distribute to your attendees

### Claiming Tokens

1. Scan the QR code provided by the event organizer
2. Connect your Solana wallet
3. Click "Claim Token"
4. The token will be transferred to your wallet

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Solana, Light Protocol
- **Wallets**: Solana Wallet Adapter
- **Token Standards**: Token 2022 Program
- **Compression**: Light Protocol state compression

## 🔒 Security Notes

- **Important**: This demo application uses generated keypairs for testing purposes. In a production environment, you should:
  - Never expose private keys in client-side code
  - Implement proper wallet authentication
  - Use a secure backend for sensitive operations
  - Consider using a custodial solution or multisig for enhanced security

## 📱 Mobile Support

The application is fully responsive and works on all device sizes, with special optimizations for mobile experiences.

## 🔍 Implementation Details

### Compressed Tokens

This project uses Light Protocol's state compression technology to significantly reduce the cost of minting and transferring tokens on Solana. Compressed tokens work by:

1. Storing token data in a compressed state tree
2. Using zero-knowledge proofs to verify ownership and transfers
3. Reducing on-chain storage requirements by up to 99%

### Solana Pay Integration

The QR code generator creates Solana Pay compatible URLs that:

1. Specify the token to be transferred
2. Include a memo with event information
3. Generate a unique reference for transaction tracking
4. Link directly to the claim interface when scanned

## 🧪 Test Scripts

This project utilizes Biome for code formatting and linting, and TypeScript for static type checking. Ensure you have `bun` installed if you plan to use `bunx` directly, otherwise `npm` or `yarn` will execute the scripts as defined.

- **Lint and Type Check Code:**
  ```bash
  npm run lint
  # or
  yarn lint
  ```
  This command runs Biome to lint and automatically fix issues where possible, followed by a TypeScript compile check (`tsc --noEmit`) to catch any type errors.

- **Format Code:**
  ```bash
  npm run format
  # or
  yarn format
  ```
  This command uses Biome to format the entire codebase according to the project's style guidelines.

- **Build for Production:**
  ```bash
  npm run build
  # or
  yarn build
  ```
  This command compiles the Next.js application for production deployment.

- **Start Production Server Locally:**
  ```bash
  npm run start
  # or
  yarn start
  ```
  After building the project, use this command to start the Next.js production server locally. This is useful for testing the production build before deployment.

## 🚀 Deployment

This Next.js application can be deployed to various platforms. Vercel (from the creators of Next.js) is a highly recommended platform for deploying Next.js applications due to its seamless integration and optimization for the framework.

### Deploying with Vercel

1.  **Push to a Git Repository**: Ensure your project code is pushed to a GitHub, GitLab, or Bitbucket repository.
2.  **Sign up/Log in to Vercel**: Go to [vercel.com](https://vercel.com/) and create an account or log in.
3.  **Import Project**:
    *   From your Vercel dashboard, click on "Add New..." -> "Project".
    *   Connect Vercel to your Git provider and import the repository containing this project.
4.  **Configure Project**:
    *   Vercel will typically auto-detect that it's a Next.js project and configure the build settings correctly (Framework Preset: Next.js, Build Command: `npm run build` or `yarn build`, Output Directory: `.next`).
    *   **Environment Variables**: Add the necessary environment variables to your Vercel project settings (Project -> Settings -> Environment Variables). You will need to set:
        *   `NEXT_PUBLIC_CLUSTER`: (e.g., `devnet`, `mainnet-beta`)
        *   `NEXT_PUBLIC_RPC_ENDPOINT`: (e.g., `https://api.devnet.solana.com`)
5.  **Deploy**: Click the "Deploy" button. Vercel will build and deploy your application, providing you with a live URL.

### Other Platforms

You can also deploy this application to other platforms that support Node.js, such as:
- Netlify
- AWS Amplify
- Google Cloud Run
- Heroku
- A traditional Node.js server (e.g., using PM2)

For these platforms, you'll generally need to configure the build command (`npm run build` or `yarn build`) and ensure the server can serve the Next.js application (typically by running `npm run start` or `yarn start` after building).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Light Protocol](https://lightprotocol.com/) for state compression technology
- [Solana](https://solana.com/) for the blockchain infrastructure
- [Next.js](https://nextjs.org/) for the React framework
- [shadcn/ui](https://ui.shadcn.com/) for UI components
