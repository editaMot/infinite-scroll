import { useContext } from "react";
import ImageCard from "../../../../components/ImageCard/ImageCard";
import { favouriteImagesContext } from "../../../../contexts/favouriteImagesContext";
import styles from "./FavouriteList.module.scss";

const FavouriteList: React.FC = () => {
  const { favouriteImagesList } = useContext(favouriteImagesContext);

  return (
    <div className={styles.list}>
      {favouriteImagesList.map((photo, index) => (
        <ImageCard photo={photo} key={photo.id + index} />
      ))}
    </div>
  );
};

export default FavouriteList;
