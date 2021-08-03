import { render, screen } from "@testing-library/react";
import React from "react";

import App from "./App";

test("renders App", () => {
  render(<App />);
  expect(screen.getByText("Install Metamask")).toBeTruthy();
});
