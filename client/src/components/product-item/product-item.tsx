import React from 'react';
import {
  useAddToShoppingCart,
  useAvailableInStock,
} from '../../hooks/shopping-car-thooks/shopping-cart-hooks';
import { Product } from '../../types/products';
import './product-item.css';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const addToShoppingCart = useAddToShoppingCart();
  const availableInStock = useAvailableInStock(product);
  return (
    <div className="ProductItem">
      <div className="ProductItem-nameAndPrice">
        <div className="ProductItem-name">{product.name}</div>
        <div>{product.price.toFixed(2)} EUR</div>
      </div>
      <div className="ProductItem-stock">In stock: {availableInStock}</div>
      {availableInStock > 0 && (
        <div
          className="ProductItem-buy"
          onClick={() => addToShoppingCart(product)}
        >
          Buy
        </div>
      )}
    </div>
  );
};

export default ProductItem;
