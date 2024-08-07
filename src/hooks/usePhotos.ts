import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlickrApiMethods,
  FlickrImageAuthor,
  FlickrImagesTags,
  FlickrPhoto,
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

const usePhotos = (activeFilter: FlickrImagesTags): UsePhotosReturn => {
  const [details, setDetails] = useState<FlickrImageAuthor[]>([]);
  const [isDetailsLoading, setIsDetailsLoading] = useState<boolean>(true);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [photos, setPhotos] = useState<FlickrPhoto[]>([]);

  const { isLoading, data, error } = useFetchData({
    method: FlickrApiMethods.SearchImages,
    tag: activeFilter,
    page,
  });

  useEffect(() => {
    setPage(1);
    setPhotos([]);
  }, [activeFilter]);

  useEffect(() => {
    if (data) {
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos.photo]);
    }
  }, [data]);

  const photoList = useMemo(() => photos, [photos]);
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

  const finalPhotos = useMemo(
    () => constructPhotoObject(photoList, details),
    [photoList, details]
  );

  return {
    photos: finalPhotos,
    isLoading: isLoading || isDetailsLoading,
    error: error || detailsError,
    loadMore,
  };
};

export default usePhotos;
