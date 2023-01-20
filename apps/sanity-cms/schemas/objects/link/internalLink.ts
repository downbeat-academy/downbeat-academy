import { BiFile } from 'react-icons/bi'

export default {
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  description: 'Link to an internal document within Sanity',
  icon: BiFile,
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'document',
      title: 'Document',
      type: 'reference',
      to: [
        { type: 'article' },
        { type: 'category' },
        { type: 'course' },
        { type: 'curriculum' },
        { type: 'errorPage' },
        { type: 'landingPage' },
        { type: 'lesson' },
        { type: 'newsletter' },
        { type: 'page' },
        { type: 'person' },
        { type: 'podcast' },
        { type: 'resource' },
        { type: 'snippet' },
      ]
    }
  ]
}