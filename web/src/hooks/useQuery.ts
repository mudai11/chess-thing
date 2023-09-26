import { useState, useEffect } from "react";

export function useQuery<T = any>(
  api: string
): {
  isLoading: boolean;
  data: T;
  error: string;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>("");

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
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        if (e instanceof Error) {
          if (e.name === "AbortError") {
            setError("Request aborted.");
          }
        }
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
