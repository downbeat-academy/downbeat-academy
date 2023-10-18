import { CollectionConfig } from 'payload/types'

const Difficulties: CollectionConfig = {
  slug: 'difficulties',
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

export default Difficulties