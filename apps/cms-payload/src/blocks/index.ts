import type { Field } from 'payload'

// Blocks
import { RichText } from '@/fields/rich-text'
import { Blockquote } from '@/blocks/Blockquote'

export const Blocks: Field = {
  name: 'blocks',
  type: 'blocks',
  admin: {
    initCollapsed: true,
  },
  blocks: [
    {
      slug: 'richText',
      fields: [RichText],
    },
    Blockquote,
  ],
}
