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
        <h1 className="text-3xl font-bold mb-8 text-white">Claim Your Token</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Info */}
          <div className="lg:col-span-1">
            <div className="bg-black border-0 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 text-white">About Token Claims</h2>
              <p className="text-zinc-300 mb-4">
                Easily claim your proof-of-participation token by entering a claim code or scanning a QR code provided by the event organizer.
              </p>

              <h3 className="font-medium text-lg mt-6 mb-2 text-white">How to Claim</h3>
              <ol className="list-decimal pl-5 text-zinc-300 space-y-2">
                <li>Connect your Solana wallet</li>
                <li>Enter the claim code or scan the QR code</li>
                <li>Approve the transaction in your wallet</li>
                <li>Receive your token in seconds</li>
              </ol>

              <div className="mt-6 pt-6 border-t border-zinc-800">
                <h3 className="font-medium mb-2 text-white">Need help?</h3>
                <p className="text-sm text-zinc-400">
                  Make sure your wallet is connected and you have SOL for transaction fees.
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Claim Form */}
          <div className="lg:col-span-2">
            <div className="bg-black border-0 rounded-lg p-6">
              <Suspense fallback={<div className="py-8 text-center text-white">Loading claim form...</div>}>
                <ClaimForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
