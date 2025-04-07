import type { Field } from 'payload'
import { RichText } from '@/fields/rich-text'

export const Blocks: Field = {
  name: 'blocks',
  type: 'blocks',
  blocks: [
    {
      slug: 'richText',
      fields: [RichText],
    },
  ],
}
