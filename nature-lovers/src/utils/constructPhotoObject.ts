import {
  FlickrImageAuthor,
  FlickrPhoto,
} from "../../nature-lovers/src/types/flickrTypes";
import { Photo } from "../../nature-lovers/src/types/imageTypes";

const defaultAuthor: FlickrImageAuthor = {
  id: "",
  username: "Unknown",
  realname: "Unknown",
};

export const constructPhotoObject = (
  photoList: FlickrPhoto[],
  details: FlickrImageAuthor[]
): Photo[] => {
  const detailsMap = new Map(details.map((detail) => [detail.id, detail]));

  return photoList.map((photo) => ({
    ...photo,
    author: photo.owner
      ? detailsMap.get(photo.owner) || defaultAuthor
      : defaultAuthor,
  }));
};
