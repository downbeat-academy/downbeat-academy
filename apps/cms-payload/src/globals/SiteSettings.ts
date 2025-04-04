import type { GlobalConfig } from 'payload'
import { SocialLink } from '@/fields/SocialLink'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Site Name',
    },
    {
      name: 'siteDescription',
      type: 'text',
      label: 'Site Description',
    },
    {
      name: 'defaultOGImage',
      type: 'upload',
      label: 'Default OG Image',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [SocialLink],
    },
  ],
}
