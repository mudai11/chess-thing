import { useState, useEffect } from "react";

export function useQuery<T = any>(
  api: string
): {
  isLoading: boolean;
  data: T | undefined;
  error: string | undefined;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch.");
        }

        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(undefined);
      })
      .catch((e) => {
        if (e instanceof Error) {
          if (e.name === "AbortError") {
            setError("Request aborted.");
            setData(undefined);
            return;
          }
          setError("Failed to fetch.");
          setData(undefined);
          return;
        }
        setError(e.error);
        setData(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [api]);

  return { isLoading, data, error };
}
