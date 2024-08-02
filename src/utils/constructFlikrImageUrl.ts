import { IMAGE_URL } from "../constants/constants";

export const constructFlickrImageUrl = (
  server: string,
  id: string,
  secret: string
): string => {
  if (!server || !id || !secret) {
    throw new Error("Invalid parameters: server, id, and secret are required.");
  }

  return `${IMAGE_URL}${server}/${id}_${secret}_s.jpg`;
};
