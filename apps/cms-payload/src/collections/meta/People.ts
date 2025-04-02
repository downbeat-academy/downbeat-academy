import type { CollectionConfig } from 'payload'
import { Blocks } from '../../fields/Blocks'
import { SocialLink } from '../../fields/SocialLink'
import { Metadata } from '../../fields/Metadata'

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    group: 'Meta',
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Metadata',
          fields: [
            {
              type: 'text',
              name: 'name',
              label: 'Name',
              unique: true,
              required: true,
              validate: (value: string | undefined | null) => Boolean(value) || 'Name is required.',
            },
            {
              type: 'array',
              name: 'socialLinks',
              fields: [
                SocialLink,
              ]
            },
            Metadata,
          ],
        },
        {
          label: 'Content',
          fields: [
            Blocks,
          ]
        }
      ]
    }
  ]
}
  