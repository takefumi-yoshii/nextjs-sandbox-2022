import Link from "next/link";
import { ReactNode } from "react";
import styles from "./styles.module.css";
import { getTime } from "./.api/getTime";
import "./.api/msw";

export default async function Layout({ children }: { children: ReactNode }) {
  const data = await getTime();
  return (
    <div className={styles.module}>
      <h2>Test: {data.time}</h2>
      {children}
      <Link href={`/`}>/</Link>
    </div>
  );
}
