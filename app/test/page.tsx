import { withZod, z } from "@/utils/zod";
import { notFound } from "next/dist/client/components/not-found";
import Link from "next/link";
import { getMessage } from "./.api/getMessage";
import "./.api/msw";
import { Component } from "./component";
import styles from "./styles.module.css";

export default withZod(
  z.object({
    searchParams: z.object({ greet: z.string().optional() }),
  }),
  async ({ searchParams }) => {
    const data = await getMessage();
    if (!data.message) throw notFound();
    return (
      <div className={styles.module}>
        <p>{data.message}</p>
        {searchParams.greet && <p>{searchParams.greet}</p>}
        <Link href="/test/1">down</Link>
        <Component />
      </div>
    );
  }
);
