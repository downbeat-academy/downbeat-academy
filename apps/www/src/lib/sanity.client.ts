import { apiVersion, dataset, projectId, useCdn } from '@lib/sanity.api'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
	const client = createClient({
		projectId,
		dataset,
		apiVersion,
		useCdn,
		// @ts-ignore
		perspective: 'published'
	})

	if (preview) {
		if (!preview.token) {
			throw new Error('You must provide a token to preview drafts');
		}
		return client.withConfig({
			token: preview.token,
			useCdn: false,
			ignoreBrowserTokenWarning: true,
			// @ts-ignore
			perspective: 'previewDrafts',
		})
	}

	return client
}


// import { createClient } from 'next-sanity'

// export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
// export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
// export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

// export const sanityClient = createClient({
// 	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
// 	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
// 	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
// 	useCdn: typeof document !== 'undefined',
// })

// export const sanityConfig = {
// 	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
// 	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
// 	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
// 	useCdn: typeof document !== 'undefined',
// }
