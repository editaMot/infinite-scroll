import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button/Button";

describe("Button", () => {
  const text = "Click Me";
  it("should render button when button text and action is provided", () => {
    render(<Button text={text} action={() => {}} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(text);
  });

  it("should call action on button click", () => {
    const mockAction = vi.fn();
    render(<Button text={text} action={mockAction} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalled();
  });
});
