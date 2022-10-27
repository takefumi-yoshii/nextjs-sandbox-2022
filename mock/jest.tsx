import { render } from "@testing-library/react";
import { RequestHandler } from "msw";
import { setupServer } from "msw/node";
import { NOT_FOUND_ERROR_CODE } from "next/dist/client/components/not-found";
import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";

export function setupMockServer(...handlers: Array<RequestHandler>) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

export async function renderSegment({
  params = {},
  searchParams = {},
  Page,
  Layout,
  Error: ErrorPage,
  Loading,
  NotFound,
}: {
  params?: ParsedUrlQuery;
  searchParams?: ParsedUrlQuery;
  Page: (props: {
    params?: ParsedUrlQuery;
    searchParams?: ParsedUrlQuery;
  }) => Promise<React.ReactElement | void>;
  Layout?: (props: {
    children: ReactNode;
    params?: ParsedUrlQuery;
  }) => Promise<React.ReactElement>;
  Loading?: () => React.ReactElement;
  NotFound?: () => React.ReactElement;
  Error?: (props: { error: Error; reset: () => void }) => React.ReactElement;
}) {
  const resetError = jest.fn();
  const { rerender, ...renderResult } = render(Loading ? <Loading /> : null);
  const result = { ...renderResult, resetError, rerender };
  return Page({ params, searchParams })
    .then(async (Element) => {
      if (!Element) throw new Error(NOT_FOUND_ERROR_CODE);
      if (Layout) {
        rerender(await Layout({ params, children: Element }));
      } else {
        rerender(Element);
      }
      return result;
    })
    .catch((err) => {
      if (err instanceof Error && ErrorPage) {
        if (err.message === NOT_FOUND_ERROR_CODE && NotFound) {
          rerender(<NotFound />);
        } else {
          rerender(<ErrorPage error={err} reset={resetError} />);
        }
      }
      return result;
    });
}
