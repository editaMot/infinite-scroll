import { favouriteImagesContext } from "@contexts/favouriteImagesContext";
import { Photo } from "@customTypes/imageTypes";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { useFavouriteImage } from "../useFavouriteImage";

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

const mockUpdateFavouritesList = vi.fn();
const mockRemoveFromFavouritesList = vi.fn();

const initialContextValue = {
  favouriteImagesList: [],
  updateFavouritesList: mockUpdateFavouritesList,
  removeFromFavouritesList: mockRemoveFromFavouritesList,
};

const updatedContextValue = {
  favouriteImagesList: [photo],
  updateFavouritesList: mockUpdateFavouritesList,
  removeFromFavouritesList: mockRemoveFromFavouritesList,
};

const TestComponent: React.FC<{ photo: Photo }> = ({ photo }) => {
  const { addedToFavourite, handleFavouriteClick } = useFavouriteImage(photo);

  return (
    <>
      <div>
        <button onClick={handleFavouriteClick}>
          {addedToFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </button>
      </div>
    </>
  );
};

describe("useFavouriteImage", () => {
  it("should initialize with the correct state based on context", () => {
    render(
      <favouriteImagesContext.Provider value={initialContextValue}>
        <TestComponent photo={photo} />
      </favouriteImagesContext.Provider>
    );

    expect(screen.getByText("Add to Favourites")).toBeInTheDocument();
  });

  it("should update state when context value changes", async () => {
    const { rerender } = render(
      <favouriteImagesContext.Provider value={initialContextValue}>
        <TestComponent photo={photo} />
      </favouriteImagesContext.Provider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText("Add to Favourites"));
    });

    rerender(
      <favouriteImagesContext.Provider value={updatedContextValue}>
        <TestComponent photo={photo} />
      </favouriteImagesContext.Provider>
    );

    expect(screen.getByText("Remove from Favourites")).toBeInTheDocument();
  });

  it("should call the correct context functions when clicking the button", async () => {
    render(
      <favouriteImagesContext.Provider value={initialContextValue}>
        <TestComponent photo={photo} />
      </favouriteImagesContext.Provider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText("Add to Favourites"));
    });

    expect(mockUpdateFavouritesList).toHaveBeenCalledWith(photo);

    await act(async () => {
      await userEvent.click(screen.getByText("Remove from Favourites"));
    });

    expect(mockRemoveFromFavouritesList).toHaveBeenCalledWith(photo);
  });
});
