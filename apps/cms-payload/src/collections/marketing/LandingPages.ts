import { Metadata } from '@/fields/Metadata'
import { Slug } from '@/fields/Slug'
import { Blocks } from '@/fields/Blocks'

import type { CollectionConfig } from 'payload'

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  admin: {
    group: 'Marketing',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Landing Page Metadata',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            Slug,
          ],
        },
        {
          label: 'Content',
          fields: [Blocks],
        },
        {
          label: 'SEO',
          fields: [Metadata],
        },
      ],
    },
  ],
}
