import { GlobalConfig } from 'payload/types';

export const HeaderNav: GlobalConfig = {
  slug: 'header_navigation',
  label: 'Header Navigation',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'link',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Internal Link',
              value: 'internal_link',
            },
            {
              label: 'External link',
              value: 'external_link',
            },
            {
              label: 'Custom Internal Link',
              value: 'custom_internal_link',
            }
          ]
        }
      ]
    }
  ]
}