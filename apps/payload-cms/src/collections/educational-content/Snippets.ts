import { CollectionConfig } from 'payload/types';

const Snippets: CollectionConfig = {
  slug: 'snippets',
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

export default Snippets;