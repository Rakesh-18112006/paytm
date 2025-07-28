import "@repo/ui/styles.css";
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import Navbar from '../components/Navbar'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Paytm- Rakesh',
  description: 'A fast, secure payment app.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
         {/* @ts-ignore */}
        <Navbar session={session} />

        <main>{children}</main>
      </body>
    </html>
  );
}
