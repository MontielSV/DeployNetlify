import React, { useState, useMemo } from 'react';
import './index.css';

const PRODUCTOS_DATA = [
  { id: 1, marca: 'Nike', color: 'Azul', año: '2024', nombre: 'Gorra Nike Heritage 86 Essential', precio: '129.900', img: 'https://static.dafiti.com.co/p/nike-9064-423909-1-product.jpg' },
  { id: 2, marca: 'Amiri', color: 'Negro', año: '2023', nombre: 'Gorra Amiri Canvas Logo Luxury', precio: '1.200.000', img: 'https://milanelo.com/cdn/shop/files/SS23MAH014001.4_bfb0dc5c-994e-453c-b8af-f0009ce2da72.png?v=1750870872&width=2048' },
  { id: 3, marca: 'Clemont', color: 'Beige', año: '2024', nombre: 'Classic Clemont Essential Beige', precio: '180.000', img: 'https://frutafrescaco.vtexassets.com/arquivos/ids/95889120/7709085296133.jpg?v=639109267372970000' },
  { id: 4, marca: 'Nike', color: 'Rojo', año: '2022', nombre: 'Gorra Nike Sportswear Futura', precio: '115.000', img: 'https://static.dafiti.com.co/p/nike-4799-904948-1-product.jpg' },
];

export default function Marketplace() {
  const [filtros, setFiltros] = useState({ marca: [], color: [], año: [] });

  const productosFiltrados = useMemo(() => {
    return PRODUCTOS_DATA.filter(p => {
      return (filtros.marca.length === 0 || filtros.marca.includes(p.marca)) &&
             (filtros.color.length === 0 || filtros.color.includes(p.color)) &&
             (filtros.año.length === 0 || filtros.año.includes(p.año));
    });
  }, [filtros]);

  const handleToggleFilter = (cat, val) => {
    setFiltros(prev => {
      const list = prev[cat].includes(val) ? prev[cat].filter(i => i !== val) : [...prev[cat], val];
      return { ...prev, [cat]: list };
    });
  };

  return (
    <div className="container-caps">
      <aside className="sidebar-filters">
        <h2 className="sidebar-title">FILTROS</h2>
        
        <FilterGroup title="EQUIPO / MARCA" items={['Nike', 'Amiri', 'Clemont']} cat="marca" onToggle={handleToggleFilter} />
        <FilterGroup title="COLOR" items={['Rojo', 'Azul', 'Beige', 'Negro']} cat="color" onToggle={handleToggleFilter} />
        <FilterGroup title="AÑO" items={['2024', '2023', '2022']} cat="año" onToggle={handleToggleFilter} />
      </aside>

      <main className="products-grid">
        {productosFiltrados.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-img-box">
              <img src={p.img} alt={p.nombre} loading="lazy" />
            </div>
            <div className="product-info">
              <p className="product-brand">{p.marca} • {p.año}</p>
              <h4 className="product-title">{p.nombre}</h4>
              <p className="product-price">$ {p.precio}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

function FilterGroup({ title, items, cat, onToggle }) {
  return (
    <div className="filter-group">
      <div className="filter-header">{title} <span>▲</span></div>
      <div className="filter-options">
        {items.map(item => (
          <label key={item} className="filter-item">
            <input type="checkbox" onChange={() => onToggle(cat, item)} />
            <span className="checkmark"></span>
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}