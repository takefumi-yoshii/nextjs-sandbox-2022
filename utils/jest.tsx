import { notFound } from "next/navigation";
import { render } from "@testing-library/react";
import { RequestHandler } from "msw";
import { setupServer } from "msw/node";
import { NOT_FOUND_ERROR_CODE } from "next/dist/client/components/not-found";
import { ReactNode } from "react";

export function setupMockServer(...handlers: Array<RequestHandler>) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

export async function renderRoute<T, K>({
  params,
  searchParams,
  Page,
  Layout,
  Error: ErrorPage,
  Loading,
  NotFound,
}: {
  params?: T;
  searchParams?: K;
  Page: (props: {
    params: T;
    searchParams: K;
  }) => Promise<React.ReactElement | void> | React.ReactElement;
  Layout?: (props: {
    params: T;
    children: ReactNode;
  }) => Promise<React.ReactElement> | React.ReactElement;
  Loading?: () => React.ReactElement;
  NotFound?: () => React.ReactElement;
  Error?: (props: { error: Error; reset: () => void }) => React.ReactElement;
}) {
  const resetError = jest.fn();
  const { rerender, ...renderResult } = render(Loading ? <Loading /> : <></>);
  const result = { ...renderResult, resetError, rerender };
  try {
    const Element = await Page({
      params: params || ({} as T),
      searchParams: searchParams || ({} as K),
    });
    if (!Element) throw notFound();
    if (Layout) {
      rerender(
        await Layout({ params: params || ({} as T), children: Element })
      );
    } else {
      rerender(Element);
    }
    return result;
  } catch (err) {
    if (err instanceof Error && ErrorPage) {
      if (err.message === NOT_FOUND_ERROR_CODE && NotFound) {
        rerender(<NotFound />);
      } else {
        rerender(<ErrorPage error={err} reset={resetError} />);
      }
    }
    return result;
  }
}
