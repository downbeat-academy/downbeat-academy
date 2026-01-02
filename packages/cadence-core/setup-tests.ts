/// <reference types="vitest" />

// Basic vitest setup - using simpler approach without jest-dom matchers
import { expect } from "vitest";

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