import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevNotes - Minimalist Dark Note App',
  description: 'Built with Next.js, React, TypeScript, and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}