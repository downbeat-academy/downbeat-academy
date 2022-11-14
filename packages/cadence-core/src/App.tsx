import React from 'react';
import { Text, Flex, Button } from './components';
import image from './assets/images/avatar.png'

function App() {
	return (
		<div>
			<Text tag='h1' size='6x-large' type='expressive'>Testing playground</Text>
			<Flex as='section' direction='row' gap='x-large' padding='x-large'>
				<Flex as='article' direction='column' padding='medium'>
					<Text tag='h4' size='2x-large'>Item 1</Text>
					<Text tag='p' size='base' type='expressive'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
					<Button text='Button text' variant='primary' />
				</Flex>
				<Flex as='article' direction='column' padding='medium'>
					<Text tag='h4' size='2x-large'>Item 2</Text>
					<Text tag='p' size='base' type='expressive'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
					<Button text='Button text' variant='primary' />
				</Flex>
				<Flex as='article' direction='column' padding='medium'>
					<Text tag='h4' size='2x-large'>Item 3</Text>
					<Text tag='p' size='base' type='expressive'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
					<Button text='Button text' variant='primary' />
				</Flex>
			</Flex>
		</div>
	);
}

export default App;
