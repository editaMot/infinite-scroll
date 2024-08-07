import ImageCard from "../../../../components/ImageCard/ImageCard";
import usePhotos from "../../../../hooks/usePhotos";
import styles from "./ImagesList.module.scss";

const ImagesList: React.FC = () => {
  const { photos, isLoading, error } = usePhotos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.list}>
      {photos.map((photo) => (
        <ImageCard photo={photo} key={photo.id} />
      ))}
    </div>
  );
};

export default ImagesList;
