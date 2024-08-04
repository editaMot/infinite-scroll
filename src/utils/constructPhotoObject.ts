import { FlickrPhoto } from "../types/flickrTypes";
import { Photo } from "../types/imageTypes";

export const constructPhotoObject = (
  photoList: FlickrPhoto[],
  details: Record<string, { author: string | undefined } | null>
): Photo[] => {
  return photoList.map((photo) => ({
    ...photo,
    author: details[photo.id]?.author || "Unknown Author",
  }));
};
