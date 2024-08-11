import noPhoto from "@assets/no-photo.png";
import { FlickrImageSize, FlickrPhoto } from "@customTypes/flickrTypes";
import { ImageUrls } from "@customTypes/imageTypes";
import { constructFlickrImageUrl } from "./constructFlikrImageUrl";
import { isValidFlickrImageUrl } from "./flickrImageUrlValidation";

const FALLBACK_URL = noPhoto;

export const getImageUrls = (photo: FlickrPhoto): ImageUrls => {
  const urls = {
    small: constructFlickrImageUrl(photo, FlickrImageSize.SMALL),
    medium: constructFlickrImageUrl(photo, FlickrImageSize.MEDIUM),
    large: constructFlickrImageUrl(photo, FlickrImageSize.LARGE),
  };

  const validatedUrls = {
    small: isValidFlickrImageUrl(urls.small, FlickrImageSize.SMALL)
      ? urls.small
      : FALLBACK_URL,
    medium: isValidFlickrImageUrl(urls.medium, FlickrImageSize.MEDIUM)
      ? urls.medium
      : FALLBACK_URL,
    large: isValidFlickrImageUrl(urls.large, FlickrImageSize.LARGE)
      ? urls.large
      : FALLBACK_URL,
  };

  return validatedUrls;
};
