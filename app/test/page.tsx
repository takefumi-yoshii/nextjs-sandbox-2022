import { withZod, z } from "@/utils/zod";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getMessage } from "./.api/getMessage";
import "./.api/msw";
import { Component } from "./component";
import styles from "./styles.module.css";

export default withZod(
  { searchParams: { greet: z.string().optional() } },
  async ({ searchParams: { greet } }) => {
    const { message } = await getMessage({ greet });
    if (!message) throw notFound();
    return (
      <div className={styles.module}>
        <p>{message}</p>
        {greet && <p>{greet}</p>}
        <Link href="/test/1">down</Link>
        <Component />
      </div>
    );
  }
);
