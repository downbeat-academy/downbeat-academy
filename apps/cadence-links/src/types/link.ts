import type { Link as DbLink, NewLink as DbNewLink } from '@lib/db/schema/links'
import type { AvailableDomain } from '@lib/constants/domains'

// Re-export database types
export type Link = DbLink
export type NewLink = DbNewLink

// API request/response types
export interface CreateLinkRequest {
	url: string
	domain: AvailableDomain
}

export interface CreateLinkResponse {
	success: true
	link: Link
	shortUrl: string
}

export interface GetLinksResponse {
	success: true
	links: Link[]
}

export interface DeleteLinkResponse {
	success: true
}

export interface ErrorResponse {
	success: false
	error: string
}

export type ApiResponse<T> = T | ErrorResponse
