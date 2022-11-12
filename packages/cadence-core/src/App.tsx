import React from 'react';
import { Avatar, AvatarGroup, Text } from './components';
import image from './assets/images/avatar.png'

function App() {

	const avatarImage = <img src={image} />;

	const avatars = [
		<Avatar
			size='medium'
			name='Jory Tindall'
			imageUrl='/images/avatar.jpg'
			hasBorder={true}
		/>,
		<Avatar
			size='medium'
			name='Jory Tindall'
			hasBorder={true}
		/>,
		<Avatar
			size='medium'
			name='Alex Mankey'
			hasBorder={true}
		/>
	]
	return (
		<div>
			<Text tag='h1' size='6x-large' type='expressive'>Testing playground</Text>
			<Text tag='p' size='base' type='expressive'>Avatar group</Text>
			<AvatarGroup 
				avatars={avatars}
				direction='horizontal'
				overlap={true}
				overlapSpacing='compact'
			/>
			<AvatarGroup 
				avatars={avatars}
				direction='horizontal'
				overlap={true}
				overlapSpacing='default'
			/>
			<AvatarGroup 
				avatars={avatars}
				direction='horizontal'
				overlap={true}
				overlapSpacing='comfortable'
			/>
			<AvatarGroup 
				avatars={avatars}
				direction='horizontal'
			/>
		</div>
	);
}

export default App;
