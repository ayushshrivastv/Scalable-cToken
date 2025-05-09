"use client";

import type { FC, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { SolanaWalletProvider } from '@/components/providers/wallet-provider';
import { Toaster } from '@/components/ui/sonner';
import { DEFAULT_CLUSTER } from '@/lib/constants';

interface ClientProviderProps {
  children: ReactNode;
}

// This component wraps client-side providers that can't be used in server components
const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SolanaWalletProvider cluster={DEFAULT_CLUSTER}>
        {children}
        <Toaster position="bottom-right" />
      </SolanaWalletProvider>
    </ThemeProvider>
  );
};

export default ClientProvider;
