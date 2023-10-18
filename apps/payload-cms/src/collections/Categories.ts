import { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  auth: false,
  admin: {
    useAsTitle: 'title',
    group: 'Meta content'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    }
  ]
}

export default Categories