export default {
	widgets: [
		{
			name: 'project-info',
			options: {
				title: 'Custom Project Info Title',
			},
			layout: {
				width: 'medium',
				height: 'small',
			},
		},
		{
			name: 'project-users',
			options: {
				title: 'Users',
			},
			layout: {
				width: 'small',
				height: 'small',
			},
		},
		{
			name: 'document-list',
			options: {
				title: 'Recently edited content',
				order: '_updatedAt desc',
				types: ['article', 'podcast', 'course', 'curriculum', 'lesson'],
			},
			layout: {
				width: 'medium',
				height: 'small',
			},
		},
	],
};
