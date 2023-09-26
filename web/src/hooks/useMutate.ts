import { useEffect, useState } from "react";

type method = "POST" | "UPDATE" | "PATCH" | "PUT" | "DELETE";

export function useMutate<TData = any, TPayload = any>(
  api: string,
  payload?: TPayload,
  method?: method
): {
  mutate: () => void;
  isLoading: boolean;
  data: TData;
  error: string;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>("");
  const [signal, setSignal] = useState<AbortSignal>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSignal(signal);

    return () => {
      controller.abort();
    };
  }, []);

  function mutate(pld?: TPayload) {
    setIsLoading(true);
    fetch(api, {
      method: method ? method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
  }

  return { mutate, isLoading, data, error };
}
