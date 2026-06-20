'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import SellForm from '../../components/SellForm';

const SAMPLE_PRODUCTS = [
  {
    id: 101,
    name: 'Arduino Uno R3 Board',
    category: 'ICs & Microcontrollers',
    price: 450,
    condition: 'Excellent',
    description: 'Barely used Arduino Uno R3. All pins working. Comes with USB cable. Perfect for prototyping projects.',
    quantity: 1,
    date: '2026-06-10',
  },
  {
    id: 102,
    name: 'Raspberry Pi 4 Model B (4GB)',
    category: 'PCBs & Boards',
    price: 2800,
    condition: 'Good',
    description: 'Used for a home server project. Runs perfectly. Minor scuff on case. Includes power supply.',
    quantity: 1,
    date: '2026-06-12',
  },
  {
    id: 103,
    name: '100μF Electrolytic Capacitors (50-pack)',
    category: 'Capacitors',
    price: 120,
    condition: 'Excellent',
    description: 'Brand new surplus stock. 25V rated. Through-hole mount. Great for audio circuits and power filtering.',
    quantity: 50,
    date: '2026-06-14',
  },
  {
    id: 104,
    name: '0.96" OLED Display Module (I2C)',
    category: 'Displays',
    price: 180,
    condition: 'Excellent',
    description: 'SSD1306 driver. 128x64 pixels. Works with Arduino and ESP32. Tested and fully functional.',
    quantity: 3,
    date: '2026-06-16',
  },
  {
    id: 105,
    name: 'ESP32 Development Board',
    category: 'ICs & Microcontrollers',
    price: 350,
    condition: 'Good',
    description: 'Dual-core WiFi + Bluetooth MCU. Used in IoT project. All GPIOs functional. Flash memory intact.',
    quantity: 2,
    date: '2026-06-17',
  },
  {
    id: 106,
    name: 'HC-SR04 Ultrasonic Sensor',
    category: 'Sensors',
    price: 60,
    condition: 'Excellent',
    description: 'Measuring range: 2cm-400cm. Accuracy: 3mm. Gently used in robotics project. Like new condition.',
    quantity: 5,
    date: '2026-06-18',
  },
  {
    id: 107,
    name: 'NEMA 17 Stepper Motor',
    category: 'Motors & Actuators',
    price: 380,
    condition: 'Good',
    description: '1.8° step angle. 1.5A rated. Salvaged from 3D printer. Runs smoothly. Tested with A4988 driver.',
    quantity: 2,
    date: '2026-06-19',
  },
  {
    id: 108,
    name: '5V 3A USB-C Power Supply',
    category: 'Power Supplies',
    price: 220,
    condition: 'Fair',
    description: 'Official Raspberry Pi power supply. Cable has minor wear but connector is solid. Stable output verified.',
    quantity: 1,
    date: '2026-06-20',
  },
];

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
  const [activeFilter, setActiveFilter] = useState('All');
  const [toast, setToast] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('ebridge-products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(SAMPLE_PRODUCTS);
      localStorage.setItem('ebridge-products', JSON.stringify(SAMPLE_PRODUCTS));
    }
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSellSubmit = (product) => {
    const updated = [product, ...products];
    setProducts(updated);
    localStorage.setItem('ebridge-products', JSON.stringify(updated));
    setShowSellForm(false);
    showToast('✅ Component listed for sale!');
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
          <span className="listed-count">{filteredProducts.length} items</span>
        </div>

        {filteredProducts.length === 0 ? (
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
