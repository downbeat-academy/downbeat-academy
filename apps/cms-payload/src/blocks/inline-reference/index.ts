import type { Block } from 'payload'

export const InlineReference: Block = {
  slug: 'inline-reference',
  interfaceName: 'InlineReferenceBlock',
  labels: {
    singular: 'Inline Reference',
    plural: 'Inline References',
  },
  fields: [
    {
      name: 'text',
      label: 'Text',
      type: 'text',
      required: true,
    },
    {
      name: 'reference',
      label: 'Reference',
      type: 'relationship',
      relationTo: [
        'articles',
        'courses',
        'curricula',
        'handbooks',
        'lessons',
        'lexicons',
        'podcasts',
        'resources',
        'snippets',
      ],
      required: true,
    },
  ],
}
