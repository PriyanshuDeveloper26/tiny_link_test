import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TinyLink - URL Shortener',
  description: 'Shorten your URLs and track their performance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
