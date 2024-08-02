import { useCallback, useEffect, useState } from "react";

interface UseFetchDataReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseFetchDataProps {
  url: string;
  params?: Record<string, string>;
}

const useFetchData = <T,>({
  url,
  params,
}: UseFetchDataProps): UseFetchDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const paramString = params ? new URLSearchParams(params).toString() : "";
      const endpoint = paramString ? `${url}?${paramString}` : url;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      throw new Error("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
};

export default useFetchData;
