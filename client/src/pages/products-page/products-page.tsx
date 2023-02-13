import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PageLoader from '../../components/page-loader/page-loader';
import ProductItem from '../../components/product-item/product-item';
import Sidebar from '../../components/sidebar/sidebar';
import { useProducts } from '../../hooks/product-hooks/product-hooks';
import { ProductCategory } from '../../types/products';
import './products-page.css';

const ProductsPage: React.FC<{ category: ProductCategory }> = ({
  category,
}) => {
  const [queryResult, _isLoading, productsError] = useProducts(category);
  return (
    <div className="ProductsPage">
      <Header />
      <Sidebar className="ProductsPage-sidebar">
        <PageLoader
          isLoading={!queryResult}
          errorMessage={productsError?.message}
        >
          {() => (
            <div className="ProductsPage-content">
              {queryResult?.products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </PageLoader>
      </Sidebar>
      <Footer />
    </div>
  );
};

export default ProductsPage;
