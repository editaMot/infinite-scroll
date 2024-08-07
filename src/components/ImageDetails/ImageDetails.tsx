import { FlickrPhoto } from "../../types/flickrTypes";
import { Photo } from "../../types/imageTypes";
import Button from "../Button/Button";
import styles from "./ImageDetails.module.scss";

interface ImageDetailsProps {
  photo: Photo;
  isInFavourite: boolean;
  onFavouriteClick: (photo: FlickrPhoto) => void;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({
  photo,
  isInFavourite,
  onFavouriteClick,
}) => {
  const { title, author } = photo;

  return (
    <div className={styles.details}>
      <p className={styles.details_title}>{title}</p>
      <span className={styles.details_divider}></span>
      <p className={styles.details_author}>{author.realname}</p>
      <Button
        text={isInFavourite ? "Unfavourite" : "Favourite"}
        action={() => onFavouriteClick(photo)}
      />
    </div>
  );
};

export default ImageDetails;
