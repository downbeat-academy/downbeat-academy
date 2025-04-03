import { Metadata } from '@/fields/Metadata'
import { Blocks } from '@/fields/Blocks'

import type { CollectionConfig } from 'payload'

export const ErrorPages: CollectionConfig = {
  slug: 'error-pages',
  admin: {
    group: 'General Content',
    useAsTitle: 'errorType',
  },
  fields: [
    {
      name: 'errorType',
      type: 'select',
      label: 'Error Type',
      options: ['404', '500'],
      defaultValue: '404',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    Metadata,
    Blocks,
  ],
}
