import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testPhoto } from "@utils/testData";
import { useContext } from "react";
import { favouriteImagesContext } from "../favouriteImagesContext";
import { FavouriteImagesContextProvider } from "../favouriteImagesContextProvider";

const TestComponent: React.FC = () => {
  const context = useContext(favouriteImagesContext);
  if (!context) {
    throw new Error("Context is undefined");
  }

  return (
    <div>
      <button onClick={() => context.updateFavouritesList(testPhoto)}>
        Add Photo
      </button>
      <button onClick={() => context.removeFromFavouritesList(testPhoto)}>
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
      testPhoto.title
    );
    expect(screen.getByTestId("favourites-list")).toHaveTextContent(
      testPhoto.author.realname
    );

    await userEvent.click(screen.getByText("Remove Photo"));
    expect(screen.queryByText(testPhoto.title)).not.toBeInTheDocument();
    expect(
      screen.queryByText(testPhoto.author.realname)
    ).not.toBeInTheDocument();
  });
});
