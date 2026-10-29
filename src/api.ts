
export class HttpError extends Error {
  constructor(public status: number) {
    super(`HTTP error: ${status}`);
    this.name = "HttpError";
  }
}

export async function fetchJson<T>(
  url: string,
  timeoutMs = 5000
): Promise<T> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return (await response.json()) as T;
}
