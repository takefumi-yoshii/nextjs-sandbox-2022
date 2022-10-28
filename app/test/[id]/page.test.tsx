import { renderRoute, setupMockServer } from "@/utils/jest";
import { screen } from "@testing-library/react";
import { mockGetData } from "./.api/getData/mock";
import Error from "./error";
import Layout from "./layout";
import Loading from "./loading";
import NotFound from "./not-found";
import Page from "./page";

const server = setupMockServer(mockGetData());
const files = { Layout, Page, Loading, NotFound, Error };
const params = { id: "123" };

test("When data fetch succeed, all contents is displayed", async () => {
  const promise = renderRoute({ ...files, params });
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await promise;
  expect(
    screen.getByRole("heading", { name: "Test ID: 123" })
  ).toBeInTheDocument();
});

test("In case of bad parameters, Not Found error is displayed", async () => {
  const params = { id: "-1" };
  const promise = renderRoute({ ...files, params });
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await promise;
  expect(screen.getByText("Not Found")).toBeInTheDocument();
});

test("When data fetch failed, An error message will be display", async () => {
  server.use(mockGetData({ status: 500 }));
  await renderRoute({ ...files, params });
  expect(screen.getByText("message: 500")).toBeInTheDocument();
});
