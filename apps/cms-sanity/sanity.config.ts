import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import {
	dashboardTool,
	projectUsersWidget,
	projectInfoWidget,
} from '@sanity/dashboard'
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemas'
import { deskStructure } from './deskStructure'

export default defineConfig({
	name: 'downbeat-academy',
	title: 'Downbeat Academy',

	projectId: 'v5w3t766',
	dataset: 'production',

	plugins: [
		dashboardTool({
			widgets: [
				projectInfoWidget({
					layout: 'medium',
				}),
				projectUsersWidget({
					layout: 'medium',
				}),
				documentListWidget({
					layout: 'large',
					showCreateButton: true,
					limit: 5,
					title: 'Recent articles',
					types: ['article'],
				}),
				documentListWidget({
					layout: 'large',
					limit: 10,
					title: 'Recently updated docuemnts',
					types: [
						'course',
						'curriculum',
						'lesson',
						'page',
						'podcast',
						'resource',
					],
				}),
			],
		}),
		deskTool({ structure: deskStructure }),
		media(),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
	},
})
