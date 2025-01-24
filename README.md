# Módulo de Listado de Productos en VTEX Admin

Esta documentación describe el paso a paso para implementar un módulo de listado de productos utilizando React, Styleguide, y Admin Builder en VTEX IO.

## **1. Configurar el entorno de desarrollo**

### **Instalar VTEX IO CLI**
1. Asegúrate de tener instalado Node.js (versión LTS recomendada).
2. Instala VTEX IO CLI ejecutando:
   ```bash
   npm install -g @vtex/cli
   ```
3. Inicia sesión en tu cuenta de VTEX:
   ```bash
   vtex login <nombre-de-tu-cuenta>
   ```

### **Clonar el proyecto base**
1. Clona el repositorio base de VTEX Admin Builder desde GitHub:
   ```bash
   git clone https://github.com/vtex/admin-ui-example.git
   ```
2. Ingresa al directorio del proyecto clonado:
   ```bash
   cd admin-ui-example
   ```
3. Instala las dependencias del proyecto:
   ```bash
   yarn install
   ```

---

## **2. Configurar la navegación en Admin**

### **Archivo: `admin/navigation.json`**
Configura la estructura de navegación en el panel izquierdo de VTEX Admin:

```json
[
  {
    "section": "Listado de Productos",
    "subSectionItems": [
      {
        "title": "Gestor de Productos",
        "path": "/admin/app/product-list"
      }
    ]
  }
]
```

---

## **3. Definir rutas para los componentes**

### **Archivo: `admin/routes.json`**
Asocia las rutas configuradas con los componentes de React:

```json
{
  "/admin/app/product-list": {
    "component": "ProductListPage"
  }
}
```

---

## **4. Crear el componente React**

### **Archivo: `react/ProductListPage.tsx`**
Implementa el componente que renderiza el listado de productos:

```tsx
import React, { useState } from 'react';
import { Table, Input, Button } from 'vtex.styleguide';
import productsData from '../data/products.json';

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
```

---

## **5. Crear un archivo JSON con los datos de productos**

### **Archivo: `react/data/products.json`**
Define los productos estáticos para el listado:

```json
[
  {
    "name": "Producto A",
    "price": 100,
    "image": "https://via.placeholder.com/50",
    "stock": "Disponible"
  },
  {
    "name": "Producto B",
    "price": 200,
    "image": "https://via.placeholder.com/50",
    "stock": "Agotado"
  }
]
```

---

## **6. Verificar el archivo `manifest.json`**

Asegúrate de que el archivo `manifest.json` incluya las configuraciones necesarias para un proyecto de Admin Builder. Verifica que contenga las siguientes claves:

```json
{
  "vendor": "mi-vendor",
  "name": "mi-app",
  "version": "0.1.0",
  "title": "Listado de Productos",
  "description": "Módulo de listado de productos para VTEX Admin",
  "builders": {
    "react": "3.x",
    "messages": "1.x",
    "admin": "0.x"
  },
  "dependencies": {
    "vtex.styleguide": "9.x",
    "vtex.admin-pages": "1.x"
  },
  "policies": [
    {
      "name": "admin:access",
      "attrs": {
        "access": "full"
      }
    }
  ]
}
```

### **Notas clave:**
- El builder `admin` debe estar presente.
- La dependencia `vtex.styleguide` es necesaria para usar los componentes predefinidos de VTEX.

---

## **7. Descargar el proyecto preconfigurado**

Si deseas descargar el proyecto con todos los pasos anteriores ya realizados, puedes clonarlo desde el siguiente repositorio:

```bash
git clone <URL-DE-TU-REPOSITORIO>
cd <NOMBRE-DEL-REPOSITORIO>
yarn install
```

Este repositorio contiene la estructura, configuración y archivos listos para ser utilizados.

---

## **8. Consideraciones finales**

- Para probar la aplicación en un ambiente real, necesitas una cuenta VTEX con credenciales válidas.
- Debido a que no se proporcionaron credenciales para este proyecto, la implementación se documenta como un ejemplo teórico que puede ser adaptado a cualquier cuenta VTEX con acceso al Admin.
- Una vez configurado el ambiente de pruebas, puedes utilizar:
  ```bash
  vtex link
  ```
  para probar la aplicación en un espacio de desarrollo.

