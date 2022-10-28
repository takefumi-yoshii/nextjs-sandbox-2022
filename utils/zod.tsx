import { ReactElement } from "react";
import { z, ZodError, ZodSchema, ZodObject, ZodRawShape } from "zod";
import { notFound } from "next/navigation";

export function validate<T extends ZodSchema>(
  target: unknown,
  schema: T
): asserts target is z.infer<T> {
  try {
    schema.parse(target);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error("400");
    }
    throw err;
  }
}

export function withZod<
  T extends { searchParams?: ZodRawShape; params?: ZodRawShape },
  P extends {
    searchParams: z.infer<ZodObject<NonNullable<T["searchParams"]>>>;
    params: z.infer<ZodObject<NonNullable<T["params"]>>>;
  }
>(recorde: T, next: (props: P) => Promise<ReactElement>) {
  return async function Page(props: P) {
    const parsed = z
      .object({
        searchParams: z.object(
          recorde.searchParams ? recorde.searchParams : {}
        ),
        params: z.object(recorde.params ? recorde.params : {}),
      })
      .safeParse(props);
    if (!parsed.success) {
      notFound();
    }
    return await next(props);
  };
}

export const positiveInt = [
  (v: string) => Number.isInteger(+v) && +v > 0,
  "Require positive int.",
] as const;

export { z };
