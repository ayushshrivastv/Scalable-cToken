import type { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WalletConnectButton } from '@/components/ui/wallet-connect-button';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { Linkedin } from 'lucide-react';

interface HeaderProps {
  activePage?: string;
}

export const Header: FC<HeaderProps> = ({ activePage }) => {
  return (
    <header className="border-b border-border sticky top-0 bg-background z-10">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center gap-4">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">{APP_NAME}</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href={ROUTES.MINT}>
            <Button
              variant={activePage === ROUTES.MINT ? 'default' : 'outline'}
              className="h-auto py-2 px-3"
            >
              Create Event
            </Button>
          </Link>
          <Link href={ROUTES.CLAIM}>
            <Button
              variant={activePage === ROUTES.CLAIM ? 'default' : 'outline'}
              className="h-auto py-2 px-3"
            >
              Claim Token
            </Button>
          </Link>
          <Link 
            href="https://www.linkedin.com/in/ayushshrivastv/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center text-white bg-[#0077b5] rounded-md p-2 hover:bg-[#0066a0] transition-colors"
            aria-label="Connect on LinkedIn"
          >
            <Linkedin size={20} />
          </Link>
          <WalletConnectButton />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};
