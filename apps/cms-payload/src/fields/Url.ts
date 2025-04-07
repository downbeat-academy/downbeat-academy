import type { Field } from 'payload'

export const Url: Field = {
  name: 'url',
  type: 'group',
  label: false,
  fields: [
    {
      name: 'value',
      type: 'text',
      label: 'URL',
    },
  ],
  admin: {
    description: 'A URL that links to a resource.',
  },
  hooks: {
    beforeValidate: [
      ({ value }) => {
        if (value?.value) {
          try {
            // If URL doesn't start with http:// or https://, add https://
            if (
              typeof value.value === 'string' &&
              !value.value.startsWith('http://') &&
              !value.value.startsWith('https://')
            ) {
              value.value = `https://${value.value}`
            }

            // Validate URL using the URL constructor
            const url = new URL(value.value)

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
  validate: (value: unknown) => {
    if (value && typeof value === 'object' && 'value' in value && typeof value.value === 'string') {
      try {
        const url = new URL(value.value)
        const tldPattern = /\.([a-z]{2,}|[a-z]{2}\.[a-z]{2})$/i
        if (!tldPattern.test(url.hostname)) {
          return 'URL must end with a valid top-level domain (e.g., .com, .org, .edu)'
        }
      } catch (e) {
        return 'Please enter a valid URL'
      }
    }
    return true
  },
}
