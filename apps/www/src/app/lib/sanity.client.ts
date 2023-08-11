import { apiVersion, dataset, projectId, useCdn } from '@app/lib/sanity.api'
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