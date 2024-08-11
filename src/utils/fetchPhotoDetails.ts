import { ENDPOINT_URL } from "@constants/constants";
import { FlickrApiMethods, FlickrImageAuthor } from "@customTypes/flickrTypes";

export const detailsCache = new Map<string, FlickrImageAuthor>();

export const fetchPhotoDetails = async (
  photoIds: string[]
): Promise<FlickrImageAuthor[]> => {
  if (photoIds.length === 0) return [];

  const fetchPromises = photoIds.map(async (photo_id) => {
    if (!photo_id) throw new Error("photo_id is required");

    if (detailsCache.has(photo_id)) {
      return detailsCache.get(photo_id)!;
    }

    const params: Record<string, string> = {
      method: FlickrApiMethods.GetInfo,
      api_key: import.meta.env.VITE_APP_API_KEY ?? "",
      photo_id,
      format: "json",
      nojsoncallback: "1",
    };

    const URL_PARAMS = new URLSearchParams(params).toString();
    const response = await fetch(`${ENDPOINT_URL}?${URL_PARAMS}`);
    const data = await response.json();

    const photoDetail = {
      id: data.photo.owner.nsid,
      username: data.photo.owner.username,
      realname: data.photo.owner.realname,
    };

    detailsCache.set(photo_id, photoDetail);

    return photoDetail;
  });

  return Promise.all(fetchPromises);
};
