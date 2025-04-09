import type { CollectionConfig } from 'payload'

export const NotationFiles: CollectionConfig = {
  slug: 'notation-files',
  admin: {
    group: 'Assets',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
  ],
  upload: {
    mimeTypes: ['application/vnd.recordare.musicxml+xml', 'audio/midi', 'audio/x-midi'],
  },
}
