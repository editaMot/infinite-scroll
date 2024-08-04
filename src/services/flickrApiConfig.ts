export const getFlickrPhotosParams = (
  tags?: string
): Record<string, string> => ({
  method: "flickr.photos.search",
  api_key: process.env.REACT_APP_API_KEY ?? "",
  tags: tags ?? "",
  format: "json",
  nojsoncallback: "1",
});

export const getPhotoDetailsParams = (
  photoId: string
): Record<string, string> => ({
  method: "flickr.photos.getInfo",
  api_key: process.env.REACT_APP_API_KEY ?? "",
  photo_id: photoId,
  format: "json",
  nojsoncallback: "1",
});
