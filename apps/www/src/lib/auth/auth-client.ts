import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.PROJECT_URL // the base url of your auth server
})