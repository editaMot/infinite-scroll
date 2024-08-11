import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { RESPONSIVE_SIZES } from "@constants/responsiveSizes";
import { ImageUrls, Photo } from "@customTypes/imageTypes";
import { ResponsiveImage } from "../index";
import { getImageUrls } from "@utils/getImageUrls";

vi.mock("../../utils/getImageUrls", () => ({
  getImageUrls: vi.fn(),
}));

const mockGetImageUrls = vi.mocked(getImageUrls, true);

const mockUrls: ImageUrls = {
  small: "http://example.com/small.jpg",
  medium: "http://example.com/medium.jpg",
  large: "http://example.com/large.jpg",
};

const photo: Photo = {
  id: "1",
  title: "Sample Image",
  secret: "acfd415fa7",
  server: "7372",
  author: {
    id: "1",
    realname: "Real Name",
    username: "realname123",
  },
};

describe("ResponsiveImage", () => {
  beforeEach(() => {
    vi.resetModules();
    mockGetImageUrls.mockReset();
  });

  it("should render an image with correct attributes", () => {
    mockGetImageUrls.mockReturnValue(mockUrls);

    render(<ResponsiveImage photo={photo} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", mockUrls.medium);
    expect(image).toHaveAttribute(
      "srcSet",
      `${mockUrls.small} 480w, ${mockUrls.medium} 800w, ${mockUrls.large} 1200w`
    );
    expect(image).toHaveAttribute("sizes", RESPONSIVE_SIZES);
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("alt", photo.title || "Unknown");
  });

  it("should call getImageUrls with the correct photo", () => {
    render(<ResponsiveImage photo={photo} />);

    expect(mockGetImageUrls).toHaveBeenCalledWith(photo);
  });
});
