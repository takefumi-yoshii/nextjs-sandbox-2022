import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import "./.api/msw";
import { Component } from "./component";
import { getMessage } from "./.api/getMessage";
import styles from "./styles.module.css";

export default async function Page(props?: { searchParams?: ParsedUrlQuery }) {
  const data = await getMessage();
  const greet = props?.searchParams.greet;
  return (
    <div className={styles.module}>
      <p>{data.message}</p>
      {greet && <p>{greet}</p>}
      <Link href="/test/1">down</Link>
      <Component />
    </div>
  );
}
