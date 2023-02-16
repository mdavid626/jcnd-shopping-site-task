/* istanbul ignore file */
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { InitialEntry, Location } from '@remix-run/router';
import { Queries, queries } from '@testing-library/react';
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
  RenderResult,
  RenderHookResult,
} from '@testing-library/react';
import React, { ReactElement, useContext } from 'react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import ShoppingCartContext from '../contexts/shopping-cart-context/shopping-cart-context';
import ShoppingCartProvider from '../contexts/shopping-cart-context/shopping-cart-provider';
import {
  ShoppingCartContextValue,
  ShoppingCartItem,
} from '../types/shopping-cart';

type SimpleRouter = {
  location?: Location;
  navigate?: NavigateFunction;
};

type RouterResult = {
  router: SimpleRouter;
};

type ApolloClientResult = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

type ShoppingCartContextResult = {
  shoppingCartContext: { value?: ShoppingCartContextValue };
};

export const renderWithRouter = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
  initialEntries?: InitialEntry[]
): RenderResult & RouterResult => {
  const router = {} as SimpleRouter;
  return {
    ...render(component, {
      wrapper: ({ children }) => {
        const Children = () => {
          router.location = useLocation();
          router.navigate = useNavigate();
          return children;
        };
        return (
          <MemoryRouter initialEntries={initialEntries}>
            <Children />
          </MemoryRouter>
        );
      },
      ...options,
    }),
    router,
  } as RenderResult & RouterResult;
};

export const renderWithFullContext = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
  initialEntries?: InitialEntry[]
): RenderResult &
  RouterResult &
  ApolloClientResult &
  ShoppingCartContextResult => {
  const router = {} as SimpleRouter;
  const apolloClient = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
  });
  const shoppingCartContext: { value?: ShoppingCartContextValue } = {};
  return {
    ...render(component, {
      wrapper: ({ children }) => {
        const Children = () => {
          router.location = useLocation();
          router.navigate = useNavigate();
          shoppingCartContext.value = useContext(ShoppingCartContext);
          return children;
        };
        return (
          <>
            <ApolloProvider client={apolloClient}>
              <ShoppingCartProvider>
                <MemoryRouter initialEntries={initialEntries}>
                  <Children />
                </MemoryRouter>
              </ShoppingCartProvider>
            </ApolloProvider>
            <div id="modal-root" data-testid="modal-root" />
          </>
        );
      },
      ...options,
    }),
    router,
    apolloClient,
    shoppingCartContext,
  } as RenderResult &
    RouterResult &
    ApolloClientResult &
    ShoppingCartContextResult;
};

export const renderHookWithRouter = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
  initialEntries?: InitialEntry[]
): RenderHookResult<Result, Props> & RouterResult => {
  const router = {} as SimpleRouter;
  return {
    ...renderHook(render, {
      wrapper: ({ children }) => {
        const Children = () => {
          router.location = useLocation();
          router.navigate = useNavigate();
          return children;
        };
        return (
          <MemoryRouter initialEntries={initialEntries}>
            <Children />
          </MemoryRouter>
        );
      },
      ...options,
    }),
    router,
  };
};

export const renderHookWithQueryClient = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>
): RenderHookResult<Result, Props> & ApolloClientResult => {
  const apolloClient = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
  });
  return {
    ...renderHook(render, {
      wrapper: ({ children }) => (
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      ),
      ...options,
    }),
    apolloClient,
  };
};

export const renderHookWithShoppingCart = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
  initialShoppingCart?: ShoppingCartItem[]
): RenderHookResult<Result, Props> & ShoppingCartContextResult => {
  let shoppingCartContext: { value?: ShoppingCartContextValue } = {};
  window.sessionStorage.setItem(
    'shoppingCart',
    JSON.stringify(initialShoppingCart || [])
  );
  return {
    ...renderHook(render, {
      wrapper: ({ children }) => {
        const Children = () => {
          shoppingCartContext.value = useContext(ShoppingCartContext);
          return children;
        };
        return (
          <ShoppingCartProvider>
            <Children />
          </ShoppingCartProvider>
        );
      },
      ...options,
    }),
    shoppingCartContext,
  };
};

export const renderHookWithShoppingCartAndQueryClientAndRouter = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
  initialShoppingCart?: ShoppingCartItem[],
  initialEntries?: string[]
): RenderHookResult<Result, Props> &
  ShoppingCartContextResult &
  ApolloClientResult &
  RouterResult => {
  const router = {} as SimpleRouter;
  const apolloClient = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
  });
  window.sessionStorage.setItem(
    'shoppingCart',
    JSON.stringify(initialShoppingCart || [])
  );
  let shoppingCartContext: { value?: ShoppingCartContextValue } = {};
  return {
    ...renderHook(render, {
      wrapper: ({ children }) => {
        const Children = () => {
          router.location = useLocation();
          router.navigate = useNavigate();
          shoppingCartContext.value = useContext(ShoppingCartContext);
          return children;
        };
        return (
          <ApolloProvider client={apolloClient}>
            <ShoppingCartProvider>
              <MemoryRouter initialEntries={initialEntries}>
                <Children />
              </MemoryRouter>
            </ShoppingCartProvider>
          </ApolloProvider>
        );
      },
      ...options,
    }),
    shoppingCartContext,
    apolloClient,
    router,
  };
};
