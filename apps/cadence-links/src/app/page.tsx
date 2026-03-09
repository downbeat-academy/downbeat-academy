import { redirect } from 'next/navigation'

export default function HomePage() {
	// Redirect to dashboard; proxy will redirect to auth service if not authenticated
	redirect('/dashboard')
}
