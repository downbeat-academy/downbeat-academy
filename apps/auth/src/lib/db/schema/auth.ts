import { pgTable, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	role: text('role'),
	banned: boolean('banned'),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires'),
})

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	impersonatedBy: text('impersonated_by'),
	activeOrganizationId: text('active_organization_id'),
})

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
})

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at'),
})

export const organization = pgTable('organization', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	slug: text('slug').unique(),
	logo: text('logo'),
	createdAt: timestamp('created_at').notNull(),
	metadata: text('metadata'),
})

export const member = pgTable('member', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id')
		.notNull()
		.references(() => organization.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	role: text('role').notNull(),
	createdAt: timestamp('created_at').notNull(),
})

export const invitation = pgTable('invitation', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id')
		.notNull()
		.references(() => organization.id, { onDelete: 'cascade' }),
	email: text('email').notNull(),
	role: text('role'),
	status: text('status').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	inviterId: text('inviter_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
})

// OAuth Provider tables (for oauthProvider plugin)
export const oauthClient = pgTable('oauth_client', {
	id: text('id').primaryKey(),
	clientId: text('client_id').notNull().unique(),
	clientSecret: text('client_secret'),
	name: text('name'),
	uri: text('uri'),
	icon: text('icon'),
	contacts: text('contacts').array(),
	tos: text('tos'),
	policy: text('policy'),
	redirectUris: text('redirect_uris').array().notNull(),
	postLogoutRedirectUris: text('post_logout_redirect_uris').array(),
	tokenEndpointAuthMethod: text('token_endpoint_auth_method'),
	grantTypes: text('grant_types').array(),
	responseTypes: text('response_types').array(),
	scopes: text('scopes').array(),
	public: boolean('public'),
	type: text('type'),
	disabled: boolean('disabled').default(false),
	skipConsent: boolean('skip_consent'),
	enableEndSession: boolean('enable_end_session'),
	requirePKCE: boolean('require_pkce'),
	subjectType: text('subject_type'),
	softwareId: text('software_id'),
	softwareVersion: text('software_version'),
	softwareStatement: text('software_statement'),
	referenceId: text('reference_id'),
	metadata: jsonb('metadata'),
	userId: text('user_id').references(() => user.id),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at'),
})

export const oauthAccessToken = pgTable('oauth_access_token', {
	id: text('id').primaryKey(),
	token: text('token').notNull().unique(),
	clientId: text('client_id').notNull().references(() => oauthClient.clientId),
	sessionId: text('session_id').references(() => session.id, { onDelete: 'set null' }),
	userId: text('user_id').notNull().references(() => user.id),
	referenceId: text('reference_id'),
	scopes: text('scopes').array().notNull(),
	createdAt: timestamp('created_at'),
	expiresAt: timestamp('expires_at'),
})

export const oauthRefreshToken = pgTable('oauth_refresh_token', {
	id: text('id').primaryKey(),
	token: text('token').notNull(),
	clientId: text('client_id').notNull().references(() => oauthClient.clientId),
	sessionId: text('session_id').references(() => session.id, { onDelete: 'set null' }),
	userId: text('user_id').notNull().references(() => user.id),
	referenceId: text('reference_id'),
	scopes: text('scopes').array().notNull(),
	authTime: timestamp('auth_time'),
	createdAt: timestamp('created_at'),
	expiresAt: timestamp('expires_at'),
	revoked: timestamp('revoked'),
})

export const oauthConsent = pgTable('oauth_consent', {
	id: text('id').primaryKey(),
	clientId: text('client_id').notNull().references(() => oauthClient.clientId),
	userId: text('user_id').notNull().references(() => user.id),
	scopes: text('scopes').array(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at'),
})
