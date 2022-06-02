import Home from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("First test", () => {
  it("first test", () => {
    render(<Home />);
  });
});
