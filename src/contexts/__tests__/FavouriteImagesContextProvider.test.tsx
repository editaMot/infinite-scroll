import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { Photo } from "@customTypes/imageTypes";
import { favouriteImagesContext } from "../favouriteImagesContext";
import { FavouriteImagesContextProvider } from "../favouriteImagesContextProvider";

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

const TestComponent: React.FC = () => {
  const context = useContext(favouriteImagesContext);
  if (!context) {
    throw new Error("Context is undefined");
  }

  return (
    <div>
      <button onClick={() => context.updateFavouritesList(photo)}>
        Add Photo
      </button>
      <button onClick={() => context.removeFromFavouritesList(photo)}>
        Remove Photo
      </button>
      <div data-testid="favourites-list">
        {context.favouriteImagesList.map((photo) => (
          <div key={photo.id}>
            {photo.title}, {photo.author.realname}
          </div>
        ))}
      </div>
    </div>
  );
};

describe("FavouriteImagesContextProvider", () => {
  it("updates the favourites list when button (add/remove) is clicked", async () => {
    render(
      <FavouriteImagesContextProvider>
        <TestComponent />
      </FavouriteImagesContextProvider>
    );

    expect(screen.getByTestId("favourites-list")).toBeEmptyDOMElement();

    await userEvent.click(screen.getByText("Add Photo"));
    expect(screen.getByTestId("favourites-list")).toHaveTextContent(
      photo.title
    );
    expect(screen.getByTestId("favourites-list")).toHaveTextContent(
      photo.author.realname
    );

    await userEvent.click(screen.getByText("Remove Photo"));
    expect(screen.queryByText(photo.title)).not.toBeInTheDocument();
    expect(screen.queryByText(photo.author.realname)).not.toBeInTheDocument();
  });
});
