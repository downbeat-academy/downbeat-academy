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
      admin: {
        description: 'Meta title (open graph) for SEO'
      }
    },
    Slug,
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Meta description (open graph) for SEO'
      }
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
      admin: {
        description: 'If checked, the page will not be indexed by search engines'
      }
    },
    {
      name: 'nofollow',
      type: 'checkbox',
      label: 'No Follow',
      admin: {
        description: 'If checked, the page will not be followed by search engines'
      }
    },
  ],
}