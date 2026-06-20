'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header" id="main-header">
      <Link href="/" className="logo" id="logo-link">
        <div className="logo-icon">⚡</div>
        <span className="logo-text">E-BRIDGE</span>
      </Link>
      <nav className="nav-links" id="main-nav">
        <Link 
          href="/recycle" 
          className={`nav-link ${pathname === '/recycle' ? 'active' : ''}`}
          id="nav-recycle"
        >
          ♻ Recycle
        </Link>
        <Link 
          href="/shop" 
          className={`nav-link ${pathname === '/shop' ? 'active' : ''}`}
          id="nav-shop"
        >
          🛒 Shop
        </Link>
      </nav>
    </header>
  );
}
