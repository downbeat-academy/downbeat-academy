import { CollectionConfig } from 'payload/types';

const Lessons: CollectionConfig = {
  slug: 'lessons',
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

export default Lessons;