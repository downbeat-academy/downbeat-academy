import { Metadata } from '@/fields/Metadata'
import { Slug } from '@/fields/Slug'

import type { CollectionConfig } from 'payload'

export const Curricula: CollectionConfig = {
  slug: 'curricula',
  admin: {
    group: 'Educational Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Curriculum Metadata',
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
          fields: [
            {
              name: 'courses',
              type: 'array',
              fields: [
                {
                  name: 'course',
                  type: 'relationship',
                  relationTo: 'course',
                  hasMany: true,
                },
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
