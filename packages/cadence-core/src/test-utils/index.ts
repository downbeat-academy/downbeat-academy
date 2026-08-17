/**
 * Test-only helpers, shared across component suites.
 *
 * This folder is deliberately excluded from `tsconfig.json`, exactly as `__test__/` is, so
 * nothing here is emitted into `dist/` or exposed to consumers. It is **not** re-exported
 * from `src/index.ts` and must not be — the barrel is the public API.
 */
export { axeViolations, formatViolations } from './axe'
export { declaredRule, declaredRules, declaredSelectors } from './styles'
// `./keyboard` is deliberately absent from this barrel: it imports `vitest/browser`, which
// does not resolve under the jsdom project. Browser specs import it by path.
