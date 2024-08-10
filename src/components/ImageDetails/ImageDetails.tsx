import { Photo } from "../../types/imageTypes";
import Button from "../Button/Button";
import styles from "./ImageDetails.module.scss";

interface ImageDetailsProps {
  photo: Photo;
  isInFavourite: boolean;
  onFavouriteClick: (photo: Photo) => void;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({
  photo,
  isInFavourite,
  onFavouriteClick,
}) => {
  const { title, author } = photo;

  return (
    <div className={styles.details}>
      <p className={styles.details_title}>{title || "Title Unknown"}</p>
      <span className={styles.details_divider}></span>
      <p className={styles.details_author}>
        {author.realname || author.username}
      </p>
      <Button
        text={isInFavourite ? "Unfavourite" : "Favourite"}
        action={() => onFavouriteClick(photo)}
      />
    </div>
  );
};

export default ImageDetails;
