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
      name: 'name',
      type: 'text',
      required: true,
    }
  ]
}

export default People