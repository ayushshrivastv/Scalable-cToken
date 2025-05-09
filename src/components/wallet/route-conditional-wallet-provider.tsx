"use client";

import React, { FC, ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { IsolatedWalletProvider } from '@/components/wallet/isolated-wallet-provider';
import { ROUTES } from '@/lib/constants';

// Routes that actually need wallet functionality
const WALLET_ENABLED_ROUTES = [
  ROUTES.MINT,  // Only mint page requires wallet for minting tokens
  ROUTES.CLAIM  // Only claim page requires wallet for claiming tokens
];

interface ConditionalWalletProviderProps {
  children: ReactNode;
  cluster?: 'devnet' | 'mainnet-beta' | 'testnet';
}

/**
 * A wallet provider that only activates on routes that actually need wallet functionality
 */
export const RouteConditionalWalletProvider: FC<ConditionalWalletProviderProps> = ({
  children,
  cluster = 'devnet'
}) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  // Only enable client-side features after mount
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // If on server or not yet mounted, render children without wallet
  if (!isClient) {
    return <>{children}</>;
  }
  
  // Check if current route needs wallet functionality
  const isWalletEnabledRoute = WALLET_ENABLED_ROUTES.includes(pathname);
  
  // If wallet is not needed for this route, just render children
  if (!isWalletEnabledRoute) {
    return <>{children}</>;
  }
  
  // Otherwise, wrap with the wallet provider
  return (
    <IsolatedWalletProvider cluster={cluster}>
      {children}
    </IsolatedWalletProvider>
  );
};
