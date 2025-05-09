"use client";

import { PageLayout } from '@/components/layouts/page-layout';
import { ROUTES } from '@/lib/constants';
import { ClaimForm } from '@/components/claim/claim-form';
import { Suspense } from 'react';

export default function ClaimPage() {
  return (
    <PageLayout activePage={ROUTES.CLAIM}>
      {/* Content */}
      <div className="container mx-auto py-8 flex-1">
        <h1 className="text-3xl font-bold mb-8">Claim Your Token</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Info */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">About Token Claims</h2>
              <p className="text-muted-foreground mb-4">
                Easily claim your proof-of-participation token by entering a claim code or scanning a QR code provided by the event organizer.
              </p>

              <h3 className="font-medium text-lg mt-6 mb-2">How to Claim</h3>
              <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                <li>Connect your Solana wallet</li>
                <li>Enter the claim code or scan the QR code</li>
                <li>Approve the transaction in your wallet</li>
                <li>Receive your token in seconds</li>
              </ol>

              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium mb-2">Need help?</h3>
                <p className="text-sm text-muted-foreground">
                  Make sure your wallet is connected and you have SOL for transaction fees.
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Claim Form */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-lg p-6">
              <Suspense fallback={<div className="py-8 text-center">Loading claim form...</div>}>
                <ClaimForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
