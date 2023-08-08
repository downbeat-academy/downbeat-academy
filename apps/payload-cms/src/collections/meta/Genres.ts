import { CollectionConfig } from "payload/types";

export const Genres: CollectionConfig = {
  slug: 'genres',
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
      label: 'Slug',
      unique: true,
    }
  ]
}