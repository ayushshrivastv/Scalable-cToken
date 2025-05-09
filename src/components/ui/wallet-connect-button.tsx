"use client";

import type { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { formatPublicKey } from '@/lib/utils/solana';

// Custom styles for the wallet button - white background with black text
const walletButtonStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '8px 12px',      // Equivalent to py-2 px-3
  height: 'auto',           // Override default fixed height
  lineHeight: '1.25rem',    // Consistent line height for 14px font
  fontSize: '14px',         // text-sm, for consistency
  whiteSpace: 'nowrap',     // Prevent text wrapping
  // Retain Solana button's default border and border-radius unless further changes are needed
};

const walletButtonHoverStyle = {
  backgroundColor: '#f0f0f0',
};

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
    return <WalletMultiButton className="wallet-adapter-button-trigger" style={walletButtonStyle} />;
  }

  return (
    <div className="flex items-center gap-2">
      {showAddress && publicKey && (
        <span className="text-sm font-medium">
          {formatPublicKey(publicKey)}
        </span>
      )}
      <WalletMultiButton className="wallet-adapter-button-trigger" style={walletButtonStyle} />
    </div>
  );
};
