import Link from "next/link";
import { getData } from "./.api/getData";
import "./.api/msw";

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <p>{data.time}</p>
      <Link href="/test">down</Link>
    </div>
  );
}
