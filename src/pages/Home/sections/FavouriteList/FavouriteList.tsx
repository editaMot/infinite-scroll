import { useContext } from "react";
import ImageCard from "../../../../components/ImageCard/ImageCard";
import { favouriteImagesContext } from "../../../../contexts/favouriteImagesContext";
import styles from "./FavouriteList.module.scss";
import Error from "../../../../components/Error/Error";

const FavouriteList: React.FC = () => {
  const { favouriteImagesList } = useContext(favouriteImagesContext);

  if (favouriteImagesList.length === 0)
    return <Error errorMessage="You don't have any favorite images yet" />;

  return (
    <div className={styles.list}>
      {favouriteImagesList.map((photo, index) => (
        <ImageCard photo={photo} key={photo.id + index} />
      ))}
    </div>
  );
};

export default FavouriteList;
