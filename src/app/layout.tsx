import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/providers/client-provider";
// import { ThemeToggleButton } from "@/components/ui/theme-toggle-button"; // Removed - now in shared/header
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

// Primary font - Inter with variable weights
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

// Secondary font - Outfit for headings
const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <ClientProvider>
          {/* Header removed - now part of PageLayout via shared/header */}
          <main className="flex-grow">
            {children}
          </main>
          {/* Footer removed - now part of PageLayout via shared/footer */}
        </ClientProvider>
      </body>
    </html>
  );
}
