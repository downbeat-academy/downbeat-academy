import type { CollectionConfig } from 'payload'
import { Metadata } from '../../fields/Metadata'

export const Difficulties: CollectionConfig = {
  slug: 'difficulties',
  admin: {
    group: 'Meta',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
    },
    Metadata,
  ],
}
