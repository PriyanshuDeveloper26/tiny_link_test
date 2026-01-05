import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'TinyLink - Modern URL Shortener',
  description: 'Create short, memorable links and track their performance with our powerful analytics dashboard.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'TinyLink - Modern URL Shortener',
    description: 'Create short, memorable links and track their performance.',
    url: 'https://tinylink.app',
    siteName: 'TinyLink',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen relative`}>
        {/* Sea green animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-teal-900 via-green-800 to-emerald-900 -z-10"></div>
        <div className="fixed inset-0 bg-gradient-to-tr from-sea-800 via-teal-800 to-green-900 -z-10"></div>
        <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>
        
        {/* Sea green animated floating elements */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-700/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {children}
      </body>
    </html>
  );
}
