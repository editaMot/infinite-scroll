import { FlickrImageAuthor, FlickrPhoto } from "./flickrTypes";

export interface ImageUrls {
  small: string;
  medium: string;
  large: string;
}

export interface Photo extends FlickrPhoto {
  author: FlickrImageAuthor;
}
