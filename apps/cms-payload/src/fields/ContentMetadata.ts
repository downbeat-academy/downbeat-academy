import { Field } from "payload";

export const ContentMetadata: Field = {
    name: 'contentMetadata',
    type: 'group',
    fields: [
      {
                name: 'categories',
                type: 'array',
                label: 'Categories',
                fields: [
                    {
                        name: 'category',
                        type: 'relationship',
                        relationTo: 'categories',
                    }
                ],
            },
            {
                name: 'genres',
                type: 'array',
                label: 'Genres',
                fields: [
                    {
                        name: 'genre',
                        type: 'relationship',
                        relationTo: 'genres',
                    }
                ],
            },
            {
                name: 'difficulties',
                type: 'array',
                label: 'Difficulties',
                fields: [
                    {
                        name: 'difficulty',
                        type: 'relationship',
                        relationTo: 'difficulties',
                    }   
                ],
            },
            {
                name: 'instruments',
                type: 'array',
                label: 'Instruments',
                fields: [
                    {
                        name: 'instrument',
                        type: 'relationship',
                        relationTo: 'instruments',
                    }
                ],
            },
    ]
    
}