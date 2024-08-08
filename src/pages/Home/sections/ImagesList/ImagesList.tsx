import { useCallback } from "react";
import ImageCard from "../../../../components/ImageCard/ImageCard";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import usePhotos from "../../../../hooks/usePhotos";
import { FlickrImagesTags } from "../../../../types/flickrTypes";
import styles from "./ImagesList.module.scss";
import Loader from "../../../../components/Loader/Loader";

interface ImagesListProps {
  activeFilter: FlickrImagesTags;
}

const ImagesList: React.FC<ImagesListProps> = ({ activeFilter }) => {
  const { photos, isLoading, error, loadMore } = usePhotos(activeFilter);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    [loadMore]
  );

  const sentinelRef = useIntersectionObserver<HTMLDivElement>(
    handleIntersect,
    []
  );

  if (isLoading && photos.length === 0)
    return (
      <div className={styles["loader-container"]}>
        <Loader />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

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

export default ImagesList;
