import type { Field } from 'payload'

export const Blocks: Field = {
  name: 'blocks',
  type: 'blocks',
  blocks: [
    {
      slug: 'richText',
      fields: [
        {
          name: 'content',
          label: 'Content',
          type: 'richText',
        },
      ],
    },
  ],
}
