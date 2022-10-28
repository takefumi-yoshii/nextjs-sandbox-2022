import { Response } from "./type";
import qs from "qs";
import { handleJsonResponse } from "@/utils/fetch";

export const path = () => `https://api.example.com/message`;

export const getMessage = async (args?: { greet?: string }) => {
  const q = qs.stringify(args);
  const res = await fetch(q ? `${path()}?${q}` : path(), { cache: "no-store" });
  return await handleJsonResponse<Response>(res);
};
