import React from "react";
import { FlickrPhoto } from "../types/flickrTypes";

export interface FavouriteImagesContext {
  favouriteImagesList: FlickrPhoto[];
  updateFavouritesList: (photo: FlickrPhoto) => void;
  removeFromFavouritesList: (photo: FlickrPhoto) => void;
}

const INITIAL_VALUES: FavouriteImagesContext = {
  favouriteImagesList: [],
  updateFavouritesList: () => {},
  removeFromFavouritesList: () => {},
};

export const favouriteImagesContext: React.Context<FavouriteImagesContext> =
  React.createContext(INITIAL_VALUES);
