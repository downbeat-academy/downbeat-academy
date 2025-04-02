import type { Field } from 'payload'

export const Metadata: Field = {
  name: 'metadata',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Meta title (open graph) for SEO'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
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