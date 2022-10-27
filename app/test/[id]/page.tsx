import styles from "./styles.module.css";
import Link from "next/link";
import { getData } from "./.api";

export default async function Page({ params }) {
  const data = await getData(params.id);
  return (
    <div className={styles.module}>
      <h1>
        this is test: {params.id}
        {data.message}
      </h1>
      <Link href={`/test/${+params.id + 1}`}>+1</Link>
    </div>
  );
}

if (process.env.MOCKING_ENABLED === "true") {
  const { server, handlers } = require("./.api/mock");
  server.use(...handlers);
}
