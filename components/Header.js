'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className="header" id="main-header">
      <Link href="/" className="logo" id="logo-link">
        <div className="logo-icon">⚡</div>
        <span className="logo-text">E-BRIDGE</span>
      </Link>

      {/* Desktop nav */}
      <nav className="nav-links nav-desktop" id="main-nav">
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

      {/* Mobile hamburger button */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        id="hamburger-btn"
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile slide-out nav */}
      <nav className={`nav-mobile ${menuOpen ? 'open' : ''}`} id="mobile-nav">
        <Link 
          href="/recycle" 
          className={`nav-mobile-link ${pathname === '/recycle' ? 'active' : ''}`}
          id="mobile-nav-recycle"
        >
          <span className="nav-mobile-icon">♻️</span>
          <span className="nav-mobile-text">Recycle</span>
          <span className="nav-mobile-arrow">→</span>
        </Link>
        <Link 
          href="/shop" 
          className={`nav-mobile-link ${pathname === '/shop' ? 'active' : ''}`}
          id="mobile-nav-shop"
        >
          <span className="nav-mobile-icon">🛒</span>
          <span className="nav-mobile-text">Shop</span>
          <span className="nav-mobile-arrow">→</span>
        </Link>
      </nav>
    </header>
  );
}
