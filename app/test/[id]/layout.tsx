import Link from "next/link";
import styles from "./styles.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.module}>
      {children}
      <Link href={`/test`}>/test</Link>
    </div>
  );
}
