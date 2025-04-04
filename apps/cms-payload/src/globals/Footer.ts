import type { GlobalConfig } from 'payload'
import { Link } from '@/fields/Link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'categories',
      type: 'array',
      label: 'Categories',
      fields: [
        {
          name: 'category',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              fields: [Link],
            },
          ],
        },
      ],
    },
  ],
}
