'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full p-6 flex justify-between items-center z-50 fixed top-0 left-0">
      <div className="text-white font-bold text-xl tracking-tight drop-shadow-md">
        <Link href="/">WeatherApp</Link>
      </div>
      <ul className="flex gap-6">
        {[
          { name: 'Weather', path: '/' },
          { name: 'About', path: '/about' },
          { name: 'Help', path: '/help' },
        ].map((link) => (
          <li key={link.name}>
            <Link
              href={link.path}
              className={`text-sm font-medium transition-all duration-300 ${
                isActive(link.path)
                  ? 'text-white border-b-2 border-white/80 pb-1'
                  : 'text-white/60 hover:text-white hover:scale-105'
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
