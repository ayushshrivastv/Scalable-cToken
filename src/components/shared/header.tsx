"use client";

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { Linkedin, Menu, X } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { WalletConnectButton } from '@/components/ui/wallet-connect-button';

interface HeaderProps {
  activePage?: string;
}

export const Header: FC<HeaderProps> = ({ activePage }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;
      const scrollThreshold = 70; // Minimum scroll amount before hiding
      
      // Only hide header if we've scrolled past the threshold
      if (currentScrollPos > scrollThreshold) {
        setVisible(!isScrollingDown);
      } else {
        setVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${!visible ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Blurred background effect */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-0"></div>
      
      {/* Subtle gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container relative z-10 mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={ROUTES.HOME} className="text-2xl font-bold text-white tracking-tight hover:text-white/80 transition-colors">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Scalable cToken</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href={ROUTES.MINT} 
            className={`text-sm font-medium tracking-wide transition-colors ${activePage === 'mint' ? 'text-white' : 'text-white/70 hover:text-white'}`}
          >
            Mint
          </Link>
          <Link 
            href={ROUTES.CLAIM} 
            className={`text-sm font-medium tracking-wide transition-colors ${activePage === 'claim' ? 'text-white' : 'text-white/70 hover:text-white'}`}
          >
            Claim
          </Link>
          <div className="ml-4">
            <WalletConnectButton />
          </div>
          <a
            href="https://www.linkedin.com/in/ayushshrivastv/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-white/80 hover:text-[#0077b5] hover:bg-white/10 transition-all flex items-center justify-center"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md transition-all duration-300 z-40 border-t border-white/10 ${mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'}`}
      >
        <nav className="container mx-auto px-6 flex flex-col space-y-4">
          <Link 
            href={ROUTES.MINT} 
            className={`text-sm font-medium py-2 transition-colors ${activePage === 'mint' ? 'text-white' : 'text-white/70 hover:text-white'}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Mint
          </Link>
          <Link 
            href={ROUTES.CLAIM} 
            className={`text-sm font-medium py-2 transition-colors ${activePage === 'claim' ? 'text-white' : 'text-white/70 hover:text-white'}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Claim
          </Link>
          <div className="py-2">
            <WalletConnectButton />
          </div>
          <div className="flex items-center space-x-4 py-2">
            <a
              href="https://www.linkedin.com/in/ayushshrivastv/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-white/80 hover:text-[#0077b5] hover:bg-white/10 transition-all flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
