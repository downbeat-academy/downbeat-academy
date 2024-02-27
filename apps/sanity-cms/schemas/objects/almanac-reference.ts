import { BiInfoCircle } from "react-icons/bi";

export default {
  name: 'almanacReference',
  type: 'object',
  title: 'Almanac Reference',
  icon: BiInfoCircle,
  fields: [
    {
      name: 'text',
      type: 'string',
      title: 'Text',
    },
    {
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [
        {
          type: 'almanac'
        }
      ]
    }
  ]
}