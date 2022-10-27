import { rest } from "msw";
import { path } from ".";
import { data } from "./data";
import { Response } from "./type";

export const mockGetTime = (status = 200) =>
  rest.get<{}, {}, Response>(path(), async (_, res, ctx) => {
    return res(ctx.status(status), ctx.json(data()));
  });

export const handlers = [mockGetTime()];
