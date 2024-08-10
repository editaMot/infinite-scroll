import { render, screen } from "@testing-library/react";
import Logo from "../Logo/Logo";

describe("Logo", () => {
  it("renders the logo image with correct attributes", () => {
    render(<Logo />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
    expect(image).toHaveAttribute("alt", "Nature Lovers");
    expect(image).toHaveAttribute("loading", "lazy");
  });
});
