import * as Sentry from '@sentry/nextjs'

export function register() {
  Sentry.init({
    dsn: 'https://4a2c4b3b30f0447bb689b752d8af03fd@o312315.ingest.us.sentry.io/5675622',
  
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,
  
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  
    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: process.env.NODE_ENV === 'development',
  })
}