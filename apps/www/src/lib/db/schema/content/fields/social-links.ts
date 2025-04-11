export const socialPlatforms = [
	'twitter',
	'instagram',
	'facebook',
	'youtube',
	'tiktok',
	'linkedin',
	'website',
] as const
export type SocialPlatform = (typeof socialPlatforms)[number]
