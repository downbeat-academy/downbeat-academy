import { CollectionConfig } from 'payload/types'

const Instruments: CollectionConfig = {
  slug: 'instruments',
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

export default Instruments