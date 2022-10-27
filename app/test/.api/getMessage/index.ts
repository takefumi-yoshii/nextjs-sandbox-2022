import { Response } from "./type";

export const path = () => `https://api.example.com/message`;

export const getMessage = async () => {
  const res = await fetch(path(), { cache: "no-store" });
  if (!res.ok) throw new Error(`${res.status}`);
  const data: Response = await res.json();
  return data;
};
