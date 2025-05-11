# Scalable cToken: Compressed Token Distribution Architecture

## System Architecture

```
┌─────────────────────────────────────┐      ┌─────────────────────────────────┐
│                                     │      │                                 │
│   Frontend (Next.js + React)        │      │  Solana On-Chain Programs       │
│   ┌────────────────────────────┐    │      │  ┌─────────────────────────┐    │
│   │                            │    │      │  │                         │    │
│   │   Event Creator Interface  │    │      │  │  cToken Program         │    │
│   │   - Create Events          │    │      │  │  - initialize_event     │    │
│   │   - Mint cTokens           │────┼──────┼─▶│  - mint_batch_tokens    │    │
│   │   - Generate QR Codes      │    │      │  │  - claim_token          │    │
│   │   - Monitor Claims         │    │      │  │  - verify_token         │    │
│   │                            │    │      │  │                         │    │
│   └────────────────────────────┘    │      │  └─────────────┬───────────┘    │
│                                     │      │                │                │
│   ┌────────────────────────────┐    │      │  ┌─────────────▼───────────┐    │
│   │                            │    │      │  │                         │    │
│   │   Attendee Interface       │    │      │  │  Light Protocol         │    │
│   │   - Scan QR Codes          │    │      │  │  - compressed_token     │    │
│   │   - Claim cTokens          │────┼──────┼─▶│  - stateless.js         │    │
│   │   - View Claimed Tokens    │    │      │  │  - state compression    │    │
│   │                            │    │      │  │                         │    │
│   └────────────────────────────┘    │      │  └─────────────┬───────────┘    │
│                                     │      │                │                │
│   ┌────────────────────────────┐    │      │  ┌─────────────▼───────────┐    │
│   │                            │    │      │  │                         │    │
│   │   Solana Pay Integration   │    │      │  │  Solana SPL Tokens      │    │
│   │   - QR Code Generation     │────┼──────┼─▶│  - Token Program        │    │
│   │   - Transaction Embedding  │    │      │  │  - Associated Token     │    │
│   │   - Payment Processing     │    │      │  │    Account Program      │    │
│   │                            │    │      │  │                         │    │
│   └────────────────────────────┘    │      │  └─────────────────────────┘    │
│                                     │      │                                 │
└─────────────────────────────────────┘      │                                 │
                                             └─────────────────────────────────┘
┌─────────────────────────────────────┐      
│                                     │      ┌─────────────────────────────────┐
│   Wallet Integration                │      │                                 │
│   ┌────────────────────────────┐    │      │   ZK Compression               │
│   │                            │    │      │   ┌─────────────────────────┐   │
│   │   Solana Wallet Adapter    │    │      │   │                         │   │
│   │   - Connect Wallet         │    │      │   │     Merkle Tree         │   │
│   │   - Sign Transactions      │    │      │   │         │               │   │
│   │   - View Balances          │    │      │   │     ┌───┴────┐           │   │
│   │                            │    │      │   │     │        │           │   │
│   └────────────────────────────┘    │      │   │  Event    Token         │   │
│                                     │      │   │  State    Trees         │   │
└─────────────────────────────────────┘      │   │                         │   │
                                             │   │   Compressed cTokens    │   │
                                             │   │                         │   │
                                             │   └─────────────────────────┘   │
                                             │                                 │
                                             └─────────────────────────────────┘
```

## Component Flow

### Event Creation Process

1. **Organizer** logs into the application with a Solana wallet
2. Organizer fills out event details (name, time, location, token supply) and submits creation form
3. Client-side code sends transaction to initialize the event on-chain
4. On-chain `initialize_event` function:
   - Initializes event data
   - Sets up token metadata structure
   - Initializes compressed token state using Light Protocol
   - Creates event authority account
5. Event details are stored and displayed on dashboard

### Token Minting Process

1. **Organizer** selects an event and specifies token parameters
2. Client-side code sends transaction to mint tokens on-chain
3. On-chain `mint_batch_tokens` function:
   - Creates compressed cTokens using Light Protocol
   - Associates tokens with event metadata
   - Allocates tokens for distribution via QR codes
4. Event status is updated to show available tokens

### QR Code Generation Process

1. **Organizer** requests to generate QR codes for an event
2. Client-side code generates Solana Pay QR codes that encode:
   - Event ID
   - Token claim instructions
   - Verification parameters
3. QR codes are rendered for display or download
4. Organizer can distribute QR codes via print or digital means

### Token Claim Process

1. **Attendee** scans a Solana Pay QR code with their mobile device
2. Their Solana wallet application launches and displays the transaction details
3. Attendee confirms the transaction to claim the token
4. On-chain `claim_token` function:
   - Verifies the claim eligibility
   - Transfers a compressed cToken to the attendee's wallet
   - Records the claim in the event records
   - Updates token distribution statistics
