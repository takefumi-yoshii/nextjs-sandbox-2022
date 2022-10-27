import { Response } from "./type";

export const path = () => `https://api.example.com/test`;

export const getData = async () => {
  const res = await fetch(path(), { cache: "no-store" });
  const data: Response = await res.json();
  return data;
};
