"use client";

import { type FC, type ReactNode, useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { type Cluster, DEVNET_RPC_ENDPOINT, MAINNET_RPC_ENDPOINT } from '@/lib/constants';
import { toast } from 'sonner';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';
// Import custom wallet adapter overrides
import '@/styles/wallet-adapter-overrides.css';

interface SolanaWalletProviderProps {
  children: ReactNode;
  cluster?: Cluster;
  endpoint?: string;
}

export const SolanaWalletProvider: FC<SolanaWalletProviderProps> = ({
  children,
  cluster = 'devnet',
  endpoint
}) => {
  // For client-side only rendering
  const [mounted, setMounted] = useState(false);
  // Track wallet connection attempts
  const [connecting, setConnecting] = useState(false);

  // Set up network
  const network = useMemo(() => {
    switch (cluster) {
      case 'mainnet-beta':
        return WalletAdapterNetwork.Mainnet;
      case 'testnet':
        return WalletAdapterNetwork.Testnet;
      default:
        return WalletAdapterNetwork.Devnet;
    }
  }, [cluster]);

  // Set up endpoint
  const rpcEndpoint = useMemo(() => {
    if (endpoint) return endpoint;

    return cluster === 'mainnet-beta'
      ? MAINNET_RPC_ENDPOINT
      : DEVNET_RPC_ENDPOINT;
  }, [cluster, endpoint]);

  // Set up supported wallets - include most reliable options for compatibility
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new Coin98WalletAdapter(),
    new TorusWalletAdapter(),
    new CloverWalletAdapter()
  ], []);

  // Handle connection errors with more specific messages
  const onError = (error: Error) => {
    console.error('Wallet error:', error);
    
    // Provide more user-friendly error messages
    if (error.name === 'WalletNotSelectedError') {
      toast.error('Please select a wallet to continue');
    } else if (error.name === 'WalletNotConnectedError') {
      toast.error('Wallet not connected. Please try connecting again');
    } else if (error.name === 'WalletConnectionError') {
      toast.error('Failed to connect to wallet. Please try again');
    } else if (error.name === 'WalletDisconnectedError') {
      toast.error('Wallet disconnected');
    } else if (error.name === 'WalletTimeoutError') {
      toast.error('Wallet connection timed out. Please try again');
    } else {
      toast.error(`Wallet error: ${error.message}`);
    }
    
    setConnecting(false); // Reset connecting state on error
  };

  // Initialize component
  useEffect(() => {
    setMounted(true);
    
    // Handle wallet connections
    const handleWalletConnected = () => {
      console.log('Wallet connected');
      setConnecting(false);
      toast.success('Wallet connected successfully');
    };
    
    const handleWalletDisconnected = () => {
      console.log('Wallet disconnected');
      setConnecting(false);
    };
    
    // Listen for wallet events
    window.addEventListener('wallet-adapter-connect', handleWalletConnected);
    window.addEventListener('wallet-adapter-disconnect', handleWalletDisconnected);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('wallet-adapter-connect', handleWalletConnected);
      window.removeEventListener('wallet-adapter-disconnect', handleWalletDisconnected);
    };
  }, []);
  
  return (
    <ConnectionProvider endpoint={rpcEndpoint}>
      <WalletProvider 
        wallets={wallets}
        autoConnect={false} // Disable auto-connect to avoid errors
        onError={onError}
        localStorageKey="wallet-adapter" // Consistent storage key
      >
        <WalletModalProvider>
          {/* Only render wallet UI when mounted to avoid hydration mismatch */}
          {mounted && children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
