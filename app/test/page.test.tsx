import { setupMockServer, setupRender } from "@/mock/jest";
import { screen } from "@testing-library/react";
import { mockGetMessage } from "./.api/getMessage/mock";
import { mockGetTime } from "./.api/getTime/mock";
import Error from "./error";
import Layout from "./layout";
import Page from "./page";

const server = setupMockServer(mockGetMessage(), mockGetTime());

test("When data fetch succeed, all contents is displayed", async () => {
  const greet = "Hi";
  const props = { searchParams: { greet } };
  await setupRender({ renderPage: Page(props), Layout, Error });
  expect(screen.getByText(greet)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Test/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "push me" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "/" })).toBeInTheDocument();
});

test("When data fetch fails, an error message is displayed", async () => {
  server.use(mockGetMessage(500));
  await setupRender({ renderPage: Page(), Layout, Error });
  expect(screen.getByText("message: 500")).toBeInTheDocument();
});
