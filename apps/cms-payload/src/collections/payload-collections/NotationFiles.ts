import type { CollectionConfig } from 'payload'

export const NotationFiles: CollectionConfig = {
  slug: 'notation-files',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'filename',
      label: 'Filename',
      type: 'text',
    },
  ],
  upload: true,
}
