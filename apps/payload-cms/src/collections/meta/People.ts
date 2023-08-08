import { CollectionConfig } from "payload/types";
import { Media } from "./Media";

export const People: CollectionConfig = {
  slug: 'people',
  auth: false,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
    },
    {
      name: 'social_links',
      type: 'array',
      label: 'Social links',
      admin: {
        components: {
          RowLabel: ({ data, index }: any) => {
            return data?.platform || `Social link ${String(index).padStart(2, "0")}`
          }
        }
      },
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
              label: 'Website',
              value: 'website',
            },
            {
              label: 'Twitter / X',
              value: 'twitter'
            },
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'TikTok',
              value: 'tiktok',
            },
            {
              label: 'linkedIn',
              value: 'linkedin',
            }
          ]
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL or href',
          required: true,
        }
      ]
    },
    {
      name: 'image',
      type: 'relationship',
      label: 'Image',
      relationTo: [
        'media',
      ],
    },
    {
      name: 'instruments',
      type: 'relationship',
      label: 'Instruments',
      hasMany: true,
      relationTo: [
        'instruments'
      ]
    },
    {
      name: 'biography',
      type: 'richText',
      label: 'Biography',
    }
  ]
}