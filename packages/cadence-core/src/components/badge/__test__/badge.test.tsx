import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge component", () => {
  it("Badge should render correctly", () => {
    render(<Badge text="Badge" />);
    const badge = screen.getByText("Badge")
    expect(badge).toBeInTheDocument();
  });
});