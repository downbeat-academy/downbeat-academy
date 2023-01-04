'use client'

import * as Fathom from 'fathom-client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Analytics({ }) {
	const id = process.env.NEXT_PUBLIC_FATHOM_ID as string;
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		Fathom.load(id, {
			includedDomains: ["downbeatacademy.com", "www.downbeatacademy.com"],
		})

		let newPageViewPath: string | undefined

		if (pathname) {
			newPageViewPath = pathname + searchParams.toString()
			Fathom.trackPageview({
				url: newPageViewPath,
				referrer: document.referrer,
			})
		}
	}, [id, pathname, searchParams])

	return <></>
}