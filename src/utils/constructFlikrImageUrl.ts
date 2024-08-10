import { FlickrImageSize, IMAGE_URL } from "../constants/constants";
import { FlickrPhoto } from "../types/flickrTypes";

export const constructFlickrImageUrl = (
  photo: FlickrPhoto,
  size: FlickrImageSize = FlickrImageSize.MEDIUM
): string => {
  const { server, id, secret } = photo;
  if (!server || !id || !secret) {
    throw new Error("Invalid parameters: server, id, and secret are required.");
  }

  return `${IMAGE_URL}${server}/${id}_${secret}${size}`;
};
