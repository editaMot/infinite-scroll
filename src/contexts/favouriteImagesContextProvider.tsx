import { Photo } from "@customTypes/imageTypes";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { favouriteImagesContext } from "./favouriteImagesContext";

interface Props {
  children: ReactNode;
}

enum LocalStorageKey {
  favouriteImages = "favourite-images",
}

export const FavouriteImagesContextProvider: React.FC<Props> = ({
  children,
}) => {
  const [favouriteImagesList, setFavouriteImagesList] = useState<Photo[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const savedFavourites = localStorage.getItem(
      LocalStorageKey.favouriteImages
    );
    if (savedFavourites) {
      try {
        const parsedFavourites = JSON.parse(savedFavourites);
        setFavouriteImagesList(parsedFavourites);
      } catch (error) {
        localStorage.removeItem(LocalStorageKey.favouriteImages);
        throw new Error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(
        LocalStorageKey.favouriteImages,
        JSON.stringify(favouriteImagesList)
      );
    }
  }, [favouriteImagesList, initialized]);

  const updateFavouritesList = useCallback((photo: Photo): void => {
    setFavouriteImagesList((prev) => {
      const newList = [...prev, photo];
      return newList;
    });
  }, []);

  const removeFromFavouritesList = useCallback((photo: Photo): void => {
    setFavouriteImagesList((prev) => {
      const newList = prev.filter((favPhoto) => favPhoto.id !== photo.id);
      return newList;
    });
  }, []);

  return (
    <favouriteImagesContext.Provider
      value={{
        favouriteImagesList,
        updateFavouritesList,
        removeFromFavouritesList,
      }}
    >
      {children}
    </favouriteImagesContext.Provider>
  );
};
