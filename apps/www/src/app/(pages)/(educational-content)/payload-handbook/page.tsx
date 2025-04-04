import { getHandbookData } from './getHandbookData'

// Ensure page is dynamically rendered
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PayloadHandbookPage() {
	const data = await getHandbookData()

	return (
		<div>
			<h1>Payload Handbook</h1>
			{data.length === 0 ? (
				<p>No handbooks available.</p>
			) : (
				<ul>
					{data.map((handbook) => (
						<li key={handbook.id}>{handbook.title}</li>
					))}
				</ul>
			)}
		</div>
	)
}
