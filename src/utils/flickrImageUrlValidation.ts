import { FlickrImageSize } from "@customTypes/flickrTypes";

export const isValidFlickrImageUrl = (
  url: string,
  size: FlickrImageSize
): boolean => {
  const patterns: Record<FlickrImageSize, RegExp> = {
    [FlickrImageSize.SMALL]:
      /^https:\/\/live\.staticflickr\.com\/\d+\/\d+_\w+_s\.jpg$/,
    [FlickrImageSize.MEDIUM]:
      /^https:\/\/live\.staticflickr\.com\/\d+\/\d+_\w+\.jpg$/,
    [FlickrImageSize.LARGE]:
      /^https:\/\/live\.staticflickr\.com\/\d+\/\d+_\w+_b\.jpg$/,
  };

  const pattern = patterns[size];
  return pattern ? pattern.test(url) : false;
};
