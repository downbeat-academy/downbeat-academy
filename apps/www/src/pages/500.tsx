import { Seo } from '@components/meta'

export default function ServerErrorPage() {
	return (
		<>
			<Seo title="500: Server error" noindex={true} />
			<p>500</p>
		</>
	)
}
