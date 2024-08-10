import { render, screen } from "@testing-library/react";
import Error from "../Error/Error";

describe("Error", () => {
  it("should render error message when error message is provided", () => {
    const errorMessage = "Some error message";
    render(<Error errorMessage={errorMessage} />);

    expect(screen.getByText(errorMessage)).toHaveTextContent(errorMessage);
  });
});
