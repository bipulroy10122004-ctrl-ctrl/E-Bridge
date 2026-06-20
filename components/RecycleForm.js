'use client';

import { useState } from 'react';

const CATEGORIES = [
  'Computers & Laptops',
  'Smartphones & Tablets',
  'Monitors & Displays',
  'Printers & Scanners',
  'Cables & Adapters',
  'Batteries',
  'Circuit Boards',
  'Hard Drives & Storage',
  'Other Electronics',
];

const CONDITIONS = ['Working', 'Partially Working', 'Not Working', 'Unknown'];

export default function RecycleForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    description: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.condition) return;
    
    const item = {
      ...formData,
      id: Date.now(),
      status: 'pending',
      date: new Date().toLocaleDateString(),
    };
    
    onSubmit(item);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" id="recycle-form-modal">
        <button className="modal-close" onClick={onClose} id="recycle-form-close">✕</button>
        <h2 className="modal-title">LIST YOUR E-WASTE</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="ewaste-name">Item Name</label>
            <input
              type="text"
              id="ewaste-name"
              name="name"
              className="form-input"
              placeholder="e.g., Old Laptop, Broken Monitor..."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ewaste-category">Category</label>
            <select
              id="ewaste-category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ewaste-condition">Condition</label>
            <select
              id="ewaste-condition"
              name="condition"
              className="form-select"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select condition</option>
              {CONDITIONS.map((cond) => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ewaste-description">Description</label>
            <textarea
              id="ewaste-description"
              name="description"
              className="form-textarea"
              placeholder="Describe the item, its age, brand, any issues..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ewaste-address">Pickup Address</label>
            <textarea
              id="ewaste-address"
              name="address"
              className="form-textarea"
              placeholder="Enter your address for pickup..."
              value={formData.address}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <button type="submit" className="btn btn-secondary form-submit" id="recycle-form-submit">
            ♻ Submit E-Waste Listing
          </button>
        </form>
      </div>
    </div>
  );
}
