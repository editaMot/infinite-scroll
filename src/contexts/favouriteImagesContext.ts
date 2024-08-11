import React from "react";
import { Photo } from "@customTypes/imageTypes";

export interface FavouriteImagesContext {
  favouriteImagesList: Photo[];
  updateFavouritesList: (photo: Photo) => void;
  removeFromFavouritesList: (photo: Photo) => void;
}

const INITIAL_VALUES: FavouriteImagesContext = {
  favouriteImagesList: [],
  updateFavouritesList: () => {},
  removeFromFavouritesList: () => {},
};

export const favouriteImagesContext: React.Context<FavouriteImagesContext> =
  React.createContext(INITIAL_VALUES);
