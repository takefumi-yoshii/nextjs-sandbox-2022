import { setupMockServer, renderSegment } from "@/mock/jest";
import { screen } from "@testing-library/react";
import { mockGetMessage } from "./.api/getMessage/mock";
import { mockGetTime } from "./.api/getTime/mock";
import Error from "./error";
import Layout from "./layout";
import Page from "./page";
import Loading from "./loading";
import NotFound from "./not-found";

const server = setupMockServer(mockGetMessage(), mockGetTime());

test("When data fetch succeed, all contents is displayed", async () => {
  const searchParams = { greet: "Hi" };
  await renderSegment({ searchParams, Layout, Page, Error });
  expect(screen.getByText(searchParams.greet)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Test/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "push me" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "/" })).toBeInTheDocument();
});

test("Loading is displayed when data acquisition is not complete", async () => {
  renderSegment({ Page, Loading });
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("When data fetch fails, an error message is displayed", async () => {
  expect.assertions(2);
  server.use(mockGetMessage(500));
  const promise = renderSegment({ Layout, Page, Loading, Error }).then(() => {
    expect(screen.getByText("message: 500")).toBeInTheDocument();
  });
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await promise;
});

test("NotFound is displayed when the message is empty", async () => {
  expect.assertions(2);
  server.use(mockGetMessage(200, { message: "" }));
  const promise = renderSegment({ Page, Loading, Error, NotFound }).then(() => {
    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await promise;
});
