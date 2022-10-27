import { renderSegment, setupMockServer } from "@/mock/jest";
import { screen } from "@testing-library/react";
import { mockGetData } from "./.api/getData/mock";
import Error from "./error";
import Layout from "./layout";
import Loading from "./loading";
import NotFound from "./not-found";
import Page from "./page";

setupMockServer(mockGetData());
const params = { id: "123" };
const segment = { params, Layout, Page, Loading, NotFound, Error };

test("When data fetch succeed, all contents is displayed", async () => {
  expect.assertions(2);
  const promise = renderSegment(segment);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await promise;
  expect(
    screen.getByRole("heading", { name: "Test ID: 123" })
  ).toBeInTheDocument();
});

test("In case of bad parameters, Not Found error is displayed", async () => {
  expect.assertions(2);
  const promise = renderSegment({ ...segment, params: { id: "-1" } });
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await promise;
  expect(screen.getByText("Not Found")).toBeInTheDocument();
});
