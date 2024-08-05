import { ReactNode, useEffect, useState, useCallback } from "react";
import { FlickrPhoto } from "../types/flickrTypes";
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
  const [favouriteImagesList, setFavouriteImagesList] = useState<FlickrPhoto[]>(
    []
  );
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

  const updateFavouritesList = useCallback((photo: FlickrPhoto): void => {
    setFavouriteImagesList((prev) => {
      const newList = [...prev, photo];
      return newList;
    });
  }, []);

  const removeFromFavouritesList = useCallback((photo: FlickrPhoto): void => {
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

// useEffect(() => {
//   const savedFavourites = localStorage.getItem(
//     LocalStorageKey.favouriteImages
//   );
//   if (savedFavourites?.length) {
//     setFavouriteImagesList(JSON.parse(savedFavourites));
//   }
// }, []);

// useEffect(() => {
//   if (favouriteImagesList.length) {
//     localStorage.setItem(
//       LocalStorageKey.favouriteImages,
//       JSON.stringify(favouriteImagesList)
//     );
//   }
// }, [favouriteImagesList, favouriteImagesList.length]);

// const updateFavouritesList = (photo: FlickrPhoto): void => {
//   setFavouriteImagesList((gallery) => [...gallery, photo]);

//   localStorage.setItem(
//     LocalStorageKey.favouriteImages,
//     JSON.stringify(favouriteImagesList)
//   );
// };

// const removeFromFavouritesList = (photo: FlickrPhoto): void => {
//   const filteredOut: FlickrPhoto[] = favouriteImagesList.filter(
//     ({ id }) => id !== photo.id
//   );

//   setFavouriteImagesList(filteredOut);
// };
