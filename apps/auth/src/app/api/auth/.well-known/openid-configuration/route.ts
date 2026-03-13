import { oauthProviderOpenIdConfigMetadata } from '@better-auth/oauth-provider'
import { getAuth } from '@/lib/auth/auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = oauthProviderOpenIdConfigMetadata(getAuth() as any)
