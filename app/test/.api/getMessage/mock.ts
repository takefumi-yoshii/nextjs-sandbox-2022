import { rest } from "msw";
import { path } from ".";
import { Response } from "./type";
import { data } from "./data";

export const mockGetMessage = (status = 200, injects?: Partial<Response>) =>
  rest.get<{}, {}, Response>(path(), async (_, res, ctx) => {
    return res(ctx.status(status), ctx.json(data(injects)));
  });

export const handlers = [mockGetMessage()];
