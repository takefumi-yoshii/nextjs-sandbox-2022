import { renderSegment, setupMockServer } from "@/mock/jest";
import { screen } from "@testing-library/react";
import { mockGetMessage } from "./.api/getMessage/mock";
import { mockGetTime } from "./.api/getTime/mock";
import Error from "./error";
import Layout from "./layout";
import NotFound from "./not-found";
import Page from "./page";

const server = setupMockServer(mockGetMessage(), mockGetTime());
const segment = { Layout, Page, NotFound, Error };

test("When data fetch succeed, All contents will be display", async () => {
  const searchParams = { greet: "Hi" };
  await renderSegment({ ...segment, searchParams });
  expect(screen.getByText(searchParams.greet)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Test/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "push me" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "/" })).toBeInTheDocument();
});

test("API Client have been called with searchParams", async () => {
  const mock = jest.fn();
  server.use(mockGetMessage({ mock }));
  const searchParams = { greet: "Hi" };
  await renderSegment({ ...segment, searchParams });
  expect(mock).toHaveBeenCalledWith({ searchParams });
});

test("When data fetch failed, An error message will be display", async () => {
  server.use(mockGetMessage({ status: 500 }));
  await renderSegment({ ...segment });
  expect(screen.getByText("message: 500")).toBeInTheDocument();
});

test("When response message is empty, NotFound will be display", async () => {
  const mock = jest.fn();
  server.use(mockGetMessage({ status: 200, stub: { message: "" }, mock }));
  await renderSegment({ ...segment });
  expect(mock).toHaveBeenCalled();
  expect(screen.getByText("Not Found")).toBeInTheDocument();
});
