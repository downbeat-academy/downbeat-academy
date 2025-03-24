import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from 'better-auth/plugins';
import { Resend } from 'resend';
import { db } from "@lib/db/drizzle";
import { schema } from "@/lib/db/schema";
import { ac, admin as adminRole, educator, student, superAdmin } from "@/lib/auth/permissions";

// Email templates
import VerifyEmail from "../../../../../packages/email/emails/verify-email";
import ResetPasswordEmail from "../../../../../packages/email/emails/reset-password";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    resetPasswordPath: '/update-password',
    forgetPasswordPath: '/api/auth/forget-password',
    sendResetPassword: async ({ user, url, token }, request) => {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL?.replace(/\/$/, '');
        const fullUrl = `${baseUrl}/update-password?token=${token}`;
        
        const { data } = await resend.emails.send({
          from: "Downbeat Academy <hello@email.downbeatacademy.com>",
          to: user.email,
          subject: "🎵 Reset your Downbeat Academy password",
          react: ResetPasswordEmail({ 
            name: user.name,
            resetUrl: fullUrl
          })
        });

        console.log('Password reset email sent:', data);
      } catch (error) {
        console.error('Failed to send password reset email:', error);
        throw error;
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    redirectAfterVerification: '/',
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL?.replace(/\/$/, '');
        const fullUrl = `${baseUrl}/api/auth${url}`;
        
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
  plugins: [
    admin({
      ac: ac,
      roles: {
        student,
        educator,
        admin: adminRole,
        superAdmin
      },
      defaultRole: 'student',
    }),
    // nextCookies must be the last plugin in the array.
    nextCookies()
  ]
});