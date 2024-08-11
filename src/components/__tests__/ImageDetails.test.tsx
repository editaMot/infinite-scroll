import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testPhoto } from "@utils/testData";
import { ImageDetails } from "../index";

describe("ImageDetails", () => {
  it("should render photo details when photo details is provided", () => {
    render(
      <ImageDetails
        photo={testPhoto}
        isInFavourite={false}
        onFavouriteClick={() => {}}
      />
    );

    expect(screen.getByText(testPhoto.title)).toBeInTheDocument();
    expect(
      screen.getByText(testPhoto.author.realname || testPhoto.author.username)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Favourite" })
    ).toBeInTheDocument();
  });

  it("should render 'Unfavourite' button text when isInFavourite is true", () => {
    render(
      <ImageDetails
        photo={testPhoto}
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
        photo={testPhoto}
        isInFavourite={false}
        onFavouriteClick={mockOnFavouriteClick}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Favourite" }));

    expect(mockOnFavouriteClick).toHaveBeenCalledWith(testPhoto);
  });
});
