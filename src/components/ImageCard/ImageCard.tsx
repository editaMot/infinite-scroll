import { useState } from "react";
import { Photo } from "../../types/imageTypes";
import ImageDetails from "../ImageDetails/ImageDetails";
import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";
import styles from "./ImageCard.module.scss";

interface ImageCardProps {
  photo: Photo;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = (): void => setShowDetails(true);

  const handleHideDetails = (): void => setShowDetails(false);

  return (
    <div
      className={styles.card}
      onMouseMove={handleShowDetails}
      onMouseLeave={handleHideDetails}
    >
      {showDetails && <ImageDetails photo={photo} />}
      <ResponsiveImage photo={photo} />
    </div>
  );
};

export default ImageCard;
