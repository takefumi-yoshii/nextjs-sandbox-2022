import styles from "./styles.module.css";
import Link from "next/link";
import { Component } from "./component";

export default async function Page() {
  return (
    <div className={styles.module}>
      <Link href="/test/1">down</Link>
      <Component />
    </div>
  );
}
