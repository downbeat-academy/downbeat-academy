import React from 'react';
import { Avatar, Text } from './components';
import image from './assets/images/avatar.png'

function App() {

	const avatarImage = <img src={image} />;
	return (
		<div>
			<Text tag='h1' size='6x-large' type='expressive'>Testing playground</Text>
			<Text tag='p' size='base' type='expressive'>No image</Text>
			<Avatar
				size='small'
				name='Jory Tindall'
			/>
			<Avatar
				size='medium'
				name='Jory Tindall'
			/>
			<Avatar
				size='large'
				name='Jory Tindall'
			/>
			<Text tag='p' size='base' type='expressive'>Image passed via URL</Text>
			<Avatar
				size='small'
				name='Jory Tindall'
				imageUrl='/images/avatar.jpg'
			/>
			<Avatar
				size='medium'
				name='Jory Tindall'
				imageUrl='/images/avatar.jpg'
			/>
			<Avatar
				size='large'
				name='Jory Tindall'
				imageUrl='/images/avatar.jpg'
			/>
			<Text tag='p' size='base' type='expressive'>Image passed as an object</Text>
			<Avatar
				size='small'
				name='Jory Tindall'
				imageObject={avatarImage}
			/>
			<Text tag='p' size='base' type='expressive'>No image, not rounded</Text>
			<Avatar
				size='small'
				name='Jory Tindall'
				rounded={false}
			/>
			<Avatar
				size='medium'
				name='Jory Tindall'
				rounded={false}
			/>
			<Avatar
				size='large'
				name='Jory Tindall'
				rounded={false}
			/>
			<Text tag='p' size='base' type='expressive'>Image passed via url, not rounded</Text>
			<Avatar
				size='small'
				name='Jory Tindall'
				imageUrl='/images/avatar.jpg'
				rounded={false}
			/>
			<Avatar
				size='medium'
				name='Jory Tindall'
				imageUrl='/images/avatar.jpg'
				rounded={false}
			/>
			<Avatar
				size='large'
				name='Jory Tindall'
				imageUrl='/images/avatar.jpg'
				rounded={false}
			/>
		</div>
	);
}

export default App;
