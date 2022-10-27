import { Response } from "./type";

export const data = (injects?: Partial<Response>): Response => {
  return { message: "Hello world", ...injects };
};
