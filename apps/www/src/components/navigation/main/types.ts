interface SessionData {
	session: {
		id: string
		token: string
		expiresAt: Date
		userId: string
		[key: string]: any
	}
	user: {
		id: string
		name: string
		email: string
		role?: string
		[key: string]: any
	}
}

interface HeaderNavigationProps {
	className?: string
	initialSession?: SessionData | null
}

export type { HeaderNavigationProps, SessionData }
