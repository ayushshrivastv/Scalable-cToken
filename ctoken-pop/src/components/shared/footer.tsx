import type { FC } from 'react';

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`border-t border-border py-8 text-center text-muted-foreground ${className}`}>
      <div className="container mx-auto">
        <p>
          Built for the Solana 1000x Hackathon - ZK Compression Track. Built by Ayush Srivastava.
        </p>
      </div>
    </footer>
  );
};
