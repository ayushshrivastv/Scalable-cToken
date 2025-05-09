"use client";

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/constants';

interface DecoyWalletButtonProps {
  className?: string;
}

/**
 * A non-functional wallet button that redirects to the mint page
 * Used on routes where real wallet functionality is not needed
 */
export const DecoyWalletButton: FC<DecoyWalletButtonProps> = ({ 
  className = '' 
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = React.useState(false);

  // Styling to match real wallet button
  const buttonStyle = {
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: '10px 18px',
    height: 'auto',
    lineHeight: '1.25rem',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    backdropFilter: 'blur(12px)',
    border: isHovered ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '9999px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    outline: 'none',
  };

  const handleClick = () => {
    // Redirect to mint page where real wallet connection is available
    router.push(ROUTES.MINT);
  };

  return (
    <motion.button
      className={`${className}`}
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      Connect Wallet
    </motion.button>
  );
};
