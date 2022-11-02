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

export const positiveInt = [
  (v: string) => Number.isInteger(+v) && +v > 0,
  "Require positive int.",
] as const;

export const stringAsPositiveInt = z
  .string()
  .refine(...positiveInt)
  .transform((v) => +v);

export { z };
