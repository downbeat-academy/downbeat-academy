import { CollectionConfig } from 'payload/types'

const Instruments: CollectionConfig = {
  slug: 'instruments',
  auth: false,
  admin: {
    useAsTitle: 'name',
    group: 'Meta content'
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
    }
  ]
}

export default Instruments