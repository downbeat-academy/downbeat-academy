import type { CollectionConfig } from 'payload'
import { Blocks } from '../../fields/Blocks'
import { SocialLink } from '../../fields/SocialLink'
import { Metadata } from '../../fields/Metadata'
import { Slug } from '../../fields/Slug'

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
            Slug,
            {
              type: 'array',
              name: 'socialLinks',
              fields: [
                SocialLink,
              ]
            },
            {
              type: 'upload',
              name: 'image',
              relationTo: 'media',
            },
            {
              type: 'upload',
              name: 'avatar',
              relationTo: 'media',
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
  