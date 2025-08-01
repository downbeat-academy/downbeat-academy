# www

## 4.3.0

### Minor Changes

- 6d74383: Updated middleware for `better-auth` according to NextJS 15 guidelines.

### Patch Changes

- 294cd52: Migrate Banner component from www app to cadence-core package
  - Move Banner, BannerActions, and BannerContent components to cadence-core
  - Add comprehensive Storybook stories for Banner component variants
  - Add basic test coverage for Banner components
  - Update www app to use Banner components from cadence-core instead of local components
  - Remove original Banner component files from www app

- 77fb3a6: Migrate Card component from www app to cadence-core package
  - Move Card, CardContent, and CardImage components to cadence-core
  - Add comprehensive Storybook stories for Card component variants and usage patterns
  - Add basic test coverage for Card components including props, tag rendering, and children handling
  - Update www app to use Card components from cadence-core instead of local components
  - Remove original Card component files from www app
  - Simplify CardImage component to work without Next.js dependencies for better portability

- 9c1bf2b: Migrate Button component from www app to cadence-core package

  This migration centralizes the Button component in the design system while maintaining framework-agnostic compatibility through a polymorphic component design.

  ## New Features
  - **Button Component**: Added polymorphic Button and ButtonWrapper components to cadence-core
  - **Framework Agnostic**: Button component accepts `linkComponent` prop for framework-specific routing
  - **Storybook Documentation**: Comprehensive Button component documentation and examples

  ## Changes
  - Move Button & ButtonWrapper components from apps/www to packages/cadence-core
  - Implement polymorphic Button component with linkComponent prop support
  - Create framework wrapper in www app that injects Next.js Link component
  - Update all Button imports across www app (17+ files) to use new wrapper
  - Remove old button component files and tests from www app

  ## Button Component Features
  - Standard button behavior when no href is provided
  - Automatic anchor tag rendering with href but no custom link component
  - Framework-specific link components via linkComponent prop (e.g., Next.js Link)
  - Zero breaking changes to existing button usage in www app

  ## Usage

  ```tsx
  // In React apps with custom routing
  import { Button } from 'cadence-core'
  import { Link } from 'react-router-dom'

  <Button text="Navigate" href="/about" linkComponent={Link} />

  // In Next.js apps (via wrapper)
  import { Button } from '@components/ui/button'

  <Button text="Go Home" href="/" />
  <Button text="Submit" onClick={handleSubmit} />
  ```

- d0e7699: Migrate Form components from www app to cadence-core package

  This migration centralizes all form components in the design system while maintaining framework-agnostic compatibility and direct import usage.

  ## New Components in cadence-core
  - **Form**: Main form container with configurable spacing (none, small, medium, large)
  - **FormField**: Field wrapper supporting horizontal/vertical layouts
  - **Input**: Text input with validation state support and react-hook-form integration
  - **Textarea**: Multi-line text input with configurable rows
  - **Label**: Form field labels with proper typography
  - **HelperText**: Descriptive text for form fields
  - **ValidationMessage**: Success/warning/error messages with icons from cadence-icons
  - **HorizontalWrapper**: Layout helper for side-by-side form fields with responsive behavior

  ## Features
  - **Framework Agnostic**: All components work without framework-specific dependencies
  - **TypeScript Support**: Full TypeScript definitions with proper HTML element inheritance
  - **React Hook Form**: Optional integration support for form validation
  - **Accessible**: Proper ARIA attributes and semantic HTML
  - **Design System Integration**: Uses cadence-tokens for consistent styling
  - **Responsive**: Layout components adapt to mobile viewports

  ## Usage

  All form components can now be imported directly from cadence-core:

  ```tsx
  import {
  	Form,
  	FormField,
  	Input,
  	Label,
  	ValidationMessage,
  } from 'cadence-core'

  function MyForm() {
  	return (
  		<Form spacing="medium">
  			<FormField>
  				<Label htmlFor="name">Name</Label>
  				<Input id="name" name="name" placeholder="Enter your name" />
  				<ValidationMessage type="success">Name is valid</ValidationMessage>
  			</FormField>
  		</Form>
  	)
  }
  ```

  ## Breaking Changes
  - Form components are no longer available from `@components/form` in www app
  - All form imports must be updated to use `cadence-core` directly
  - Switch component was not migrated (requires Radix UI dependency decision)

  ## Migration
  - Old: `import { Form } from '@components/form'`
  - New: `import { Form } from 'cadence-core'`

  ## Storybook
  - Standardized all component stories to use "Cadence/Components" category
  - Added comprehensive Form component documentation and examples
  - Updated Button component story to match new category structure

