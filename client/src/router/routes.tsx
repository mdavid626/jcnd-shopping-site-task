import React from 'react';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import ProductsPage from '../pages/products-page/products-page';

const ErrorPage: React.FC = () => {
  throw new Error('test error');
};

const Routes: React.FC = () => (
  <RouterRoutes>
    <Route path="/" element={<ProductsPage category="vegetables" />} />
    <Route
      path="/vegetables"
      element={<ProductsPage category="vegetables" />}
    />
    <Route path="/fruits" element={<ProductsPage category="fruits" />} />
    <Route path="/cheese" element={<ProductsPage category="cheese" />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </RouterRoutes>
);

export default Routes;
