'use client';

import { useState } from 'react';

const COMPONENT_CATEGORIES = [
  'Resistors',
  'Capacitors',
  'Transistors',
  'Diodes & LEDs',
  'ICs & Microcontrollers',
  'Sensors',
  'Connectors',
  'PCBs & Boards',
  'Motors & Actuators',
  'Displays',
  'Power Supplies',
  'Cables & Wires',
  'Other',
];

const CONDITIONS = ['Excellent', 'Good', 'Fair'];

export default function SellForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    condition: '',
    description: '',
    quantity: '1',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price || !formData.condition) return;
    
    const product = {
      ...formData,
      id: Date.now(),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      date: new Date().toLocaleDateString(),
    };
    
    onSubmit(product);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" id="sell-form-modal">
        <button className="modal-close" onClick={onClose} id="sell-form-close">✕</button>
        <h2 className="modal-title">SELL A COMPONENT</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="component-name">Component Name</label>
            <input
              type="text"
              id="component-name"
              name="name"
              className="form-input"
              placeholder="e.g., Arduino Uno, 100Ω Resistor Pack..."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="component-category">Category</label>
            <select
              id="component-category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {COMPONENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="component-price">Price (₹)</label>
            <input
              type="number"
              id="component-price"
              name="price"
              className="form-input"
              placeholder="Enter price in ₹"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="component-quantity">Quantity</label>
            <input
              type="number"
              id="component-quantity"
              name="quantity"
              className="form-input"
              placeholder="How many units?"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="component-condition">Condition</label>
            <select
              id="component-condition"
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
            <label className="form-label" htmlFor="component-description">Description</label>
            <textarea
              id="component-description"
              name="description"
              className="form-textarea"
              placeholder="Describe the component, its specs, usage history..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <button type="submit" className="btn btn-sell form-submit" id="sell-form-submit">
            📦 List Component for Sale
          </button>
        </form>
      </div>
    </div>
  );
}
