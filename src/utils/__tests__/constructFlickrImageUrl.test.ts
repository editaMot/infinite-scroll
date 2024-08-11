import { describe, expect, it } from "vitest";
import { FlickrImageSize, IMAGE_URL } from "../../constants/constants";
import { FlickrPhoto } from "../../types/flickrTypes";
import { constructFlickrImageUrl } from "../constructFlikrImageUrl";

const testPhoto: FlickrPhoto = {
  id: "5678",
  secret: "abcd",
  server: "1234",
  title: "Test Photo",
};

describe("constructFlickrImageUrl", () => {
  it("should construct the correct URL", () => {
    const url = constructFlickrImageUrl(testPhoto);
    expect(url).toBe(
      `${IMAGE_URL}${testPhoto.server}/${testPhoto.id}_${testPhoto.secret}${FlickrImageSize.MEDIUM}`
    );
  });

  it("should throw an error if any required parameter is missing", () => {
    const missingFieldTests: { [key in keyof FlickrPhoto]?: string }[] = [
      { ...testPhoto, server: undefined },
      { ...testPhoto, id: undefined },
      { ...testPhoto, secret: undefined },
    ];

    missingFieldTests.forEach((invalidPhoto) => {
      expect(() =>
        constructFlickrImageUrl(invalidPhoto as unknown as FlickrPhoto)
      ).toThrow("Invalid parameters: server, id, and secret are required.");
    });
  });
});
