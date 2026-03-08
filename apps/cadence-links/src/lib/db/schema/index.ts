// Links schema
export * from './links'

// Auth schema (for session validation against auth service DB)
import {
	user,
	session,
	account,
	verification,
	organization,
	member,
	invitation,
} from './auth'

export const authSchema = {
	user,
	session,
	account,
	verification,
	organization,
	member,
	invitation,
}
