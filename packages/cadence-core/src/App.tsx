import React from 'react';
import { Text } from './components';

function App() {
	return (
		<div>
			<h1>Testing playground</h1>
			<Text type='expressive' size='6x-large' tag='h1' color='primary'>Primary</Text>
			<Text type='expressive' size='6x-large' tag='h1' color='secondary'>Secondary</Text>
			<Text type='expressive' size='6x-large' tag='h1' color='strong'>Strong</Text>
			<Text type='expressive' size='6x-large' tag='h1' color='brand'>Brand</Text>
			<Text type='expressive' size='6x-large' tag='h1' color='interactive'>Interactive</Text>
			<Text type='expressive' size='6x-large' tag='h1' color='disabled'>Disabled</Text>
			<Text type='expressive' size='6x-large' tag='h1' color='success'>Success</Text>
			<Text type='expressive' size='6x-large' tag='h1' color='caution'>Caution</Text>
			<Text type='expressive' size='6x-large' tag='h1' color='critical'>Critical</Text>
		</div>
	);
}

export default App;
