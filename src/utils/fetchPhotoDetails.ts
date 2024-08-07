import { ENDPOINT_URL } from "../constants/constants";
import { FlickrApiMethods, FlickrImageAuthor } from "../types/flickrTypes";

export const fetchPhotoDetails = async (
  photoIds: string[]
): Promise<FlickrImageAuthor[]> => {
  if (photoIds.length === 0) return [];

  const fetchPromises = photoIds.map(async (photo_id) => {
    if (!photo_id) throw new Error("photo_id is required");

    const params: Record<string, string> = {
      method: FlickrApiMethods.GetInfo,
      api_key: process.env.REACT_APP_API_KEY ?? "",
      photo_id,
      format: "json",
      nojsoncallback: "1",
    };

    const URL_PARAMS = new URLSearchParams(params).toString();
    const response = await fetch(`${ENDPOINT_URL}?${URL_PARAMS}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `API request failed for photo ID ${photo_id} with status: ${data.stat}`
      );
    }

    return {
      id: data.photo.owner.nsid,
      username: data.photo.owner.username,
      realname: data.photo.owner.realname,
    };
  });

  return Promise.all(fetchPromises);
};
