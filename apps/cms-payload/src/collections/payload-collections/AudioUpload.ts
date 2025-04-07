import type { CollectionConfig } from 'payload'

export const AudioUpload: CollectionConfig = {
  slug: 'audio-upload',
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
    mimeTypes: ['.mp3', '.m4a', '.ogg', '.wav'],
  },
}
