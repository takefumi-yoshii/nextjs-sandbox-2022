import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  res.json({ message: "hello" });
};
export default handler;
