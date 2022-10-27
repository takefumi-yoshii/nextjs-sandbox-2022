import { NextApiHandler } from "next";
import {} from "next/server";

const handler: NextApiHandler = (req, res) => {
  res.json({ message: "hello" });
};
export default handler;
