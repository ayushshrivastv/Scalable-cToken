"use client";

import { useEffect, useState, useRef, type FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

// Dynamically import the WalletMultiButton to ensure it only loads client-side
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);
import { Button } from '@/components/ui/button';
import { formatPublicKey } from '@/lib/utils/solana';
import { motion } from 'framer-motion';

// Apple-inspired dark theme wallet button style
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
  borderRadius: '9999px', // Full rounded like Apple buttons
  transition: 'all 0.2s ease',
};

const walletButtonHoverStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
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
  // Use client-side only rendering to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);
  const [isWalletReady, setIsWalletReady] = useState(false);
  const { publicKey, connected, disconnect, wallet } = useWallet();
  const [isHovered, setIsHovered] = useState(false);
  const walletCheckTimeout = useRef<NodeJS.Timeout | null>(null);

  // Check if the wallet adapter is fully initialized
  useEffect(() => {
    setIsMounted(true);
    
    // Give the wallet adapter time to fully initialize
    walletCheckTimeout.current = setTimeout(() => {
      setIsWalletReady(true);
    }, 1000);
    
    return () => {
      if (walletCheckTimeout.current) {
        clearTimeout(walletCheckTimeout.current);
      }
    };
  }, []);

  // During SSR, initial render, or when wallet isn't ready, use a placeholder
  if (!isMounted || !isWalletReady) {
    return (
      <motion.button 
        className="wallet-adapter-button-trigger" 
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        style={{
          ...walletButtonStyle,
          width: '160px',
        }}
      >
        Connect Wallet
      </motion.button>
    );
  }

  // Safe to render the actual wallet button now
  if (!connected) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isWalletReady && (
          <WalletMultiButton 
            className="wallet-adapter-button-trigger" 
            style={isHovered ? { ...walletButtonStyle, ...walletButtonHoverStyle } : walletButtonStyle} 
          />
        )}
      </motion.div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {showAddress && publicKey && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-medium text-zinc-300"
        >
          {formatPublicKey(publicKey)}
        </motion.span>
      )}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isWalletReady && (
          <WalletMultiButton 
            className="wallet-adapter-button-trigger" 
            style={isHovered ? { ...walletButtonStyle, ...walletButtonHoverStyle } : walletButtonStyle} 
          />
        )}
      </motion.div>
    </div>
  );
};
