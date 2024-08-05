import { useState } from "react";
import { useFavouriteImage } from "../../hooks/useFavouriteImage";
import { Photo } from "../../types/imageTypes";
import ImageDetails from "../ImageDetails/ImageDetails";
import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";
import styles from "./ImageCard.module.scss";

interface ImageCardProps {
  photo: Photo;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo }) => {
  const { handleFavouriteClick, addedToFavourite } = useFavouriteImage(photo);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = (): void => setShowDetails(true);

  const handleHideDetails = (): void => setShowDetails(false);

  return (
    <div
      className={styles.card}
      onMouseMove={handleShowDetails}
      onMouseLeave={handleHideDetails}
    >
      {showDetails && (
        <ImageDetails
          photo={photo}
          onFavouriteClick={handleFavouriteClick}
          isInFavourite={addedToFavourite}
        />
      )}
      <ResponsiveImage photo={photo} />
    </div>
  );
};

export default ImageCard;
