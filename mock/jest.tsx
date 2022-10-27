import { render } from "@testing-library/react";
import { RequestHandler } from "msw";
import { setupServer } from "msw/node";

export function setupMockServer(...handlers: Array<RequestHandler>) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

type SetupRenderProps = {
  renderPage: Promise<React.ReactElement>;
  Layout?: (props: {
    children: React.ReactNode;
  }) => Promise<React.ReactElement> | React.ReactElement;
  Error?: (props: { error: Error; reset: () => void }) => React.ReactElement;
};

export async function setupRender({
  renderPage,
  Layout,
  Error: ErrorPage,
}: SetupRenderProps) {
  const reset = jest.fn();
  const children = await renderPage.catch((err) => {
    if (err instanceof Error && ErrorPage) {
      return <ErrorPage error={err} reset={reset} />;
    }
    return null;
  });
  render(Layout ? await Layout({ children }) : children);
  return { reset };
}
