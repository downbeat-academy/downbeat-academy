import { Metadata } from '../../fields/Metadata'

import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
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
      unique: true,
    },
    Metadata,
    // {
    //   name: 'slug',
    //   label: 'Slug',
    //   type: 'text',
    //   unique: true,
    //   required: true,
    // }
  ],
}
