"use client";

import type { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { formatPublicKey } from '@/lib/utils/solana';

interface WalletConnectButtonProps {
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  showAddress?: boolean;
}

export const WalletConnectButton: FC<WalletConnectButtonProps> = ({
  buttonVariant = 'default',
  buttonSize = 'default',
  showAddress = true
}) => {
  const { publicKey, connected, disconnect } = useWallet();

  if (!connected) {
    return <WalletMultiButton className="wallet-adapter-button-trigger" />;
  }

  return (
    <div className="flex items-center gap-2">
      {showAddress && publicKey && (
        <span className="text-sm font-medium">
          {formatPublicKey(publicKey)}
        </span>
      )}
      <WalletMultiButton className="wallet-adapter-button-trigger" />
    </div>
  );
};
