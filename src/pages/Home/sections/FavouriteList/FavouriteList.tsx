import { Error, ImageCard } from "@components/index";
import { favouriteImagesContext } from "@contexts/favouriteImagesContext";
import { useContext } from "react";
import styles from "./FavouriteList.module.scss";

export const FavouriteList: React.FC = () => {
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
