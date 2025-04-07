import { Metadata } from '../../fields/Metadata'

import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    group: 'Meta',
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      unique: true,
    },
    Metadata,
  ],
}
