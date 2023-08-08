import { CollectionConfig } from 'payload/types';

const Podcasts: CollectionConfig = {
  slug: 'podcasts',
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

export default Podcasts;