import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Photo } from "../../types/imageTypes";
import ImageCard from "../ImageCard/ImageCard";

describe("ImageCard", () => {
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

  it("should render ImageCard and show details on hover", async () => {
    render(<ImageCard photo={photo} />);

    const image = screen.getByRole("img");

    const imageDetailsText = photo.title;

    expect(screen.queryByText(imageDetailsText)).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.hover(image);

    expect(screen.getByText(imageDetailsText)).toBeInTheDocument();

    await user.unhover(image);

    expect(screen.queryByText(imageDetailsText)).not.toBeInTheDocument();
  });
});
