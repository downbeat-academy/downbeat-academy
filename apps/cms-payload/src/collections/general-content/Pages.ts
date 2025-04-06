import { Metadata } from '@/fields/Metadata'
import { Blocks } from '@/blocks'
import { Slug } from '@/fields/Slug'

import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'General Content',
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
          label: 'Page Metadata',
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