- 9efca4b: Updated Sentry configuration to use instrumentation hooks.
- Updated dependencies [294cd52]
- Updated dependencies [77fb3a6]
- Updated dependencies [9c1bf2b]
- Updated dependencies [d0e7699]
  - cadence-core@1.7.0

## 4.2.0

### Minor Changes

- 594cf0e: Added newsletter subscription component.
- f7bfaef: Update to NextJS 15
- 81e5fc2: Cleaning up the notation component.
- 0866f6d: Added a table of contents component and some updates to the text components to support and ID'
- e0aea36: Added a reading length calculator and dependent components

### Patch Changes

- d2134d0: Fixed a bug in the update-profile form and refactored how article and homepage data are fetched to correctly revalidate it.
- 3141cdc: Update dependencies
- Updated dependencies [f7bfaef]
- Updated dependencies [0866f6d]
- Updated dependencies [3141cdc]
  - cadence-icons@1.5.1
  - cadence-core@1.6.0
  - cadence-tokens@2.2.1

## 4.1.0

### Minor Changes

- 562b40d: Further configuration and cleanup.

### Patch Changes

- 7fc1762: Bug fix for database connections

## 3.15.0

### Minor Changes

- 4bf67e4: Refactored the db connection pooling, added a test page for querying the Payload db.
- 22e0094: Migrated from Sass to vanilla CSS

### Patch Changes

- 4d412ce: Fixed overscroll on the mobile nav and added in the authentication entry point

## 3.14.0

### Minor Changes

- d4e50e1: Added basic setup and database schema for organizations

## 3.13.0

### Minor Changes

- b001b28: Add suppoert for authorization and user roles in the authentication service
- 8a5d081: Added email authentication to the `better-auth` configuration, and added a React email template.
- 3793fa9: Add support for password reset with better-auth and Resend, created a new email template for password reset emails.

## 3.12.0

### Minor Changes

- 74aa785: Added support for Drizzle ORM
- 91f4e72: Add support for Neon Postgres database
- f136820: Migrated from Supabase auth to better-auth backed by Neon.
- 31c4455: Removed authentication entry points in prep for new authentication service
- 1ab7212: Added authentication with `better-auth`

## 3.11.0

### Minor Changes

- 4ebf7d1: Migrated `Grid` component from a local component to `cadence-core`

### Patch Changes

- Updated dependencies [4ebf7d1]
- Updated dependencies [85bd2f1]
  - cadence-core@1.5.0

## 3.10.0

### Minor Changes

- Migrated Text component from `www` to `cadence-core`
- 28d5e80: Abstracted Brand components to `cadence-core`

### Patch Changes

- Updated dependencies
- Updated dependencies [28d5e80]
  - cadence-core@1.4.0

## 3.9.1

### Patch Changes

- 25e8844: Fixed null rendering in the audio player

## 3.9.0

### Minor Changes

- 46b8cb2: Added Switch component

## 3.8.0

### Minor Changes

- Update core dependencies

### Patch Changes

- Updated dependencies
  - cadence-tokens@2.2.0
  - cadence-icons@1.5.0
  - cadence-core@1.3.0

## 3.7.2

### Patch Changes

- Updated dependencies [9fa61f3]
- Updated dependencies [a4a847f]
  - cadence-core@1.2.0

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
