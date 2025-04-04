import { Metadata } from '@/fields/Metadata'
import { Slug } from '@/fields/Slug'
import { ContentMetadata } from '@/fields/ContentMetadata'
import { RichText } from '@/fields/RichText'
import type { CollectionConfig } from 'payload'

export const Snippets: CollectionConfig = {
  slug: 'snippets',
  admin: {
    group: 'Educational Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Snippet Metadata',
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
              defaultValue: new Date(),
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
