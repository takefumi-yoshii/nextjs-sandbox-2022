"use client";

type Props = {
  error: Error;
  reset: () => void;
};
export default function ErrorComponent({ error, reset }: Props) {
  return (
    <div>
      <p>message: {error.message}</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}
