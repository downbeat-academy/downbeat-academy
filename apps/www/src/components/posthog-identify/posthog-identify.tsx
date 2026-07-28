'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

interface PostHogIdentifyProps {
  userId: string
  name: string | null | undefined
}

export function PostHogIdentify({ userId, name }: PostHogIdentifyProps) {
  useEffect(() => {
    posthog.identify(userId, {
      name: name ?? undefined,
    })
  }, [userId, name])

  return null
}
