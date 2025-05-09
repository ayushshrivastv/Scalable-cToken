"use client";

import { useEffect, useState, useCallback } from 'react';
import type { FC, CSSProperties, MouseEvent } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { Button } from '@/components/ui/button';
import { formatPublicKey } from '@/lib/utils/solana';
import { toast } from 'sonner';
import { DirectWalletSelector } from './direct-wallet-selector';

// Custom styles for the wallet button - Clean style without borders
const walletButtonStyle: CSSProperties = {
  backgroundColor: 'transparent',
  color: 'white',
  padding: '6px 12px',      // Reduced padding to fit text better
  height: 'auto',           // Override default fixed height
  lineHeight: '1.25rem',    // Consistent line height
  fontSize: '14px',         // text-sm, for consistency
  whiteSpace: 'nowrap',     // Prevent text wrapping
  fontWeight: '500',        // Medium font weight
  cursor: 'pointer',        // Show pointer cursor on hover
  transition: 'all 0.2s ease',  // Smooth transition for hover effects
  display: 'inline-flex',   // Better control of dimensions
  alignItems: 'center',     // Center content vertically
  justifyContent: 'center', // Center content horizontally
  minWidth: 'min-content',  // Allow button to shrink to content width
};

const walletButtonHoverStyle: CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle white background on hover
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
  // Use client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const { publicKey, connected, connecting, disconnect, wallets, wallet } = useWallet();
  
  // Custom wallet button to avoid WalletNotReadyError
  const handleWalletClick = useCallback(() => {
    if (connected) {
      // Handle disconnect
      try {
        disconnect();
        // Dispatch a custom event that the wallet provider will listen for
        window.dispatchEvent(new Event('wallet-adapter-disconnect'));
      } catch (error) {
        console.error('Disconnect error:', error);
        toast.error('Failed to disconnect wallet');
      }
    } else {
      // Open our custom wallet selector
      setIsConnecting(true);
      setShowWalletSelector(true);
    }
  }, [connected, disconnect]);
  
  // Close selector handler
  const handleCloseSelector = useCallback(() => {
    setShowWalletSelector(false);
    // Allow a small delay before resetting connecting state
    setTimeout(() => setIsConnecting(false), 100);
  }, []);
  
  // Track wallet connection events
  useEffect(() => {
    // Handle wallet connection event
    const handleWalletConnected = () => {
      setIsConnecting(false);
      setShowWalletSelector(false);
      toast.success('Wallet connected successfully');
    };
    
    // Handle wallet selection event
    const handleWalletSelected = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Wallet selected:', customEvent.detail?.walletName);
      // Set connecting state for UI feedback
      setIsConnecting(true);
    };
    
    // Listen for wallet events
    window.addEventListener('wallet-adapter-connect', handleWalletConnected);
    window.addEventListener('wallet-selected', handleWalletSelected as EventListener);
    
    return () => {
      window.removeEventListener('wallet-adapter-connect', handleWalletConnected);
      window.removeEventListener('wallet-selected', handleWalletSelected as EventListener);
    };
  }, []);
  
  // Track wallet changes
  useEffect(() => {
    if (connected && wallet) {
      // Dispatch a custom event that the wallet provider will listen for
      window.dispatchEvent(new Event('wallet-adapter-connect'));
      setShowWalletSelector(false);
    }
  }, [connected, wallet]);
  
  // Check if any wallet adapters are ready
  const hasReadyWallet = wallets.some(wallet => 
    wallet.readyState === WalletReadyState.Installed || 
    wallet.readyState === WalletReadyState.Loadable
  );
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Apply hover effect to button
  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = walletButtonHoverStyle.backgroundColor || '';
  };

  const handleMouseOut = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = walletButtonStyle.backgroundColor || '';
  };
  
  // Inner button styling to match scale.com buttons
  const innerButtonStyle: CSSProperties = {
    background: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    fontWeight: 500,
    color: 'white',
    fontSize: '14px',
    width: 'auto',
    minWidth: 'min-content',
  };
  
  // Only render the wallet button content on the client side
  // This prevents hydration errors by ensuring consistent rendering
  if (!isClient) {
    return (
      <div className="wallet-adapter-button-trigger" style={walletButtonStyle}>
        <button className="wallet-adapter-button-trigger" style={innerButtonStyle}>
          Select Wallet
        </button>
      </div>
    );
  }
  
  // Button content based on connection state
  const buttonContent = connected 
    ? (wallet?.adapter.name || 'Disconnect')
    : connecting || isConnecting
    ? 'Connecting...'
    : 'Select Wallet';
  
  if (!connected) {
    return (
      <>
        <div 
          className="wallet-adapter-button-trigger wallet-button-wrapper" 
          style={walletButtonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <button 
            className="wallet-adapter-button-trigger wallet-button" 
            style={innerButtonStyle}
            onClick={handleWalletClick}
            disabled={connecting || isConnecting}
            aria-label="Select wallet"
            type="button"
          >
            {buttonContent}
          </button>
        </div>
        
        {/* Our custom wallet selector modal */}
        {showWalletSelector && (
          <DirectWalletSelector onClose={handleCloseSelector} />
        )}
      </>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {showAddress && publicKey && (
        <span className="text-sm font-medium text-white/80">
          {formatPublicKey(publicKey)}
        </span>
      )}
      <div 
        className="wallet-adapter-button-trigger" 
        style={walletButtonStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <button 
          className="wallet-adapter-button-trigger" 
          style={innerButtonStyle}
          onClick={handleWalletClick}
        >
          {buttonContent}
        </button>
      </div>
    </div>
  );
};
