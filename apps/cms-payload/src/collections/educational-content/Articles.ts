import { Metadata } from '@/fields/Metadata'
import { Blocks } from '@/fields/Blocks'
import { Slug } from '@/fields/Slug'

import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    group: 'Educational Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article Metadata',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              validate: (value: string | undefined | null) =>
                Boolean(value) || 'This field is required.',
            },
            Slug,
            {
              name: 'authors',
              type: 'array',
              label: 'Authors',
              fields: [
                {
                  name: 'author',
                  type: 'relationship',
                  relationTo: 'people',
                }
              ],
            },
            {
                name: 'categories',
                type: 'array',
                label: 'Categories',
                fields: [
                    {
                        name: 'category',
                        type: 'relationship',
                        relationTo: 'categories',
                    }
                ],
            },
            {
                name: 'genres',
                type: 'array',
                label: 'Genres',
                fields: [
                    {
                        name: 'genre',
                        type: 'relationship',
                        relationTo: 'genres',
                    }
                ],
            },
            {
                name: 'difficulties',
                type: 'array',
                label: 'Difficulties',
                fields: [
                    {
                        name: 'difficulty',
                        type: 'relationship',
                        relationTo: 'difficulties',
                    }   
                ],
            },
            {
                name: 'instruments',
                type: 'array',
                label: 'Instruments',
                fields: [
                    {
                        name: 'instrument',
                        type: 'relationship',
                        relationTo: 'instruments',
                    }
                ],
            },
            {
              name: 'publishedDate',
              type: 'date',
              label: 'Published Date',
              required: true,
            },
            {
              name: 'updatedDate',
              type: 'date',
              label: 'Updated Date',
              admin: {
                description: 'Leave blank if the article has not been updated.',
              }
            },
          ],
        },
        {
          label: 'Content',
          fields: [Blocks],
        },
        {
          label: 'SEO',
          fields: [Metadata],
        },
      ],
    },
  ],
}
