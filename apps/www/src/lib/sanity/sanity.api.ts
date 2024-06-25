export const useCdn = false

export const dataset = assertValue(
	process.env.NEXT_PUBLIC_SANITY_DATASET,
	'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const readToken = process.env.SANITY_API_TOKEN

export const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21'

export const previewSecretId: `${string}.${string}` = 'preview.secret'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
	if (v === undefined) {
		throw new Error(errorMessage)
	}

	return v
}
