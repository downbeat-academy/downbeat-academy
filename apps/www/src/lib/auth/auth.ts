import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { resend } from "@lib/email/resend";
import { db } from "@lib/db/drizzle";
import { schema } from "@/lib/db/schema";
import { nextCookies } from "better-auth/next-js";
import VerifyEmail from "../../../../../packages/email/emails/verify-email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    redirectAfterVerification: '/',
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL?.replace(/\/$/, '');
        const verifyEmailPath = '/api/auth';
        const fullUrl = `${baseUrl}${verifyEmailPath}${url}`;
        
        const { data } = await resend.emails.send({
          from: "Downbeat Academy <hello@email.downbeatacademy.com>",
          to: user.email,
          subject: "🎵 Verify your Downbeat Academy email address",
          react: VerifyEmail({ 
            name: user.name,
            verificationUrl: fullUrl
          })
        });

        console.log('Verification email sent:', data);
      } catch (error) {
        console.error('Failed to send verification email:', error);
        throw error;
      }
    },
  },
  // nextCookies must be the last plugin in the array.
  plugins: [nextCookies()]
});