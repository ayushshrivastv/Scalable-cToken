"use client";

import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { toast } from 'sonner';

interface DecoyWalletButtonProps {
  className?: string;
  redirectPath?: string;
}

/**
 * A non-functional wallet button that redirects to a wallet-enabled page
 * Used on routes where real wallet functionality is not needed
 */
export const DecoyWalletButton: FC<DecoyWalletButtonProps> = ({ 
  className = '',
  redirectPath = ROUTES.MINT // Default redirect to mint page
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Client-side only functionality
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Styling to match real wallet button but with subtle indicator
  const buttonStyle = {
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.12)',
    color: 'white',
    padding: '10px 18px',
    height: 'auto',
    lineHeight: '1.25rem',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    backdropFilter: 'blur(12px)',
    border: isHovered ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '9999px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: isHovered ? '0 3px 8px rgba(0, 0, 0, 0.15)' : '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const handleClick = () => {
    // Visual feedback that we're redirecting
    setIsClicked(true);
    
    if (isClient) {
      // Show toast notifying user we're redirecting to connect wallet
      toast.info('Redirecting to wallet connection page', {
        position: 'bottom-right'
      });
      
      // Redirect to the page where real wallet connection is available
      setTimeout(() => {
        router.push(redirectPath);
      }, 300);
    }
  };

  return (
    <motion.button
      className={`${className}`}
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      animate={isClicked ? { opacity: 0.8, scale: 0.97 } : { opacity: 1, scale: 1 }}
    >
      <span>Connect Wallet</span>
      <ExternalLink size={14} className="inline-block ml-1 opacity-80" />
    </motion.button>
  );
};
