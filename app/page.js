import Link from 'next/link';

export default function Home() {
  return (
    <section className="hero" id="homepage-hero">
      <h1 className="hero-title">E-BRIDGE</h1>
      <p className="hero-subtitle">
        {">> Bridging the gap between e-waste and sustainability. Recycle responsibly. Shop smart. Build the future from yesterday's circuits."}
      </p>

      <div className="hero-cards">
        <Link href="/recycle" className="nav-card" id="hero-recycle-card">
          <div className="nav-card-icon recycle">♻️</div>
          <h2 className="nav-card-title">RECYCLE</h2>
          <p className="nav-card-desc">
            Give your old electronics a second life. List your e-waste for responsible recycling and help reduce the digital landfill.
          </p>
          <span className="nav-card-arrow">{">>> ENTER"}</span>
        </Link>

        <Link href="/shop" className="nav-card" id="hero-shop-card">
          <div className="nav-card-icon shop">🛒</div>
          <h2 className="nav-card-title">SHOP</h2>
          <p className="nav-card-desc">
            Find quality second-hand electronic components at great prices. Buy, sell, and trade — one maker&#39;s surplus is another&#39;s treasure.
          </p>
          <span className="nav-card-arrow">{">>> ENTER"}</span>
        </Link>
      </div>
    </section>
  );
}
