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
      type: 'tabs',
      tabs: [
        {
          label: 'Metadata',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  label: 'Title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'metaTitle',
                  label: 'Meta title',
                  type: 'text',
                  required: true,
                },
              ]
            },
            {
              name: 'slug',
              label: 'Slug',
              type: 'text',
              required: true,
            },
            {
              name: 'metaDescription',
              label: 'Meta description',
              type: 'textarea',
              required: false,
            },
            {
              name: 'date',
              label: 'Date',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'publishedDate',
                      label: 'Published date',
                      type: 'date',
                      required: true,
                    },
                    {
                      name: 'updatedDate',
                      label: 'Updated date',
                      type: 'date',
                      required: false,
                    }
                  ]
                }
              ]
            },
            {
              name: 'featuredImage',
              label: 'Featured image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'authors',
              label: 'Authors',
              type: 'array',
              fields: [
                {
                  name: 'author',
                  label: 'Author',
                  type: 'relationship',
                  relationTo: 'people',
                }
              ]
            }
          ]
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'excerpt',
              label: 'Excerpt',
              type: 'textarea',
            },
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
            }
          ]
        }
      ]
    }
  ]
}

export default Articles