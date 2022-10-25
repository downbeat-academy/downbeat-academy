import React from 'react';
import { Text } from './components';

function App() {
	return (
		<div>
			<h1>Testing playground</h1>
      <div>
        <Text tag="h1" type='expressive' size='6x-large' fluid={true}>Headline 1</Text>
        <Text tag="h2" type='expressive' size='5x-large'>Headline 2</Text>
        <Text tag="h3" type='expressive' size='4x-large'>Headline 3</Text>
        <Text tag="h4" type='expressive' size='3x-large'>Headline 4</Text>
        <Text tag="h5" type='expressive' size='2x-large'>Headline 5</Text>
        <Text tag="h6" type='expressive' size='x-large'>Headline 6</Text>
      </div>
      <div>
        <Text tag="h1" type='productive' size='6x-large'>Headline 1</Text>
        <Text tag="h2" type='productive'>Headline 2</Text>
        <Text tag="h3" type='productive'>Headline 3</Text>
        <Text tag="h4" type='productive'>Headline 4</Text>
        <Text tag="h5" type='productive'>Headline 5</Text>
        <Text tag="h6" type='productive'>Headline 6</Text>
      </div>
		</div>
	);
}

export default App;
