"use client";

import { useRouter } from "next/navigation";

async function update() {
  const res = await fetch(`/api`);
  const data = await res.json();
  return data;
}

export function Component() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={async () => {
          const data = await update();
          console.log(data);
          router.refresh();
        }}
      >
        push me
      </button>
    </div>
  );
}
