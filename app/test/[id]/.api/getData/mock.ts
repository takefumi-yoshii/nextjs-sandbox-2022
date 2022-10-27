import { rest } from "msw";
import { path } from ".";
import { data } from "./data";
import { Response } from "./type";

export const mockGetData = () =>
  rest.get<{}, {}, Response>(path(":id"), async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(data()));
  });

export const handlers = [mockGetData()];
