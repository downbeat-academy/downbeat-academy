import { createAuthClient } from "better-auth/react"
import { adminClient, organizationClient, genericOAuthClient } from "better-auth/client/plugins"
import { ac, student, educator, admin, superAdmin } from "@/lib/auth/permissions"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_PROJECT_URL || 'http://localhost:3000',
    plugins: [
        genericOAuthClient(),
        adminClient({
            ac: ac,
            roles: {
                student,
                educator,
                admin,
                superAdmin,
            }
        }),
        organizationClient()
    ]
})