5. Attendee receives confirmation of claimed token in their wallet

## Light Protocol ZK Compression Integration

The Scalable cToken system leverages Solana's State Compression through Light Protocol to efficiently store and distribute tokens:

1. **Storage Efficiency**: Instead of creating separate token mint accounts for each participant, all token data is stored as compressed state, significantly reducing on-chain storage costs by approximately 1000x.

2. **Scalability**: The system can handle thousands of token distributions with minimal on-chain storage cost, making it ideal for large-scale events with many attendees.

3. **Throughput Optimization**: Light Protocol enables minting up to 1,000 tokens per transaction, compared to just 1 with traditional NFTs.

4. **Cost Reduction**: Using Light Protocol's compressed token standard drastically reduces the cost of minting and distributing tokens, making it economically viable for events of any size.

## Data Structure

### On-Chain Accounts

1. **Event Account**
   - Authority (Pubkey)
   - Event Name (String)
   - Event Description (String)
   - Event Time (i64)
   - Event Location (String)
   - Total Supply (u64)
   - Tokens Claimed (u64)
   - Active Status (bool)
   - Merkle Root (32 bytes)

2. **Claim Account**
   - Attendee (Pubkey)
   - Event ID (Pubkey)
   - Token ID (u64)
   - Timestamp (i64)
   - Status (enum: Claimed, Pending, Failed)

### Compressed Token Structure

```
CompressedToken {
    event_id: Pubkey,       // References the event account
    serial_number: u64,     // Unique token identifier within the event
    recipient: Pubkey,      // Wallet address of the token recipient
    metadata: {
        name: String,       // Token name (usually event name + token number)
        symbol: String,     // Token symbol
        uri: String,        // Link to metadata JSON
        attributes: [       // Additional token attributes
            {
                trait_type: String,
                value: String
            }
        ]
    }
}
```

## Security Features

1. **Authority Validation**: Only the event creator can mint tokens and generate valid QR codes for their events.

2. **Dual-Signature Verification**: Token claims require valid signatures from both the event authority and the claiming wallet.

3. **On-Chain Verification**: All token claims are verified on-chain to prevent duplicate or fraudulent claims.

4. **Time-Bound Claims**: Events can specify claim periods to limit when tokens can be claimed.

5. **Merkle Proof Validation**: Light Protocol uses Merkle proofs to verify token authenticity without exposing the entire token dataset.

## Frontend-Blockchain Communication

### Solana Pay Integration Module

The application integrates with Solana Pay to create a seamless user experience:

1. **QR Code Generation**:
   ```typescript
   // Create a Solana Pay transaction request
   const transactionRequest = new TransactionRequestURL({
     link: new URL(`https://${baseUrl}/api/claim`),
     label: eventName,
     message: `Claim your proof-of-participation token for ${eventName}`,
     params: {
       eventId: eventAccount.toString(),
       recipient: 'recipient_wallet', // To be filled by wallet app
     }
   });

   // Generate QR code from URL
   const qrCode = transactionRequest.toString();
   ```

2. **Transaction Construction**:
   ```typescript
   // When user scans the QR code, construct the token claim transaction
   const transaction = new Transaction()
     .add(
       createClaimTokenInstruction({
         eventAccount: new PublicKey(eventId),
         recipientAccount: new PublicKey(recipient),
         systemProgram: SystemProgram.programId,
       })
     );
   ```

3. **Light Protocol Integration**:
   ```typescript
   import { 
     LightProtocolCompression, 
     createMintCompressedTokenInstruction 
   } from '@lightprotocol/stateless.js';

   // Create a compressed token instruction
   const mintIx = createMintCompressedTokenInstruction({
     payer: organizer.publicKey,
     eventAccount: eventPublicKey,
     merkleTree: merkleTreePublicKey,
     metadata: eventMetadata,
     mintAuthority: organizer.publicKey,
     recipient: attendee.publicKey,
   });
   ```

## Future Extensions

1. **Token Gating**: Enable event organizers to create token-gated experiences where only attendees with valid cTokens can access specific content or areas.

2. **Multi-Event Series**: Allow organizers to create series of connected events with progressive token collection and rewards for attending multiple events.

3. **Attendance Verification**: Add additional verification layers such as location-based verification or time-window restrictions.

4. **Token Utility Expansion**: Implement mechanisms for token holders to redeem benefits, discounts, or access to exclusive content.

5. **Analytics Dashboard**: Develop comprehensive analytics for organizers to track attendee engagement and token distribution metrics.

6. **Cross-Chain Compatibility**: Expand the system to allow token claims across multiple blockchain networks.
