export enum FlickrApiMethods {
  SearchImages = "flickr.photos.search",
  GetInfo = "flickr.photos.getInfo",
}

export enum FlickrImagesTags {
  Mountain = "mountain",
  Forrest = "forrest",
  Sunset = "sunset",
  Beach = "beach",
}

export interface FetchFlickrDataParams {
  method: FlickrApiMethods;
  page?: number;
  itemsPerPage?: number;
  tag?: FlickrImagesTags;
  photo_id?: string;
}

export interface FlickrApiResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: string;
    photo: FlickrPhoto[];
  };
  stat: string;
}

export interface FlickrImageAuthor {
  id: string;
  username: string;
  realname: string;
}

export interface FlickrPhoto {
  id: string;
  secret: string;
  server: string;
  title: string;
  owner?: string;
}

export enum ItemsPerPage {
  default = 30,
}
