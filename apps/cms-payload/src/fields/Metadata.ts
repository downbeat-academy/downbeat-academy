import type { Field } from 'payload'

export const Metadata: Field = {
  name: 'metadata',
  type: 'group',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph Image',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'noindex',
          type: 'checkbox',
          label: 'No Index',
        },
        {
          name: 'nofollow',
          type: 'checkbox',
          label: 'No Follow',
        },
      ]
    }
  ],
}