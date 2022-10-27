import Link from "next/link";
import styles from "./styles.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.module}>
      <Link href={`/`}>/</Link>
      {children}
    </div>
  );
}
