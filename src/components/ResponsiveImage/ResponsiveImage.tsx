import { getImageUrls } from "../../utils/getImageUrls";
import { RESPONSIVE_SIZES } from "../../constants/responsiveSizes";
import { Photo } from "../../types/imageTypes";
import styles from "./ResponsiveImage.module.scss";

interface ResponsiveImageProps {
  photo: Photo;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ photo }) => {
  const urls = getImageUrls(photo);

  return (
    <img
      src={urls.medium}
      srcSet={`${urls.small} 480w, ${urls.medium} 800w, ${urls.large} 1200w`}
      sizes={RESPONSIVE_SIZES}
      loading="lazy"
      alt={photo.title || "Unknown"}
      className={styles.image}
    />
  );
};

export default ResponsiveImage;
