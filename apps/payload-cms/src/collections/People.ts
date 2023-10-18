import { CollectionConfig } from 'payload/types'

const People: CollectionConfig = {
  slug: 'people',
  auth: false,
  admin: {
    useAsTitle: 'name',
    group: 'Meta content'
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Information',
          fields: [
            {
              name: 'name',
              label: 'Name',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              label: 'Slug',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              label: 'Image',
              type: 'relationship',
              relationTo: ['media'],
              required: true,
            },
            {
              name: 'avatar',
              label: 'Avatar',
              type: 'relationship',
              relationTo: ['media'],
              required: true,
            },
            {
              name: 'instruments',
              label: 'Instruments',
              type: 'relationship',
              hasMany: true,
              relationTo: ['instruments'],
            },
            {
              name: 'biography',
              label: 'Biography',
              type: 'richText',
            }
          ]
        },
        {
          label: 'External resources',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              labels: {
                singular: 'Social link',
                plural: 'Social links'
              },
              fields: [
                {
                  name: 'platform',
                  label: 'Platform',
                  type: 'select',
                  required: true,
                  options: [
                    {
                      label: 'Facebook',
                      value: 'facebook',
                    },
                    {
                      label: 'Instagram',
                      value: 'instagram',
                    },
                    {
                      label: 'Twitter (X)',
                      value: 'twitter-x',
                    },
                    {
                      label: 'LinkedIn',
                      value: 'linkedin',
                    },
                    {
                      label: 'TikTok',
                      value: 'tiktok',
                    },
                    {
                      label: 'YouTube',
                      value: 'youtube',
                    },
                    {
                      label: 'Website',
                      value: 'website',
                    }
                  ]
                },
                {
                  name: 'url',
                  label: 'URL',
                  type: 'text',
                  required: true,
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export default People