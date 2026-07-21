'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from 'cadence-core'
import s from './users-pagination.module.css'

type Props = {
	page: number
	pageCount: number
	total: number
	pageSize: number
}

function buildHref(searchParams: URLSearchParams, page: number): string {
	const params = new URLSearchParams(searchParams.toString())
	if (page <= 1) {
		params.delete('page')
	} else {
		params.set('page', String(page))
	}
	const qs = params.toString()
	return qs ? `/admin/users?${qs}` : '/admin/users'
}

export function UsersPagination({ page, pageCount, total, pageSize }: Props) {
	const searchParams = useSearchParams()
	const start = total === 0 ? 0 : (page - 1) * pageSize + 1
	const end = Math.min(page * pageSize, total)

	const prevHref = buildHref(searchParams, page - 1)
	const nextHref = buildHref(searchParams, page + 1)

	const canPrev = page > 1
	const canNext = page < pageCount

	return (
		<div className={s.root}>
			<div className={s.info}>
				Showing {start}–{end} of {total.toLocaleString()} · Page {page} of {pageCount}
			</div>
			<div className={s.controls}>
				{canPrev ? (
					<Button variant="secondary" size="small" linkComponent={Link} href={prevHref}>
						Previous
					</Button>
				) : (
					<Button variant="secondary" size="small" disabled>
						Previous
					</Button>
				)}
				{canNext ? (
					<Button variant="secondary" size="small" linkComponent={Link} href={nextHref}>
						Next
					</Button>
				) : (
					<Button variant="secondary" size="small" disabled>
						Next
					</Button>
				)}
			</div>
		</div>
	)
}
