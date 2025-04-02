import type { CollectionConfig } from 'payload'
import { Blocks } from '../../fields/Blocks'
import { SocialLink } from '../../fields/SocialLink'
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
              type: 'text',
              name: 'slug',
              label: 'Slug',
              unique: true,
              required: true,
              validate: (value: string | undefined | null) => Boolean(value) || 'Slug is required.',
            },
            {
              type: 'array',
              name: 'socialLinks',
              label: 'Social Links',
              fields: [
                SocialLink,
              ],
            },
            {
              type: 'upload',
              name: 'image',
              label: 'Image',
              relationTo: 'media',
            },
            {
              type: 'upload',
              name: 'avatar',
              label: 'Avatar',
              relationTo: 'media',
            },
            {
              type: 'array',
              name: 'instruments',
              label: 'Instruments',
              fields: [
                {
                  type: 'relationship',
                  relationTo: 'instruments',
                  name: 'instrument',
                  label: 'Instrument',
                  hasMany: true,
                }
              ],
            },
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
  