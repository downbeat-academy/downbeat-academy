import { redirect } from 'next/navigation'

export default function HomePage() {
	// Redirect to sign-in; middleware will redirect to dashboard if authenticated
	redirect('/sign-in')
}
