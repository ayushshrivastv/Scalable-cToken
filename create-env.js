/**
 * Script to create a .env file with the necessary configuration
 * for the Scalable cToken project
 */
const fs = require('fs');
const path = require('path');

// Define the content for the .env file
const envContent = `NEXT_PUBLIC_CLUSTER=devnet
NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
ADMIN_PRIVATE_KEY=OIivDgAVz6EvuNIlQFgOpadvE4Cultuob9I+21MVt7c=
`;

// Define the path to the .env file
const envPath = path.join(__dirname, '.env');

// Check if the .env file already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️ .env file already exists. To avoid overwriting your configuration, please:');
  console.log('1. Manually edit your .env file');
  console.log('2. Add the ADMIN_PRIVATE_KEY if it\'s missing');
  console.log('3. Make sure NEXT_PUBLIC_CLUSTER and NEXT_PUBLIC_RPC_ENDPOINT are set correctly');
} else {
  // Create the .env file
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📝 Configuration:');
    console.log('- NEXT_PUBLIC_CLUSTER: devnet');
    console.log('- NEXT_PUBLIC_RPC_ENDPOINT: https://api.devnet.solana.com');
    console.log('- ADMIN_PRIVATE_KEY: [Securely stored in .env file]');
    console.log('\n⚠️ Important: This admin keypair needs SOL to pay for transaction fees.');
    console.log('You can fund it using a devnet faucet or the Solana CLI:');
    console.log('solana airdrop 1 <ADMIN_PUBLIC_KEY> --url https://api.devnet.solana.com');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
}
