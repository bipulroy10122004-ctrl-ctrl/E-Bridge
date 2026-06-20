'use client';

import { useEffect, useRef } from 'react';

export default function PCBBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduce elements on mobile for performance
    const isMobile = window.innerWidth <= 768;
    const traceCount = isMobile ? 10 : 25;
    const viaCount = isMobile ? 8 : 18;
    const chipCount = isMobile ? 3 : 6;

    for (let i = 0; i < traceCount; i++) {
      const trace = document.createElement('div');
      trace.className = `pcb-trace ${Math.random() > 0.5 ? 'horizontal' : 'vertical'}`;
      
      if (trace.classList.contains('horizontal')) {
        trace.style.top = `${Math.random() * 100}%`;
        trace.style.left = `${Math.random() * 60}%`;
        trace.style.width = `${100 + Math.random() * (isMobile ? 150 : 300)}px`;
      } else {
        trace.style.left = `${Math.random() * 100}%`;
        trace.style.top = `${Math.random() * 60}%`;
        trace.style.height = `${100 + Math.random() * (isMobile ? 150 : 300)}px`;
      }
      
      trace.style.animationDelay = `${Math.random() * 4}s`;
      trace.style.animationDuration = `${3 + Math.random() * 3}s`;
      container.appendChild(trace);
    }

    for (let i = 0; i < viaCount; i++) {
      const via = document.createElement('div');
      via.className = 'pcb-via';
      const size = 8 + Math.random() * (isMobile ? 10 : 16);
      via.style.width = `${size}px`;
      via.style.height = `${size}px`;
      via.style.top = `${Math.random() * 100}%`;
      via.style.left = `${Math.random() * 100}%`;
      via.style.animationDelay = `${Math.random() * 3}s`;
      via.style.animationDuration = `${2 + Math.random() * 3}s`;
      container.appendChild(via);
    }

    for (let i = 0; i < chipCount; i++) {
      const chip = document.createElement('div');
      chip.className = 'pcb-chip';
      const w = 30 + Math.random() * (isMobile ? 25 : 50);
      const h = 20 + Math.random() * (isMobile ? 15 : 30);
      chip.style.width = `${w}px`;
      chip.style.height = `${h}px`;
      chip.style.top = `${Math.random() * 100}%`;
      chip.style.left = `${Math.random() * 100}%`;
      container.appendChild(chip);
    }

    return () => {
      const dynamicElements = container.querySelectorAll('.pcb-trace, .pcb-via, .pcb-chip');
      dynamicElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="pcb-background" ref={containerRef}>
      <div className="pcb-grid" />
    </div>
  );
}
