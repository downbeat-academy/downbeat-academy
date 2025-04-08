import type { CollectionConfig } from 'payload'

export const AudioUpload: CollectionConfig = {
  slug: 'audio-upload',
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
      name: 'filename',
      label: 'Filename',
      type: 'text',
    },
  ],
  upload: {
    mimeTypes: ['audio/mp3', 'audio/m4a', 'audio/ogg', 'audio/wav'],
  },
}
