import Link from "next/link";
import { ReactNode } from "react";
import "./.api/msw";
import styles from "./styles.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.module}>
      <h2>Test</h2>
      {children}
      <Link href={`/`}>/</Link>
    </div>
  );
}
