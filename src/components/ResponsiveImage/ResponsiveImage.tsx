import noPhoto from "../../assets/no-photo.png";
import { RESPONSIVE_SIZES } from "../../constants/responsiveSizes";
import { Photo } from "../../types/imageTypes";
import { getImageUrls } from "../../utils/getImageUrls";
import styles from "./ResponsiveImage.module.scss";

interface ResponsiveImageProps {
  photo: Photo;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ photo }) => {
  const urls = getImageUrls(photo);

  const imageUrl = urls?.medium || noPhoto;

  return (
    <img
      src={imageUrl}
      srcSet={`${urls?.small || noPhoto} 480w, ${
        urls?.medium || noPhoto
      } 800w, ${urls?.large || noPhoto} 1200w`}
      sizes={RESPONSIVE_SIZES}
      loading="lazy"
      alt={photo.title || "Unknown"}
      className={styles.image}
    />
  );
};
