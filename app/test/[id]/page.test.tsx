import { setupMockServer, setupRender } from "@/mock/jest";
import { screen } from "@testing-library/react";
import { mockGetData } from "./.api/getData/mock";
import Page from "./page";

setupMockServer(mockGetData());

test("When data fetch succeed, all contents is displayed", async () => {
  await setupRender({ renderPage: Page({ params: { id: "123" } }) });
  expect(
    screen.getByRole("heading", { name: "Test ID: 123" })
  ).toBeInTheDocument();
});
