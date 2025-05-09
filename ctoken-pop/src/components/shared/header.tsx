import type { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WalletConnectButton } from '@/components/ui/wallet-connect-button';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { APP_NAME, ROUTES } from '@/lib/constants';

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
        <div className="flex items-center gap-4">
          <Link href={ROUTES.MINT}>
            <Button
              variant={activePage === ROUTES.MINT ? 'default' : 'outline'}
            >
              Create Event
            </Button>
          </Link>
          <Link href={ROUTES.CLAIM}>
            <Button
              variant={activePage === ROUTES.CLAIM ? 'default' : 'outline'}
            >
              Claim Token
            </Button>
          </Link>
          <WalletConnectButton />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};
