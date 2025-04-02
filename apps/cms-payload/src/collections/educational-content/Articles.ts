import { Metadata } from '@/fields/Metadata'
import { Blocks } from '@/fields/Blocks'
import { Slug } from '@/fields/Slug'

import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
    slug: 'articles',
    admin: {
        group: 'Educational Content',
        useAsTitle: 'title',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Article Metadata',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Title',
                            validate: (value: string | undefined | null) => Boolean(value) || 'This field is required.',
                        },
                        Slug,                        
                    ]
                },
                {
                    label: 'Content',
                    fields: [
                        Blocks
                    ]
                },
                {
                    label: 'SEO',
                    fields: [
                        Metadata,
                    ]
                }
            ]
        }
    ]
}