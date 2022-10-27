import Link from "next/link";
import { positiveInt, withZod, z } from "@/utils/zod";
import { getData } from "./.api/getData";
import "./.api/msw";
import styles from "./styles.module.css";

export default withZod(
  z.object({ params: z.object({ id: z.string().refine(...positiveInt) }) }),
  async ({ params: { id } }) => {
    const data = await getData(id);
    return (
      <div className={styles.module}>
        <h1>Test ID: {id}</h1>
        <p>{data.message}</p>
        <Link href={`/test/${+id - 1}`}>-1</Link>/
        <Link href={`/test/${+id + 1}`}>+1</Link>
      </div>
    );
  }
);
