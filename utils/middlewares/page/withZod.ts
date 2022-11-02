import { z, ZodSchema } from "zod";
import { notFound } from "next/navigation";

type DefaultProps<T = {}, U = {}> = { params: T; searchParams: U };

export function withZod<T extends ZodSchema>(schema: T) {
  return function withZodMiddleware<Props extends DefaultProps>(props: Props) {
    const parsed = schema.safeParse({
      params: { ...props.params },
      searchParams: { ...props.searchParams },
    });
    if (!parsed.success) throw notFound();
    return { ...props, ...parsed.data } as z.infer<T> & Props;
  };
}

export { z };
