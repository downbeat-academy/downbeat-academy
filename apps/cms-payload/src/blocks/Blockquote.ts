import type { Block } from 'payload'
import { Url } from '@/fields/Url'

export const Blockquote: Block = {
  slug: 'blockquote',
  interfaceName: 'BlockquoteBlock',
  fields: [
    {
      name: 'quote',
      label: 'Quote',
      type: 'text',
      required: true,
      admin: {
        description: 'The quote to display.',
      },
    },
    {
      name: 'attribution',
      label: 'Attribution',
      type: 'text',
      admin: {
        description: '(Optional) Attribution for the quote.',
      },
    },
    Url,
  ],
}
