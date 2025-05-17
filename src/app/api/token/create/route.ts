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
        console.log('ADMIN_PRIVATE_KEY found in environment variables');
        
        // Try parsing as base64 first (the format used by setup-dev-environment.js)
        try {
          console.log('Attempting to parse admin private key from base64 format...');
          const secretKeyUint8Array = Buffer.from(ADMIN_PRIVATE_KEY, 'base64');
          console.log(`Decoded key length: ${secretKeyUint8Array.length} bytes`);
          
          // Validate the key length (Solana keypairs should be 64 bytes)
          if (secretKeyUint8Array.length !== 64) {
            console.warn(`Warning: Decoded key length (${secretKeyUint8Array.length}) is not the expected 64 bytes`);
          }
          
          adminKeypair = Keypair.fromSecretKey(secretKeyUint8Array);
          console.log('Successfully parsed admin keypair from base64');
        } catch (e) {
          console.error('Base64 parsing error:', e);
          
          // If that fails, try parsing as comma-separated numbers
          console.log('Trying comma-separated format as fallback...');
          try {
            const privateKeyArray = ADMIN_PRIVATE_KEY.split(',').map(Number);
            // Check if the array has valid numbers (not NaN)
            if (privateKeyArray.some(isNaN)) {
              console.error('Invalid private key format: contains non-numeric values');
              throw new Error('Invalid private key format');
            }
            
            adminKeypair = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));
            console.log('Successfully parsed admin keypair from comma-separated numbers');
          } catch (innerError) {
            console.error('All parsing methods failed:', innerError);
            throw new Error(`Failed to parse admin private key: ${e instanceof Error ? e.message : 'Unknown error'}, then: ${innerError instanceof Error ? innerError.message : 'Unknown error'}`);
          }
        }
      } else {
        // Fallback for demo - generate a new keypair
        console.log('No admin private key found, generating a new keypair for demo purposes');
        adminKeypair = Keypair.generate();
      }
      
      // Mask the public key for security
      const publicKeyBase58 = adminKeypair.publicKey.toBase58();
      const maskedKey = publicKeyBase58.substring(0, 4) + '...' + publicKeyBase58.substring(publicKeyBase58.length - 4);
      console.log('Admin keypair loaded [masked key:', maskedKey + ']');
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
    // Set a higher priority fee for faster processing
    const priorityFee = {
      computeUnitPrice: 5000, // Micro-lamports per compute unit (increased from 1000)
      computeUnitLimit: 300000, // Maximum compute units for the transaction (increased from 200000)
    };
    // Note: Priority fee is applied within the createCompressedTokenMint function
    console.log("Setting priority fee:", priorityFee);
    
    console.log("Creating compressed token mint on server side...");
    console.log("Mint Parameters:");
    console.log("  Payer (Admin):", adminKeypair.publicKey.toBase58());
    console.log("  Mint Authority (Admin):", adminKeypair.publicKey.toBase58());
    console.log("  Decimals:", mintData.decimals || DEFAULT_TOKEN_DECIMALS);
    
    const { name, symbol, image } = mintData.tokenMetadata;
    const tokenName = name ? name.trim() : 'Default Token Name';
    const tokenSymbol = symbol ? symbol.trim() : 'DEFAULT';
    // FORCE USING A KNOWN-GOOD JSON METADATA URI FOR TESTING
    const tokenMetadataUri = 'https://arweave.net/TCefB73555sZDrqmX7Y59cUS43h3WQXMZ54u1DK3W8A'; 
    
    console.log("  Token Name:", tokenName); 
    console.log("  Token Symbol:", tokenSymbol); 
    console.log("  Image/Metadata URI:", tokenMetadataUri); 
    
    // 1. Create the compressed token mint
    const { mint, signature: createSignature } = await createCompressedTokenMint(
      connection,
      adminKeypair, // Server-side admin keypair as payer
      adminKeypair.publicKey, // Server-side admin keypair as mint authority
      mintData.decimals || DEFAULT_TOKEN_DECIMALS,
      tokenName, 
      tokenSymbol, 
      tokenMetadataUri, 
    );
    
    console.log("Token mint created with address:", mint.toBase58());
    console.log("Creation signature:", createSignature);
    
    // 2. Mint tokens to the user's wallet
    console.log("Minting tokens to user wallet...");
    console.log("Minting Parameters:");
    console.log("  Payer (Admin):", adminKeypair.publicKey.toBase58());
    console.log("  Mint Address:", mint.toBase58());
    console.log("  Destination Wallet:", destinationPublicKey.toBase58());
    console.log("  Mint Authority (Admin):", adminKeypair.publicKey.toBase58());
    console.log("  Supply:", mintData.supply);

    // 2. Mint tokens to the user's wallet
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
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
    });
    
  } catch (error) {
    console.error("Error in token creation API:", error);
    
    let errorDetails = "Token creation failed";
    if (error instanceof Error) {
      errorDetails = error.message;
      // If the error object has more specific Solana transaction error details
      if ('transactionMessage' in error && (error as any).transactionMessage) {
        errorDetails = (error as any).transactionMessage;
      }
      if ('transactionLogs' in error && (error as any).transactionLogs) {
        console.error("Transaction Logs:", (error as any).transactionLogs);
        // errorDetails += ` Logs: ${JSON.stringify((error as any).transactionLogs)}`; // Avoid making response too big
      }
    }
    return NextResponse.json(
      { 
        error: "Token creation failed", 
        details: errorDetails 
      },
      { status: 500 }
    );
  }
}
