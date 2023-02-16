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
import React, { ReactElement } from 'react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router/dist/lib/hooks';

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
