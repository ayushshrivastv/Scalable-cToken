"use client";

import React, { FC, useState, useEffect, useContext } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { formatPublicKey } from '@/lib/utils/solana';
import { WalletReadyContext } from './isolated-wallet-provider';

// Dynamically import the WalletMultiButton with SSR disabled
// This ensures it only loads on the client side to prevent hydration issues
const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);

// Placeholder button component for when the real wallet button can't be shown
const PlaceholderButton: FC<{ className?: string }> = ({ className = '' }) => (
  <button 
    className={`wallet-adapter-button wallet-adapter-button-trigger ${className}`}
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '10px 18px',
      height: 'auto',
      lineHeight: '1.25rem',
      fontSize: '14px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      borderRadius: '9999px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      cursor: 'default',
      minWidth: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    disabled
  >
    Connect Wallet
  </button>
);

// Styling for the wallet button
const walletButtonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  padding: '10px 18px',
  height: 'auto',
  lineHeight: '1.25rem',
  fontSize: '14px',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '9999px',
  transition: 'all 0.2s ease',
};

const walletButtonHoverStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
};

interface IsolatedWalletButtonProps {
  showAddress?: boolean;
  className?: string;
}

/**
 * A completely isolated wallet button component that prevents event propagation issues
 */
export const IsolatedWalletButton: FC<IsolatedWalletButtonProps> = ({
  showAddress = true,
  className = ''
}) => {
  // Get wallet ready status from context
  const isWalletReady = useContext(WalletReadyContext);
  
  // Client-side only state
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get wallet state
  const { publicKey, connected } = useWallet();
  
  // Set up client-side initialization
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Event handlers with propagation prevention
  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHovered(true);
  };
  
  const handleMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHovered(false);
  };
  
  // During SSR or before mounting, show a placeholder
  if (!isMounted) {
    return <PlaceholderButton className={className} />;
  }
  
  // If wallet isn't ready yet, show placeholder
  if (!isWalletReady) {
    return <PlaceholderButton className={className} />;
  }
  
  // If not connected, show connect button
  if (!connected) {
    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => e.stopPropagation()}
      >
        <WalletMultiButtonDynamic 
          style={isHovered ? {...walletButtonStyle, ...walletButtonHoverStyle} : walletButtonStyle}
          className="wallet-adapter-button-trigger"
        />
      </div>
    );
  }
  
  // If connected, show address and disconnect button
  return (
    <div className={`flex items-center space-x-2 ${className}`} onClick={(e) => e.stopPropagation()}>
      {showAddress && publicKey && (
        <span className="text-sm font-medium text-zinc-300">
          {formatPublicKey(publicKey)}
        </span>
      )}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <WalletMultiButtonDynamic 
          style={isHovered ? {...walletButtonStyle, ...walletButtonHoverStyle} : walletButtonStyle}
          className="wallet-adapter-button-trigger"
        />
      </div>
    </div>
  );
};
