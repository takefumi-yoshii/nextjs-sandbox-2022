import Link from "next/link";
import { getData } from "./.api";

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <h1>Hello, Next.js!{data.message}</h1>
      <Link href="/test">down</Link>
    </div>
  );
}

if (process.env.MOCKING_ENABLED === "true") {
  const { server, handlers } = require("./.api/mock");
  server.use(...handlers);
}
