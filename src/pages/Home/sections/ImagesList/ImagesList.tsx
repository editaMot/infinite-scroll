import { useCallback } from "react";
import ImageCard from "../../../../components/ImageCard/ImageCard";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import usePhotos from "../../../../hooks/usePhotos";
import styles from "./ImagesList.module.scss";

const ImagesList: React.FC = () => {
  const { photos, isLoading, error, loadMore } = usePhotos();
  console.log(photos.length);

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

  if (isLoading && photos.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.list}>
      {photos.map((photo, index) => (
        <ImageCard photo={photo} key={photo.id + index} />
      ))}
      <div ref={sentinelRef} style={{ height: "20px" }} />
    </div>
  );
};

export default ImagesList;
