import {
	Text,
	Flex,
	Button
} from './components'

function App() {
	return (
		<div className="App">
			<Text tag='h1'>Cadence Core app</Text>
			<Flex direction='column'>
				<Text tag='h2'>Button</Text>
				<Flex
					direction='column'
					gap='medium'
				>
					<Text tag='h3'>Size / Large</Text>
					<Button text="Primary button" variant='primary' size='large' />
					<Button text="Secondary button" variant='secondary' size='large' />
					<Button text="Tertiary button" variant='tertiary' size='large' />
					<Button text="Ghost button" variant='ghost' size='large' />
					<Button text="Destructive button" variant='destructive' size='large' />
				</Flex>
				<Flex direction='column' gap='medium'>
					<Text tag='h3'>Size / Default</Text>
					<Button text="Primary button" variant='primary' size='default' />
					<Button text="Secondary button" variant='secondary' size='default' />
					<Button text="Tertiary button" variant='tertiary' size='default' />
					<Button text="Ghost button" variant='ghost' size='default' />
					<Button text="Destructive button" variant='destructive' size='default' />
				</Flex>
				<Flex direction='column' gap='medium'>
					<Text tag='h3'>Size / Small</Text>
					<Button text="Primary button" variant='primary' size='small' />
					<Button text="Secondary button" variant='secondary' size='small' />
					<Button text="Tertiary button" variant='tertiary' size='small' />
					<Button text="Ghost button" variant='ghost' size='small' />
					<Button text="Destructive button" variant='destructive' size='small' />
				</Flex>
				<Flex direction='column' gap='medium'>
					<Text tag='h3'>Size / Extra Small</Text>
					<Button text="Primary button" variant='primary' size='x-small' />
					<Button text="Secondary button" variant='secondary' size='x-small' />
					<Button text="Tertiary button" variant='tertiary' size='x-small' />
					<Button text="Ghost button" variant='ghost' size='x-small' />
					<Button text="Destructive button" variant='destructive' size='x-small' />
				</Flex>
			</Flex>
		</div>
	)
}

export default App
