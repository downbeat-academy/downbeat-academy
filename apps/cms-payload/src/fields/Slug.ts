import type { Field } from 'payload'

export const Slug: Field = {
  name: 'slug',
  type: 'text',
  label: 'Slug',
  required: true,
  admin: {
    position: 'sidebar',
    description: 'Automatically generated from the title if left empty',
  },
  hooks: {
    beforeValidate: [
      ({ value, originalDoc, data }) => {
        // If a value is provided, clean it up
        if (typeof value === 'string' && value.trim()) {
          return value
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
        }
        
        // Otherwise, generate from title
        const title = data?.title || originalDoc?.title
        if (typeof title === 'string') {
          return title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
        }
        
        return value
      },
    ],
  },
}