"use client";

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { toast } from 'sonner';

export function DirectWalletSelector({ 
  onClose 
}: { 
  onClose: () => void;
}) {
  // Get wallet functionality from Solana adapter
  const { wallets, select, connecting, connected } = useWallet();
  
  // Simple states to track UI
  const [mounted, setMounted] = useState(false);
  const [selectedWalletName, setSelectedWalletName] = useState<string | null>(null);
  
  // Initialize and handle component mount/unmount
  useEffect(() => {
    setMounted(true);
    
    // Prevent scrolling while modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore scrolling when modal closes
      document.body.style.overflow = '';
    };
  }, []);
  
  // Get only wallets that are actually available to use
  const availableWallets = wallets.filter(wallet => 
    wallet.readyState === WalletReadyState.Installed || 
    wallet.readyState === WalletReadyState.Loadable
  );
  
  // Enhanced wallet selection with more reliable handling
  const handleWalletClick = useCallback((walletName: WalletName) => {
    try {
      console.log('Selecting wallet:', walletName);
      
      // Remember which wallet was selected for UI purposes
      setSelectedWalletName(walletName);
      
      // This tells the wallet adapter which wallet to use
      select(walletName);
      
      // Wait briefly before checking wallet availability
      setTimeout(() => {
        // Get the selected wallet from the current list
        const selectedWallet = wallets.find(w => w.adapter.name === walletName);
        
        if (selectedWallet?.readyState === WalletReadyState.NotDetected) {
          toast.error(`${walletName} wallet not detected. Please install it first.`);
        } else if (selectedWallet?.readyState === WalletReadyState.Unsupported) {
          toast.error(`${walletName} wallet is not supported on this device.`);
        }
        
        // The wallet adapter will handle the rest automatically:
        // - Show the wallet's connection UI
        // - Handle approval/rejection
        // - Manage the connection
      }, 500);
      
      // After successful connection, the connected state will change
      // which we watch in another effect
    } catch (error) {
      console.error('Error selecting wallet:', error);
      toast.error('Failed to select wallet. Please try again.');
    }
  }, [select, wallets]);
  
  // Close the modal when connection succeeds
  useEffect(() => {
    if (connected) {
      toast.success('Wallet connected!');
      onClose();
    }
  }, [connected, onClose]);
  
  // Prevent rendering on server to avoid hydration issues
  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
      onClick={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        padding: 0
      }}
    >
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          margin: 'auto',
          width: '90%',
          maxWidth: '380px',
          backgroundColor: '#18181b',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          zIndex: 10000
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Select a wallet</h2>
          <button 
            className="text-zinc-400 hover:text-white p-2 rounded-full"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        
        <div 
          className="wallet-list"
          style={{
            maxHeight: '60vh',
            overflowY: 'auto',
            padding: '8px 0',
            margin: '16px 0'
          }}
        >
          {availableWallets.length > 0 ? (
            availableWallets.map((wallet) => {
              const isSelected = selectedWalletName === wallet.adapter.name;
              const isConnecting = connecting && selectedWalletName === wallet.adapter.name;
              
              return (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleWalletClick(wallet.adapter.name)}
                  disabled={connecting}
                  className={`wallet-option flex items-center w-full p-4 rounded-lg transition-colors border ${selectedWalletName === wallet.adapter.name ? 'bg-zinc-800 border-blue-500' : 'border-zinc-700 hover:bg-zinc-800'}`}
                  style={{ 
                    cursor: connecting ? 'wait' : 'pointer',
                    marginBottom: '8px',
                    backgroundColor: selectedWalletName === wallet.adapter.name ? '#27272a' : 'transparent',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    className="wallet-icon" 
                    style={{
                      width: '32px',
                      height: '32px',
                      flexShrink: 0,
                      marginRight: '12px'
                    }}
                  >
                    {wallet.adapter.icon && (
                      <img
                        src={wallet.adapter.icon}
                        alt={`${wallet.adapter.name} icon`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="wallet-name" style={{ fontWeight: 500 }}>
                      {wallet.adapter.name}
                    </span>
                    {connecting && selectedWalletName === wallet.adapter.name && (
                      <div className="text-xs text-blue-400 mt-1">Connecting...</div>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center p-4 text-zinc-400">
              <p>No wallets detected</p>
              <p className="text-sm mt-2">Please install a Solana wallet</p>
            </div>
          )}
        </div>
        
        <div 
          className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-500 text-center"
          style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTopWidth: '1px',
            borderTopColor: '#27272a'
          }}
        >
          <p>Having trouble connecting?</p>
          <a 
            href="https://docs.solana.com/wallet-guide" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
            style={{ color: '#60a5fa' }}
          >
            Learn more about Solana wallets
          </a>
        </div>
      </div>
    </div>
  );
}
