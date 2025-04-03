import type { GlobalConfig } from 'payload'
import { Link } from '@/fields/Link'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [Link],
    },
  ],
}
