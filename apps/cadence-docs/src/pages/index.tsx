import type { NextPage } from 'next';
import { CheckCircle } from '@downbeat-academy/cadence-icons'
// import * as tokens from '@downbeat-academy/cadence-tokens'

const Home: NextPage = () => {
	return (
		<div>
			<h1>Cadence Docs Home</h1>
			<CheckCircle color='var(--color-palette-pomegranate-500' />
		</div>
	);
};

export default Home;
