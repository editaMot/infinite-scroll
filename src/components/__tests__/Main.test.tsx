import { render, screen } from "@testing-library/react";
import Main from "../Main/Main";

describe("Main", () => {
  it("renders children correctly", () => {
    render(
      <Main>
        <p>Hello world</p>
      </Main>
    );
    expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
  });
});
