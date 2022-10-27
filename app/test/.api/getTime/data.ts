import { Response } from "./type";

export const data = (): Response => {
  return { time: new Date().toISOString() };
};
