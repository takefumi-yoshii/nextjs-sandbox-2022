import { renderSegment, setupMockServer } from "@/mock/jest";
import { screen } from "@testing-library/react";
import { mockGetData } from "./.api/getData/mock";
import Error from "./error";
import NotFound from "./not-found";
import Page from "./page";

setupMockServer(mockGetData());

test("When data fetch succeed, all contents is displayed", async () => {
  const params = { id: "123" };
  await renderSegment({ params, Page });
  expect(
    screen.getByRole("heading", { name: "Test ID: 123" })
  ).toBeInTheDocument();
});

test("In case of bad parameters, 400 error is displayed", async () => {
  const params = { id: "-1" };
  await renderSegment({ params, Page, Error, NotFound });
  expect(screen.getByText("Not Found")).toBeInTheDocument();
});
