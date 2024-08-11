import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageCard } from "../index";
import { testPhoto } from "@utils/testData";

describe("ImageCard", () => {
  it("should render ImageCard and show details on hover", async () => {
    render(<ImageCard photo={testPhoto} />);

    const image = screen.getByRole("img");

    const imageDetailsText = testPhoto.title;

    expect(screen.queryByText(imageDetailsText)).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.hover(image);

    expect(screen.getByText(imageDetailsText)).toBeInTheDocument();

    await user.unhover(image);

    expect(screen.queryByText(imageDetailsText)).not.toBeInTheDocument();
  });
});
