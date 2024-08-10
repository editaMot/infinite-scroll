import { useCallback, useEffect, useState } from "react";
import { ENDPOINT_URL } from "../constants/constants";
import {
  FetchFlickrDataParams,
  FlickrApiResponse,
  FlickrImagesTags,
  ItemsPerPage,
} from "../types/flickrTypes";

interface UseFetchDataReturn {
  data: FlickrApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

const useFetchData = ({
  method,
  page,
  tag,
  itemsPerPage,
}: FetchFlickrDataParams): UseFetchDataReturn => {
  const [data, setData] = useState<FlickrApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!method || !page) return;

    const URL_PARAMS = new URLSearchParams({
      method,
      api_key: import.meta.env.VITE_APP_API_KEY ?? "",
      format: "json",
      nojsoncallback: "1",
      per_page: itemsPerPage
        ? String(itemsPerPage)
        : String(ItemsPerPage.default),
      page: page ? String(page) : "1",
      tags: tag || FlickrImagesTags.Mountain,
    });
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${ENDPOINT_URL}?${URL_PARAMS}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      throw new Error("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage, page, tag, method]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
};

export default useFetchData;
