import type { Field } from 'payload'

// Blocks
import { RichText } from '@/fields/rich-text'
import { Blockquote } from '@/blocks/Blockquote'
import { MusicNotation } from '@/blocks/music-notation/MusicNotation'
import { FileDownload } from '@/blocks/FileDownload'

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
    MusicNotation,
    FileDownload,
  ],
}
