import { redirect } from 'next/navigation'

// Default landing page redirects to sign-in
export default function Home() {
	redirect('/sign-in')
}
