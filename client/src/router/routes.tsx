import React from 'react';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import ProductsPage from '../pages/products-page/products-page';

const ErrorPage: React.FC = () => {
  throw new Error('test error');
};

const Routes: React.FC = () => (
  <RouterRoutes>
    <Route
      path="/vegetables"
      element={<ProductsPage category="VEGETABLES" />}
    />
    <Route path="/fruits" element={<ProductsPage category="FRUITS" />} />
    <Route path="/cheese" element={<ProductsPage category="CHEESE" />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route path="*" element={<Navigate to="/vegetables" replace />} />
  </RouterRoutes>
);

export default Routes;
