import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	transpilePackages: [
		'cadence-core',
		'cadence-icons',
		'cadence-tokens',
		'typeface-tiempos-text',
	],
}

export default nextConfig
