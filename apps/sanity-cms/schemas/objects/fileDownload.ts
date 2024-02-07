import { BiFile } from "react-icons/bi";

export default {
  name: 'fileDownload',
  type: 'object',
  title: 'File Download',
  icon: BiFile,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'file',
      type: 'file',
      title: 'File',
      validation: (Rule: any) => Rule.required(),
    }
  ]
}