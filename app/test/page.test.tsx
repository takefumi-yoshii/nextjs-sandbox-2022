import { screen } from "@testing-library/react";
import { mockGetMessage } from "./.api/getMessage/mock";
import { mockGetTime } from "./.api/getTime/mock";
import Error from "./error";
import Layout from "./layout";
import NotFound from "./not-found";
import Page from "./page";
import { renderRoute, setupMockServer } from "@/utils/jest";

const server = setupMockServer(mockGetMessage(), mockGetTime());
const files = { Layout, Page, NotFound, Error };

test("When data fetch succeed, All contents will be display", async () => {
  await renderRoute({ ...files });
  expect(screen.getByRole("heading", { name: /Test/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "down" })).toBeInTheDocument();
});

test("When access with ?greet=, value will be display", async () => {
  const searchParams = { greet: "Hi" };
  await renderRoute({ ...files, searchParams });
  expect(screen.getByText(searchParams.greet)).toBeInTheDocument();
});

test("API Client have been called with searchParams", async () => {
  const mock = jest.fn();
  server.use(mockGetMessage({ mock }));
  const searchParams = { greet: "Hi" };
  await renderRoute({ ...files, searchParams });
  expect(mock).toHaveBeenCalledWith({ searchParams });
});

test("When data fetch failed, An error message will be display", async () => {
  server.use(mockGetMessage({ status: 500 }));
  await renderRoute({ ...files });
  expect(screen.getByText("message: 500")).toBeInTheDocument();
});

test("When response message is empty, NotFound will be display", async () => {
  const mock = jest.fn();
  server.use(mockGetMessage({ status: 200, stub: { message: "" }, mock }));
  await renderRoute({ ...files });
  expect(mock).toHaveBeenCalled();
  expect(screen.getByText("Not Found")).toBeInTheDocument();
});
