import { Metadata } from '@/fields/Metadata'
import { Slug } from '@/fields/Slug'

import type { CollectionConfig } from 'payload'

export const Course: CollectionConfig = {
  slug: 'course',
  admin: {
    group: 'Educational Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Course Metadata',
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
              name: 'lessons',
              type: 'array',
              fields: [
                {
                  name: 'lesson',
                  type: 'relationship',
                  relationTo: 'lesson',
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
