import type { Field } from 'payload'
import { Slug } from './slug'
export const Metadata: Field = {
  name: 'metadata',
  type: 'group',
  label: 'Metadata',
  admin: {

  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    Slug,
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
      name: 'noindex',
      type: 'checkbox',
      label: 'No Index',
    },
    {
      name: 'nofollow',
      type: 'checkbox',
      label: 'No Follow',
    },
  ],
}