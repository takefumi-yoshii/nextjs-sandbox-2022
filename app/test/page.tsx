import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessage } from "./.api/getMessage";
import "./.api/msw";
import { Component } from "./component";
import styles from "./styles.module.css";
import { combinePageMiddlewares } from "@/utils/middlewares/page/combinePageMiddleware";
import { withLogin } from "@/utils/middlewares/page/withLogin";
import { withZod, z } from "@/utils/middlewares/page/withZod";

const withValidate = withZod(
  z.object({ searchParams: z.object({ greet: z.string().optional() }) })
);
export default combinePageMiddlewares(
  withLogin,
  withValidate,
  async ({ session: { user }, searchParams: { greet } }) => {
    console.log(user);
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
