import { GlobalConfig } from 'payload/types';

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      type: 'text',
      name: 'site_title',
      label: 'Site title',
    }
  ]
}