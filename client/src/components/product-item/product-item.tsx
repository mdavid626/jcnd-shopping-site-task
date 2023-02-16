import classnames from 'classnames';
import React from 'react';
import {
  useAddToShoppingCart,
  useAvailableInStock,
} from '../../hooks/shopping-car-thooks/shopping-cart-hooks';
import { Product } from '../../types/products';
import Currency from '../currency/currency';
import './product-item.css';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const addToShoppingCart = useAddToShoppingCart();
  const availableInStock = useAvailableInStock(product);
  return (
    <div className="ProductItem" data-testid={`ProductItem-${product.id}`}>
      <div className="ProductItem-name">{product.name}</div>
      <div className="ProductItem-priceAndStock">
        <Currency priceInCents={product.priceInCents} />
        <div className="ProductItem-stock">In stock: {availableInStock}</div>
      </div>
      <div
        className={classnames('ProductItem-buy', {
          'ProductItem-buy--disabled': availableInStock <= 0,
        })}
        onClick={() => addToShoppingCart(product)}
      >
        Buy
      </div>
    </div>
  );
};

export default ProductItem;
