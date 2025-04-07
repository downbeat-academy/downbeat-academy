import type { Block } from 'payload'

export const Audio: Block = {
  slug: 'audio',
  interfaceName: 'AudioBlock',
  labels: {
    singular: 'Audio',
    plural: 'Audio',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'artist',
      type: 'text',
      label: 'Artist',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'audio-upload',
      label: 'Audio File',
      required: true,
    },
    {
      name: 'download',
      type: 'checkbox',
      label: 'Downloadable',
      defaultValue: false,
      admin: {
        description: 'Make this audio file downloadable by the user?',
      },
    },
  ],
}
