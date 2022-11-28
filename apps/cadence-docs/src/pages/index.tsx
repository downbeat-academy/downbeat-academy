import type { NextPage } from 'next';
import Image from 'next/image'
import { Text } from '@downbeat-academy/cadence-core'

const Home: NextPage = () => {
	return (
		<div>
			<Text tag='h1' size='6x-large' type='expressive'>Cadence Docs</Text>
			<Image src='https://badge.fury.io/js/@downbeat-academy%2Fcadence-core.svg' alt='Package version' layout="intrinsic" width='150px' height='25px' />
		</div>
	);
};

export default Home;
