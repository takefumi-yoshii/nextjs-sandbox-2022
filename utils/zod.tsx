import { ReactElement } from "react";
import { z, ZodError, ZodSchema } from "zod";

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

export function withZod<T extends ZodSchema>(
  schema: T,
  next: (props: z.infer<T>) => Promise<ReactElement>
) {
  return async function Page(props: unknown) {
    validate(props, schema);
    return await next(props);
  };
}

export const positiveInt = [
  (v) => Number.isInteger(+v) && +v > 0,
  "Require positive int.",
] as const;

export { z };
