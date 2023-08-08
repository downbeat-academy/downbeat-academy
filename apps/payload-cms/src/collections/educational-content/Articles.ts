import { CollectionConfig } from 'payload/types';

const Articles: CollectionConfig = {
  slug: 'articles',
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

export default Articles;