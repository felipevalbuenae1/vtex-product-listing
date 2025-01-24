
import React, { useState } from 'react';
import { Table, Input, Button } from 'vtex.styleguide';
import productsData from './data/products.json';

const ProductListPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [products, setProducts] = useState(productsData);

  const handleFilter = () => {
    const filtered = productsData.filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
    setProducts(filtered);
  };

  return (
    <div>
      <h1>Listado de Productos</h1>
      <div className="mb5">
        <Input
          placeholder="Buscar por nombre"
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
        />
        <Button onClick={handleFilter}>Filtrar</Button>
      </div>
      <Table
        schema={{
          properties: {
            name: { title: 'Nombre del Producto' },
            price: { title: 'Precio', cellRenderer: ({ cellData }) => `$${cellData}` },
            image: { title: 'Imagen', cellRenderer: ({ cellData }) => <img src={cellData} alt="Producto" style={{ width: '50px' }} /> },
            stock: { title: 'Disponibilidad' },
          },
        }}
        items={products}
      />
    </div>
  );
};

export default ProductListPage;