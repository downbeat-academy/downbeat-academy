# cadence-core

## 2.4.0

### Minor Changes

- Added Toast component - A notification system built on Radix UI's Toast primitive with variant styling (default, success, error, warning), slide direction animations (from-bottom, from-right), and a global state management pattern via the `useToast` hook and `toast()` function. Includes `Toaster`, `Toast`, `ToastAction`, `ToastClose`, `ToastTitle`, `ToastDescription`, `ToastViewport`, and `ToastProvider` components. Migrated from the www app to the shared library.

## 2.2.0

### Minor Changes

- Added Summary component - A collapsible disclosure widget with configurable title, visual variants (contained/flush), and size options (small/medium/large)

## 1.1.0

### Minor Changes

- 8c4cb6b: Added Badge to Core package

### Patch Changes

- c601ce8: Formatting cleanup, etc
- Updated dependencies [c601ce8]
  - typeface-tiempos-text@1.0.3
  - typeface-favorit@1.0.3
  - cadence-tokens@2.1.1
  - cadence-icons@1.4.1
