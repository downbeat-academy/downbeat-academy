import type { Role } from '@/lib/auth/permissions'

export type UserRow = {
	id: string
	name: string
	email: string
	emailVerified: boolean
	role: Role | string | null
	banned: boolean | null
	image: string | null
	createdAt: Date
	lastSessionAt: Date | null
}

export type RecentUser = {
	id: string
	name: string
	email: string
	role: Role | string | null
	createdAt: Date
}

export type RecentSession = {
	id: string
	userId: string
	userName: string | null
	userEmail: string | null
	ipAddress: string | null
	userAgent: string | null
	createdAt: Date
}

export type MetricPoint = {
	date: string
	newUsers: number
	cumulative: number
}

export type ProviderSlice = {
	providerId: string
	count: number
}

export type Subscriber = {
	id: string
	email: string
	firstName: string | null
	lastName: string | null
	unsubscribed: boolean
	createdAt: Date | null
}
