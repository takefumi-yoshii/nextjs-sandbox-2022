import { Response } from "./type";

export const stub = (injects?: Partial<Response>): Response => {
  return { time: new Date().toISOString(), ...injects };
};
