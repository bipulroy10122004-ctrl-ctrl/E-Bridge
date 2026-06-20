'use client';

const CATEGORY_ICONS = {
  'Resistors': '⚡',
  'Capacitors': '🔋',
  'Transistors': '🔌',
  'Diodes & LEDs': '💡',
  'ICs & Microcontrollers': '🧮',
  'Sensors': '📡',
  'Connectors': '🔗',
  'PCBs & Boards': '🟩',
  'Motors & Actuators': '⚙️',
  'Displays': '🖥️',
  'Power Supplies': '🔌',
  'Cables & Wires': '🔌',
  'Other': '📦',
};

export default function ProductCard({ product, onBuy, onAdd }) {
  const icon = CATEGORY_ICONS[product.category] || '📦';
  const conditionClass = product.condition?.toLowerCase() === 'excellent'
    ? 'condition-excellent'
    : product.condition?.toLowerCase() === 'good'
    ? 'condition-good'
    : 'condition-fair';

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <div className="product-image">
        {icon}
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}
        <div className="product-meta">
          <span className="product-price">₹{product.price?.toLocaleString()}</span>
          <span className={`product-condition ${conditionClass}`}>
            {product.condition}
          </span>
        </div>
        <div className="product-actions">
          <button 
            className="btn btn-buy" 
            onClick={() => onBuy(product)}
            id={`buy-${product.id}`}
          >
            Buy Now
          </button>
          <button 
            className="btn btn-add" 
            onClick={() => onAdd(product)}
            id={`add-${product.id}`}
            title="Add to list"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
