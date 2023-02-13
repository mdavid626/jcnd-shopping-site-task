import React from 'react';
import { Product } from '../../types/products';
import './product-item.css';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => (
  <div className="ProductItem">
    <div className="ProductItem-nameAndPrice">
      <div className="ProductItem-name">{product.name}</div>
      <div>{product.price.toFixed(2)} EUR</div>
    </div>
    <div className="ProductItem-stock">In stock: {product.inStock}</div>
  </div>
);

export default ProductItem;
