import { Response } from "./type";
import { handleJsonResponse } from "@/utils/fetch";

export const path = (id: string) => `https://api.example.com/data/${id}`;

export const getData = async (id: string) => {
  const res = await fetch(path(id), { cache: "no-store" });
  return await handleJsonResponse<Response>(res);
};
