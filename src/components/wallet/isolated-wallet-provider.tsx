"use client";

import React, { FC, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { DEVNET_RPC_ENDPOINT, MAINNET_RPC_ENDPOINT } from '@/lib/constants';

// Import Solana wallet styles
import '@solana/wallet-adapter-react-ui/styles.css';

// Create a context to track if wallet is ready
export const WalletReadyContext = React.createContext<boolean>(false);

interface IsolatedWalletProviderProps {
  children: ReactNode;
  cluster?: 'devnet' | 'mainnet-beta' | 'testnet';
  endpoint?: string;
}

/**
 * A completely isolated wallet provider that prevents event propagation issues
 */
export const IsolatedWalletProvider: FC<IsolatedWalletProviderProps> = ({
  children,
  cluster = 'devnet',
  endpoint
}) => {
  // Track component mounting for client-side only features
  const [mounted, setMounted] = useState(false);
  const [walletReady, setWalletReady] = useState(false);
  
  // Set up initialization with proper delay
  useEffect(() => {
    setMounted(true);
    
    // Give the adapter time to initialize properly before enabling autoConnect
    const timer = setTimeout(() => {
      setWalletReady(true);
    }, 2000); // Longer delay for better reliability
    
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);
  
  // Configure network
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
  
  // Configure endpoint
  const rpcEndpoint = useMemo(() => {
    if (endpoint) return endpoint;
    
    return cluster === 'mainnet-beta'
      ? MAINNET_RPC_ENDPOINT
      : DEVNET_RPC_ENDPOINT;
  }, [cluster, endpoint]);
  
  // Configure wallets
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter()
  ], []);
  
  // Render null during SSR to prevent hydration issues
  if (!mounted) {
    return null;
  }
  
  return (
    <WalletReadyContext.Provider value={walletReady}>
      <ConnectionProvider endpoint={rpcEndpoint}>
        <WalletProvider 
          wallets={wallets} 
          autoConnect={walletReady}
          onError={(error) => {
            // Suppress wallet errors in console
            if (error.name === 'WalletNotReadyError') {
              // Silently ignore wallet not ready errors
              console.debug('[Wallet] Not ready yet, suppressing error');
              return;
            }
            console.error('[Wallet]', error);
          }}
        >
          <WalletModalProvider>
            {children}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </WalletReadyContext.Provider>
  );
};
