export * from './auth'
export * from './content'

import {
	user,
	session,
	account,
	verification,
	organization,
	member,
	invitation,
} from './auth'
import { handbooks } from './content/handbooks'

// Auth database schema
export const authSchema = {
	user,
	session,
	account,
	verification,
	organization,
	member,
	invitation,
}

// CMS database schema
export const cmsSchema = {
	handbooks,
}

// For backward compatibility
export const schema = authSchema
