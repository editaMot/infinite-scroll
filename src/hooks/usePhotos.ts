import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlickrApiMethods,
  FlickrImageAuthor,
  FlickrImagesTags,
} from "../types/flickrTypes";
import { Photo } from "../types/imageTypes";
import { constructPhotoObject } from "../utils/constructPhotoObject";
import { fetchPhotoDetails } from "../utils/fetchPhotoDetails";
import useFetchData from "./useFetchData";

interface UsePhotosReturn {
  photos: Photo[];
  isLoading: boolean;
  error: string | null;
  loadMore: () => void;
}

const usePhotos = (): UsePhotosReturn => {
  const [details, setDetails] = useState<FlickrImageAuthor[]>([]);
  const [isDetailsLoading, setIsDetailsLoading] = useState<boolean>(true);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { isLoading, data, error } = useFetchData({
    method: FlickrApiMethods.SearchImages,
    tag: FlickrImagesTags.Forrest,
    page,
  });
  const photoList = useMemo(() => data?.photos?.photo || [], [data]);
  const photoIds = useMemo(
    () => photoList.map((photo) => photo.id),
    [photoList]
  );

  useEffect(() => {
    if (photoIds.length === 0) return;

    const fetchDetails = async () => {
      try {
        const photoDetails = await fetchPhotoDetails(photoIds);
        setDetails(photoDetails);
      } catch (error) {
        setDetailsError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsDetailsLoading(false);
      }
    };

    fetchDetails();
  }, [photoIds]);

  useEffect(() => {
    if (
      data &&
      data.photos &&
      data.photos.photo.length < Number(data.photos.total)
    ) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, isLoading]);

  const photos = useMemo(
    () => constructPhotoObject(photoList, details),
    [photoList, details]
  );

  return {
    photos,
    isLoading: isLoading || isDetailsLoading,
    error: error || detailsError,
    loadMore,
  };
};

export default usePhotos;
