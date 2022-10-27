import { Response } from "./type";

export const path = (id: string) => `https://api.example.com/test/${id}`;

export const getData = async (id: string) => {
  const res = await fetch(path(id), { cache: "no-store" });
  const data: Response = await res.json();
  return data;
};
