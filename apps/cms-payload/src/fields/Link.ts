import type { Field } from 'payload'

export const Link: Field = {
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'location',
      type: 'select',
      label: 'Location',
      options: [
        { value: 'internal', label: 'Internal' },
        { value: 'customInternal', label: 'Custom Internal' },
        { value: 'external', label: 'External' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
      ],
    },
    {
      name: 'text',
      type: 'text',
      label: 'Text',
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'New Tab',
    },
    {
      name: 'internalLink',
      type: 'relationship',
      label: 'Internal Link',
      relationTo: [
        'pages',
        'articles',
        'categories',
        'difficulties',
        'genres',
        'instruments',
        'people',
      ],
      admin: {
        condition: (data, siblingData) => {
          return siblingData.location === 'internal' ? true : false
        },
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value) {
              try {
                // If URL doesn't start with http:// or https://, add https://
                if (
                  typeof value === 'string' &&
                  !value.startsWith('http://') &&
                  !value.startsWith('https://')
                ) {
                  value = `https://${value}`
                }

                // Validate URL using the URL constructor
                const url = new URL(value)

                // Check for valid TLD
                const tldPattern = /\.([a-z]{2,}|[a-z]{2}\.[a-z]{2})$/i
                if (!tldPattern.test(url.hostname)) {
                  return 'URL must end with a valid top-level domain (e.g., .com, .org, .edu)'
                }

                return value
              } catch (e) {
                return 'Please enter a valid URL (e.g., https://example.com)'
              }
            }
            return value
          },
        ],
      },
      validate: (value: string | string[] | null | undefined) => {
        if (value) {
          const values = Array.isArray(value) ? value : [value]
          const tldPattern = /\.([a-z]{2,}|[a-z]{2}\.[a-z]{2})$/i

          for (const val of values) {
            if (val) {
              try {
                const url = new URL(val)
                if (!tldPattern.test(url.hostname)) {
                  return 'URL must end with a valid top-level domain (e.g., .com, .org, .edu)'
                }
              } catch (e) {
                return 'Please enter a valid URL'
              }
            }
          }
        }
        return true
      },
      admin: {
        condition: (data, siblingData) => {
          return siblingData.location === 'external' ? true : false
        },
      },
    },
    {
      name: 'internalPath',
      type: 'text',
      label: 'Internal Path',
      validate: (value: string | string[] | null | undefined) => {
        if (value) {
          const values = Array.isArray(value) ? value : [value]
          const internalPathPattern = /^\/[a-zA-Z0-9\-_/]*$/

          for (const val of values) {
            if (val) {
              // Check if it starts with http:// or https://
              if (val.startsWith('http://') || val.startsWith('https://')) {
                return 'Internal paths should not include http:// or https://'
              }

              // Check if it matches the internal path pattern
              if (!internalPathPattern.test(val)) {
                return 'Please enter a valid internal path (e.g., /about, /articles/123)'
              }
            }
          }
        }
        return true
      },
      admin: {
        condition: (data, siblingData) => {
          return siblingData.location === 'customInternal' ? true : false
        },
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value) {
              // Remove any existing tel: prefix
              const cleanValue = value.replace(/^tel:/, '')

              // Validate phone number format
              const phonePattern = /^\+?[\d\s\-()]+$/
              if (!phonePattern.test(cleanValue)) {
                return 'Please enter a valid phone number (e.g., +1 234-567-8900)'
              }

              // Add tel: prefix if not present
              return `tel:${cleanValue}`
            }
            return value
          },
        ],
      },
      validate: (value: string | string[] | null | undefined) => {
        if (value) {
          const values = Array.isArray(value) ? value : [value]
          const phonePattern = /^tel:\+?[\d\s\-()]+$/

          for (const val of values) {
            if (val && !phonePattern.test(val)) {
              return 'Please enter a valid phone number (e.g., +1 234-567-8900)'
            }
          }
        }
        return true
      },
      admin: {
        condition: (data, siblingData) => {
          return siblingData.location === 'phone' ? true : false
        },
      },
    },
    {
      name: 'emailAddress',
      type: 'text',
      label: 'Email Address',
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value) {
              // Remove any existing mailto: prefix
              const cleanValue = value.replace(/^mailto:/, '')

              // Validate email format
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              if (!emailPattern.test(cleanValue)) {
                return 'Please enter a valid email address (e.g., example@domain.com)'
              }

              // Add mailto: prefix if not present
              return `mailto:${cleanValue}`
            }
            return value
          },
        ],
      },
      validate: (value: string | string[] | null | undefined) => {
        if (value) {
          const values = Array.isArray(value) ? value : [value]
          const emailPattern = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/

          for (const val of values) {
            if (val && !emailPattern.test(val)) {
              return 'Please enter a valid email address (e.g., example@domain.com)'
            }
          }
        }
        return true
      },
      admin: {
        condition: (data, siblingData) => {
          return siblingData.location === 'email' ? true : false
        },
      },
    },
  ],
}
