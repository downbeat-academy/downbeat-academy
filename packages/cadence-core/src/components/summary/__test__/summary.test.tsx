import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Summary } from "../index";

describe("Summary component", () => {
  it("should render correctly with default props", () => {
    render(<Summary>Test summary content</Summary>);
    
    const details = screen.getByRole("group");
    const summary = screen.getByText("Summary");
    const content = screen.getByText("Test summary content");
    
    expect(details).toBeInstanceOf(HTMLDetailsElement);
    expect(details.hasAttribute("open")).toBe(false);
    expect(summary).toBeInstanceOf(HTMLElement);
    expect(content).toBeInstanceOf(HTMLElement);
  });

  it("should render with custom title configuration", () => {
    const customTitle = {
      text: "Custom Title",
      type: "expressive-headline" as const,
      size: "h2" as const,
      color: "strong" as const,
    };

    render(
      <Summary title={customTitle}>
        Test content with custom title
      </Summary>
    );

    const titleElement = screen.getByText("Custom Title");
    expect(titleElement).toBeInstanceOf(HTMLElement);
    expect(screen.getByText("Test content with custom title")).toBeInstanceOf(HTMLElement);
  });

  it("should render with partial title configuration", () => {
    const partialTitle = {
      text: "Partial Config",
      size: "h3" as const,
    };

    render(<Summary title={partialTitle}>Partial config content</Summary>);

    const titleElement = screen.getByText("Partial Config");
    expect(titleElement).toBeInstanceOf(HTMLElement);
  });

  describe("type variants", () => {
    it("should render with contained type", () => {
      render(<Summary type="contained">Contained summary</Summary>);
      
      const details = screen.getByRole("group");
      expect(details).toBeInstanceOf(HTMLDetailsElement);
    });

    it("should render with flush type", () => {
      render(<Summary type="flush">Flush summary</Summary>);
      
      const details = screen.getByRole("group");
      expect(details).toBeInstanceOf(HTMLDetailsElement);
    });
  });

  describe("size variants", () => {
    it("should render with small size", () => {
      render(<Summary size="small">Small summary</Summary>);
      
      const details = screen.getByRole("group");
      expect(details).toBeInstanceOf(HTMLDetailsElement);
    });

    it("should render with medium size (default)", () => {
      render(<Summary size="medium">Medium summary</Summary>);
      
      const details = screen.getByRole("group");
      expect(details).toBeInstanceOf(HTMLDetailsElement);
    });

    it("should render with large size", () => {
      render(<Summary size="large">Large summary</Summary>);
      
      const details = screen.getByRole("group");
      expect(details).toBeInstanceOf(HTMLDetailsElement);
    });
  });

  describe("isOpen state", () => {
    it("should render closed by default", () => {
      render(<Summary isOpen={false}>Closed summary</Summary>);
      
      const details = screen.getByRole("group");
      expect(details.hasAttribute("open")).toBe(false);
    });

    it("should render open when isOpen is true", () => {
      render(<Summary isOpen={true}>Open summary</Summary>);
      
      const details = screen.getByRole("group");
      expect(details.hasAttribute("open")).toBe(true);
    });
  });

  describe("custom styling", () => {
    it("should accept custom className", () => {
      render(<Summary className="custom-summary">Custom class summary</Summary>);
      
      const details = screen.getByRole("group");
      expect(details.classList.contains("custom-summary")).toBe(true);
    });

    it("should apply maxWidth style when provided", () => {
      render(<Summary maxWidth="400px">Max width summary</Summary>);
      
      const details = screen.getByRole("group");
      expect(details.style.maxWidth).toBe("400px");
    });
  });

  describe("children content", () => {
    it("should render children content correctly", () => {
      render(
        <Summary>
          <div>First child</div>
          <span>Second child</span>
          <p>Third child paragraph</p>
        </Summary>
      );

      expect(screen.getByText("First child")).toBeInstanceOf(HTMLElement);
      expect(screen.getByText("Second child")).toBeInstanceOf(HTMLElement);
      expect(screen.getByText("Third child paragraph")).toBeInstanceOf(HTMLElement);
    });

    it("should render complex React nodes as children", () => {
      const ComplexChild = () => (
        <div>
          <h3>Complex Component</h3>
          <p>With nested content</p>
        </div>
      );

      render(
        <Summary>
          <ComplexChild />
        </Summary>
      );

      expect(screen.getByText("Complex Component")).toBeInstanceOf(HTMLElement);
      expect(screen.getByText("With nested content")).toBeInstanceOf(HTMLElement);
    });
  });

  describe("details/summary native behavior", () => {
    it("should have proper structure for native toggle behavior", () => {
      render(<Summary>Toggleable content</Summary>);
      
      const details = screen.getByRole("group");
      const summaryElement = screen.getByText("Summary").closest("summary");
      
      // Verify structure for native browser behavior
      expect(details.tagName).toBe("DETAILS");
      expect(summaryElement?.tagName).toBe("SUMMARY");
      expect(details.contains(summaryElement)).toBe(true);
    });

    it("should be focusable for keyboard navigation", () => {
      render(<Summary>Keyboard accessible content</Summary>);
      
      const summaryElement = screen.getByText("Summary").closest("summary");
      summaryElement?.focus();
      
      expect(document.activeElement).toBe(summaryElement);
    });
  });

  describe("icon accessibility", () => {
    it("should render chevron icon with aria-hidden", () => {
      render(<Summary>Icon test content</Summary>);
      
      const icon = screen.getByRole("img", { hidden: true });
      expect(icon.getAttribute("aria-hidden")).toBe("true");
      expect(icon.getAttribute("width")).toBe("16");
    });

    it("should have icon inside summary element", () => {
      render(<Summary>Icon positioning test</Summary>);
      
      const summaryElement = screen.getByText("Summary").parentElement;
      const icon = screen.getByRole("img", { hidden: true });
      
      expect(summaryElement?.contains(icon)).toBe(true);
    });
  });

  describe("semantic structure", () => {
    it("should use details element as root", () => {
      render(<Summary>Structure test</Summary>);
      
      const details = screen.getByRole("group");
      expect(details.tagName).toBe("DETAILS");
    });

    it("should use summary element for title", () => {
      render(<Summary>Summary element test</Summary>);
      
      const summaryElement = screen.getByText("Summary").closest("summary");
      expect(summaryElement).toBeInstanceOf(HTMLElement);
      expect(summaryElement?.tagName).toBe("SUMMARY");
    });

    it("should wrap children in flex container", () => {
      render(
        <Summary>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </Summary>
      );

      const child1 = screen.getByTestId("child-1");
      const child2 = screen.getByTestId("child-2");
      
      // Both children should be in the same flex container
      expect(child1.parentElement).toBe(child2.parentElement);
    });
  });

  describe("component combinations", () => {
    it("should work with all props combined", () => {
      const title = {
        text: "Full Configuration",
        type: "productive-headline" as const,
        size: "h1" as const,
        color: "brand" as const,
      };

      render(
        <Summary
          title={title}
          isOpen={true}
          type="flush"
          size="large"
          maxWidth="600px"
          className="full-config"
        >
          <div>Fully configured summary content</div>
        </Summary>
      );

      const details = screen.getByRole("group");
      const titleElement = screen.getByText("Full Configuration");
      const content = screen.getByText("Fully configured summary content");

      expect(details.hasAttribute("open")).toBe(true);
      expect(details.classList.contains("full-config")).toBe(true);
      expect(details.style.maxWidth).toBe("600px");
      expect(titleElement).toBeInstanceOf(HTMLElement);
      expect(content).toBeInstanceOf(HTMLElement);
    });
  });

  describe("displayName", () => {
    it("should have correct displayName", () => {
      expect(Summary.displayName).toBe("Summary");
    });
  });
});