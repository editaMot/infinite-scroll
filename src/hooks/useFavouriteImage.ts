import { useContext, useEffect, useState } from "react";
import { favouriteImagesContext } from "../contexts/favouriteImagesContext";
import { FlickrPhoto } from "../types/flickrTypes";

interface UseFavouriteImageResponse {
  addedToFavourite: boolean;
  handleFavouriteClick: () => void;
}

export const useFavouriteImage = (
  photo: FlickrPhoto
): UseFavouriteImageResponse => {
  const {
    favouriteImagesList,
    removeFromFavouritesList,
    updateFavouritesList,
  } = useContext(favouriteImagesContext);

  const isFavourite = favouriteImagesList.some(
    (favImage) => favImage.id === photo.id
  );

  const [addedToFavourite, setAddedToFavourite] =
    useState<boolean>(isFavourite);

  const handleFavouriteClick = (): void => {
    if (addedToFavourite) {
      removeFromFavouritesList(photo);
    } else {
      updateFavouritesList(photo);
    }
    setAddedToFavourite(!addedToFavourite);
  };

  useEffect(() => {
    setAddedToFavourite(isFavourite);
  }, [favouriteImagesList, photo.id, isFavourite]);

  return { handleFavouriteClick, addedToFavourite };
};
