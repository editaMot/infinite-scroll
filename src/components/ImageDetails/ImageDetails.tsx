import { Photo } from "../../types/imageTypes";
import Button from "../Button/Button";
import styles from "./ImageDetails.module.scss";

interface ImageDetailsProps {
  photo: Photo;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ photo }) => {
  const { title, author } = photo;

  return (
    <div className={styles.details}>
      <p className={styles.details_title}>{title}</p>
      <span className={styles.details_divider}></span>
      <p className={styles.details_author}>{author}</p>
      <Button text="Favourite" action={() => console.log("btn click")} />
    </div>
  );
};

export default ImageDetails;
