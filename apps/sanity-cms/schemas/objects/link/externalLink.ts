import { BiLinkExternal } from 'react-icons/bi'

export default {
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  description: 'Link to an external resource or website.',
  icon: BiLinkExternal,
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Ex: https://google.com',
    },
    {
      name: 'target',
      title: 'Target',
      type: 'string',
      options: {
        list: [
          { name: 'blank', value: '_blank' },
          { name: 'self', value: '_self' },
          { name: 'parent', value: '_parent' },
          { name: 'top', value: '_top' },
        ]
      }
    },
    {
      name: 'rel',
      title: 'Relationship',
      type: 'string',
      of: [
        { name: 'noreferrer noopener' },
      ]
    }
  ]
}