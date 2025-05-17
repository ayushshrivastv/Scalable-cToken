/**
 * @file standard-token.ts
 * @description Utility functions for creating and managing standard SPL tokens on Solana
 * This file provides a fallback implementation using regular (non-compressed) SPL tokens
 */

import { 
  Connection, 
  PublicKey, 
  Keypair, 
  Transaction, 
  SystemProgram,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import {
  createInitializeMintInstruction,
  createMintToInstruction,
  getMinimumBalanceForRentExemptMint,
  getMint,
  getOrCreateAssociatedTokenAccount,
  MINT_SIZE,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import type { AppConfig } from '../types';

/**
 * Create a standard SPL token mint on Solana
 * 
 * @param connection - Solana connection instance
 * @param payer - Keypair of the account paying for the transaction fees
 * @param mintAuthority - Public key of the account that will have authority to mint tokens
 * @param decimals - Number of decimal places for the token (e.g., 9 for most tokens)
 * @param tokenName - Name of the token (e.g., "Event Name Token")
 * @param tokenSymbol - Symbol of the token (e.g., "POP")
 * @param tokenUri - URI to the token's metadata JSON (typically hosted on IPFS or Arweave)
 * @returns Object containing the mint public key and transaction signature
 */
export const createStandardTokenMint = async (
  connection: Connection,
  payer: Keypair,
  mintAuthority: PublicKey,
  decimals: number,
  tokenName: string,
  tokenSymbol: string,
  tokenUri: string
): Promise<{ mint: PublicKey; signature: string }> => {
  console.log('Creating standard SPL token mint...');
  console.log(`Token Name: ${tokenName}, Symbol: ${tokenSymbol}, Decimals: ${decimals}`);

  // Generate a new keypair for the mint account
  const mintKeypair = Keypair.generate();
  console.log(`Mint address: ${mintKeypair.publicKey.toBase58()}`);

  // Calculate the rent-exempt balance required for the mint
  const rentLamports = await getMinimumBalanceForRentExemptMint(connection);
  console.log(`Rent for mint account: ${rentLamports} lamports`);

  // Create a transaction to create the mint account and initialize it
  const transaction = new Transaction().add(
    // Create the mint account with enough space and rent-exempt balance
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports: rentLamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    // Initialize the mint account
    createInitializeMintInstruction(
      mintKeypair.publicKey, // Mint account
      decimals, // Decimals
      mintAuthority, // Mint authority
      mintAuthority, // Freeze authority (same as mint authority)
      TOKEN_PROGRAM_ID
    )
  );

  try {
    // Implement retry mechanism for transaction sending
    const MAX_RETRIES = 3;
    let signature = '';
    let success = false;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Attempt ${attempt} of ${MAX_RETRIES} to create token mint...`);
        
        // Get a fresh blockhash for each attempt
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
        transaction.recentBlockhash = blockhash;
        transaction.lastValidBlockHeight = lastValidBlockHeight;
        
        // Sign and send the transaction
        signature = await sendAndConfirmTransaction(
          connection,
          transaction,
          [payer, mintKeypair], // Both payer and mint keypair need to sign
          { commitment: 'confirmed' }
        );
        
        console.log('Standard token mint created successfully');
        console.log(`Transaction signature: ${signature}`);
        success = true;
        break;
      } catch (err) {
        if (attempt < MAX_RETRIES) {
          console.log(`Attempt ${attempt} failed, retrying...`);
          console.error(err);
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        } else {
          // Rethrow the error on the last attempt
          throw err;
        }
      }
    }
    
    if (!success) {
      throw new Error('Failed to create token mint after multiple attempts');
    }

    return {
      mint: mintKeypair.publicKey,
      signature,
    };
  } catch (error) {
    console.error('Error creating standard token mint:', error);
    throw error;
  }
};

/**
 * Mint standard SPL tokens to a destination account
 * 
 * @param connection - Solana connection instance
 * @param payer - Keypair of the account paying for the transaction fees
 * @param mint - Public key of the token mint
 * @param destination - Public key of the destination account
 * @param authority - Keypair with authority to mint tokens
 * @param amount - Amount of tokens to mint (in base units)
 * @returns Object containing the transaction signature
 */
export const mintStandardTokens = async (
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  destination: PublicKey,
  authority: Keypair,
  amount: number
): Promise<{ signature: string }> => {
  console.log(`Minting ${amount} tokens to ${destination.toBase58()}`);

  try {
    // Get or create the associated token account for the destination
    const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      destination,
      false
    );

    console.log(`Destination token account: ${destinationTokenAccount.address.toBase58()}`);

    // Create a transaction to mint tokens to the destination
    const transaction = new Transaction().add(
      createMintToInstruction(
        mint, // Mint account
        destinationTokenAccount.address, // Destination token account
        authority.publicKey, // Mint authority
        amount // Amount to mint
      )
    );

    // Implement retry mechanism for transaction sending
    const MAX_RETRIES = 3;
    let signature = '';
    let success = false;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Attempt ${attempt} of ${MAX_RETRIES} to mint tokens...`);
        
        // Get a fresh blockhash for each attempt
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
        transaction.recentBlockhash = blockhash;
        transaction.lastValidBlockHeight = lastValidBlockHeight;
        
        // Sign and send the transaction
        signature = await sendAndConfirmTransaction(
          connection,
          transaction,
          [payer, authority], // Both payer and mint authority need to sign
          { commitment: 'confirmed' }
        );
        
        console.log('Tokens minted successfully');
        console.log(`Transaction signature: ${signature}`);
        success = true;
        break;
      } catch (err) {
        if (attempt < MAX_RETRIES) {
          console.log(`Attempt ${attempt} failed, retrying...`);
          console.error(err);
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        } else {
          // Rethrow the error on the last attempt
          throw err;
        }
      }
    }
    
    if (!success) {
      throw new Error('Failed to mint tokens after multiple attempts');
    }

    return { signature };
  } catch (error) {
    console.error('Error minting standard tokens:', error);
    throw error;
  }
};

/**
 * Create a Solana connection
 * 
 * @param config - Application configuration containing RPC endpoint
 * @returns A Solana connection instance
 */
export const createStandardConnection = (config: AppConfig): Connection => {
  const { rpcEndpoint } = config;
  return new Connection(rpcEndpoint, 'confirmed');
};
