import { Metadata } from '@/fields/Metadata'

import type { CollectionConfig } from 'payload'

export const LinkInBio: CollectionConfig = {
  slug: 'link-in-bio',
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
                'podcasts',
                'handbooks',
                'snippets',
                'categories',
                'lessons',
                'resources',
                'lexicons',
                'courses',
                'curricula',
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
