import { Response } from "./type";
import { handleJsonResponse } from "@/utils/fetch";

export const path = () => `https://api.example.com/data`;

export const getData = async () => {
  const res = await fetch(path(), { cache: "no-store" });
  return await handleJsonResponse<Response>(res);
};
