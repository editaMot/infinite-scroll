import { useState } from "react";
import { useFavouriteImage } from "@hooks/useFavouriteImage";
import { Photo } from "@customTypes/imageTypes";
import { ImageDetails, ResponsiveImage } from "../index";
import styles from "./ImageCard.module.scss";

interface ImageCardProps {
  photo: Photo;
}

export const ImageCard: React.FC<ImageCardProps> = ({ photo }) => {
  const { handleFavouriteClick, addedToFavourite } = useFavouriteImage(photo);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = (): void => setShowDetails(true);

  const handleHideDetails = (): void => setShowDetails(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!showDetails) {
        handleShowDetails();
      } else {
        handleHideDetails();
      }
    }
  };

  return (
    <div
      className={styles.card}
      onMouseMove={handleShowDetails}
      onMouseLeave={handleHideDetails}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {showDetails && (
        <ImageDetails
          photo={photo}
          onFavouriteClick={handleFavouriteClick}
          isInFavourite={addedToFavourite}
        />
      )}
      <ResponsiveImage photo={photo} />
      {addedToFavourite && (
        <span className={styles.favourited}>
          <span className={styles.favourited__content}>❤</span>
        </span>
      )}
    </div>
  );
};
