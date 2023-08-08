import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    adminThumbnail: 'media'
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternative text',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Label',
      required: false,
    }
  ]
}