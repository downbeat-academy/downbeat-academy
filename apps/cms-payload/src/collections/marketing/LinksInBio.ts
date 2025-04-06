import { Metadata } from '@/fields/Metadata'

import type { CollectionConfig } from 'payload'

export const LinksInBio: CollectionConfig = {
  slug: 'links-in-bio',
  versions: {
    drafts: {
      validate: true,
      autosave: true,
      schedulePublish: true,
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: [
                'articles',
                'courses',
                'curricula',
                'handbooks',
                'lessons',
                'lexicons',
                'podcasts',
                'resources',
                'snippets',
                'pages',
                'landing-pages',
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [Metadata],
        },
      ],
    },
  ],
}
