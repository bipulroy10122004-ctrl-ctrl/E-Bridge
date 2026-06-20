'use client';

import { useState, useEffect } from 'react';
import RecycleForm from '../../components/RecycleForm';

const CATEGORY_ICONS = {
  'Computers & Laptops': '💻',
  'Smartphones & Tablets': '📱',
  'Monitors & Displays': '🖥️',
  'Printers & Scanners': '🖨️',
  'Cables & Adapters': '🔌',
  'Batteries': '🔋',
  'Circuit Boards': '🟩',
  'Hard Drives & Storage': '💾',
  'Other Electronics': '📦',
};

const STATUS_LABELS = {
  pending: { label: 'Pending Pickup', className: 'status-pending' },
  received: { label: 'Received', className: 'status-received' },
  processing: { label: 'Processing', className: 'status-processing' },
};

const SAMPLE_EWASTE = [
  {
    id: 1,
    name: 'Dell Inspiron 15 Laptop',
    category: 'Computers & Laptops',
    condition: 'Not Working',
    description: 'Screen broken, motherboard intact. 8GB RAM, 256GB SSD still recoverable.',
    address: '42 Circuit Lane, Tech City',
    status: 'received',
    date: '2026-06-15',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21 Ultra',
    category: 'Smartphones & Tablets',
    condition: 'Partially Working',
    description: 'Battery bloated, screen cracked but touch works. Camera module salvageable.',
    address: '88 Silicon Ave',
    status: 'processing',
    date: '2026-06-18',
  },
  {
    id: 3,
    name: 'HP LaserJet Pro MFP',
    category: 'Printers & Scanners',
    condition: 'Not Working',
    description: 'Paper feed mechanism jammed. Toner cartridge full. Good for parts.',
    address: '15 Board Street',
    status: 'pending',
    date: '2026-06-20',
  },
];

export default function RecyclePage() {
  const [showForm, setShowForm] = useState(false);
  const [ewasteItems, setEwasteItems] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('ebridge-ewaste');
    if (stored) {
      setEwasteItems(JSON.parse(stored));
    } else {
      setEwasteItems(SAMPLE_EWASTE);
      localStorage.setItem('ebridge-ewaste', JSON.stringify(SAMPLE_EWASTE));
    }
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = (item) => {
    const updated = [item, ...ewasteItems];
    setEwasteItems(updated);
    localStorage.setItem('ebridge-ewaste', JSON.stringify(updated));
    setShowForm(false);
    showToast('✅ E-waste listed successfully!');
  };

  return (
    <div className="page-container" id="recycle-page">
      {/* Hero */}
      <div className="page-hero">
        <h1 className="page-title">♻ RECYCLE</h1>
        <p className="page-subtitle">
          {">> Responsible e-waste disposal starts here. List your old electronics and we'll handle the rest — from pickup to proper recycling."}
        </p>
      </div>

      {/* How It Works */}
      <section className="steps-section" id="how-it-works">
        <h2 className="section-title">{"// HOW IT WORKS"}</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">📋</div>
            <h3 className="step-title">LIST IT</h3>
            <p className="step-desc">
              Describe your e-waste item — what it is, its condition, and where to pick it up.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">🚚</div>
            <h3 className="step-title">SHIP IT</h3>
            <p className="step-desc">
              Schedule a convenient pickup or drop it off at a designated collection point near you.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">🔄</div>
            <h3 className="step-title">RECYCLE IT</h3>
            <p className="step-desc">
              We disassemble, sort, and recycle components responsibly. Reusable parts get a second life.
            </p>
          </div>
        </div>
      </section>

      {/* List E-Waste Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-secondary btn-list"
          onClick={() => setShowForm(true)}
          id="list-ewaste-btn"
        >
          ♻ List Your E-Waste
        </button>
      </div>

      {/* Listed Items */}
      <section className="listed-section" id="ewaste-listings">
        <div className="listed-title">
          LISTED E-WASTE
          <span className="listed-count">{ewasteItems.length} items</span>
        </div>

        {ewasteItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p className="empty-text">No e-waste listed yet. Be the first to contribute!</p>
          </div>
        ) : (
          <div className="ewaste-grid">
            {ewasteItems.map((item) => {
              const icon = CATEGORY_ICONS[item.category] || '📦';
              const statusInfo = STATUS_LABELS[item.status] || STATUS_LABELS.pending;
              return (
                <div className="ewaste-card" key={item.id} id={`ewaste-${item.id}`}>
                  <div className="ewaste-header">
                    <div className="ewaste-icon">{icon}</div>
                    <div>
                      <h3 className="ewaste-title">{item.name}</h3>
                      <p className="ewaste-category">{item.category}</p>
                    </div>
                  </div>
                  {item.description && (
                    <p className="ewaste-desc">{item.description}</p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className={`ewaste-status ${statusInfo.className}`}>
                      ● {statusInfo.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {item.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Form Modal */}
      {showForm && (
        <RecycleForm
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Toast */}
      {toast && <div className="toast" id="toast-notification">{toast}</div>}
    </div>
  );
}
