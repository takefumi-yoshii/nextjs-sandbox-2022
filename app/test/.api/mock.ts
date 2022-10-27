import { server } from "@/mock/server";
import { rest } from "msw";
import { path } from ".";
import { Response } from "./type";

export const mockGetData = () =>
  rest.get<{}, {}, Response>(path(), async (_, res, ctx) => {
    const d = new Date().toISOString();
    return res(ctx.status(200), ctx.json({ message: d }));
  });

const handlers = [mockGetData()];

export { server, handlers };
