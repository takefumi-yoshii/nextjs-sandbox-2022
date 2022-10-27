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

test("When data fetch succeed, all contents is displayed", async () => {
  const searchParams = { greet: "Hi" };
  await renderSegment({ ...segment, searchParams });
  expect(screen.getByText(searchParams.greet)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Test/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "push me" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "/" })).toBeInTheDocument();
});

test("When data fetch fails, an error message is displayed", async () => {
  server.use(mockGetMessage(500));
  await renderSegment(segment);
  expect(screen.getByText("message: 500")).toBeInTheDocument();
});

test("NotFound is displayed when the message is empty", async () => {
  server.use(mockGetMessage(200, { message: "" }));
  await renderSegment(segment);
  expect(screen.getByText("Not Found")).toBeInTheDocument();
});
