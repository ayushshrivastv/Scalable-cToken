"use client";

import { type FC, type ReactNode, useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter
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

  // Set up supported wallets - only include the most reliable ones
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new CloverWalletAdapter()
  ], []);

  // Handle connection errors
  const onError = (error: Error) => {
    console.error(error);
    toast.error(`Wallet error: ${error.message}`);
    setConnecting(false); // Reset connecting state on error
  };

  // Handle wallet selection
  const onSelectWallet = () => {
    // Ensure we reset the connecting state when a user selects a wallet
    setConnecting(true);
  };

  // Handle when wallet connection completes or is canceled
  const onWalletConnectChange = (connected: boolean) => {
    if (!connected && connecting) {
      // Reset connecting state if connection was canceled
      setConnecting(false);
    } else if (connected) {
      // Connection successful
      setConnecting(false);
      toast.success('Wallet connected successfully');
    }
  };

  // Once the component mounts, we can render children
  useEffect(() => {
    setMounted(true);
    
    // Add global click handler to improve wallet modal interaction
    const handleGlobalClick = (e: MouseEvent) => {
      // Add any additional wallet modal interaction fixes here if needed
      const target = e.target as HTMLElement;
      // Check if user clicked on wallet-related elements
      if (target && target.closest('.wallet-adapter-modal')) {
        // Ensure the click propagates properly
        e.stopPropagation();
      }
    };
    
    window.addEventListener('click', handleGlobalClick, true);
    
    return () => {
      window.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);
  
  return (
    <ConnectionProvider endpoint={rpcEndpoint}>
      <WalletProvider 
        wallets={wallets}
        autoConnect={false} // Disable auto-connect to avoid errors
        onError={onError}
      >
        <WalletModalProvider>
          {/* Only render wallet UI when mounted to avoid hydration mismatch */}
          {mounted && children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
