import { FlickrImageSize } from "../../constants/constants";
import { FlickrPhoto } from "../../types/flickrTypes";
import { ImageUrls } from "../../types/imageTypes";
import { getImageUrls } from "../getImageUrls";

const testPhoto: FlickrPhoto = {
  id: "123",
  secret: "abc",
  server: "001",
  title: "Test Photo",
};

const validSmallUrl = `https://live.staticflickr.com/${testPhoto.server}/${testPhoto.id}_${testPhoto.secret}${FlickrImageSize.SMALL}`;
const validMediumUrl = `https://live.staticflickr.com/${testPhoto.server}/${testPhoto.id}_${testPhoto.secret}${FlickrImageSize.MEDIUM}`;
const validLargeUrl = `https://live.staticflickr.com/${testPhoto.server}/${testPhoto.id}_${testPhoto.secret}${FlickrImageSize.LARGE}`;

describe("getImagesUrls", () => {
  it("should return constructed URLS if they are valid", () => {
    const result: ImageUrls = getImageUrls(testPhoto);

    expect(result.small).toBe(validSmallUrl);
    expect(result.medium).toBe(validMediumUrl);
    expect(result.large).toBe(validLargeUrl);
  });
});
