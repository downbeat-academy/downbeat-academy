import { Link } from 'react-router-dom'
import { Text, Flex } from './components'

function App() {
	return (
		<div className="App">
			<Text tag="p" type="expressive" category="headline" size="base">
				Cadence Core app
			</Text>
			<Flex direction="row" gap="base">
				<Link to="/">Home</Link>
				<Link to="/components">Components</Link>
			</Flex>
		</div>
	)
}

export default App
