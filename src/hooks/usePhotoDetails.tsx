import { useState, useEffect, useCallback } from "react";
import { getPhotoDetailsParams } from "../services/flickrApiConfig";
import { ENDPOINT_URL } from "../constants/constants";
import { PhotoDetail } from "../types/imageTypes";

interface UsePhotoDetailsReturn {
  details: Record<string, PhotoDetail | null>;
  isLoading: boolean;
  error: string | null;
}

export const usePhotoDetails = (photoIds: string[]): UsePhotoDetailsReturn => {
  const [details, setDetails] = useState<Record<string, PhotoDetail | null>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    if (photoIds.length === 0) {
      setDetails({});
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const fetchPromises = photoIds.map(async (photoId) => {
        const params = getPhotoDetailsParams(photoId);
        const paramString = new URLSearchParams(params).toString();
        const endpoint = `${ENDPOINT_URL}?${paramString}`;

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch details for photo ${photoId}`);
        }
        const data = await response.json();
        const photoDetail = data.photo;

        return {
          author: photoDetail.owner.username,
        } as PhotoDetail;
      });

      const results = await Promise.all(fetchPromises);

      const detailsMap: Record<string, PhotoDetail | null> = results.reduce(
        (acc: Record<string, PhotoDetail | null>, detail, index) => {
          acc[photoIds[index]] = detail;
          return acc;
        },
        {} as Record<string, PhotoDetail | null>
      );

      setDetails(detailsMap);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, [photoIds]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return { details, isLoading, error };
};
