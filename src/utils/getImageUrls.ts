import { FlickrImageSize } from "../constants/constants";
import { FlickrPhoto } from "../types/flickrTypes";
import { ImageUrls } from "../types/imageTypes";
import { constructFlickrImageUrl } from "./constructFlikrImageUrl";

export const getImageUrls = (photo: FlickrPhoto): ImageUrls => {
  return {
    small: constructFlickrImageUrl(photo, FlickrImageSize.SMALL),
    medium: constructFlickrImageUrl(photo, FlickrImageSize.MEDIUM),
    large: constructFlickrImageUrl(photo, FlickrImageSize.LARGE),
  };
};
