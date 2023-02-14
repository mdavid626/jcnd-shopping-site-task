/* istanbul ignore file */
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/error-boundary';
import ShoppingCartProvider from './contexts/shopping-cart-context/shopping-cart-provider';
import './index.css';
import Routes from './router/routes';

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('app-root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <ShoppingCartProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ShoppingCartProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
