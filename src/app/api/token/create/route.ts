/**
 * @file route.ts
 * @description Server-side API endpoint for creating compressed tokens
 * This endpoint handles the token creation process securely on the server
 * without exposing private keys to the client
 */

import { NextRequest, NextResponse } from 'next/server';
import { Keypair, PublicKey } from '@solana/web3.js';
import { createConnection, createCompressedTokenMint, mintCompressedTokens } from '@/lib/utils/solana';
import { DEFAULT_TOKEN_DECIMALS } from '@/lib/constants';
import type { MintFormData } from '@/lib/types';

// Load environment variables
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;
const RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC_ENDPOINT || 'https://api.devnet.solana.com';
const CLUSTER = (process.env.NEXT_PUBLIC_CLUSTER as 'devnet' | 'mainnet-beta' | 'testnet' | 'localnet') || 'devnet';

/**
 * POST handler for token creation
 * Receives token data from the client and processes it securely on the server
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json() as {
      mintData: MintFormData;
      destinationWallet: string;
    };
    
    const { mintData, destinationWallet } = data;
    
    // Validate required data
    if (!mintData || !destinationWallet) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }
    
    // For demo purposes, we'll use a server-side keypair
    // In production, this would be securely stored in environment variables
    // or a key management system
    let adminKeypair: Keypair;
    
    try {
      if (ADMIN_PRIVATE_KEY) {
        // Try parsing as comma-separated numbers first
        try {
          const privateKeyArray = ADMIN_PRIVATE_KEY.split(',').map(Number);
          // Check if the array has valid numbers (not NaN)
          if (privateKeyArray.some(isNaN)) throw new Error('Invalid private key format');
          adminKeypair = Keypair.fromSecretKey(Buffer.from(privateKeyArray));
        } catch (e) {
          // If that fails, try parsing as a base58 encoded string
          console.log('Trying alternative private key format...');
          adminKeypair = Keypair.fromSecretKey(Buffer.from(ADMIN_PRIVATE_KEY, 'base64'));
        }
      } else {
        // Fallback for demo - generate a new keypair
        console.log('No admin private key found, generating a new keypair for demo purposes');
        adminKeypair = Keypair.generate();
      }
      
      console.log('Admin public key:', adminKeypair.publicKey.toBase58());
    } catch (error) {
      console.error('Error parsing admin private key:', error);
      // Generate a new keypair as fallback
      console.log('Falling back to generated keypair');
      adminKeypair = Keypair.generate();
    }
    
    // Parse the destination wallet public key
    const destinationPublicKey = new PublicKey(destinationWallet);
    
    // Create a connection to the Solana network
    const connection = createConnection({
      rpcEndpoint: RPC_ENDPOINT,
      cluster: CLUSTER
    });
    
    // Add priority fee to ensure transaction goes through with limited funds
    const recentBlockhash = await connection.getLatestBlockhash('confirmed');
    const priorityFee = {
      computeUnitPrice: 1000, // Adjust as needed, lower values use less SOL
      computeUnitLimit: 200000, // Adjust as needed, lower values use less SOL
    };
    console.log("Setting priority fee:", priorityFee);
    
    console.log("Creating compressed token mint on server side...");
    
    // 1. Create the compressed token mint
    const { mint, signature: createSignature } = await createCompressedTokenMint(
      connection,
      adminKeypair, // Server-side admin keypair
      destinationPublicKey, // The user's wallet as mint authority
      mintData.decimals || DEFAULT_TOKEN_DECIMALS,
      mintData.tokenMetadata.name,
      mintData.tokenMetadata.symbol,
      mintData.tokenMetadata.image || "https://arweave.net/placeholder",
    );
    
    console.log("Token mint created with address:", mint.toBase58());
    console.log("Creation signature:", createSignature);
    
    // 2. Mint tokens to the user's wallet
    console.log("Minting tokens to user wallet...");
    const { signature: mintSignature } = await mintCompressedTokens(
      connection,
      adminKeypair, // Server-side admin keypair
      mint, // Mint address
      destinationPublicKey, // Destination (user's wallet)
      adminKeypair, // Mint authority (server-side)
      mintData.supply, // Amount to mint
    );
    
    console.log("Tokens minted successfully, signature:", mintSignature);
    
    // Return the success response with mint information
    return NextResponse.json({
      success: true,
      mint: mint.toBase58(),
      createSignature,
      mintSignature,
      supply: mintData.supply,
      tokenName: mintData.tokenMetadata.name,
      tokenSymbol: mintData.tokenMetadata.symbol,
    });
    
  } catch (error) {
    console.error("Error in token creation API:", error);
    
    // Extract detailed error information
    let errorMessage = 'Token creation failed';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for specific Solana transaction errors
      if (error.message.includes('Transaction signature verification failure')) {
        errorDetails = 'This may be due to an invalid admin keypair or insufficient funds. Please check your environment variables and wallet balance.';
      } else if (error.message.includes('Simulation failed')) {
        errorDetails = 'The transaction simulation failed. This could be due to program constraints or invalid parameters.';
      } else if (error.message.includes('blockhash')) {
        errorDetails = 'Recent blockhash error. The transaction may have expired. Please try again.';
      } else if (error.message.includes('0x1')) {
        errorDetails = 'Insufficient funds to pay for transaction fees. Please add SOL to the admin wallet.';
      }
      
      // Include stack trace in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Stack trace:', error.stack);
      }
    } else {
      errorDetails = String(error);
    }
    
    // Return a detailed error response
    return NextResponse.json(
      { 
        error: errorMessage, 
        details: errorDetails || String(error),
        success: false
      },
      { status: 500 }
    );
  }
}
