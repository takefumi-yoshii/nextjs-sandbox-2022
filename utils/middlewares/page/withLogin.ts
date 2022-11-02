type DefaultProps<T = {}, U = {}> = { params: T; searchParams: U };

export async function withLogin<Props extends DefaultProps>(props: Props) {
  // ... getSession here
  return Promise.resolve({
    ...props,
    session: { user: { name: "me", email: "test@example.com" } },
  });
}
