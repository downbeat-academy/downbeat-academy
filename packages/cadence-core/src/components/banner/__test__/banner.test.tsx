import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen} from "@testing-library/react";
import { Banner, BannerActions, BannerContent } from "../banner";

describe("Banner component", () => {
  it("Banner should render correctly", () => {
    render(<Banner>Test banner content</Banner>);
    const banner = screen.getByText("Test banner content")
    expect(banner).toBeInstanceOf(HTMLElement);
  });

  it("Banner should accept className prop", () => {
    render(<Banner className="custom-class">Test content</Banner>);
    const banner = screen.getByText("Test content").parentElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("Banner should apply type classes", () => {
    render(<Banner type="primary">Test content</Banner>);
    const banner = screen.getByText("Test content").parentElement;
    expect(banner).toHaveClass("banner--root");
  });

  it("BannerContent should render correctly", () => {
    render(<BannerContent>Content text</BannerContent>);
    const content = screen.getByText("Content text");
    expect(content.tagName).toBe("SECTION");
  });

  it("BannerActions should render correctly", () => {
    render(<BannerActions>Action content</BannerActions>);
    const actions = screen.getByText("Action content");
    expect(actions.tagName).toBe("ASIDE");
  });
});