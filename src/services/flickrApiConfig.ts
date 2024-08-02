export const getFlickrPhotosParams = (
  tags?: string
): Record<string, string> => ({
  method: "flickr.photos.search",
  api_key: process.env.REACT_APP_API_KEY ?? "",
  tags: tags ?? "",
  format: "json",
  nojsoncallback: "1",
});
