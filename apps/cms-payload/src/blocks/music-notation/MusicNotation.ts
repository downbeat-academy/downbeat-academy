import type { Block } from 'payload'

export const MusicNotation: Block = {
  slug: 'musicNotation',
  interfaceName: 'MusicNotationBlock',
  labels: {
    singular: 'Music Notation',
    plural: 'Music Notation',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Title of the notation snippet.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'A brief description of the notation snippet.',
      },
    },
    {
      name: 'files',
      type: 'array',
      labels: {
        singular: 'File',
        plural: 'Files',
      },
      admin: {
        description: 'Upload multiple MusicXML files in different keys',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'notation-files',
          label: 'File',
          admin: {
            description: 'Upload a MusicXML file.',
          },
        },
        {
          name: 'label',
          type: 'select',
          label: 'Label',
          options: [
            { label: 'Concert C', value: 'concert-c' },
            { label: 'Bass Clef', value: 'bass-clef' },
            { label: 'B♭', value: 'b-flat' },
            { label: 'E♭', value: 'e-flat' },
            { label: 'G', value: 'concert-g' },
            { label: 'F', value: 'concert-f' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
          name: 'customLabel',
          type: 'text',
          label: 'Custom Label',
          admin: {
            condition: (data, siblingData) => {
              return siblingData.label === 'custom' ? true : false
            },
          },
        },
      ],
    },
  ],
}
