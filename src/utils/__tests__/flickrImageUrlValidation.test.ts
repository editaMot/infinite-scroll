import { FlickrImageSize } from "@customTypes/flickrTypes";
import { isValidFlickrImageUrl } from "../flickrImageUrlValidation";

describe("flickrImageUrlValidation.ts", () => {
  const testUrls = {
    [FlickrImageSize.SMALL]:
      "https://live.staticflickr.com/1234/56789_abc_s.jpg",
    [FlickrImageSize.MEDIUM]:
      "https://live.staticflickr.com/1234/56789_abc.jpg",
    [FlickrImageSize.LARGE]:
      "https://live.staticflickr.com/1234/56789_abc_b.jpg",
  };

  const invalidUrls = [
    "https://live.staticflickr.com/1234/56789_abc_s.png",
    "https://otherdomain.com/1234/56789_abc_s.jpg",
    "https://live.staticflickr.com/1234/56789_abc_s.jpg/extra",
    "https://live.staticflickr.com/1234/56789_abc_s.jpg?",
  ];

  it("should return true for valid URLS for each size", () => {
    Object.entries(testUrls).forEach(([size, url]) => {
      expect(isValidFlickrImageUrl(url, size as FlickrImageSize)).toBe(true);
    });
  });

  it("should return false for invalid URLS", () => {
    invalidUrls.forEach((url) => {
      Object.values(FlickrImageSize).forEach((size) => {
        expect(isValidFlickrImageUrl(url, size)).toBe(false);
      });
    });
  });

  it("should return false for URLs with an unknown size", () => {
    const invalidSize = "INVALID_SIZE" as unknown as FlickrImageSize;
    const url = testUrls[FlickrImageSize.SMALL];
    expect(isValidFlickrImageUrl(url, invalidSize)).toBe(false);
  });
});
