import { toNextJsHandler } from 'better-auth/next-js'
import { getAuth } from '@/lib/auth/auth'

export const { POST, GET } = toNextJsHandler(getAuth())
