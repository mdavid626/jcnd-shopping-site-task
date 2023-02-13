import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import { Category } from '../../types/category';
import './products-page.css';

const ProductsPage: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <div className="ProductsPage">
      <Header />
      <Sidebar className="ProductsPage-sidebar">
        <div className="ProductsPage-content">{category}</div>
      </Sidebar>
      <Footer />
    </div>
  );
};

export default ProductsPage;
