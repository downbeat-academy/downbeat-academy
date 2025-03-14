import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@lib/db/drizzle";
import { schema } from "@/lib/db/schema";
import { nextCookies } from "better-auth/next-js";
 
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true
  },
  // nextCookies must be the last plugin in the array.
  plugins: [nextCookies()]
});