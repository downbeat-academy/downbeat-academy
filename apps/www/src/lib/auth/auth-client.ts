import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { ac, student, educator, admin, superAdmin } from "@/lib/auth/permissions"

export const authClient = createAuthClient({
    baseURL: process.env.PROJECT_URL,
    plugins: [
        adminClient({
            ac: ac,
            roles: {
                student,
                educator,
                admin,
                superAdmin,        
            }
        })
    ]
})