import Link from "next/link";
import { getData } from "./.api/getData";
import "./.api/msw";
import styles from "./styles.module.css";

export default async function Page({ params }) {
  const data = await getData(params.id);
  return (
    <div className={styles.module}>
      <h1>Test ID: {params.id}</h1>
      <p>{data.message}</p>
      <Link href={`/test/${+params.id + 1}`}>+1</Link>
    </div>
  );
}
