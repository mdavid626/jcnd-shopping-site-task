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
import React, { ReactElement, useMemo, useState } from 'react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import ShoppingCartContext from '../contexts/shopping-cart-context/shopping-cart-context';
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

export const renderWithRouterAndQueryClient = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
  initialEntries?: InitialEntry[]
): RenderResult & RouterResult & ApolloClientResult => {
  const router = {} as SimpleRouter;
  const apolloClient = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
  });
  return {
    ...render(component, {
      wrapper: ({ children }) => {
        const Children = () => {
          router.location = useLocation();
          router.navigate = useNavigate();
          return children;
        };
        return (
          <ApolloProvider client={apolloClient}>
            <MemoryRouter initialEntries={initialEntries}>
              <Children />
            </MemoryRouter>
          </ApolloProvider>
        );
      },
      ...options,
    }),
    router,
    apolloClient,
  } as RenderResult & RouterResult & ApolloClientResult;
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
  return {
    ...renderHook(render, {
      wrapper: ({ children }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [shoppingCart, setShoppingCart] = useState(
          initialShoppingCart || []
        );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        shoppingCartContext.value = useMemo(
          () => ({ shoppingCart, setShoppingCart }),
          [shoppingCart, setShoppingCart]
        );
        return (
          <ShoppingCartContext.Provider value={shoppingCartContext.value}>
            {children}
          </ShoppingCartContext.Provider>
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
  let shoppingCartContext: { value?: ShoppingCartContextValue } = {};
  return {
    ...renderHook(render, {
      wrapper: ({ children }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [shoppingCart, setShoppingCart] = useState(
          initialShoppingCart || []
        );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        shoppingCartContext.value = useMemo(
          () => ({ shoppingCart, setShoppingCart }),
          [shoppingCart, setShoppingCart]
        );
        const Children = () => {
          router.location = useLocation();
          router.navigate = useNavigate();
          return children;
        };
        return (
          <ApolloProvider client={apolloClient}>
            <ShoppingCartContext.Provider value={shoppingCartContext.value}>
              <MemoryRouter initialEntries={initialEntries}>
                <Children />
              </MemoryRouter>
            </ShoppingCartContext.Provider>
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
