import { CollectionConfig } from "payload/types";

export const Banners: CollectionConfig = {
  slug: 'banner',
  auth: false,
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    }
  ]
}