import { BiLink } from 'react-icons/bi'

interface PreviewProps {
  customLink?: string,
  internalLink?: string,
  externalLink?: string,
}

export default {
  name: 'link',
  type: 'object',
  title: 'Link',
  description: 'Link to anywhere in the application, or externally',
  icon: BiLink,
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'Custom Internal', value: 'customInternal' },
          { title: 'External', value: 'external' }
        ],
        layout: 'radio',
      }
    },
    {
      name: 'customLink',
      type: 'customLink',
      hidden: ({ parent }: any) => parent.type !== 'customInternal',
    },
    {
      name: 'internalLink',
      type: 'internalLink',
      hidden: ({ parent }: any) => parent.type !== 'internal',
    },
    {
      name: 'externalLink',
      type: 'externalLink',
      hidden: ({ parent }: any) => parent.type !== 'external',
    }
  ],
  preview: {
    select: {
      customLink: 'customLink.text',
      internalLink: 'internalLink.text',
      externalLink: 'externalLink.text',
    },
    prepare: ({ customLink, internalLink, externalLink }: PreviewProps) => {
      return {
        title: customLink || internalLink || externalLink,
      }
    }
  }
}