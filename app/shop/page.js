'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import SellForm from '../../components/SellForm';

const ALL_CATEGORIES = [
  'All',
  'ICs & Microcontrollers',
  'PCBs & Boards',
  'Capacitors',
  'Resistors',
  'Displays',
  'Sensors',
  'Motors & Actuators',
  'Power Supplies',
  'Connectors',
  'Cables & Wires',
  'Transistors',
  'Diodes & LEDs',
  'Other',
];

export default function ShopPage() {
  const [showSellForm, setShowSellForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [toast, setToast] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/shop');
        if (!res.ok) {
          throw new Error('Failed to fetch shop products');
        }
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Could not connect to the backend. Please refresh the page to try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSellSubmit = async (product) => {
    try {
      const response = await fetch('/api/shop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          category: product.category,
          price: product.price,
          condition: product.condition,
          description: product.description,
          quantity: product.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to list component for sale');
      }

      const savedProduct = await response.json();
      setProducts((prevProducts) => [savedProduct, ...prevProducts]);
      setShowSellForm(false);
      showToast('✅ Component listed for sale!');
    } catch (error) {
      console.error(error);
      showToast('❌ Error listing component. Please try again.');
    }
  };

  const handleBuy = (product) => {
    showToast(`🛒 "${product.name}" added to cart!`);
  };

  const handleAdd = (product) => {
    showToast(`➕ "${product.name}" saved to wishlist!`);
  };

  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <div className="page-container" id="shop-page">
      {/* Hero + Sell Button */}
      <div className="page-hero">
        <h1 className="page-title">🛒 SHOP</h1>
        <p className="page-subtitle">
          {">> Browse quality second-hand electronic components. One maker's surplus is another's next build."}
        </p>
      </div>

      {/* Shop Controls */}
      <div className="shop-header" id="shop-controls">
        <div className="shop-filters" id="category-filters">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              id={`filter-${cat.toLowerCase().replace(/[^a-z]/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          className="btn btn-sell"
          onClick={() => setShowSellForm(true)}
          id="sell-btn"
        >
          📦 Sell Component
        </button>
      </div>

      {/* Products Grid */}
      <div id="products-listing">
        <div className="listed-title">
          AVAILABLE COMPONENTS
          <span className="listed-count">
            {loading ? '...' : `${filteredProducts.length} items`}
          </span>
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="empty-icon loading-spinner" style={{ animation: 'spin 2s linear infinite' }}>⏳</div>
            <p className="empty-text">Connecting to server and retrieving shop listings...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <p className="empty-text" style={{ color: '#ff3333' }}>{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p className="empty-text">
              No components found in this category. Try another filter or list one for sale!
            </p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={handleBuy}
                onAdd={handleAdd}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sell Form Modal */}
      {showSellForm && (
        <SellForm
          onClose={() => setShowSellForm(false)}
          onSubmit={handleSellSubmit}
        />
      )}

      {/* Toast */}
      {toast && <div className="toast" id="toast-notification">{toast}</div>}
    </div>
  );
}

