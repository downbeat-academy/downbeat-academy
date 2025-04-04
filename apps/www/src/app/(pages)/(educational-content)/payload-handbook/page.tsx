import { getHandbookData } from './getHandbookData'

export default async function PayloadHandbookPage() {
	const data = await getHandbookData()

	return (
		<div>
			<h1>Payload Handbook</h1>
			<ul>
				{data.map((handbook) => (
					<li key={handbook.id}>{handbook.title}</li>
				))}
			</ul>
		</div>
	)
}
