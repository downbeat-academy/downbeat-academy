export { captureAuthEvent } from './posthog-server'
export { resolveAuthMethod } from './resolve-auth-method'
export { resolveOAuthGrant } from './resolve-oauth-grant'
export type {
	OAuthGrant,
	ResolveOAuthGrantInput,
} from './resolve-oauth-grant'
export {
	POSTHOG_ALLOWED_AUTH_HOSTS,
	shouldCaptureAuthAnalytics,
} from './config'
export type { AuthAnalyticsGateInput } from './config'
