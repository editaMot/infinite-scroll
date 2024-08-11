import { renderHook, waitFor } from "@testing-library/react";
import { ENDPOINT_URL } from "../../constants/constants";
import {
  FlickrApiMethods,
  FlickrImagesTags,
  ItemsPerPage,
} from "../../types/flickrTypes";
import useFetchData from "../useFetchData";

vi.stubEnv("VITE_APP_API_KEY", "fake-api-key");

describe("useFetchData", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and return data successfully", async () => {
    const mockResponse = {
      photos: {
        page: 1,
        pages: 10,
        perpage: 100,
        total: 1000,
        photo: [
          {
            id: "1",
            owner: "owner1",
            title: "title1",
            url_m: "url1",
          },
        ],
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const { result } = renderHook(() =>
      useFetchData({
        method: FlickrApiMethods.SearchImages,
        page: 1,
        tag: FlickrImagesTags.Mountain,
        itemsPerPage: ItemsPerPage.default,
      })
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(
      `${ENDPOINT_URL}?method=${FlickrApiMethods.SearchImages}&api_key=fake-api-key&format=json&nojsoncallback=1&per_page=${ItemsPerPage.default}&page=1&tags=${FlickrImagesTags.Mountain}`
    );

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Fetch error"));

    const { result } = renderHook(() =>
      useFetchData({
        method: FlickrApiMethods.SearchImages,
        page: 1,
        tag: FlickrImagesTags.Mountain,
        itemsPerPage: ItemsPerPage.default,
      })
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Fetch error");
  });
});
