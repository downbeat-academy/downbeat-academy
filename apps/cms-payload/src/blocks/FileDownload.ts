import type { Block } from 'payload'

export const FileDownload: Block = {
  slug: 'file-download',
  interfaceName: 'FileDownloadBlock',
  labels: {
    singular: 'File Download',
    plural: 'File Downloads',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'documents',
      label: 'File',
      admin: {
        description: 'Upload a file to be downloaded by the user.',
      },
    },
  ],
}
