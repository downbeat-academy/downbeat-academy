import { Metadata } from '@/fields/Metadata'
import { Slug } from '@/fields/Slug'
import { ContentMetadata } from '@/fields/ContentMetadata'

import type { CollectionConfig } from 'payload'

export const Lexicon: CollectionConfig = {
  slug: 'lexicon',
  admin: {
    group: 'Educational Content',
    useAsTitle: 'artist',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Lexicon Metadata',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'artist',
                  label: 'Artist',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'text',
                  name: 'track',
                  label: 'Track',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'text',
                  name: 'album',
                  label: 'Album',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'text',
                  name: 'year',
                  label: 'Year',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'number',
                  name: 'timestamp',
                  label: 'Timestamp',
                  admin: {
                    description: 'Enter the timestamp of the track in seconds',
                    width: '50%',
                  },
                },
                Slug,
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'style',
                  label: 'Style',
                  admin: {
                    width: '50%',
                  },
                  options: [
                    {
                      label: 'Early jazz',
                      value: 'early-jazz',
                    },
                    {
                      label: 'Swing',
                      value: 'swing',
                    },
                    {
                      label: 'Bebop',
                      value: 'bebop',
                    },
                    {
                      label: 'Cool jazz',
                      value: 'cool-jazz',
                    },
                    {
                      label: 'Hard bop',
                      value: 'hard-bop',
                    },
                    {
                      label: 'Modal jazz',
                      value: 'modal-jazz',
                    },
                    {
                      label: 'Free jazz',
                      value: 'free-jazz',
                    },
                    {
                      label: 'Fusion',
                      value: 'fusion',
                    },
                    {
                      label: 'Smooth jazz',
                      value: 'smooth-jazz',
                    },
                    {
                      label: 'Post-bop',
                      value: 'post-bop',
                    },
                    {
                      label: 'Neo-soul',
                      value: 'neo-soul',
                    },
                    {
                      label: 'Contemporary',
                      value: 'contemporary',
                    },
                    {
                      label: 'Other',
                      value: 'other',
                    },
                  ],
                },
                {
                  type: 'select',
                  name: 'length',
                  label: 'Length',
                  admin: {
                    width: '50%',
                  },
                  options: [
                    {
                      label: 'One bar',
                      value: 'one-bar',
                    },
                    {
                      label: 'Two bars',
                      value: 'two-bars',
                    },
                    {
                      label: 'Four bars',
                      value: 'four-bars',
                    },
                    {
                      label: 'Eight bars',
                      value: 'eight-bars',
                    },
                    {
                      label: 'Other',
                      value: 'other',
                    },
                  ],
                },
                {
                  type: 'select',
                  name: 'harmony',
                  label: 'Harmony',
                  admin: {
                    width: '50%',
                  },
                  options: [
                    {
                      label: 'ii-V-I',
                      value: 'ii-v-i',
                    },
                    {
                      label: 'iii-VI-ii-V-I',
                      value: 'iii-vi-ii-v-i',
                    },
                    {
                      label: 'I-IV-ii-v-I',
                      value: 'i-iv-ii-v-i',
                    },
                    {
                      label: 'Blues',
                      value: 'blues',
                    },
                    {
                      label: 'Modal',
                      value: 'modal',
                    },
                    {
                      label: 'Coltrane changes',
                      value: 'coltrane-changes',
                    },
                    {
                      label: 'Other',
                      value: 'other',
                    },
                  ],
                },
              ],
            },
            ContentMetadata,
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'excerpt',
              label: 'Excerpt',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  label: 'Title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Description',
                  type: 'textarea',
                },
                {
                  name: 'audio',
                  label: 'Audio',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Upload an audio file for the excerpt',
                  },
                },
                {
                  name: 'notationFiles',
                  label: 'Notation',
                  type: 'array',
                  fields: [
                    {
                      name: 'key',
                      label: 'Key',
                      type: 'select',
                      options: [
                        {
                          label: 'C',
                          value: 'c',
                        },
                        {
                          label: 'Bb',
                          value: 'bb',
                        },
                        {
                          label: 'Eb',
                          value: 'eb',
                        },
                        {
                          label: 'F',
                          value: 'f',
                        },
                        {
                          label: 'G',
                          value: 'g',
                        },
                        {
                          label: 'Bass clef',
                          value: 'bass-clef',
                        },
                      ],
                    },
                    {
                      name: 'file',
                      label: 'File',
                      type: 'upload',
                      relationTo: 'notation-files',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [Metadata],
        },
      ],
    },
  ],
}
