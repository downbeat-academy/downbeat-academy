import { CollectionConfig } from 'payload/types';

const Resources: CollectionConfig = {
  slug: 'resources',
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

export default Resources;