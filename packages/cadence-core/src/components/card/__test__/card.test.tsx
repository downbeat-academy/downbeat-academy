import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen} from "@testing-library/react";
import { Card, CardContent, CardImage } from "../card";

describe("Card component", () => {
  it("Card should render correctly", () => {
    render(<Card>Test card content</Card>);
    const card = screen.getByText("Test card content")
    expect(card).toBeInstanceOf(HTMLElement);
  });

  it("Card should accept className prop", () => {
    render(<Card className="custom-class">Test content</Card>);
    const card = screen.getByText("Test content").parentElement;
    expect(card).toHaveClass("custom-class");
  });

  it("Card should apply border color classes", () => {
    render(<Card borderColor="primary">Test content</Card>);
    const card = screen.getByText("Test content").parentElement;
    expect(card).toHaveClass("border-color--primary");
  });

  it("Card should render with custom tag", () => {
    render(<Card tag="article">Article content</Card>);
    const card = screen.getByText("Article content");
    expect(card.tagName).toBe("ARTICLE");
  });

  it("CardContent should render correctly", () => {
    render(<CardContent>Content text</CardContent>);
    const content = screen.getByText("Content text");
    expect(content).toBeInstanceOf(HTMLElement);
  });

  it("CardImage should render correctly", () => {
    render(<CardImage image="test.jpg" alt="Test image" url="#" />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Test image");
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  it("CardImage with children should render children instead of default image", () => {
    render(
      <CardImage image="test.jpg" alt="Test image" url="#">
        <span>Custom content</span>
      </CardImage>
    );
    const customContent = screen.getByText("Custom content");
    expect(customContent).toBeInstanceOf(HTMLElement);
    expect(screen.queryByRole("img")).toBeNull();
  });
});