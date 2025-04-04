import { Metadata } from '@/fields/Metadata'
import { RichText } from '@/fields/RichText'
import { Slug } from '@/fields/Slug'

import type { CollectionConfig } from 'payload'

export const Lesson: CollectionConfig = {
  slug: 'lesson',
  admin: {
    group: 'Educational Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Lesson Metadata',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Description',
            },
            Slug,
          ],
        },
        {
          label: 'Content',
          fields: [RichText],
        },
        {
          label: 'SEO',
          fields: [Metadata],
        },
      ],
    },
  ],
}
