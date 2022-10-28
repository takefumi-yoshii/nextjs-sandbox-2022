import { Response } from "./type";

export const stub = (injects?: Partial<Response>): Response => {
  return { message: "Hello world", ...injects };
};
