import { CollectionConfig } from 'payload/types';

const Courses: CollectionConfig = {
  slug: 'courses',
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

export default Courses;