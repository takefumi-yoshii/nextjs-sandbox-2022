import Link from "next/link";
import { getData } from "./.api/getData";
import "./.api/msw";
import styles from "./styles.module.css";
import { combinePageMiddlewares } from "@/utils/middlewares/page/combinePageMiddleware";
import { withLogin } from "@/utils/middlewares/page/withLogin";
import { withZod, z } from "@/utils/middlewares/page/withZod";
import { stringAsPositiveInt } from "@/utils/zod";

const withValidate = withZod(
  z.object({ params: z.object({ id: stringAsPositiveInt }) })
);
export default combinePageMiddlewares(
  withLogin,
  withValidate,
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
