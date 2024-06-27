# www

## 3.7.1

### Patch Changes

- c601ce8: Formatting cleanup, etc
- Updated dependencies [c601ce8]
- Updated dependencies [8c4cb6b]
  - typeface-tiempos-text@1.0.3
  - typeface-favorit@1.0.3
  - cadence-tokens@2.1.1
  - cadence-icons@1.4.1
  - cadence-core@1.1.0

## 3.7.0

### Minor Changes

- 8eec2e2: Added a basic Table component and migrated the list of Lexicon items to a table.

### Patch Changes

- e25e682: Fixed the routing and links in the mobile navigation.

## 3.6.0

### Minor Changes

- 0594e4c: Added support for NextJS bundle analyzer

## 3.5.0

### Minor Changes

- 07b8e74: Restructured the project to move some things out of the app folder.

## 3.4.0

### Minor Changes

- 1504f9f: Updating the layout and routing of auth pages
- 3a93e7b: Add support for more complex account management

### Patch Changes

- e802d8a: Added not-allowed cursor to disabled variant
- Updated dependencies [3a93e7b]
  - cadence-icons@1.4.0

## 3.3.0

### Minor Changes

- d11bb98: Add support for link in bio
- Adding support for a Lexicon content model, various additional icons to support an audio player, addition of the audio player component.
- 76420c2: Updated the styling for some music notation and stuff and a bit of cleanup'

### Patch Changes

- Updated dependencies
  - cadence-icons@1.3.0

## 3.2.0

### Minor Changes

- c5a0cdf: Updated Almanac to Handbook

## 3.1.0

### Minor Changes

- Updated Almanac to Handbook
- 7ddaad9: Added a newsletter signup page

## 3.0.0

### Major Changes

- c6953e4: Cleanup, and release of www v3

### Minor Changes

- ff4d7fe: Reconfigured Fathom analytics implementation in the App router
- 8af0b1a: Added a connection to Supabase and a basic authentication setup
- 2c58a00: Added some additional properties to the toast to animate the direction
- 029e4ab: Added support for the Almanac and created a preview of the content to be used in rich text
- 4c25c81: Model cleanup and launch of new CSS strategy
- 986557a: Moved a bunch of route handlers to server actions and updated the forms accordingly
- d1d65dd: Added testing criteria to queries to exclude test pages.
- 70cc2e1: Add transactional email with Resend, react-hook-form, and zod. Add custom toast component.
- 2376784: Add tooltip component
- 7dd226a: Added support for an email download component and accompanying email API routes.

### Patch Changes

- 4c25c81: Small updates to models and migration to typescript and new CSS approach
- ead7b71: Fixing and cleaning up some of the Auth stuff
- 39fe2bc: Fixed global import of css and font files
- d6c0912: Fixed the sort order of articles and fixed a bug in undefined keys for the category links
- 6a67204: Small fix to the Auth setup with Supabase
- cf61994: Added basic metadata to the auth pages
- 01a260b: Fixed icon color rendering a bit and updated the icon colors in the footer
- 01fbdf4: Updating the toast styling and cleanup of the authentication experience
- b8d6aef: Small bugfix to the auth URL redirect
- Updated dependencies [70cc2e1]
- Updated dependencies [01a260b]
- Updated dependencies [01fbdf4]
  - cadence-icons@1.2.0
  - cadence-tokens@2.1.0

## 2.5.2

### Patch Changes

- d7426d9: Added copyright bar and fixed a bug in the Flex component
- Updated dependencies [d7426d9]
  - cadence-core@1.3.0

## 2.5.1

### Patch Changes

- Added account actions to mobile nav

## 2.5.0

### Minor Changes

- Lots of cleanup work in components and typeface packages as well as the new navigation for www

### Patch Changes

- Updated dependencies
  - cadence-core@1.2.0
  - typeface-tiempos-text@1.0.2
  - typeface-favorit@1.0.2

## 2.4.0

### Minor Changes

- Migration of data layer to new NextJS instance and app directory
