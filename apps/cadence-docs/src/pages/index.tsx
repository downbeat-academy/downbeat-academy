import type { NextPage } from 'next';
import { CheckCircle } from '@downbeat-academy/cadence-icons'

const Home: NextPage = () => {
	return (
		<div>
			<h1>Cadence Docs Home</h1>
			<CheckCircle color='var(--color-palette-pomegranate-500' height='2rem' />
		</div>
	);
};

export default Home;
