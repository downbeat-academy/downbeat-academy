import React from 'react';
import { Text, LogoSymbol, LogoText, LogoLockup } from './components';

function App() {
	return (
		<div>
			<Text tag='h1' size='6x-large' type='expressive'>Testing playground</Text>
			<LogoSymbol color='brand' width={100} />
			<LogoText color='brand' width={100} />
			<LogoLockup color='brand' width={100} />
		</div>
	);
}

export default App;
