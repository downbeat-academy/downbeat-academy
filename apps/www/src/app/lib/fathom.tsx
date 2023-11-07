'use client'

import { load, trackPageview } from 'fathom-client'
import React, { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // @ts-ignore
    load(process.env.NEXT_PUBLIC_FATHOM_ID, {
      includedDomains: [
        "downbeatacademy.com"
      ]
    })
  }, [])

  useEffect(() => {
    trackPageview();
    // record a pageview when route changes
  }, [pathname, searchParams])

  return null;
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  )
}