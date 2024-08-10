import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "../Tabs/Tabs";

describe("Tabs", () => {
  it("renders all photos and favourite photos tabs", () => {
    render(<Tabs activeTab="all" handleActiveTab={() => {}} />);

    expect(screen.getByText("All Photos")).toBeInTheDocument();
    expect(screen.getByText("Favourites Photos")).toBeInTheDocument();
  });

  it("changes active tab from All Photos to Favourites Photos onClick", async () => {
    const handleActiveTab = vi.fn();

    render(<Tabs activeTab="all" handleActiveTab={handleActiveTab} />);

    await userEvent.click(screen.getByText("Favourites Photos"));
    expect(handleActiveTab).toHaveBeenCalledWith("favourites");
    expect(handleActiveTab).toHaveBeenCalledTimes(1);
  });

  it("changes active tab from Favourites Photos to All Photos onClick", async () => {
    const handleActiveTab = vi.fn();

    render(<Tabs activeTab="favourites" handleActiveTab={handleActiveTab} />);

    await userEvent.click(screen.getByText("All Photos"));
    expect(handleActiveTab).toHaveBeenCalledWith("all");
    expect(handleActiveTab).toHaveBeenCalledTimes(1);
  });
});
