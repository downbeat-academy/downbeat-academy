/// <reference types="vitest" />

// jest-dom matchers (toBeInTheDocument, toHaveAttribute, toHaveClass, …). Several
// suites already depend on these; without them vitest reports "Invalid Chai property".
import "@testing-library/jest-dom/vitest";

// Mock ResizeObserver for tests
global.ResizeObserver = global.ResizeObserver || class ResizeObserver {
  constructor(callback: ResizeObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock scrollIntoView for Radix UI Select tests
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || function() {};

// Mock hasPointerCapture for Radix UI components
Element.prototype.hasPointerCapture = Element.prototype.hasPointerCapture || function() { return false; };
Element.prototype.setPointerCapture = Element.prototype.setPointerCapture || function() {};
Element.prototype.releasePointerCapture = Element.prototype.releasePointerCapture || function() {};