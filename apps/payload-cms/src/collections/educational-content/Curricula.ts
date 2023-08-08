import { CollectionConfig } from 'payload/types';

const Curricula: CollectionConfig = {
  slug: 'curricula',
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

export default Curricula;