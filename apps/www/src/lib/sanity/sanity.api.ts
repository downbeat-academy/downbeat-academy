export const useCdn = false

export const dataset =
	process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing-project-id'

export const readToken = process.env.SANITY_API_TOKEN

export const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21'

export const previewSecretId: `${string}.${string}` = 'preview.secret'
