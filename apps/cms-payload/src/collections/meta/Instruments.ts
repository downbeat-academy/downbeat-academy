import type { CollectionConfig } from 'payload'

export const Instruments: CollectionConfig = {
  slug: 'instruments',
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
    {
        type: 'text',
        name: 'slug',
        label: 'Slug',
        required: true,
        unique: true,
    }
  ],
}
