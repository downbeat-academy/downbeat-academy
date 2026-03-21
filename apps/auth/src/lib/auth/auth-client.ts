import { createAuthClient } from "better-auth/react"
import { adminClient, organizationClient } from "better-auth/client/plugins"
import { oauthProviderClient } from "@better-auth/oauth-provider/client"
import { ac, student, educator, admin, superAdmin } from "@/lib/auth/permissions"

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
	fetchOptions: {
		credentials: 'include',
	},
	plugins: [
		oauthProviderClient(),
		adminClient({
			ac: ac,
			roles: {
				student,
				educator,
				admin,
				superAdmin,
			},
		}),
		organizationClient()
	]
})
