import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Visual Weather App by Vimlesh Kumar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen relative font-sans antialiased text-white selection:bg-sky-500/30">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
