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
      name: 'filename',
      label: 'Filename',
      type: 'text',
    },
  ],
  upload: {
    mimeTypes: ['.musicxml', '.mxl', '.xml'],
  },
}
