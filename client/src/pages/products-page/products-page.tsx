import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PageLoader from '../../components/page-loader/page-loader';
import Pagination from '../../components/pagination/pagination';
import ProductItem from '../../components/product-item/product-item';
import Sidebar from '../../components/sidebar/sidebar';
import { usePagination } from '../../hooks/pagination-hooks/pagination-hooks';
import { useProducts } from '../../hooks/product-hooks/product-hooks';
import { ProductCategory } from '../../types/products';
import './products-page.css';

const ProductsPage: React.FC<{ category: ProductCategory }> = ({
  category,
}) => {
  const [currentPage, goNext, goPrevious] = usePagination();
  const [queryResult, _isLoading, productsError] = useProducts(
    category,
    currentPage
  );
  return (
    <div className="ProductsPage">
      <Header />
      <Sidebar className="ProductsPage-sidebar">
        <div className="ProductsPage-content">
          <Pagination
            pageInfo={queryResult?.products.pageInfo}
            goNext={goNext}
            goPrevious={goPrevious}
            className="ProductsPage-pagination"
          />
          <PageLoader
            isLoading={!queryResult}
            errorMessage={productsError?.message}
          >
            {() => (
              <div className="ProductsPage-products">
                {queryResult?.products.nodes.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </PageLoader>
        </div>
      </Sidebar>
      <Footer />
    </div>
  );
};

export default ProductsPage;
