export interface FlickrPhoto {
  id: string;
  secret: string;
  server: string;
  title?: string;
  owner?: string;
  ownername?: string;
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
