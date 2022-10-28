import { MockHandlerFactory } from "@/utils/msw";
import { rest } from "msw";
import { path } from ".";
import { stub } from "./stub";
import { Response } from "./type";

export const mockGetTime: MockHandlerFactory<Response> = (args) =>
  rest.get<{}, {}, Response>(path(), async (_, res, ctx) => {
    return res(
      ctx.status(args?.status || 200),
      ctx.delay(args?.delay || 0),
      ctx.json(stub(args?.stub))
    );
  });

export const handlers = [mockGetTime()];
