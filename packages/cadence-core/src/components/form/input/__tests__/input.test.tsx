import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "../input";

describe("Input component", () => {
  it("Input should render correctly", () => {
    render(<Input name="input" placeholder="Placeholder text" />);
    const input = screen.getByPlaceholderText("Placeholder text")
    expect(input).toBeInstanceOf(HTMLElement);
  });
});