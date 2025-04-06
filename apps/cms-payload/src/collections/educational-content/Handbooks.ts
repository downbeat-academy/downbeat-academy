import { Metadata } from '@/fields/Metadata'
import { Slug } from '@/fields/Slug'
import { ContentMetadata } from '@/fields/ContentMetadata'
import { RichText } from '@/fields/RichText'

import type { CollectionConfig } from 'payload'

export const Handbooks: CollectionConfig = {
  slug: 'handbooks',
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
          label: 'Handbook Metadata',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title',
              required: true,
            },
            Slug,
            {
              name: 'authors',
              type: 'array',
              label: 'Authors',
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
            },
            {
              name: 'updatedDate',
              type: 'date',
              label: 'Updated Date',
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'excerpt',
              label: 'Excerpt',
              type: 'textarea',
            },
            RichText,
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
