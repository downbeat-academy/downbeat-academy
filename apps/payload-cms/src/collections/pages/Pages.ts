import { CollectionConfig } from 'payload/types';

const Pages: CollectionConfig = {
  slug: 'pages',
  auth: false,
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
    },
  ],
};

export default Pages;