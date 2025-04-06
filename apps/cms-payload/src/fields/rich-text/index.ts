import { lexicalEditor, HeadingFeature, BlocksFeature } from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'
import { InlineChord, InlineMusicText } from '@/blocks/music-notation'

export const RichText: Field = {
  name: 'richText',
  type: 'richText',
  label: 'Rich Text',
  editor: lexicalEditor({
    admin: {
      placeholder: 'Begin the beguine...',
    },
    features: ({ defaultFeatures, rootFeatures }) => [
      ...defaultFeatures,
      ...rootFeatures,
      HeadingFeature({
        enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
      }),
      BlocksFeature({
        blocks: [],
        inlineBlocks: [InlineChord, InlineMusicText],
      }),
    ],
  }),
}
