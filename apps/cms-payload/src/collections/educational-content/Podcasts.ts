import { Metadata } from '@/fields/Metadata'
import { Slug } from '@/fields/Slug'
import { ContentMetadata } from '@/fields/ContentMetadata'
import { Blocks } from '@/blocks'

import type { CollectionConfig } from 'payload'

export const Podcasts: CollectionConfig = {
  slug: 'podcasts',
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
          label: 'Podcast Metadata',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title',
              required: true,
            },
            Slug,
            {
              name: 'hosts',
              type: 'array',
              label: 'Hosts',
              fields: [
                {
                  name: 'host',
                  type: 'relationship',
                  relationTo: 'people',
                },
              ],
            },
            {
              name: 'guesets',
              type: 'array',
              label: 'Guests',
              fields: [
                {
                  name: 'guest',
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
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
            },
            {
              name: 'audio',
              type: 'upload',
              relationTo: 'media',
              label: 'Audio File',
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
