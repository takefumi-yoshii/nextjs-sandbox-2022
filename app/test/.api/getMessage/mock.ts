import { rest } from "msw";
import { path } from ".";
import { data } from "./data";
import { Response } from "./type";

export const mockGetMessage = (status = 200, injects?: Partial<Response>) =>
  rest.get<{}, {}, Response>(path(), async (_, res, ctx) => {
    return res(ctx.status(status), ctx.json(data(injects)));
  });

export const handlers = [mockGetMessage()];
