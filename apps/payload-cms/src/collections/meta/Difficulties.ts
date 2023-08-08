import { CollectionConfig } from "payload/types";

export const Difficulties: CollectionConfig = {
  slug: 'difficulties',
  auth: false,
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
      unique: true,
      label: 'Slug',
    }
  ]
}