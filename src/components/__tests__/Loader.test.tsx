import { render, screen } from "@testing-library/react";
import Loader from "../Loader/Loader";

vi.mock("../Loader/Loader.module.scss", () => ({
  __esModule: true,
  default: {
    loader: "loader",
  },
}));

describe("Loader", () => {
  it("renders a loader with the correct class name", () => {
    render(<Loader />);

    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("loader");
  });
});
