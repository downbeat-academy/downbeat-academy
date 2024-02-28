import { BiBookBookmark } from 'react-icons/bi';

export default {
  name: 'handbook',
  title: 'Handbook',
  type: 'document',
  icon: BiBookBookmark,
  groups: [
    {
      name: 'metadata',
      title: 'Metadata',
    },
    {
      name: 'content',
      title: 'Content',
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Enter the title for the handbook item.',
      group: 'metadata',
      validation: (Rule: any) => [
        Rule.required()
          .min(5)
          .error('The handbook item title should be longer than 5 characters.'),
        Rule.required()
          .max(96)
          .warning(
            `That's a pretty long title, you might want to provide a shorter title.`
          ),
        Rule.required().error('You must enter a title for the handbook item.')
      ]
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The slug determines the canonical organization of this handbook item within the application.',
      group: 'metadata',
      options: {
        source: 'title',
      },
      validation: (Rule: any) => [
        Rule.required().error(
          `The handbook item needs a slug. Create one based on the title with "generate"`
        ),
      ],
    },
    {
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
      group: 'metadata'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Excerpt for the handbook item.',
      group: 'content',
      validation: (Rule: any) => [
        Rule.required().error('You must enter an excerpt for the handbook item.')
      ]
    },
    {
      name: 'content',
      title: 'Content',
      type: 'richText',
      description: 'Content for the handbook item.',
      group: 'content',
      validation: (Rule: any) => [
        Rule.required().error('You must enter content for the handbook item.')
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
    },
  }
}