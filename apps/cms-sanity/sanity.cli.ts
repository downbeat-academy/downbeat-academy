import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
	api: {
		projectId: 'v5w3t766',
		dataset: 'production',
	},
	vite: {
		server: {
			allowedHosts: ['admin.downbeatacademy.com'],
		},
		preview: {
			allowedHosts: ['admin.downbeatacademy.com'],
		},
	},
})
