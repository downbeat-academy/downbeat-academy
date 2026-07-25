import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Passing a connection string straight to `drizzle()` builds a `pg.Pool` with zero
// options, so it inherits pg's defaults — notably `idleTimeoutMillis: 30000`, which
// closes idle connections between page views. Pages that fan several queries out at
// once (see `app/admin/page.tsx`) then pay a fresh TCP+TLS+auth handshake per query
// on every render. Build the pools explicitly instead.
function createPool(connectionString: string | undefined): Pool {
	return new Pool({
		connectionString,
		max: 10,
		// Outlive the gap between page views so repeat renders reuse warm connections.
		idleTimeoutMillis: 60_000,
		// Fail fast rather than hanging a render when the database is unreachable.
		connectionTimeoutMillis: 10_000,
		// Keep NAT/proxy layers between us and Railway from silently dropping idle sockets.
		keepAlive: true,
	})
}

// Without this, dev HMR re-evaluates the module on every edit and leaks a fresh pool
// each time, so connections are never warm. Production evaluates the module once.
const globalForDb = globalThis as unknown as {
	authPool?: Pool
	cmsPool?: Pool
}

const authPool = globalForDb.authPool ?? createPool(process.env.DATABASE_URL_AUTH)
const cmsPool = globalForDb.cmsPool ?? createPool(process.env.DATABASE_URL_CMS)

if (process.env.NODE_ENV !== 'production') {
	globalForDb.authPool = authPool
	globalForDb.cmsPool = cmsPool
}

export const authDb = drizzle(authPool)
export const cmsDb = drizzle(cmsPool)
