import type { CollectionConfig } from 'payload'
import { Metadata } from '../../fields/Metadata'

export const Genres: CollectionConfig = {
  slug: 'genres',
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
  ],
}
