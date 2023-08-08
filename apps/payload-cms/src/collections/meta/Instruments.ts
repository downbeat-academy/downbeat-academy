import { CollectionConfig } from "payload/types";

export const Instruments: CollectionConfig = {
  slug: 'instruments',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
    }
  ]
}