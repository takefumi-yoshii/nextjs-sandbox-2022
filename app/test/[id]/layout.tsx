import Link from "next/link";
import { ReactNode } from "react";
import styles from "./styles.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.module}>
      {children}
      <Link href={`/test`}>/test</Link>
    </div>
  );
}
