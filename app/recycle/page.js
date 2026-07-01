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

export default function RecyclePage() {
  const [showForm, setShowForm] = useState(false);
  const [ewasteItems, setEwasteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        const res = await fetch('/api/recycle');
        if (!res.ok) {
          throw new Error('Failed to fetch e-waste items');
        }
        const data = await res.json();
        setEwasteItems(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Could not connect to the backend. Please refresh the page to try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = async (item) => {
    try {
      const response = await fetch('/api/recycle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: item.name,
          category: item.category,
          condition: item.condition,
          description: item.description,
          address: item.address,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to list e-waste');
      }

      const savedItem = await response.json();
      setEwasteItems((prevItems) => [savedItem, ...prevItems]);
      setShowForm(false);
      showToast('✅ E-waste listed successfully!');
    } catch (error) {
      console.error(error);
      showToast('❌ Error listing e-waste. Please try again.');
    }
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
          <span className="listed-count">
            {loading ? '...' : `${ewasteItems.length} items`}
          </span>
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="empty-icon loading-spinner" style={{ animation: 'spin 2s linear infinite' }}>⏳</div>
            <p className="empty-text">Connecting to server and retrieving listings...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <p className="empty-text" style={{ color: '#ff3333' }}>{error}</p>
          </div>
        ) : ewasteItems.length === 0 ? (
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

