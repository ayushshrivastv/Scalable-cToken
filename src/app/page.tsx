import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layouts/page-layout';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="container mx-auto py-20 flex flex-col items-center justify-center flex-1 text-center animate-fade-in">
        <div className="inline-block mb-8 bg-primary/10 px-4 py-2 rounded-full">
          <span className="text-primary font-medium text-sm">Powered by Light Protocol</span>
        </div>
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-slide-up" style={{animationDelay: '100ms'}}>
          Scalable cToken Issuance via Solana Pay
        </h1>
        <p className="text-xl mb-12 max-w-2xl text-muted-foreground animate-slide-up" style={{animationDelay: '200ms'}}>
          Demonstrating scalable compressed token (cToken) issuance and distribution on Solana using Solana Pay, powered by Light Protocol's state compression technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl animate-slide-up" style={{animationDelay: '300ms'}}>
          <Link href={ROUTES.MINT} className="transition-transform hover:scale-[1.02]">
            <Button size="lg" className="w-full py-6 text-lg shadow-lg transition-all hover:shadow-xl hover:bg-primary/90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Create Event Token
            </Button>
          </Link>
          <Link href={ROUTES.CLAIM} className="transition-transform hover:scale-[1.02]">
            <Button size="lg" variant="outline" className="w-full py-6 text-lg shadow-md transition-all hover:shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM4 7a1 1 0 000 2h6a1 1 0 000-2H4z" clipRule="evenodd" />
              </svg>
              Claim Your Token
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20 border-t border-border">
        <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-fade-in">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-border rounded-lg p-6 shadow-md transition-all duration-300 card-hover animate-slide-up" style={{animationDelay: '100ms'}}>
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM4 7a1 1 0 000 2h6a1 1 0 000-2H4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">ZK Compression</h3>
            <p className="text-muted-foreground">
              Mint compressed tokens that are orders of magnitude cheaper than traditional NFTs while preserving the security of the Solana blockchain.
            </p>
          </div>
          <div className="border border-border rounded-lg p-6 shadow-md transition-all duration-300 card-hover animate-slide-up" style={{animationDelay: '200ms'}}>
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Solana Pay QR Codes</h3>
            <p className="text-muted-foreground">
              Easily distribute tokens to attendees with QR codes that can be scanned with any Solana Pay compatible wallet.
            </p>
          </div>
          <div className="border border-border rounded-lg p-6 shadow-md transition-all duration-300 card-hover animate-slide-up" style={{animationDelay: '300ms'}}>
            <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Event Metadata</h3>
            <p className="text-muted-foreground">
              Attach rich metadata to your tokens including event details, date, location, and custom attributes to create a lasting digital memento.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="container mx-auto py-16 text-center animate-fade-in">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/20 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">Create your first proof-of-participation token in minutes.</p>
          <Link href={ROUTES.MINT}>
            <Button size="lg" className="transition-all hover:bg-primary/90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Create Event Token
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
