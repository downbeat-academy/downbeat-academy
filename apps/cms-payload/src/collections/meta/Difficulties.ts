import type { CollectionConfig } from 'payload'

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
    {
        name: 'slug',
        label: 'Slug',
        type: 'text',
        unique: true,
        required: true,
    }
  ],
}
