import { Metadata } from '@/fields/Metadata'
import { Slug } from '@/fields/Slug'
import { ContentMetadata } from '@/fields/ContentMetadata'
import { Blocks } from '@/blocks'

import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    group: 'Educational Content',
    useAsTitle: 'title',
  },
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
          label: 'Resource Metadata',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              validate: (value: string | undefined | null) =>
                Boolean(value) || 'This field is required.',
            },
            Slug,
            {
              name: 'authors',
              type: 'array',
              label: 'Authors',
              admin: {
                description: 'Author, or authors, of the resource.',
              },
              fields: [
                {
                  name: 'author',
                  type: 'relationship',
                  relationTo: 'people',
                },
              ],
            },
            ContentMetadata,
            {
              name: 'publishedDate',
              type: 'date',
              label: 'Published Date',
              required: true,
              defaultValue: new Date(),
            },
            {
              name: 'updatedDate',
              type: 'date',
              label: 'Updated Date',
              admin: {
                description: 'Leave blank if the resource has not been updated.',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Excerpt',
            },
            Blocks,
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
