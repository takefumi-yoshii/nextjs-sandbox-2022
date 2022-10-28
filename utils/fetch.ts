export async function handleJsonResponse<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`${res.status}`);
  return await res.json();
}
