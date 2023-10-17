import { GiMusicalScore } from 'react-icons/gi'

export default {
  name: 'flatNotation',
  type: 'object',
  title: 'Flat Notation',
  description: 'Music notation powered by Flat.io',
  icon: GiMusicalScore,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    }
  ],
}