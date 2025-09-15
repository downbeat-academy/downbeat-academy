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