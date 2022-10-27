import { setupMockServer, renderSegment } from "@/mock/jest";
import { screen } from "@testing-library/react";
import { mockGetData } from "./.api/getData/mock";
import Page from "./page";
import Error from "./error";

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
  await renderSegment({ params, Page, Error });
  expect(screen.getByText("message: 400")).toBeInTheDocument();
});
