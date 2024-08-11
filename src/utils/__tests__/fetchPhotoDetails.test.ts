import { ENDPOINT_URL } from "@constants/constants";
import { FlickrApiMethods } from "@customTypes/flickrTypes";
import { detailsCache, fetchPhotoDetails } from "../fetchPhotoDetails";

vi.stubEnv("VITE_APP_API_KEY", "fake-api-key");

describe("fetchPhotoDetails", () => {
  const mockFetch = vi.fn();
  const photoId1 = "123";

  beforeEach(() => {
    vi.clearAllMocks();
    detailsCache.clear();
    globalThis.fetch = mockFetch;
  });

  it("should fetch and return photo details", async () => {
    const mockResponse = {
      photo: {
        owner: {
          nsid: "owner1",
          username: "username1",
          realname: "Real Name 1",
        },
      },
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await fetchPhotoDetails([photoId1]);

    expect(mockFetch).toHaveBeenCalledWith(
      `${ENDPOINT_URL}?method=${FlickrApiMethods.GetInfo}&api_key=fake-api-key&photo_id=${photoId1}&format=json&nojsoncallback=1`
    );
    expect(result).toEqual([
      {
        id: "owner1",
        username: "username1",
        realname: "Real Name 1",
      },
    ]);
  });

  it("should handle errors", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Error"));

    await expect(fetchPhotoDetails([photoId1])).rejects.toThrow("Error");
  });

  it("should handle missing photo_id", async () => {
    await expect(fetchPhotoDetails([""])).rejects.toThrow(
      "photo_id is required"
    );
  });
});
