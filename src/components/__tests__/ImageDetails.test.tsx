import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Photo } from "../../types/imageTypes";
import ImageDetails from "../ImageDetails/ImageDetails";

describe("ImageDetails", () => {
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

  it("should render photo details when photo details is provided", () => {
    render(
      <ImageDetails
        photo={photo}
        isInFavourite={false}
        onFavouriteClick={() => {}}
      />
    );

    expect(screen.getByText(photo.title)).toBeInTheDocument();
    expect(
      screen.getByText(photo.author.realname || photo.author.username)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Favourite" })
    ).toBeInTheDocument();
  });

  it("should render 'Unfavourite' button text when isInFavourite is true", () => {
    render(
      <ImageDetails
        photo={photo}
        isInFavourite={true}
        onFavouriteClick={() => {}}
      />
    );

    expect(
      screen.getByRole("button", { name: "Unfavourite" })
    ).toBeInTheDocument();
  });

  it("should call onFavouriteClick with the correct photo when button is clicked", async () => {
    const mockOnFavouriteClick = vi.fn();
    render(
      <ImageDetails
        photo={photo}
        isInFavourite={false}
        onFavouriteClick={mockOnFavouriteClick}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Favourite" }));

    expect(mockOnFavouriteClick).toHaveBeenCalledWith(photo);
  });
});
