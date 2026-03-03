import { createClient } from 'next-sanity'

const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export const sanityClient = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2022-11-15',
	useCdn: false,
	perspective: 'published',
	token: process.env.SANITY_API_TOKEN,
})

if (!isSanityConfigured) {
	sanityClient.fetch = (async () => []) as unknown as typeof sanityClient.fetch
}
