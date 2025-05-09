"use client";

import React, { FC, ReactNode, useMemo, useState, useEffect } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  ConnectionProvider, 
  WalletProvider,
  useWallet
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { DEVNET_RPC_ENDPOINT, MAINNET_RPC_ENDPOINT } from '@/lib/constants';

interface WalletAdapterProviderProps {
  children: ReactNode;
  cluster?: 'devnet' | 'mainnet-beta' | 'testnet';
  endpoint?: string;
}

/**
 * Component that safely wraps Solana's wallet adapter functionality with proper client-side detection
 */
export const WalletAdapterProvider: FC<WalletAdapterProviderProps> = ({ 
  children,
  cluster = 'devnet',
  endpoint
}) => {
  // Used to safely ensure we only render wallet components on client
  const [mounted, setMounted] = useState(false);
  
  // Track if we've properly waited to initialize wallet
  const [walletInitialized, setWalletInitialized] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Delay wallet initialization to ensure DOM is stable
    const timeoutId = setTimeout(() => {
      setWalletInitialized(true);
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      setMounted(false);
    };
  }, []);

  // Get the correct network for the cluster
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

  // Get the correct endpoint
  const rpcEndpoint = useMemo(() => {
    if (endpoint) return endpoint;
    
    return cluster === 'mainnet-beta'
      ? MAINNET_RPC_ENDPOINT
      : DEVNET_RPC_ENDPOINT;
  }, [cluster, endpoint]);

  // Configure supported wallets
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ], []);

  // Render fallback during SSR
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ConnectionProvider endpoint={rpcEndpoint}>
      <WalletProvider wallets={wallets} autoConnect={walletInitialized}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

/**
 * Wrapper component that prevents wallet connection errors
 * by only rendering children when wallet is safe to use
 */
export const SafeWalletComponentWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { wallet } = useWallet();
  const [isSafe, setIsSafe] = useState(false);
  
  useEffect(() => {
    // Only render wallet components after a delay
    const timer = setTimeout(() => {
      setIsSafe(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [wallet]);
  
  if (!isSafe) {
    return null;
  }
  
  return <>{children}</>;
};
