import { Metadata } from '../../fields/Metadata'
import { Blocks } from '../../fields/Blocks'

import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'General Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Metadata',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              validate: (value: string | undefined | null) => Boolean(value) || 'This field is required.',
            },
            Metadata
          ]
        },
        {
          label: 'Content',
          fields: [
            Blocks
          ]
        },
      ],
    },
  ],
}