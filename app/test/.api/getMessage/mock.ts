import { MockHandlerFactory } from "@/utils/msw";
import { rest } from "msw";
import { path } from ".";
import { stub } from "./stub";
import { Response } from "./type";

export const mockGetMessage: MockHandlerFactory<Response> = (args) =>
  rest.get<{}, {}, Response>(path(), async (req, res, ctx) => {
    if (args?.mock) {
      const greet = req.url.searchParams.get("greet");
      args?.mock({ searchParams: { ...(greet && { greet }) } });
    }
    return res(
      ctx.status(args?.status || 200),
      ctx.delay(args?.delay || 0),
      ctx.json(stub(args?.stub))
    );
  });

export const handlers = [mockGetMessage()];
