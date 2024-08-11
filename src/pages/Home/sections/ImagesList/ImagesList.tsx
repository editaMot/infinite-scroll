import { Error, ImageCard, Loader } from "@components/index";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import usePhotos from "@hooks/usePhotos";
import { useCallback } from "react";
import { FlickrImagesTags } from "@customTypes/flickrTypes";
import styles from "./ImagesList.module.scss";

interface ImagesListProps {
  activeFilter: FlickrImagesTags;
}

export const ImagesList: React.FC<ImagesListProps> = ({ activeFilter }) => {
  const { photos, isLoading, error, loadMore } = usePhotos(activeFilter);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    [loadMore]
  );

  const sentinelRef = useIntersectionObserver<HTMLDivElement>(handleIntersect);

  if (isLoading && photos.length === 0)
    return (
      <div className={styles["loader-container"]}>
        <Loader />
      </div>
    );

  if (error) return <Error errorMessage={error} />;

  return (
    <div className={styles.list}>
      {photos.map((photo, index) => (
        <ImageCard photo={photo} key={photo.id + index} />
      ))}
      <div className={styles.sentinelRef} ref={sentinelRef}>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};
