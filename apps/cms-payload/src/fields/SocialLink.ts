import type { Field } from 'payload'

export const SocialLink: Field = {
  name: 'socialLink',
  type: 'group',
  label: 'Social Link',
  fields: [
    {
      name: 'platform',
      type: 'select',
      label: 'Platform',
      options: [
        {
          label: 'Facebook',
          value: 'facebook',
        },
        {
          label: 'Instagram',
          value: 'instagram',
        },
        {
          label: 'Twitter / X',
          value: 'twitter-x',
        },
        {
          label: 'YouTube',
          value: 'youtube',
        },
        {
          label: 'TikTok',
          value: 'tiktok',
        },
        {
          label: 'Twitch',
          value: 'twitch',
        },
        {
          label: 'SoundCloud',
          value: 'soundcloud',
        },
        {
          label: 'Spotify',
          value: 'spotify',
        },
        {
          label: 'Website',
          value: 'website',
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      validate: (value: string | undefined | null) => {
        // Only validate if there's a value
        if (value && value.trim() !== '') {
          // Check if URL starts with http:// or https://
          if (!value.startsWith('http://') && !value.startsWith('https://')) {
            return 'URL must start with http:// or https://'
          }

          try {
            new URL(value)
            return true
          } catch (e) {
            return 'Please enter a valid URL (e.g., https://example.com)'
          }
        }
        return true
      },
    },
  ],
}
