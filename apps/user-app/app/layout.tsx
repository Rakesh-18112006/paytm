import "@repo/ui/styles.css";
import './globals.css';
import { Inter } from 'next/font/google';
import Provider from "./Provider"; // new wrapper

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Paytm - Rakesh',
  description: 'A fast, secure payment app.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
