import { CollectionConfig } from 'payload/types'

const Articles: CollectionConfig = {
  slug: 'articles',
  auth: false,
  admin: {
    useAsTitle: 'title',
    group: 'Educational content'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    }
  ]
}

export default Articles