import { ReactNode } from 'react';

import type { Metadata } from 'next';

import '@/assets/styles/globals.css';
import inter from '@/assets/fonts/inter';
import Providers from '@/providers';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
